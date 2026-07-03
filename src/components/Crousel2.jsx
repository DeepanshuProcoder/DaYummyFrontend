import img1 from '../assets/image1.png';
import img2 from '../assets/image2.png';
import img3 from '../assets/image3.png';
import '../styles/crousel2.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Carousel2({ className = "", delay = 0 }) {

    const slides = [
        {
            image: img1,
            caption: "The ultimate creamy, caffeinated cooldown in a cup.",
            link: "/menu"
        },
        {
            image: img2,
            caption: "Oozing with a warm, rich, liquid chocolate center.",
            link: "/menu"
        },
        {
            image: img3,
            caption: "A decadent, ring-shaped treat packed with cocoa goodness",
            link: "/menu"
        }
    ];

    const [current, setCurrent] = useState(1);

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
        setCurrent(prev =>
            prev === slides.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrent(prev =>
            prev === 0 ? slides.length - 1 : prev - 1
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

                        // ✅ FIXED (no className conflict)
                        let cardClass = "back-card";

                        if (index === current)
                            cardClass = "front-card";
                        else if (index === (current + 1) % slides.length)
                            cardClass = "middle-card";

                        return (

                            <Link
                                to={slide.link}
                                key={index}
                                className={cardClass}
                            >

                                <img
                                    src={slide.image}
                                    className="carousel-image"
                                    alt=""
                                />

                                <h2 className="carousel-caption">
                                    {slide.caption}
                                </h2>

                            </Link>

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

export default Carousel2;