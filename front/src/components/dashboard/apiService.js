import axios from "axios";
import formattedName from "./formatData";
const ApiService = {
  getName: (userId) => {
    const url = `http://localhost:3000/user/${userId}`;
    return axios.get(url).then((res) => {
      return res
    });
  },


  
  getUserAverageSession: (userId) => {
    const url = `http://localhost:3000/user/${userId}/average-sessions`;
    return axios.get(url).then((res) => {
      return res;
    });
  },

  getUserCount: (userId) => {
    const url = `http://localhost:3000/user/${userId}`;
    return axios.get(url).then((res) => {
      return res
    });
  },

  getUserActivity: (userId) => {
    const url = `http://localhost:3000/user/${userId}/activity`;
    return axios.get(url).then((res) => {
      return res
    });
  },
  getUserPerformance: (userId) => {
    const url = `http://localhost:3000/user/${userId}/performance`;
    return axios.get(url).then((res) => {
      return res
    });
  },

  getScore: (userId) => {
    const url = `http://localhost:3000/user/${userId}`;
    return axios.get(url).then((res) => {
      return res
    });
  },
  
};

export default ApiService;
