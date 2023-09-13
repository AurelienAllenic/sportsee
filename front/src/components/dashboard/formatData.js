export const formattedName = (res) => {
    return res.data.data.userInfos.firstName;
}

export const formattedScore = (res, userId) => {
    if (parseInt(userId) === 18) {
        return res.data.data.score;
    } else {
        return res.data.data.todayScore;
    }
}
export const formattedAverage = (res) => {
    return res.data.data.sessions;
}

export const formattedCards = (res) => {
    let calorieCount = res.data.data.keyData.calorieCount;
    let carbohydrateCount = res.data.data.keyData.carbohydrateCount;
    let lipidCount = res.data.data.keyData.lipidCount;
    let proteinCount = res.data.data.keyData.proteinCount;
    return {calorieCount, carbohydrateCount, lipidCount, proteinCount};
}

export const formattedActivity = (res) => {
    let weight = res.data.data.sessions.map(session => session.kilogram);
    let burnedCalories = res.data.data.sessions.map(session => session.calories);
    let days = res.data.data.sessions.map(session => new Date(session.day).getDate());
    return { weight, burnedCalories, days };
}

export const formattedPerformance = (res) => {
    return res.data
}
