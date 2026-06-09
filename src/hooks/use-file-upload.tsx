import { useMutation } from '@tanstack/react-query';
import type React from 'react';
import { useCallback, useMemo, useRef, useState, type ChangeEvent, type DragEvent, type InputHTMLAttributes } from 'react';
import { updateProfilePhoto } from '@/services/imagesService';
import { toast } from 'sonner';
import { Ban } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { loadImageDimenstions } from '@/lib/utils';

export type FileMetadata = {
    name: string;
    size: number;
    type: string;
    url: string;
    id: string;
    order: number;
};

export type FileWithPreview = {
    file: File | FileMetadata;
    id: string;
    order?: number;
    preview?: string;
    width?: number;
    height?: number;
};

export type FileUploadOptions = {
    maxFiles?: number;
    maxSize?: number;
    accept?: string;
    multiple?: boolean;
    initialFiles?: FileMetadata[];
    onFilesChange?: (files: FileWithPreview[]) => void;
    onFilesAdded?: (addedFiles: FileWithPreview[]) => void;
    onError?: (errors: string[]) => void;
};

export type FileUploadState = {
    files: FileWithPreview[];
    isDragging: boolean;
    errors: string[];
    warnings: string[];
};

export type FileUploadActions = {
    addFiles: (files: FileList | File[]) => void;
    removeFile: (id: string) => void;
    clearFiles: () => void;
    clearErrors: () => void;
    getFilesForValidation: () => FileWithPreview[];
    handleDragEnter: (e: DragEvent<HTMLElement>) => void;
    handleDragLeave: (e: DragEvent<HTMLElement>) => void;
    handleDragOver: (e: DragEvent<HTMLElement>) => void;
    handleDrop: (e: DragEvent<HTMLElement>) => void;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    openFileDialog: () => void;
    getInputProps: (props?: InputHTMLAttributes<HTMLInputElement>) => InputHTMLAttributes<HTMLInputElement> & {
        ref: React.Ref<HTMLInputElement>;
    };
    reorderFiles: (fromIndex: number, toIndex: number) => void;
};

export type UpdateProfileAction = {
    updateAvatar: (file: File) => void;
    isUpdatingAvatar: boolean;
    isUpdatingAvatarError: boolean;
    updateAvatarData?: unknown;
    updateAvatarError: unknown;
    isUpdatingAvatarSuccess: boolean;
}

export function isNativeFile(
    value: File | FileMetadata,
): value is File {
    return value instanceof File;
}

