import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import "../css/slider.css";

export function ImageSlider({ images }) {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className='slider'>
      {/* Nawigacyjne punkty (dots) */}
      <div className='slider-dots'>
        {images.map((_, index) => (
          <button
            key={index}
            className={`img-slider-dot-btn ${
              index === imageIndex ? "active" : ""
            }`}
            onClick={() => setImageIndex(index)}
            aria-label={`Slide ${index + 1}`}
          >
            {index === imageIndex ? <CircleDot /> : <Circle />}
          </button>
        ))}
      </div>

      {/* Przycisk poprzedni */}
      <button
        className='img-slider-btn left'
        onClick={showPrevImage}
        aria-label='Previous Image'
      >
        <ArrowBigLeft />
      </button>

      {/* Kontener obrazów */}
      <div className='slider-container'>
        <div
          className='slider-inner'
          style={{
            transform: `translateX(-${imageIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={image.name}
              src={image.ph}
              alt={image.name}
              className='img-slider-img'
            />
          ))}
        </div>
      </div>

      {/* Przycisk następny */}
      <button
        className='img-slider-btn right'
        onClick={showNextImage}
        aria-label='Next Image'
      >
        <ArrowBigRight />
      </button>

      {/* Informacje o obrazie */}
      <p className='here'>{images[imageIndex]?.name || "Unnamed Image"}</p>
      <p className='storys'>
        {images[imageIndex]?.story || "No story available"}
      </p>
    </section>
  );
}
