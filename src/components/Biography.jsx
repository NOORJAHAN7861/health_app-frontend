import React from "react";

const Biography = ({ imageUrl }) => { 
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            'NOOR' Medical Institute is a state-of-the-art facility dedicated to
            providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to 
            delivering personalized care tailored to each patient's needs. At
            NOOR Medical Institute, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness.
          </p>
          
          <p>Everything should be fine, be healthy and safe!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
