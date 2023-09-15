import {data} from '../../data/data';

export const formattedName = (res) => {
    if(res === 0 || res === 1) {
        return data.data.data[res].userInfos.firstName;
    }else{
        return res.data.data.userInfos.firstName;
    }
}

export const formattedScore = (res, userId) => {
    if(res === 0 || res === 1) {
        return data.data.data[res].score;
    }else{
        if (parseInt(userId) === 18) {
            return res.data.data.score;
        } else {
            return res.data.data.todayScore;
        }
    }
    
}
export const formattedAverage = (res) => {
    if(res === 0 || res === 1){
        return data.data.data[res].sessionAverage;
    }else{
        return res.data.data.sessions;
    }
}

export const formattedCards = (res) => {
    if(res === 0 || res === 1) {
        let calorieCount = data.data.data[res].keyData.calorieCount;
        let carbohydrateCount = data.data.data[res].keyData.carbohydrateCount;
        let lipidCount = data.data.data[res].keyData.lipidCount;
        let proteinCount = data.data.data[res].keyData.proteinCount;
        return {calorieCount, carbohydrateCount, lipidCount, proteinCount};
    }else{
        let calorieCount = res.data.data.keyData.calorieCount;
        let carbohydrateCount = res.data.data.keyData.carbohydrateCount;
        let lipidCount = res.data.data.keyData.lipidCount;
        let proteinCount = res.data.data.keyData.proteinCount;
        return {calorieCount, carbohydrateCount, lipidCount, proteinCount};
    }
}

export const formattedActivity = (res) => {
    if(res === 0 || res === 1) {
        console.log(data.data.data[res].sessions);
        let weight = data.data.data[res].sessions.map(session => session.kilogram);
        let burnedCalories = data.data.data[res].sessions.map(session => session.calories);
        let days = data.data.data[res].sessions.map(session => new Date(session.day).getDate());
        return { weight, burnedCalories, days };
    }else{
        let weight = res.data.data.sessions.map(session => session.kilogram);
        let burnedCalories = res.data.data.sessions.map(session => session.calories);
        let days = res.data.data.sessions.map(session => new Date(session.day).getDate());
        return { weight, burnedCalories, days };
    }
}

export const formattedPerformance = (res) => {
    if(res === 0 || res === 1) {
        console.log(data.data.data[res].data[0].data)
        return data.data.data[res].data[0].data
    }
    return res.data.data.data
}
