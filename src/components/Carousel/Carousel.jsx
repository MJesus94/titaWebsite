import "./Carousel.css";

import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState(slides[0].title);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const timerRef = useRef(null);
  const navigate = useNavigate();
  const handleSlideClick = (title) => {
    if (title === "Pincéis") {
      navigate("/Pinceis");
    } else {
      navigate(`/${title}`);
    }
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setTitle(slides[newIndex].title);
  };

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setTitle(slides[newIndex].title);
  }, [currentIndex, slides]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    setTitle(slides[slideIndex].title);
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.changedTouches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setTouchEndX(event.changedTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      if (touchEndX < touchStartX) {
        goToNext();
      } else if (touchEndX > touchStartX) {
        goToPrevious();
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const slideStyle = (slideIndex) => ({
    backgroundImage: `url(${slides[slideIndex].url})`,
  });

  const getSlidesContainerWidth = () => {
    let containerWidth = "";
    let containerTransform = "";
    const viewportWidth = window.innerWidth;

    if (viewportWidth < 1025) {
      containerWidth = `${slides.length * viewportWidth}px`;
      containerTransform = `translateX(${-(currentIndex * viewportWidth)}px)`;
    } else {
      containerWidth = `${slides.length * 75}vw`;
      containerTransform = `translateX(${-(currentIndex * 75)}vw)`;
    }

    return {
      width: containerWidth,
      transform: containerTransform,
    };
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, [goToNext]);

  return (
    <div
      className="slideContainer"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="leftArrow" onClick={goToPrevious}>
        ❰
      </div>
      <div className="rightArrow" onClick={goToNext}>
        ❱
      </div>
      <div className="slideOverflow">
        <div className="slideShowContainer" style={getSlidesContainerWidth()}>
          {slides.map((_, slideIndex) => (
            <div
              className="slideShow"
              key={slideIndex}
              style={slideStyle(slideIndex)}
              onClick={() => {
                handleSlideClick(_.title);
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="dashContainer">
        {slides.map((slide, slideIndex) => (
          <div
            className="dashes"
            key={slideIndex}
            onClick={() => {
              goToSlide(slideIndex);
            }}
          >
            ‒
          </div>
        ))}
      </div>
      <h3
        className="title"
        onClick={() => {
          handleSlideClick(title);
        }}
      >
        {title}
      </h3>
    </div>
  );
}

export default Carousel;
