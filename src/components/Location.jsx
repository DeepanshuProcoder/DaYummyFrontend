import { useState, useEffect } from "react";

function Location() {

    const [location, setLocation] = useState("Kota, Rajasthan");

    // 🔁 LOAD saved location
    useEffect(() => {
        const saved = localStorage.getItem("userLocation");
        if (saved) setLocation(saved);
    }, []);

    // 💾 SAVE location
    useEffect(() => {
        localStorage.setItem("userLocation", location);
    }, [location]);

    const getLocation = () => {

        navigator.geolocation.getCurrentPosition(
            async (position) => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const API_KEY = "c6abc182d792461da4d6d3af7c8ab7fd";

                const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}`;

                try {
                    const res = await fetch(url);
                    const data = await res.json();

                    const comp = data.results[0].components;

                    // 🔥 CLEAN LOCATION LOGIC
                    const road = comp.road && comp.road !== "unnamed road"
                        ? comp.road
                        : null;

                    const area = comp.suburb || comp.neighbourhood || comp.village;
                    const city = comp.city || comp.town || comp.village;
                    const state = comp.state;

                    let fullLocation;

                    if (road) {
                        fullLocation = `${road}, ${city}, ${state}`;
                    } else if (area) {
                        fullLocation = `${area}, ${city}, ${state}`;
                    } else {
                        fullLocation = `${city}, ${state}`;
                    }

                    setLocation(fullLocation);

                } catch (err) {
                    console.log(err);
                    setLocation("Error ❌");
                }

            },
            () => {
                setLocation("Permission denied ❌");
            },
            { enableHighAccuracy: true }
        );
    };

    return (
        <button onClick={getLocation} className="location-btn">
            📍 {location}
        </button>
    );
}

export default Location;