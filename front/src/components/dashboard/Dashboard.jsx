import { useParams } from 'react-router-dom';
import Card from './fiveCards/Card'
import Activity from './Activity'
import HorizontalNav from '../nav/HorizontalNav';
import LateralNav from '../nav/LateralNav';
import Hello from './Hello';
import Performance from './Performance'
import Test from './Average';
import Average from './Average';
import Score from './Score';
const Dashboard = () => {
  const { id } = useParams();
  return (
    <>
    <HorizontalNav />
      <LateralNav />
      <Hello userId={id}/>
    <section id='dashboard'>
        <div className='containerInfosLeft'>
          <div className='container-activity'>
            <Activity userId={id} />
          </div>
          {/* 
          <div className='container-bottom'>
            <Average userId={id}/>
            <Performance userId={id}/>
            <Score userId={id}/>
          </div>*/}
        </div>
        
        <div className='containerInfosRight'>
        <Card userId={id}/>
        </div>
    </section>
    </>
  )
}

export default Dashboard
