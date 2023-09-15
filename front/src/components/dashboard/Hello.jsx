import React, { useEffect, useState } from 'react';
import ApiService from '../dashboard/apiService';
import './dashboard.css';
import {formattedName} from './formatData';
import { data } from '../../data/data';
const Hello = ({userId}) => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    ApiService.getName(userId)
      .then((res) => {
        const firstName = formattedName(res);
        setFirstName(firstName);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  return (
    <>
    <section id='header_hello'>
        <h1 className='main-title'>Bonjour <span className='firstName'>{firstName}</span></h1>
        <p className='sub-title'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </section>
    </>
  );
}

export default Hello;
