import axios from "axios";

const ApiService = {
  getName: (userId) => {
    const url = `http://localhost:3000/user/${userId}`;
    
    return axios.get(url).then((res) => {
        console.log(res.data.data)
      return res.data.data.userInfos.firstName;
    });
  },
  getUserAverageSession: (userId) => {
    const url = `http://localhost:3000/user/${userId}/average-session`;

    return axios.get(url).then((res) => {
      return res.data.data.averageSession;
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
};

export default ApiService;
