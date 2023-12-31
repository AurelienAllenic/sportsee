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

  useEffect(() => {
    ApiService.getUserCount(userId)
      .then((res) => {
        console.log(res)
        const { calorieCount, proteinCount, lipidCount, carbohydrateCount } = formattedCards(res);
        setCount({ calorieCount, proteinCount, lipidCount, carbohydrateCount });
      })
      .catch((error) => {
        console.error(error);
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
      />
      <Card
        icon={proteinIcon}
        number={`${count.proteinCount}g`}
        type='Protéines'
      />
      <Card
        icon={carbsIcon}
        number={`${count.carbohydrateCount}g`}
        type='Glucides'
      />
      <Card
        icon={fatIcon}
        number={`${count.lipidCount}g`}
        type='Lipides'
      />
    </div>
  );
}

export default CardContainer;
