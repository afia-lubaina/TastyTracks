import React from 'react';
import Slider from 'react-slick';
import './SlickSlider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SlickSlider = ({ slides }) => {
    const settings = {
        dots: true,
        speed: 1000,
        centerPadding: '60px',
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 10000,
        arrows:true
    };

    return (
        <div className="content">
            <div className="container">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index}>
                            <div className="img-body">
                                <img src={slide} alt={`Slide ${index}`} />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default SlickSlider;
