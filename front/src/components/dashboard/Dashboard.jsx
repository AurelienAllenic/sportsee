import { useParams } from 'react-router-dom';
import Card from './fiveCards/Card'
import Activity from './Activity'
import HorizontalNav from '../nav/HorizontalNav';
import LateralNav from '../nav/LateralNav';
import Hello from './Hello';
const Dashboard = () => {
  const { id } = useParams();
  return (
    <>
    <HorizontalNav />
      <LateralNav />
      <Hello userId={id}/>
    <section id='dashboard'>
        
      
    <Activity userId={id} />
      <Card userId={id}/>
    </section>
      
    </>
  )
}

export default Dashboard
