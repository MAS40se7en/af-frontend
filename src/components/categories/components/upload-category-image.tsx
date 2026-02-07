import { type FileWithPreview } from '@/hooks/use-file-upload';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CloudUpload, ImageIcon, TriangleAlert, Upload, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, type DragEvent, type InputHTMLAttributes } from 'react';

interface CoverUploadProps {
  file: FileWithPreview | null;
  errors: string[];
  onRemoveFile: () => void;
  getInputProps: (props?: InputHTMLAttributes<HTMLInputElement>) => InputHTMLAttributes<HTMLInputElement> & {
          ref: React.Ref<HTMLInputElement>;
      };
  className?: string;
  isDragging: boolean;
  handleDragEnter: (e: DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLElement>) => void;
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  openFileDialog: () => void;
}

export default function UploadCategoryImage({
  file,
  errors,
  onRemoveFile,
  getInputProps,
  className,
  isDragging,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  openFileDialog
}: CoverUploadProps) {

  const [imageLoading, setImageLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Simulate upload progress
  const simulateUpload = () => {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Simulate occasional upload failure (10% chance)
          if (Math.random() < 0.1) {
            setUploadError('Upload failed. Please try again.');
            return 0;
          }

          return 100;
        }

        // Random progress increment between 5-15%
        const increment = Math.random() * 10 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);
  };

  const removeCoverImage = () => {
    onRemoveFile();
    setImageLoading(false);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadError(null);
  };

  const retryUpload = () => {
    if (file) {
      setUploadError(null);
      setIsUploading(true);
      setUploadProgress(0);
      simulateUpload();
    }
  };

  const hasImage = !!file?.preview;

  return (
    <div className={cn('w-full space-y-3', className)}>
      {/* Cover Upload Area */}
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
        {/* Hidden file input */}
        <input {...getInputProps()} className="sr-only" />

        {hasImage ? (
          <>
            {/* Cover Image Display */}
            <div className="relative aspect-21/9 w-full">
              {/* Loading placeholder */}
              {imageLoading && (
                <div className="absolute inset-0 animate-pulse bg-muted flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="size-5" />
                    <span className="text-sm">Loading image...</span>
                  </div>
                </div>
              )}

              {/* Actual image */}
              <img
                src={file.preview}
                alt="Cover"
                className={cn(
                  'h-full w-full object-cover transition-opacity duration-300',
                  imageLoading ? 'opacity-0' : 'opacity-100',
                )}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/40" />

              {/* Action buttons overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button
                    onClick={openFileDialog}
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 text-gray-900 hover:bg-white"
                  >
                    <Upload />
                    Change Cover
                  </Button>
                  <Button onClick={removeCoverImage} variant="destructive" size="sm">
                    <XIcon />
                    Remove
                  </Button>
                </div>
              </div>

              {/* Upload progress */}
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="relative">
                    <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-white/20"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - uploadProgress / 100)}`}
                        className="text-white transition-all duration-300"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">{Math.round(uploadProgress)}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Empty State */
          <div
            className="flex h-50 w-full cursor-pointer flex-col items-center justify-center gap-4 p-8 text-center"
            onClick={openFileDialog}
          >
            <div className="rounded-full bg-primary/10 p-4">
              <CloudUpload className="size-8 text-primary" />
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Drag and drop an image here, or click to browse</p>
              <p className="text-xs text-muted-foreground">Recommended size: 1200x514px • Max size: 5MB</p>
            </div>

            <Button variant="outline" size="sm">
              <ImageIcon />
              Browse Files
            </Button>
          </div>
        )}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-5">
            <AlertTitle><TriangleAlert />File upload error(s)</AlertTitle>
            <AlertDescription>
              {errors.map((error, index) => (
                <p key={index} className="last:mb-0">
                  {error}
                </p>
              ))}
            </AlertDescription>
        </Alert>
      )}

      {/* Upload Error */}
      {uploadError && (
        <Alert variant="destructive" className="mt-5">
            <AlertTitle><TriangleAlert />Upload failed</AlertTitle>
            <AlertDescription>
              <p>{uploadError}</p>
              <Button onClick={retryUpload} size="sm">
                Retry Upload
              </Button>
            </AlertDescription>
        </Alert>
      )}

      {/* Upload Tips */}
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
