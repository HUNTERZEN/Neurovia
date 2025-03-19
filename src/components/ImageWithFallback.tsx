import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageWithFallback({ src, alt, className = '' }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className={`bg-gray-700 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      onError={handleError}
    />
  );
} 