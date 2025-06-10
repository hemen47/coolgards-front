import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import NextJsImage from './NextJsImage';

const ImageGalleryWithNextImage = ({ images, productTitle }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [open, setOpen] = useState(false);

  if (!images || images.length === 0) return null;

  // Prepare slides for the lightbox with proper dimensions
  // In production, you would likely have actual dimensions from your API
  const slides = images.map((src, index) => ({
    src,
    alt: `${productTitle} - Image ${index + 1} - CoolGards Cold Compression Therapy`,
    width: 1200, // Placeholder width - ideally from your image metadata
    height: 800, // Placeholder height - ideally from your image metadata
    caption: `${productTitle} - Image ${index + 1}`,
  }));

  return (
    <div className="product-gallery">
      {/* Main image container */}
      <div className="main-image-container relative w-full h-[450px]">
        <div className="w-full h-full cursor-zoom-in" onClick={() => setOpen(true)}>
          <Image
            src={images[currentImage]}
            alt={`${productTitle} - Image ${currentImage + 1} - CoolGards Cold Compression Therapy`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'contain' }}
            priority={currentImage === 0} // Load the first image with priority
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="thumbnails-container flex mt-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {' '}
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`relative min-w-[60px] w-[60px] h-[60px] flex-shrink-0 shadow-md mx-2 my-1 snap-center transition-transform duration-300 hover:scale-110 cursor-pointer ${
              currentImage === index ? 'border-2 border-blue-600' : ''
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1} for ${productTitle}`}
              fill
              sizes="60px"
              style={{ objectFit: 'cover' }}
              className="rounded"
              quality={100}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentImage}
        render={{ slide: NextJsImage }}
        plugins={[Zoom, Thumbnails, Captions]}
        carousel={{ preload: 3 }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
        }}
        thumbnails={{
          position: 'bottom',
          width: 120,
          height: 80,
          border: 2,
          borderRadius: 4,
          padding: 4,
          gap: 16,
        }}
        on={{
          view: ({ index }) => setCurrentImage(index),
        }}
      />
    </div>
  );
};

export default ImageGalleryWithNextImage;
