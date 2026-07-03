import aboutHero from "../assets/about-hero.png";
import streetphoto from "../assets/street.png";
import "../styles/About.css";
import { useNavigate } from "react-router-dom";
import {
    FaTruckFast,
    FaLeaf,
    FaHeart,
    FaIndianRupeeSign,
    FaUserTie,
    FaHeadset,
    FaBullseye,
    FaHandshake,
    FaStar
} from "react-icons/fa6";

function About() {

    const navigate = useNavigate();

    return (

        <div className="about-page">

            {/* ================= HERO ================= */}

            <section
    className="about-hero"
    style={{
        backgroundImage: `url(${aboutHero})`
    }}
>

                <div className="hero-overlay">

                    <h1>

                        🍕 DA YUMMY

                    </h1>

                    <h2>

                        Every Bite Tells A Story

                    </h2>

                    <p>

                        Fresh Food • Fast Delivery • Made With Love

                    </p>

                    <button

                        className="hero-btn"

                        onClick={() => navigate("/menu")}

                    >

                        🍔 Explore Menu

                    </button>

                </div>

            </section>

            {/* ================= ABOUT ================= */}

            <section className="about-section">

                <div className="about-image">

                    <img

                        src={streetphoto}

                        alt="DA YUMMY"

                    />

                </div>

                <div className="about-content">

                    <span>

                        ABOUT US

                    </span>

                    <h2>

                        Welcome To DA YUMMY

                    </h2>

                    <p>

                        DA YUMMY is your destination for delicious meals,

                        refreshing beverages and unforgettable taste.

                        Every order is prepared using fresh ingredients

                        and delivered quickly so that every customer

                        enjoys restaurant-quality food at home.

                    </p>

                    <p>

                        Whether it's pizza, burgers, desserts or beverages,

                        our mission is simple —

                        make every bite memorable.

                    </p>

                </div>

            </section>

            {/* ================= FEATURES ================= */}

            <section className="features-section">

                <h2>

                    Why Choose DA YUMMY?

                </h2>

                <div className="features-grid">
                    {/* ================= CARD 1 ================= */}

                    <div className="feature-card">

                        <div className="feature-icon">

                            <FaTruckFast />

                        </div>

                        <h3>

                            Lightning Fast Delivery

                        </h3>

                        <p>

                            Hot and fresh meals delivered to your doorstep in under 30 minutes.

                        </p>

                    </div>

                    {/* ================= CARD 2 ================= */}

                    <div className="feature-card">

                        <div className="feature-icon">

                            <FaLeaf />

                        </div>

                        <h3>

                            Fresh Ingredients

                        </h3>

                        <p>

                            Every dish is prepared only after you order using premium quality ingredients.

                        </p>

                    </div>

                    {/* ================= CARD 3 ================= */}

                    <div className="feature-card">

                        <div className="feature-icon">

                            <FaHeart />

                        </div>

                        <h3>

                            Made With Love

                        </h3>

                        <p>

                            Every recipe is crafted with passion to deliver unforgettable flavours.

                        </p>

                    </div>

                    {/* ================= CARD 4 ================= */}

                    <div className="feature-card">

                        <div className="feature-icon">

                            <FaIndianRupeeSign />

                        </div>

                        <h3>

                            Affordable Prices

                        </h3>

                        <p>

                            Premium taste, generous portions and prices that everyone can enjoy.

                        </p>

                    </div>

                </div>

            </section>

            {/* ================= STATISTICS ================= */}

            <section className="stats-section">

                <div className="stat-card">

                    <h1>

                        15K+

                    </h1>

                    <p>

                        Orders Delivered

                    </p>

                </div>

                <div className="stat-card">

                    <h1>

                        5K+

                    </h1>

                    <p>

                        Happy Customers

                    </p>

                </div>

                <div className="stat-card">

                    <h1>

                        100+

                    </h1>

                    <p>

                        Delicious Menu Items

                    </p>

                </div>

                <div className="stat-card">

                    <h1>

                        <FaStar /> 4.9
                    </h1>

                    <p>

                        Customer Rating

                    </p>

                </div>

            </section>

            {/* ================= TEAM ================= */}

            <section className="team-section">

                <h2>

                    Meet Our Team

                </h2>

                <div className="team-grid">
                    {/* ================= TEAM MEMBER 1 ================= */}

                    <div className="team-card">

                        <div className="team-avatar">

                            <FaUserTie />

                        </div>

                        <h3>

                            Head Chef

                        </h3>

                        <p>

                            Master of flavours who ensures every meal is fresh, delicious and unforgettable.

                        </p>

                    </div>

                    {/* ================= TEAM MEMBER 2 ================= */}

                    <div className="team-card">

                        <div className="team-avatar">

                            <FaTruckFast />

                        </div>

                        <h3>

                            Delivery Team

                        </h3>

                        <p>

                            Dedicated professionals delivering every order quickly, safely and with care.

                        </p>

                    </div>

                    {/* ================= TEAM MEMBER 3 ================= */}

                    <div className="team-card">

                        <div className="team-avatar">

                            <FaHeadset />

                        </div>

                        <h3>

                            Customer Support

                        </h3>

                        <p>

                            Always available to assist you and make your experience smooth and enjoyable.

                        </p>

                    </div>

                </div>

            </section>

            {/* ================= MISSION & VISION ================= */}

            <section className="mission-section">

                <div className="mission-card">

                    <div className="mission-icon">

                        <FaBullseye />

                    </div>

                    <h2>

                        Our Mission

                    </h2>

                    <p>

                        To serve fresh, delicious and affordable food while providing fast delivery and exceptional customer service every single day.

                    </p>

                </div>

                <div className="mission-card">

                    <div className="mission-icon">

                        🌍

                    </div>

                    <h2>

                        Our Vision

                    </h2>

                    <p>

                        To become India's most trusted and loved online food destination by delivering quality, innovation and happiness.

                    </p>

                </div>

                <div className="mission-card">

                    <div className="mission-icon">

                        <FaHandshake />

                    </div>

                    <h2>

                        Our Promise

                    </h2>

                    <p>

                        Fresh ingredients, hygienic preparation, quick delivery and a memorable dining experience with every order.

                    </p>

                </div>

            </section>

            {/* ================= CALL TO ACTION ================= */}

            <section className="cta-section">

                <h2>

                    Hungry Already?

                </h2>

                <p>

                    Explore hundreds of delicious dishes and satisfy your cravings today.

                </p>

                <button

                    className="cta-btn"

                    onClick={() => navigate("/menu")}

                >

                    🍕 Order Now

                </button>

            </section>

            {/* ================= FOOTER ================= */}

            <footer className="about-footer">

                <h2>

                    🍕 DA YUMMY

                </h2>

                <p>

                    Fresh Food • Fast Delivery • Great Experience

                </p>

                <p>

                    © 2026 DA YUMMY. All Rights Reserved.

                </p>

            </footer>

        </div>

    );

}

export default About;