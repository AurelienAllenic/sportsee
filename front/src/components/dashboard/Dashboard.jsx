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
        
    {/*<Activity userId={id} />
    <Performance userId={id}/>
      <Card userId={id}/>
      <Average userId={id}/>*/}
      <Score userId={id}/>

    </section>
      
    </>
  )
}

export default Dashboard
