import axios from "axios";

const ApiService = {
  getName: (userId) => {
    const url = `http://localhost:3000/user/${userId}`;
    
    return axios.get(url).then((res) => {
        console.log(res.data)
      return res.data.data.userInfos.firstName;
    });
  },

  getScore: (userId) => {
    const url = `http://localhost:3000/user/${userId}`;
  
    return axios.get(url).then((res) => {
      console.log(res.data);
      console.log(userId); // Vérifiez la valeur de userId
  
      if (parseInt(userId) === 18) { // Assurez-vous du type de données de userId
        console.log('18');
        return res.data.data.score;
      } else {
        console.log('pas 18');
        return res.data.data.todayScore;
      }
    });
  },
  
  getUserAverageSession: (userId) => {
    const url = `http://localhost:3000/user/${userId}/average-sessions`;
    return axios.get(url).then((res) => {
      return res.data.data.sessions;
    });
  },

  getUserCount: (userId) => {
    const url = `http://localhost:3000/user/${userId}`;

    return axios.get(url).then((res) => {
       let calorieCount = res.data.data.keyData.calorieCount;
       let carbohydrateCount = res.data.data.keyData.carbohydrateCount;
       let lipidCount = res.data.data.keyData.lipidCount;
       let proteinCount = res.data.data.keyData.proteinCount;
       return {calorieCount, carbohydrateCount, lipidCount, proteinCount};
    });
  },

  getUserActivity: (userId) => {
    const url = `http://localhost:3000/user/${userId}/activity`;
  
    return axios.get(url).then((res) => {
      let weight = res.data.data.sessions.map(session => session.kilogram);
      let burnedCalories = res.data.data.sessions.map(session => session.calories);
      let days = res.data.data.sessions.map(session => new Date(session.day).getDate());
      
      console.log('weight', weight);
      console.log('burnedCalories', burnedCalories);

      return { weight, burnedCalories, days };
    });
  },
  getUserPerformance: (userId) => {
    const url = `http://localhost:3000/user/${userId}/performance`;
  
    return axios.get(url).then((res) => {
      console.log(res.data)

      return res.data
    });
  },
  
};

export default ApiService;
