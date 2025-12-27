import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export function ProgressiveImage({
  src,
  alt,
  className,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-md" />
      )}

      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-500",
          isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Failed to load image</div>
        </div>
      )}
    </div>
  );
}