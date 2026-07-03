import img1 from '../assets/CrouselImg1(chowmein).png';
import img2 from '../assets/CrouselImg2(ButterPannerMasalaWithNaan).png';
import img3 from '../assets/CrouselImg3(Pizza).png';
import '../styles/crouselfoodhero.css';
import { useEffect, useState } from 'react';

function CarouselFoodHero({ className = "",delay=0 }) {

    const slides = [
        {
            image: img1,
            caption: "Fiery Flavors That Keep You Craving",
            link: "/menu"
        },
        {
            image: img2,
            caption: "Authentic Taste Crafted With Passion",
            link: "/menu"
        },
        {
            image: img3,
            caption: "Cheesy Delights For Every Occasion",
            link: "/menu"
        }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {

        let interval;

        const timeout = setTimeout(() => {

            interval = setInterval(() => {
                setCurrent(prev =>
                    prev === slides.length - 1 ? 0 : prev + 1
                );
            }, 3000);

        }, delay);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };

    }, []);

    const nextSlide = () => {

        setCurrent(
            current === slides.length - 1 ? 0 : current + 1
        );

    };

    const prevSlide = () => {

        setCurrent(
            current === 0 ? slides.length - 1 : current - 1
        );

    };

    return (

        <div className={`carousel-container ${className}`}>

            <button className="prev-btn" onClick={prevSlide}>
                &#10094;
            </button>

            <div className="slide">

                <div className="card-stack">

                    {slides.map((slide, index) => {

                        let className = "back-card";

                        if (index === current)
                            className = "front-card";

                        else if (index === (current + 1) % slides.length)
                            className = "middle-card";

                        return (

                            <a
                                href={slide.link}
                                key={index}
                                className={className}
                            >

                                <img
                                    src={slide.image}
                                    className="carousel-image"
                                    alt=""
                                />

                                <h2 className="carousel-caption">
                                    {slide.caption}
                                </h2>

                            </a>

                        );

                    })}

                </div>

                <div className="dots">

                    {slides.map((_, index) => (

                        <span
                            key={index}
                            className={
                                current === index
                                    ? "dot active-dot"
                                    : "dot"
                            }
                            onClick={() => setCurrent(index)}
                        >

                        </span>

                    ))}

                </div>

            </div>

            <button className="next-btn" onClick={nextSlide}>
                &#10095;
            </button>

        </div>

    );
}

export default CarouselFoodHero;