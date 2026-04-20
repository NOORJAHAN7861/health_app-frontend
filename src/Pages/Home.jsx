import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <section id="hero" className="section hero-section">
        <Hero
          title="Welcome to NOOR Medical Institute | Your Trusted Healthcare Provider"
          imageUrl="/hero.png"
        />
      </section>

      <section id="biography" className="section biography-section">
        <Biography imageUrl="/hospital.png" />
      </section>

      <section id="departments" className="section departments-section">
        <Departments />
      </section>

      <section id="contact" className="section contact-section">
        <MessageForm />
      </section>
    </>
  );
};

export default Home;

