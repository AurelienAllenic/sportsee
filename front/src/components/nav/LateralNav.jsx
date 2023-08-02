import React from 'react';
import "./lateralNav.css";
import {GiMeditation} from 'react-icons/gi';
import {BiSwim} from "react-icons/bi";
import {MdDirectionsBike} from "react-icons/md";
import {LiaDumbbellSolid} from "react-icons/lia";

const LateralNav = () => {
  return (
    <>
      <nav className='lateralNav_container'>
        <ul className='list_lateralNav'>
          <li className='element_lateralNav'><GiMeditation/></li>
          <li className='element_lateralNav'><BiSwim/></li>
          <li className='element_lateralNav'><MdDirectionsBike/></li>
          <li className='element_lateralNav'><LiaDumbbellSolid/></li>
          <p className='copyright_nav rotate-text'>Copyright Sportsee 2020</p>
        </ul>
      </nav>
    </>
  );
}

export default LateralNav;
