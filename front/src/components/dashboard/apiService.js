import axios from "axios";
import {data} from '../../data/data';

const ApiService = {

  
  getApi: (userId) => {
    const url = `http://localhost:3000/user/${userId}`;
    return axios.get(url).then((res) => {
      console.log(res)
      return res
    });
  },
  getName: (userId) => {
    const url = `http://localhost:3000/user/${userId}`;
    return axios.get(url)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
        if (parseInt(userId) === 18) {
          return 0
        }
        else{
          if (parseInt(userId) === 12) {
            return 1
          }
        }
      });
  },
  
  getUserAverageSession: (userId) => {
    const url = `http://localhost:3000/user/${userId}/average-sessions`;
    return axios.get(url)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
        if (parseInt(userId) === 18) {
          return 0;
        } else if (parseInt(userId) === 12) {
          return 1;
        } else {
          // Handle the error or return a default value
          console.log("Unable to fetch user average sessions");
          return null;
        }
      });
  },

  getUserCount: (userId) => {
    const url = `http://localhost:3000/user/${userId}/count`;
    return axios.get(url)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.error(error);
        // Gérer l'erreur ici
        if (parseInt(userId) === 18) {
          return 0;
        } else if (parseInt(userId) === 12) {
          return 1;
        } else {
          // Gérer l'erreur ou retourner une valeur par défaut
          console.log("Impossible de récupérer le nombre d'utilisateurs");
          return null;
        }
      });
  },

  getUserActivity: (userId) => {
    const url = `http://localhost:3000/user/${userId}/activity`;
    return axios.get(url)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
        if (parseInt(userId) === 18) {
          return 0;
        } else if (parseInt(userId) === 12) {
          return 1;
        } else {
          // Handle the error or return a default value
          console.log("Unable to fetch user activity");
          return null;
        }
      });
  },
  getUserPerformance: (userId) => {
    const url = `http://localhost:3000/user/${userId}/performance`;
    return axios.get(url)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
        if (parseInt(userId) === 18) {
          return 0;
        } else if (parseInt(userId) === 12) {
          return 1;
        } else {
          // Handle the error or return a default value
          console.log("Unable to fetch user performance");
          return null;
        }
      });
  },

  getScore: (userId) => {
    const url = `http://localhost:3000/user/${userId}`;
    return axios.get(url)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
        if (parseInt(userId) === 18) {
          return 0;
        } else if (parseInt(userId) === 12) {
          return 1;
        } else {
          // Handle the error or return a default value
          console.log("Unable to fetch user score");
          return null;
        }
      });
  },
}

export default ApiService;
