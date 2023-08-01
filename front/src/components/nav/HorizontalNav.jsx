import React from 'react';
import "./horizontalNav.css";
import Logo from "../assets/logo.png";

const HorizontalNav = () => {
  return (
    <>
      <nav className='horizontalNav_container'>
        <ul className='list_horizontalNav'>
          <li className='element_img_horizontalNav'><img src={Logo} alt="sportsee's logo" className='img_horizontalNav'/></li>
          <li className='element_horizontalNav'>Accueil</li>
          <li className='element_horizontalNav'>Profil</li>
          <li className='element_horizontalNav'>Réglages</li>
          <li className='element_horizontalNav'>Communauté</li>
        </ul>
      </nav>
    </>
  );
}

export default HorizontalNav;
