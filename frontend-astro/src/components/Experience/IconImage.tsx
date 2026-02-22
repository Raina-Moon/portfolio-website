import React from "react";

interface IconImageProps {
  src: string;
  alt: string;
  className?: string;
}

const IconImage: React.FC<IconImageProps> = ({ src, alt, className }) => {
  const match = src.match(/^(\/.*)\.(png|jpe?g)$/i);

  if (match) {
    const base = match[1];
    return (
      <picture>
        <source srcSet={`${base}.avif`} type="image/avif" />
        <source srcSet={`${base}.webp`} type="image/webp" />
        <img src={src} alt={alt} className={className} />
      </picture>
    );
  }

  return <img src={src} alt={alt} className={className} />;
};

export default IconImage;
