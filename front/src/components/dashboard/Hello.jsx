import React, { useEffect, useState } from 'react';
import ApiService from '../dashboard/apiService';
import './dashboard.css';
import {formattedName} from './formatData';

const Hello = ({userId}) => {
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    ApiService.getName(userId)
      .then((res) => {
        const firstName = formattedName(res);
        setFirstName(firstName);
        setError(false)
      })
      .catch((error) => {
        console.error(error);
        setError(true)
      });
  }, [userId]);

  return (
    <>
    <section id='header_hello'>
      {
        error ? <h1 className='sub-title'>Erreur lors de la récupération du nom, vérifiez votre connexion internet</h1> :<> <h1 className='main-title'>Bonjour <span className='firstName'>{firstName}</span></h1>
        <p className='sub-title'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p></>
      }
    </section>
    </>
  );
}

export default Hello;