export const useFileUpload = (options: FileUploadOptions = {}): [FileUploadState, FileUploadActions, UpdateProfileAction, {
    existingImages: FileWithPreview[],
    newImages: FileWithPreview[],
}] => {
    const { refetchUser } = useAuth();

    const {
        maxFiles = Number.POSITIVE_INFINITY,
        maxSize = Number.POSITIVE_INFINITY,
        accept = '*',
        multiple = false,
        initialFiles = [],
        onFilesChange,
        onFilesAdded,
        onError,
    } = options;

    const [state, setState] = useState<FileUploadState>({
        files: initialFiles.map((file) => ({
            file,
            id: file.id,
            preview: file.url,
        })),
        isDragging: false,
        errors: [],
        warnings: [],
    });

    const existingImages = useMemo(
        () => state.files.filter(f => !(f.file instanceof File)),
        [state.files]
    );

    const newImages = useMemo(
        () => state.files.filter(f => f.file instanceof File),
        [state.files]
    )

    const inputRef = useRef<HTMLInputElement>(null);

    const validateFile = useCallback(
        (file: File | FileMetadata): string | null => {
            if (file instanceof File) {
                if (file.size > maxSize) {
                    return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
                }
            } else {
                if (file.size > maxSize) {
                    return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
                }
            }

            if (accept !== '*') {
                const acceptedTypes = accept.split(',').map((type) => type.trim());
                const fileType = file instanceof File ? file.type || '' : file.type;
                const fileExtension = `.${file instanceof File ? file.name.split('.').pop() : file.name.split('.').pop()}`;

                const isAccepted = acceptedTypes.some((type) => {
                    if (type.startsWith('.')) {
                        return fileExtension.toLowerCase() === type.toLowerCase();
                    }
                    if (type.endsWith('/*')) {
                        const baseType = type.split('/')[0];
                        return fileType.startsWith(`${baseType}/`);
                    }
                    return fileType === type;
                });

                if (!isAccepted) {
                    return `File "${file instanceof File ? file.name : file.name}" is not an accepted file type.`;
                }
            }

            return null;
        },
        [accept, maxSize]
    );

    const createPreview = useCallback((file: File | FileMetadata): string | undefined => {
        if (file instanceof File) {
            return URL.createObjectURL(file);
        }
        return file.url;
    }, []);

    const generateUniqueId = useCallback((file: File | FileMetadata): string => {
        if (file instanceof File) {
            return uuidv4();
        }
        return file.id;
    }, []);

    const clearFiles = useCallback(() => {
        setState((prev) => {
            for (const file of prev.files) {
                if (file.preview && file.file instanceof File && file.file.type.startsWith('image/')) {
                    URL.revokeObjectURL(file.preview);
                }
            }

            if (inputRef.current) {
                inputRef.current.value = '';
            }

            const newState = {
                ...prev,
                files: [],
                errors: [],
            }

            onFilesChange?.(newState.files);
            return newState;
        });
    }, [onFilesChange]);

    const addFiles = useCallback(
  async (newFiles: FileList | File[]) => {
    if (!newFiles || newFiles.length === 0) return;

    const newFilesArray = Array.from(newFiles);

    setState((prev) => {
      const errors: string[] = [];
      const warnings: string[] = [];

      // reset previous errors
      const baseState = { ...prev, errors: [] };

      // handle single-file mode
      if (!multiple) {
        clearFiles();
      }

      // max files validation (IMPORTANT: use prev.files, not state.files)
      if (
        multiple &&
        maxFiles !== Number.POSITIVE_INFINITY &&
        prev.files.length + newFilesArray.length > maxFiles
      ) {
        errors.push(`You can only upload a maximum of ${maxFiles} files.`);

        onError?.(errors);

        return {
          ...baseState,
          errors,
        };
      }

      const validFiles: FileWithPreview[] = [];

      const processFiles = async () => {
        for (const file of newFilesArray) {
          // duplicate check (use prev.files)
          if (multiple) {
            const isDuplicate = prev.files.some(
              (existingFile) =>
                existingFile.file.name === file.name &&
                existingFile.file.size === file.size
            );

            if (isDuplicate) continue;
          }

          // size validation
          if (file.size > maxSize) {
            errors.push(
              multiple
                ? `Some files exceed the maximum size of ${formatBytes(maxSize)}.`
                : `File exceeds the maximum size of ${formatBytes(maxSize)}.`
            );
            continue;
          }

          const error = validateFile(file);
          if (error) {
            errors.push(error);
            continue;
          }

          const metadata = file.type.startsWith("image/")
            ? await loadImageDimenstions(file)
            : { width: 0, height: 0 };

          if (metadata.width && metadata.width < 1200) {
            warnings.push(
              `Image "${file.name}" is under 1200px wide. Quality may be reduced.`
            );
          }

          validFiles.push({
            file,
            id: generateUniqueId(file),
            preview: createPreview(file),
            ...metadata,
          });
        }

        if (validFiles.length > 0) {
          const newList = multiple
            ? [...prev.files, ...validFiles]
            : validFiles;

          const ordered = normalizeOrder(newList);

          onFilesAdded?.(validFiles);
          onFilesChange?.(ordered);

          setState((finalPrev) => ({
            ...finalPrev,
            files: ordered,
            errors,
            warnings,
          }));
        } else if (errors.length > 0) {
          onError?.(errors);

          setState((finalPrev) => ({
            ...finalPrev,
            errors,
            warnings,
          }));
        }

        if (inputRef.current) {
          inputRef.current.value = "";
        }
      };

      // run async logic safely
      processFiles();

      // return unchanged state immediately
      return baseState;
    });
  },
  [
    multiple,
    maxFiles,
    maxSize,
    validateFile,
    createPreview,
    generateUniqueId,
    clearFiles,
    onFilesChange,
    onFilesAdded,
    onError,
  ]
);

    const removeFile = useCallback(
        (id: string) => {
            setState((prev) => {
                const fileToRemove = prev.files.find((file) => file.id === id);
                if (
                    fileToRemove &&
                    fileToRemove.preview &&
                    fileToRemove.file instanceof File &&
                    fileToRemove.file.type.startsWith('image/')
                ) {
                    URL.revokeObjectURL(fileToRemove.preview);
                }

                const newFiles = normalizeOrder(
                    prev.files.filter((file) => file.id !== id)
                );
                onFilesChange?.(newFiles);

                return {
                    ...prev,
                    files: newFiles,
                    errors: []
                };
            });
        },
        [onFilesChange],
    );

    const clearErrors = useCallback(() => {
        setState((prev) => ({
            ...prev,
            errors: [],
        }));
    }, []);

    const getFilesForValidation = useCallback(
        () => state.files, [state.files]
    )

    const handleDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setState((prev) => ({ ...prev, isDragging: true }));
    }, []);

    const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.currentTarget.contains(e.relatedTarget as Node)) {
            return;
        }

        setState((prev) => ({ ...prev, isDragging: false }));
    }, []);

    const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
        (e: DragEvent<HTMLElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setState((prev) => ({ ...prev, isDragging: false }));

            if (inputRef.current?.disabled) {
                return;
            }

            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                if (!multiple) {
                    const file = e.dataTransfer.files[0];
                    addFiles([file]);
                } else {
                    addFiles(e.dataTransfer.files);
                }
            }
        },
        [addFiles, multiple],
    );

    const handleFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                addFiles(e.target.files);
            }
        },
        [addFiles],
    );

    const openFileDialog = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, []);

    const reorderFiles = useCallback((fromIndex: number, toIndex: number) => {
        setState(prev => {
            const updated = reorder(prev.files, fromIndex, toIndex)
                .map((file, index) => ({
                    ...file,
                    order: index
                }));

            const reordered = normalizeOrder(updated);

            onFilesChange?.(reordered);

            return {
                ...prev,
                files: reordered
            }
        })
    }, [onFilesChange])

    const getInputProps = useCallback(
        (props: InputHTMLAttributes<HTMLInputElement> = {}) => {
            return {
                ...props,
                type: 'file' as const,
                onChange: handleFileChange,
                accept: props.accept || accept,
                multiple: props.multiple !== undefined ? props.multiple : multiple,
                ref: inputRef,
            };
        },
        [accept, multiple, handleFileChange],
    );

    const {
        mutate: updateAvatar,
        isPending: isUpdatingAvatar,
        isError: isUpdatingAvatarError,
        error: updateAvatarError,
        isSuccess: isUpdatingAvatarSuccess
    } = useMutation({
        mutationKey: ['update-avatar'],
        mutationFn: updateProfilePhoto,
        onSuccess: async () => {
            toast.success('Avatar updated successfully.');
            refetchUser();
        },
        onError: (error) => {
            console.error('Error updating avatar', error);
            toast('error updating avatar.', {
                description: error.message,
                icon: <Ban className="text-destructive mr-4" />,
            });
        }
    })

    return [
        state,
        {
            addFiles,
            removeFile,
            clearFiles,
            clearErrors,
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            handleFileChange,
            openFileDialog,
            getInputProps,
            getFilesForValidation,
            reorderFiles
        },
        {
            updateAvatar,
            isUpdatingAvatar,
            isUpdatingAvatarError,
            updateAvatarError,
            isUpdatingAvatarSuccess
        },
        {
            existingImages,
            newImages
        }
    ];
};

export const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Number.parseFloat((bytes / k ** i).toFixed(dm)) + sizes[i];
}

function reorder<T>(list: T[], from: number, to: number): T[] {
    const updated = [...list];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    return updated;
}

const normalizeOrder = (files: FileWithPreview[]) => files.map((f, index) => ({
    ...f,
    order: index
}))