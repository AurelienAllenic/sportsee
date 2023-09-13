import React, { useEffect, useState } from 'react';
import "./card.css";
import ApiService from '../apiService';
import caloriesIcon from "../../assets/calories-icon.png";
import proteinIcon from "../../assets/protein-icon.png";
import carbsIcon from "../../assets/carbs-icon.png";
import fatIcon from "../../assets/fat-icon.png";
import { formattedCards } from '../formatData';

const Card = ({ icon, number, type, error }) => {
  return (
    <div className='card'>
      <img src={icon} alt={type} className='img-card' />
      <div className='container-number-type'>
        {
          error ? <><p className='indication-number'>erreur 404 ou 500</p>
          <p className='indication-type'>Vérifiez votre connexion internet, il peut également s'agir d'un problème de connexion avec le serveur</p></>
          :
          <><p className='indication-number'>{number}</p>
        <p className='indication-type'>{type}</p></>
        }
        
      </div>
    </div>
  );
}

const CardContainer = ({ userId }) => {
  const [count, setCount] = useState({});
  const [error, setError] = useState(false)
  useEffect(() => {
    ApiService.getUserCount(userId)
      .then((res) => {
        const { calorieCount, proteinCount, lipidCount, carbohydrateCount } = formattedCards(res);
        setCount({ calorieCount, proteinCount, lipidCount, carbohydrateCount });
        setError(false)
      })
      .catch((error) => {
        console.error(error);
        setError(true)
      });
  }, [userId]);

  const formatNumber = (number) => {
    if (number !== undefined) {
      return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    } else {
      return 'N/A';
    }
  }
  
  
  return (
    <div className='cards'>
      <Card
        icon={caloriesIcon}
        number={`${formatNumber(count.calorieCount)}kCal`}
        type='Calories'
        error={error}
      />
      <Card
        icon={proteinIcon}
        number={`${count.proteinCount}g`}
        type='Protéines'
        error={error}
      />
      <Card
        icon={carbsIcon}
        number={`${count.carbohydrateCount}g`}
        type='Glucides'
        error={error}
      />
      <Card
        icon={fatIcon}
        number={`${count.lipidCount}g`}
        type='Lipides'
        error={error}
      />
    </div>
  );
}

export default CardContainer;
