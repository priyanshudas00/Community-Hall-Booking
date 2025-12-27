import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  showErrorState?: boolean;
}

export function ProgressiveImage({
  src,
  alt,
  className,
  fallbackSrc,
  showErrorState = true,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      // Try fallback image
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      // No fallback or fallback also failed
      setHasError(true);
      setIsLoaded(true);
    }
  }, [fallbackSrc, currentSrc]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-md flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Main image */}
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-out",
          isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-105"
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
        {...props}
      />

      {/* Error state */}
      {hasError && showErrorState && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center rounded-md">
          <div className="text-center p-4">
            <div className="text-muted-foreground text-sm mb-2">⚠️</div>
            <div className="text-muted-foreground text-xs">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
}