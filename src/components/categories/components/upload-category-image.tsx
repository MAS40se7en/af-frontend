import { type FileWithPreview } from '@/hooks/use-file-upload';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CloudUpload, ImageIcon, TriangleAlert, Upload, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, type DragEvent, type InputHTMLAttributes } from 'react';
import { FieldError } from '@/components/ui/field';

interface CoverUploadProps {
  file: FileWithPreview | null;
  previewUrl: string | null; // 👈 fully computed by parent
  errors: string[];
  onRemoveFile: () => void;
  onRemoveExistingImage?: () => void;
  getInputProps: (props?: InputHTMLAttributes<HTMLInputElement>) =>
    InputHTMLAttributes<HTMLInputElement> & {
      ref: React.Ref<HTMLInputElement>;
    };
  className?: string;
  isDragging: boolean;
  handleDragEnter: (e: DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLElement>) => void;
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  openFileDialog: () => void;
  rhfFileError?: string;
}

export default function UploadCategoryImage({
  file,
  previewUrl,
  errors,
  onRemoveFile,
  onRemoveExistingImage,
  getInputProps,
  className,
  isDragging,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  openFileDialog,
  rhfFileError
}: CoverUploadProps) {

  const [imageLoading, setImageLoading] = useState(true);

  const hasImage = Boolean(previewUrl);

  useEffect(() => {
    if (previewUrl) {
      setImageLoading(true);
    }
  }, [previewUrl]);

  const removeCoverImage = () => {
    if (file) {
      onRemoveFile();
    } else if (onRemoveExistingImage) {
      onRemoveExistingImage();
    }

    setImageLoading(false);
  };

  return (
    <div className={cn('w-full space-y-3', className)}>
      <div
        className={cn(
          'group relative overflow-hidden rounded-xl transition-all duration-200 border border-border',
          isDragging
            ? 'border-dashed border-primary bg-primary/5'
            : hasImage
              ? 'border-border bg-background hover:border-primary/50'
              : 'border-dashed border-muted-foreground/25 bg-muted/30 hover:border-primary hover:bg-primary/5',
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input {...getInputProps()} className="sr-only" />

        {hasImage ? (
          <div className="relative aspect-21/9 w-full">
            {imageLoading && (
              <div className="absolute inset-0 animate-pulse bg-muted flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImageIcon className="size-5" />
                  <span className="text-sm">Loading image...</span>
                </div>
              </div>
            )}

            <img
              src={previewUrl ?? undefined}
              alt="Cover"
              className={cn(
                'h-full w-full object-cover transition-opacity duration-300',
                imageLoading ? 'opacity-0' : 'opacity-100',
              )}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />

            <div className="absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/40" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="flex gap-2">
                <Button
                  onClick={openFileDialog}
                  type='button'
                  variant="secondary"
                  size="sm"
                  className="bg-white/90 text-gray-900 hover:bg-white"
                >
                  <Upload />
                  Change Cover
                </Button>
                <Button
                type='button'
                  onClick={removeCoverImage}
                  variant="destructive"
                  size="sm"
                >
                  <XIcon />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex h-50 w-full cursor-pointer flex-col items-center justify-center gap-4 p-8 text-center"
            onClick={openFileDialog}
          >
            <div className="rounded-full bg-primary/10 p-4">
              <CloudUpload className="size-8 text-primary" />
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Drag and drop an image here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Recommended size: 1200x514px • Max size: 5MB
              </p>
            </div>

            <Button type='button' variant="outline" size="sm">
              <ImageIcon />
              Browse Files
            </Button>
          </div>
        )}
      </div>

      {rhfFileError && (
        <FieldError errors={[{ message: rhfFileError }]} />
      )}

      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-5">
          <AlertTitle><TriangleAlert />File upload error(s)</AlertTitle>
          <AlertDescription>
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <div className="rounded-lg bg-muted/50 p-4">
        <h4 className="mb-2 text-sm font-medium">Category Image Guidelines</h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• Recommended image size: 1600 × 900 px (16:9)</li>
          <li>• Keep important content centered</li>
          <li>• Avoid text near edges</li>
          <li>• Supported formats: JPG, PNG, WebP</li>
        </ul>
      </div>
    </div>
  );
}
