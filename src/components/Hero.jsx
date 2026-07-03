import '../styles/Hero.css';


function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <h1>
          Taste Happiness,<br />
          One Bite at a Time
        </h1>

        <p>
          Fresh ingredients, handcrafted meals, and unforgettable flavors
          delivered right to your doorstep.
        </p>

        <div className="hero-buttons">
          <button className="browse-btn"><a className='b-b' href='/menu'>
            Browse Menu</a>
          </button>

          <button className="special-btn">
            Today's Specials
          </button>
        </div>

      </div>

      <div className="hero-right">
        
      </div>

    </section>
  );
}

export default Hero;