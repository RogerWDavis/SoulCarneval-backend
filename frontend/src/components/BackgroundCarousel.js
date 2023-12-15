import React from "react";
import styles from "../styles/BackgroundCarousel.module.css";
import logo from "../assets/logo.jpg";
import logo2 from "../assets/logo2.jpg";
import logo3 from "../assets/logo3.jpg";
import logo4 from "../assets/logo4.jpg";
import logo5 from "../assets/logo5.jpg";
import logo6 from "../assets/logo6.jpg";
import logo7 from "../assets/logo7.jpg";

const BackgroundCarousel = () => {
  const backgroundImages = [logo, logo2, logo3, logo4, logo5, logo6, logo7];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  };

  const backgroundStyle = {
    backgroundImage: `url(${getRandomImage()})`,
  };

  return (
    <div className={styles.backgroundCarousel} style={backgroundStyle}>
    </div>
  );
};

export default BackgroundCarousel;
