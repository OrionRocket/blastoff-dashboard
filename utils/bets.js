import axios from "axios";


function subtractHours(date, hours) {
  date.setHours(date.getHours() - hours);
  // date.setMinutes(date.getMinutes()-5);
 console.log(date);
  return date;
}

export const getRounds = async (startDate) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/rounds/",
      {
        pageNum: "1",
        pageSize: "100000",
        endDate: new Date(),
        startDate: subtractHours(new Date(), startDate),
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
export const getRoundBets = async (roundId) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_SERVER_IP +
        "/api/dashboard/roundDetail/" +
        roundId
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPlayerBets = async (userId, operatorId) => {
  try {
    const response =  await axios
      .post(process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/getUserBets/", {
        userId: userId,
        
        pageNum: 1,
        pageSize: 500,
        adminSecret: "blastoffAdmin",
        operatorId: operatorId,
      })
      return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getHighestBetterOfTheDay = async (startDate) => {
  try {
    const response =  await axios
      .post(process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/highestBetOfDay", {
        endDate: new Date(),
        startDate: subtractHours(new Date(), startDate),
      })
      return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const getUserWithMostDaysPlayed = async () => {
  try {
    const response =  await axios
      .get(process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/getUserWithMostDaysPlayed"); 
     // console.log(response.data.data);
      return  response.data.data;
  } catch (error) {
    console.error(error);
  }
} 

export const mostAndHighestCashout = async () => {
  console.log("mostAndHighestCashout");
  try {
    const response =  await axios
      .post(process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/mostAndHighestCashout", {
        endDate: new Date(),
        startDate: subtractHours(new Date(), startDate),
      }) 
      return response.data.data;
  } catch (error) {
    console.error(error);
  }
}


export const getAverageCashoutOdd = async(startDate)=>{
  console.log("AverageAcshoutOdd");
  try {
    const response =  await axios
    .post(process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/averageCashoutMultiplier", {
      endDate: new Date(),
      startDate: subtractHours(new Date(), startDate),
    }) 
    return response.data.data.avgCashoutMultiplier;
} catch (error) {
  console.error(error);
}
}