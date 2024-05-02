"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {
  getPlayerBets,
  getRoundBets,
  getRounds,
  getHighestBetterOfTheDay,
  getUserWithMostDaysPlayed,
  mostAndHighestCashout,
  getAverageCashoutOdd
} from "utils/bets";

const AppContext = createContext("");

export const AppWrapper = ({ children }) => {
  const [data, setData] = useState();
  const [roundBetsData, setRoundBetsData] = useState();
  const [playerBetsData, setPlayerBetsData] = useState();
  const [gameRTP, setGameRTP] = useState(0);
  const [gameTurnOver, setGameTurnover] = useState(0);
  const [totalBets, setTotalBets] = useState(0);
  const [last24hrsTurnover, setLast24hrsTurnover] = useState(0);
  const [last24hrsBets, setLast24hrsBets] = useState(0);
  const [last24hrsRTP, setLast24hrsRTP] = useState(0);

  const [averageRoundTime, setAverageRoundTime] = useState(0);
  const [last24hrsAverageRoundTime, setLast24hrsAverageRoundTime] = useState(0);

  const [averageOdds, setAverageOdds] = useState(0);

  const [highestBetterOfTheDay, setHighestBetterOfTheDay] = useState("");

  const [mostPlayingUser, setMostPlayingUser] = useState("");

  const [mostAndHighestCashoutData, setMostAndHighestCashoutData] =
    useState("");


  const [timeline,setTimeline] = useState(24); 
    
  const [selectedUserDetails, setSelectedUserDetails] = useState({
    userId: "",
    operatorId: "",
  });

  const [chartsData, setChartData] = useState("");

  const [barGraphData, setBarGraphData] = useState("");

  // This function will parse the 'generatedAt' date to a simple YYYY-MM-DD format
  function parseDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  }


  const [averageCashoutOdd,setAverageCashoutOdd] = useState(0);

  // Get the current date and time
  const currentDate = new Date();

  function convertMillisecondsToMinutesAndSeconds(milliseconds) {
    const totalSeconds = Math.floor((milliseconds * -1) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { minutes: minutes, seconds: seconds };
  }

  const getRoundsData = async () => {
    getRounds(timeline).then((fetchedData) => {
      // Process the API response to sum the 'betAmount' by date
      const summedByDate = fetchedData?.reduce((acc, item) => {
        const dateKey = parseDate(item.generatedAt);
        if (!acc[dateKey]) {
          acc[dateKey] = 0;
        }
        acc[dateKey] += item.betAmount;
        return acc;
      }, {});

      // Process the API response to sum the 'betCount' by date
      const summedBetCountByDate = fetchedData?.reduce((acc, item) => {
        const dateKey = parseDate(item.generatedAt);
        if (!acc[dateKey]) {
          acc[dateKey] = 0;
        }
        acc[dateKey] += item.betCount;
        return acc;
      }, {});

      try {
        const datess = Object.keys(summedBetCountByDate).sort();
        const betCounts = datess.map((date) => summedBetCountByDate[date]);
  
        //
  
        const dates = Object.keys(summedByDate).sort();
  
        const betAmounts = dates.map((date) => summedByDate[date].toFixed(2));
  
        const chartData = {
          labels: dates,
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: betAmounts,
              fill: false,
            },
          ],
        };
  
        const barGraphData = {
          labels: datess,
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: betCounts,
              fill: false,
            },
          ],
        };
  
        setBarGraphData(barGraphData);
  
        setChartData(chartData);
  
        //count number of rounds where the betCount is greater than 0
        const roundsWithBets = fetchedData?.filter((obj) => {
          return obj.betCount > 0;
        });
  
        setData(fetchedData);
        const averageRTP =
          fetchedData?.reduce((total, item) => total + item.rtp, 0) /
          roundsWithBets?.length;
        // console.log(averageRTP)
        const turnover = fetchedData?.reduce(
          (total, item) => total + item.betAmount,
          0
        );
  
        const totalBets = fetchedData?.reduce(
          (total, item) => total + item.betCount,
          0
        );
        setGameRTP(parseFloat(averageRTP?.toFixed(2)));
        setGameTurnover(parseFloat(turnover?.toFixed(2)));
        setTotalBets(parseFloat(totalBets?.toFixed(2)));
  
        // Calculate the date 24 hours ago
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
  
        // Filter the array to get the objects within the last 24 hours
        const filteredData = fetchedData?.filter((obj) => {
          const createdAtDate = new Date(obj.generatedAt);
          return (
            createdAtDate >= twentyFourHoursAgo && createdAtDate <= currentDate
          );
        });
  
        // Calculate the sum of all "value" keys using Array.reduce()
        const sum = filteredData?.reduce(
          (acc, curr) => acc + parseFloat(curr.betAmount.toFixed(2)),
          0
        );
        // Update the state with the sum of values
        setLast24hrsTurnover(sum?.toFixed(2));
  
        // Calculate the sum of all "value" keys using Array.reduce()
        const sumBets = filteredData?.reduce(
          (acc, curr) => acc + parseFloat(curr.betCount.toFixed(2)),
          0
        );
        // Update the state with the sum of values
        setLast24hrsBets(sumBets);
  
        ////////////////////////////calculate Average RTP for last 24 hours
        const averageRTP24hrs =
          filteredData?.reduce((total, item) => total + item.rtp, 0) /
          filteredData?.length;
        setLast24hrsRTP(parseFloat(averageRTP24hrs?.toFixed(2)));
  
        //calculate average round time for last 24 hours by calculating the difference between the generatedAt values of consecutive rounds
        //and then calculating the average of the differences
  
        let totalTimeDiff = 0;
        for (let i = 1; i < filteredData?.length; i++) {
          const prevGeneratedAt = new Date(filteredData[i - 1].generatedAt);
          const currentGeneratedAt = new Date(filteredData[i].generatedAt);
          const timeDiff = currentGeneratedAt - prevGeneratedAt;
          totalTimeDiff += timeDiff;
        }
        const averageRoundTime = totalTimeDiff / filteredData?.length;
        const { minutes, seconds } =
          convertMillisecondsToMinutesAndSeconds(averageRoundTime);
        setAverageRoundTime(` ${seconds} Seconds`);
  
        setAverageOdds(
          filteredData?.reduce((total, item) => total + item.odds, 0) /
            filteredData?.length
        );
  
        getHighestBetterOfTheDayData();
      } catch (error) {
        
      }
     
    });
  };

  const getRoundBetsData = async (roundId) => {
    getRoundBets(roundId).then((fetchedData) => {
      setRoundBetsData(fetchedData);
      //console.log(fetchedData);
    });
  };

  const getPlayerBetsData = async (userId, operatorId) => {
    getPlayerBets(userId, operatorId).then((fetchedData) => {
      setPlayerBetsData(fetchedData);
      //console.log(fetchedData);
    });
  };

  const getHighestBetterOfTheDayData = async () => {
    getHighestBetterOfTheDay(timeline).then((fetchedData) => {
      setHighestBetterOfTheDay(fetchedData);
      //console.log(fetchedData);
    });
  };

  const getMostPlayingUserData = async () => {
    getUserWithMostDaysPlayed().then((fetchedData) => {
      setMostPlayingUser(fetchedData);
    });
  };

  const getMostAndHighestCashout = async () => {
    mostAndHighestCashout(timeline).then((fetchedData) => {
      setMostAndHighestCashoutData(fetchedData);
    });
  };


  useEffect(() => {
    getRoundsData();
    _getAverageCashoutOdd();
    getMostAndHighestCashout();
    getHighestBetterOfTheDayData();

     
  }, [timeline])
  

  const _getAverageCashoutOdd = async ()=>{

    getAverageCashoutOdd(timeline).then((fetchedData)=>{
      setAverageCashoutOdd(fetchedData)
    })
  }
  return (
    <AppContext.Provider
      value={{
        data,
        chartsData,
        barGraphData,
        getRoundsData,
        roundBetsData,
        getRoundBetsData,
        playerBetsData,
        getPlayerBetsData,
        gameRTP,
        setGameRTP,
        gameTurnOver,
        totalBets,
        last24hrsTurnover,
        last24hrsBets,
        last24hrsRTP,
        averageRoundTime,
        averageOdds,
        highestBetterOfTheDay,
        mostPlayingUser,
        mostAndHighestCashoutData,
        getMostAndHighestCashout,
        getMostPlayingUserData,
        selectedUserDetails,
        setSelectedUserDetails,
        averageCashoutOdd,
        getAverageCashoutOdd:_getAverageCashoutOdd,
        timeline,
        setTimeline 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
