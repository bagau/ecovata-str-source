import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./LocalGallery.css";

interface LocalGalleryProps {
  images: string[];
  className?: string;
}

const LocalGallery: React.FC<LocalGalleryProps> = ({
  images,
  className = "",
}) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (imagePath: string) => {
    setImageErrors((prev) => new Set(prev).add(imagePath));
  };

  const handleImageClick = (index: number) => {
    setStartIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  if (images.length === 0) {
    return (
      <div className={`gallery-error ${className}`}>
        <p>❌ Галерея пуста</p>
      </div>
    );
  }

  // Подготавливаем данные для react-image-gallery
  const galleryItems = images
    .filter((imagePath) => !imageErrors.has(imagePath))
    .map((imagePath, index) => ({
      original: imagePath,
      thumbnail: imagePath,
      originalAlt: `Фото ${index + 1}`,
      thumbnailAlt: `Фото ${index + 1}`,
    }));

  return (
    <div className={`local-gallery ${className}`}>
      {/* Сетка превьюшек */}
      <div className="photo-grid">
        {images.map((imagePath, index) => {
          const hasError = imageErrors.has(imagePath);

          return (
            <div key={imagePath} className="photo-item">
              {hasError ? (
                <div className="photo-placeholder error">
                  <div className="photo-content">
                    <div className="photo-icon">❌</div>
                    <div className="photo-text">Ошибка загрузки</div>
                  </div>
                </div>
              ) : (
                <button
                  className="photo-button"
                  onClick={() => handleImageClick(index)}
                  title={`Фото ${index + 1}`}
                >
                  <img
                    src={imagePath}
                    alt={`Фото ${index + 1}`}
                    loading="lazy"
                    onError={() => handleImageError(imagePath)}
                  />
                  <div className="photo-overlay">
                    <div className="overlay-icon">🔍</div>
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Модальная галерея */}
      {isGalleryOpen && galleryItems.length > 0 && (
        <div className="gallery-modal">
          <div className="gallery-modal-content">
            <button className="gallery-close" onClick={closeGallery}>
              ✕
            </button>
            <ImageGallery
              items={galleryItems}
              startIndex={startIndex}
              showThumbnails={true}
              showFullscreenButton={true}
              showPlayButton={false}
              showBullets={galleryItems.length > 1}
              showNav={galleryItems.length > 1}
              slideDuration={300}
              slideInterval={3000}
              additionalClass="custom-gallery"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalGallery;
