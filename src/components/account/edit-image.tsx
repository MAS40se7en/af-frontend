import { useEffect, useState } from "react";
import { ImageIcon, Upload, User } from "lucide-react";
import { useFileUpload, type FileWithPreview } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AvatarUploadProps {
    image: string | null;
    maxSize?: number;
    className?: string;
    onFileChange?: (file: FileWithPreview | null) => void;
    setDrawerOpen?: (open: boolean) => void;
}

function EditImage({ image, maxSize, onFileChange, setDrawerOpen }: AvatarUploadProps) {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    const imgSrc = image || '/AF.png';

    const handleFileUploadChange = (currentFiles: FileWithPreview[]) => {
        const file = currentFiles[0] || null;

        if (file) {
            setSelectedImage(file.preview);
        } else {
            setSelectedImage(undefined);
        }

        onFileChange?.(file);
    }

    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage);
            }
        }
    }, [selectedImage]);

    const [
        { files, isDragging, errors },
        {
            clearFiles,
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            getInputProps,
        },
        {
            updateAvatar,
            isUpdatingAvatar,
            isUpdatingAvatarSuccess
        }
    ] = useFileUpload({
        maxFiles: 1,
        maxSize,
        accept: 'image/*',
        multiple: false,
        initialFiles: [],
        onFilesChange: handleFileUploadChange,
    });

    useEffect(() => {
    if (isUpdatingAvatarSuccess) {
        clearFiles();
        setSelectedImage(undefined);
        setDrawerOpen?.(false);
    }
}, [isUpdatingAvatarSuccess, clearFiles, setDrawerOpen]);


    const previewUrl = selectedImage || imgSrc;
    const userHasImage = !!image || !!selectedImage;

    const handleUpload = () => {
        if (files.length === 0) {
            return;
        }

        updateAvatar(files[0].file);
    }


    return (
        <div className="my-5 flex gap-8 items-center justify-center">
            <div className="size-80 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-10 size-80">
                    {userHasImage ? (
                        <img
                            src={previewUrl}
                            alt="avatar-image"
                            className="w-full h-full object-cover rounded-md" />
                    ) : (
                        <div className="size-80 relative overflow-hidden bg-stone-300 dark:bg-stone-700 rounded-md">
                            <User className="size-80 text-muted-foreground" />
                        </div>
                    )}
                </div>
                <div className="absolute inset-0 size-80 z-50 flex items-center justify-center rounded-lg overflow-hidden">
                    <div className="size-80 border-3 rounded-full bg-opacity-0 shadow-xl" />
                </div>
            </div>

            <div>
                <h2 className="text-xl">
                    Update your profile image
                </h2>
                <p className="text-muted-foreground">Make sure the image fits the circular style of the website avatars.</p>

                <div
                    className={cn(
                        'relative rounded-lg border border-dashed p-8 text-center transition-colors max-h-64',
                        isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50',
                    )}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input {...getInputProps()} className="sr-only" />

                    <div className="flex flex-col items-center gap-4">
                        <div
                            className={cn(
                                'flex h-16 w-16 items-center justify-center rounded-full',
                                isDragging ? 'bg-primary/10' : 'bg-muted',
                            )}
                        >
                            <ImageIcon className={cn('h-5 w-5', isDragging ? 'text-primary' : 'text-muted-foreground')} />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Upload image</h3>
                            <p className="text-sm text-muted-foreground">Drag and drop images here or click to browse</p>
                            <p className="text-xs text-muted-foreground">
                                PNG, JPG, GIF up to 2MB each (max 1 file)
                            </p>
                        </div>

                        <Button variant="outline" onClick={openFileDialog}>
                            <Upload className="h-4 w-4" />
                            Select images
                        </Button>
                    </div>

                    {errors.length > 0 && <p className="text-red-500 mt-2">{errors[0]}</p>}

                </div>
                <div className="flex gap-3 mt-2">
                    <Button 
                        variant="destructive" 
                        onClick={() => clearFiles()}
                        className=""
                    >
                        Clear
                    </Button>
                    <Button 
                        variant="secondary"
                        className="flex-1"
                        onClick={handleUpload}
                        disabled={isUpdatingAvatar}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditImage