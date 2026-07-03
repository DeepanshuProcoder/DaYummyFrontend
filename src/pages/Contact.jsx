import "../styles/Contact.css";
import aboutHero from "../assets/about-hero.png";
import { useState } from "react";

import axios from "axios";

function Contact() {
const [name, setName] = useState("");

const [email, setEmail] = useState("");

const [phone, setPhone] = useState("");
const API_URL = import.meta.env.VITE_API_URL;
const [subject, setSubject] = useState("");

const [message, setMessage] = useState("");

const [sending, setSending] = useState(false);
const sendMessage = async () => {

    try{

        setSending(true);

        const res = await axios.post(

            `${API_URL}/api/contact`,

            {

                name,

                email,

                phone,

                subject,

                message

            }

        );

        alert(res.data.message);

        setName("");

        setEmail("");

        setPhone("");

        setSubject("");

        setMessage("");

    }

    catch(err){

        alert(

            err.response?.data?.message ||

            "Unable to send message."

        );

    }

    finally{

        setSending(false);

    }

};
    return (

        <div className="contact-page">

            {/* HERO */}

            <section
                className="about-hero"
                style={{
                    backgroundImage: `url(${aboutHero})`
                }}
            >

                <div className="contact-overlay">

                    <h1>

                        📞 Contact DA YUMMY

                    </h1>

                    <p>

                        We'd love to hear from you.

                    </p>

                </div>

            </section>

            {/* CONTACT */}

            <section className="contact-container">

                {/* LEFT */}

                <div className="contact-info">

                    <h2>

                        Get In Touch

                    </h2>

                    <div className="info-card">

                        <h3>📍 Address</h3>

                        <p>

                            Kota, Rajasthan, India

                        </p>

                    </div>

                    <div className="info-card">

                        <h3>📞 Phone</h3>

                        <p>

                            +91 98765 43210

                        </p>

                    </div>

                    <div className="info-card">

                        <h3>📧 Email</h3>

                        <p>

                            support@dayummy.com

                        </p>

                    </div>

                    <div className="info-card">

                        <h3>🕒 Opening Hours</h3>

                        <p>

                            Everyday

                            <br />

                            10:00 AM - 11:00 PM

                        </p>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="contact-form">

                    <h2>

                        Send Message

                    </h2>

                    <input
    placeholder="Full Name"
    value={name}
    onChange={(e)=>setName(e.target.value)}
/>

                   <input
    placeholder="Email Address"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
/>

                    <input
    placeholder="Phone Number"
    value={phone}
    onChange={(e)=>setPhone(e.target.value)}
/>

                   <input
    placeholder="Subject"
    value={subject}
    onChange={(e)=>setSubject(e.target.value)}
/>
<textarea
    placeholder="Write your message..."
    value={message}
    onChange={(e)=>setMessage(e.target.value)}
></textarea>

                   <button

    onClick={sendMessage}

    disabled={sending}

>

    {

        sending

        ?

        "Sending..."

        :

        "Send Message"

    }

</button>

                </div>

            </section>
            {/* ================= MAP ================= */}

            {/* ================= MAP ================= */}

<section className="map-section">

    <h2>📍 Visit DA YUMMY</h2>

    <p className="map-subtitle">
        Maa Urmila Residency, Kota, Rajasthan
    </p>

    <iframe
        title="DA YUMMY Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3433.3964898453883!2d75.84323797516124!3d25.131591677753185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f857a45f8466f%3A0x8d3e8f4476755e64!2sMaa%20Urmila%20Residency%20(One%20BHK%20flats)!5e1!3m2!1sen!2sin!4v1782886982005!5m2!1sen!2sin"
        width="100%"
        height="520"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
    ></iframe>

</section>
        </div>

    );

}

export default Contact;