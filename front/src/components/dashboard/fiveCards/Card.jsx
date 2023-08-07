import React, { useEffect, useState } from 'react';
import "./card.css";
import ApiService from '../apiService';
import caloriesIcon from "../../assets/calories-icon.png";
import proteinIcon from "../../assets/protein-icon.png";
import carbsIcon from "../../assets/carbs-icon.png";
import fatIcon from "../../assets/fat-icon.png";

const Card = () => {
    const [count, setCount] = useState({});

    useEffect(() => {
        ApiService.getUserCount(18)
            .then(({ calorieCount, proteinCount, lipidCount, carbohydrateCount }) => {
                setCount({ calorieCount, proteinCount, lipidCount, carbohydrateCount });
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    return (
        <>
        <div className='cards'>
            <div className='card'>
                <img src={caloriesIcon} alt="calories" className='img-card'/>
                <div className='container-number-type'>
                    <p className='indication-number'>{count.calorieCount ? count.calorieCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}kCal</p>
                    <p className='indication-type'>Calories</p>
                </div>
            </div>
            <div className='card'>
                <img src={proteinIcon} alt="proteins" className='img-card'/>
                <div className='container-number-type'>
                    <p className='indication-number'>{count.proteinCount}g</p>
                    <p className='indication-type'>Protéines</p>
                </div>
            </div>
            <div className='card'>
                <img src={carbsIcon} alt="carbs" className='img-card'/>
                <div className='container-number-type'>
                    <p className='indication-number'>{count.proteinCount}g</p>
                    <p className='indication-type'>Glucides</p>
                </div>
            </div>
            <div className='card'>
                <img src={fatIcon} alt="lipids" className='img-card'/>
                <div className='container-number-type'>
                    <p className='indication-number'>{count.proteinCount}g</p>
                    <p className='indication-type'>Lipides</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Card;
