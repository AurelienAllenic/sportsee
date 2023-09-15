import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from './fiveCards/Card';
import Activity from './Activity';
import HorizontalNav from '../nav/HorizontalNav';
import LateralNav from '../nav/LateralNav';
import Hello from './Hello';
import Performance from './Performance';
import Average from './Average';
import Score from './Score';
import ApiService from './apiService';

const Dashboard = () => {
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    ApiService.getApi(id)
      .then((res) => {
        console.log(res);
        setError(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, [id]);

  return (
    <>
      <HorizontalNav />
      <LateralNav />
      <Hello userId={id} />
      <section id='dashboard'>
        <div className='additionnal_container'>
          <div className='containerInfosLeft'>
            <Activity userId={id} />
            <div className='container-bottom'>
              <Average userId={id} />
              <Performance userId={id} />
              <Score userId={id} />
            </div>
          </div>
          <div className='containerInfosRight'>
            <Card userId={id} />
          </div>
        </div>
      </section>
      {error && (
        <h1 className='error-msg'>
          Erreur, données hors-ligne affichées, vérifiez votre connexion internet
        </h1>
      )}
    </>
  );
};

export default Dashboard;