import React, { useEffect, useState } from 'react';
import ApiService from '../dashboard/apiService';
import './dashboard.css';

const Hello = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    ApiService.getName(18)
      .then((firstName) => {
        setFirstName(firstName);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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