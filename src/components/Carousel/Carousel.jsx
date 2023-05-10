/* import "./Carousel.css";

import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";

function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState(slides[0].title);

  const timerRef = useRef(null);

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

  const getSlideStyles = (slideIndex) => ({
    backgroundImage: `url(${slides[slideIndex].url})`,
  });

  const getSlidesContainerWidth =() => ({
    width: `${slides.length * 75}vw`,
    transform: `translateX(${-(currentIndex * 75)}vw)`
  }) 

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 3000);

    return () => clearTimeout(timerRef.current);
  }, [goToNext]);

  return (
    <div className="slideContainer">
      <div className="leftArrow" onClick={goToPrevious}>
        ❰
      </div>
      <div className="rightArrow" onClick={goToNext}>
        ❱
      </div>
      <div className="slideShowContainer">
        {slides.map((_, slideIndex) => (
          <div
            className="slideShow"
            key={slideIndex}
            style={getSlideStyles(slideIndex)}
          ></div>
        ))}
      </div>
      <div className="dashContainer">
        {slides.map((slide, slideIndex) => (
          <div
            className="dashes"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ‒
          </div>
        ))}
      </div>
      <h3 className="title">{title}</h3>
    </div>
  );
}

export default Carousel;
 */

import "./Carousel.css";

import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";

function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState(slides[0].title);

  const timerRef = useRef(null);

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
  const slideStyle = (slideIndex) => ({
    backgroundImage: `url(${slides[slideIndex].url})`,
  });

  const getSlidesContainerWidth = () => ({
    width: `${slides.length * 75}vw`,
    transform: `translateX(${-(currentIndex * 75)}vw)`,
  });

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
    <div className="slideContainer">
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
            ></div>
          ))}
        </div>
      </div>
      <div className="dashContainer">
        {slides.map((slide, slideIndex) => (
          <div
            className="dashes"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ‒
          </div>
        ))}
      </div>
      <h3 className="title">{title}</h3>
    </div>
  );
}

export default Carousel;
