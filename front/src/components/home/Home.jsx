import React from 'react'
import './home.css';
import HorizontalNav from '../nav/HorizontalNav';
import LateralNav from '../nav/LateralNav';
const Home = () => {
  return (
    <>
    <HorizontalNav />
    <LateralNav />
      <section id='home'>
        <h1 className='main-sentence-choice'>Veuillez choisir entre nos deux cas de test :</h1>
        <div className='container-choices'>
            <button className='btn-choice'><a className="link-choice" href="/user/18">Cecilia</a></button>
            <button className='btn-choice'><a className='link-choice' href="/user/12">Karl</a></button>
        </div>
      </section>
    </>
  )
}

export default Home
