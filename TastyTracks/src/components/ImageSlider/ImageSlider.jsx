import React, { useEffect } from 'react'
import './ImageSlider.css'
import { useState } from 'react'



const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    let timeOut=null;

    useEffect(() => {
        if (autoPlay) {
            timeOut = setTimeout(() => {
                nextSlide();
            }, 10000);
        }
    
        return () => {
            clearTimeout(timeOut);
        };
    }, [autoPlay, currentIndex]); 
    

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="ImageSlider" style={{ backgroundImage: `url(${slides[currentIndex]})`,backgroundRepeat: 'no-repeat' }}>
            <button onClick={prevSlide} className='leftarrow'>&lsaquo;</button>
            <button onClick={nextSlide} className='rightarrow'>&rsaquo;</button>
            <div className='slider-pagination'>
                {
                    slides.map((slide, index) => (
                        <div key={index} className={index === currentIndex ? 'pagination_dot pagination_dot-active' : 'pagination_dot'}
                        onClick={() => setCurrentIndex(index)}>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ImageSlider
