"use client";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
// components

import CardStats from "components/Cards/CardStats.js";
import { useAppContext } from "context/state";

export default function HeaderStats() {
  const [sumOfValues, setSumOfValues] = useState(0);
  const {
    averageOdds,
    gameTurnOver,
    gameRTP,
    totalBets,
    last24hrsTurnover,
    last24hrsBets,
    last24hrsRTP,
    averageRoundTime,
    highestBetterOfTheDay,
    mostPlayingUser,
    getPlayerBetsData,
    mostAndHighestCashoutData,
    selectedUserDetails,
    setSelectedUserDetails,
    averageCashoutOdd,
    timeline
  } = useAppContext();

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call using Axios
        const response = await axios.get(
          "https://blastoff-dashboard.fawk.app/api/dashboard/googleAnalyticsRealtime"
        );

        // Extract the "value" keys from the "metricValues" in the JSON response
        const metricValues = response?.data?.data?.rows?.map(
          (row) => row.metricValues[0]?.value || 0
        );

        // Calculate the sum of all "value" keys using Array.reduce()
        const sum = metricValues.reduce((acc, curr) => acc + parseInt(curr), 0);

        // Update the state with the sum of values
        setSumOfValues(sum);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-slate-200 py-6  ">
        <div className="px-4 md:px-10 mx-auto w-full flex">
          {/* Card stats */}

          <div className="gap-4 flex flex-wrap">
            <div onClick={() => window.my_modal_3.showModal()}>
            <CardStats
              statSubtitle="Last 24 Hrs Turnover"
              statTitle={`₹${last24hrsTurnover}`}
              statArrow=""
              statPercent=""
              hasGraph={false}
              statPercentColor="text-emerald-500"
              statDescripiron={`₹${parseInt(gameTurnOver)} Lifetime Turnover`}
              statIconName="fas fa-money-bill"
              statIconColor="bg-emerald-500"
            />
</div>
            <CardStats
              statSubtitle="Last 24Hrs RTP"
              statTitle={`${last24hrsRTP}`}
              statArrow="down"
              statPercent="" 
              statPercentColor="text-red-500"
              statDescripiron={`${gameRTP} Lifetime RTP`}
              statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500"
            />

            <CardStats
              statSubtitle="Realtime Viewers"
              statTitle={sumOfValues}
              statArrow="down"
              statPercent="1.10"
              statPercentColor="text-orange-500"
              statDescripiron="Since yesterday"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
            <div onClick={() => window.my_modal_4.showModal()}>

            <CardStats
              statSubtitle="Last 24Hrs Bets"
              statTitle={`${last24hrsBets}`}
              statArrow="up"
              statPercent="12"
              statPercentColor="text-emerald-500"
              statDescripiron={`${totalBets} Lifetime Bets`}
              statIconName="fas fa-handshake"
              statIconColor="bg-orange-500"
            />
</div>
            <CardStats
              statSubtitle="Average Round Time"
              statTitle={`${averageRoundTime}`}
              statArrow="up"
              statPercent="12"
              statPercentColor="text-emerald-500"
              statDescripiron=""
              statIconName="fas fa-handshake"
              statIconColor="bg-orange-500"
            />

            <CardStats
              statSubtitle="Average Crash Multiplier"
              statTitle={`${averageOdds.toFixed(2)}X`}
              statArrow="up"
              statPercent="12"
              statPercentColor="text-emerald-500"
              statDescripiron=""
              statIconName="fas fa-handshake"
              statIconColor="bg-orange-500"
            />

<CardStats
              statSubtitle="Average Player Cashout"
              statTitle={`${averageCashoutOdd.toFixed(2)}X`}
              statArrow="up"
              statPercent="12"
              statPercentColor="text-emerald-500"
              statDescripiron=""
              statIconName="fas fa-handshake"
              statIconColor="bg-orange-500"
            />

            <div
              onClick={() =>
               {
                //  getPlayerBetsData(
                //   `${highestBetterOfTheDay?.highestAmount?.userId}`,
                //   `${highestBetterOfTheDay?.highestAmount?.operatorId}`
                // );


                window.my_modal_2.showModal();
                setSelectedUserDetails({userId:highestBetterOfTheDay?.highestAmount?.userId, operatorId:highestBetterOfTheDay?.highestAmount?.operatorId});

              }
              }
            >
              <CardStats
                statSubtitle="Highest Investor Of The Day"
                 statTitle={`${
                  highestBetterOfTheDay?.highestAmount?.username != undefined
                    ? highestBetterOfTheDay?.highestAmount?.username
                    : ""
                } - ₹${
                  highestBetterOfTheDay?.highestAmount?.amount != undefined
                    ? highestBetterOfTheDay?.highestAmount?.amount
                    : "0"
                } `}
                statArrow="up"
                statPercent="12"
                statPercentColor="text-emerald-500"
                statDescripiron={`Last ${timeline} Hrs`}
                statIconName="fas fa-handshake"
                statIconColor="bg-orange-500"
              />
            </div>

            <div
              onClick={() =>
                getPlayerBetsData(
                  `${highestBetterOfTheDay?.biggestBetOfDay?.userId}`,
                  `${highestBetterOfTheDay?.biggestBetOfDay?.operatorId}`
                )
              }
            >
              <CardStats
                statSubtitle="Biggest Single Bet"
                statTitle={`${
                  highestBetterOfTheDay?.biggestBetOfDay?.username != undefined
                    ? highestBetterOfTheDay?.biggestBetOfDay?.username
                    : ""
                } - ₹${
                  highestBetterOfTheDay?.biggestBetOfDay?.amount != undefined
                    ? highestBetterOfTheDay?.biggestBetOfDay?.amount
                    : "0"
                } `}
                statArrow="up"
                statPercent="12"
                statPercentColor="text-emerald-500"
                statDescripiron={`Last ${timeline} Hrs`}
                statIconName="fas fa-handshake"
                statIconColor="bg-orange-500"
              />
            </div>
            <div
              onClick={() =>
                getPlayerBetsData(
                  `${mostAndHighestCashoutData?.highestCashoutByAmount?.userId}`,
                  `${mostAndHighestCashoutData?.highestCashoutByAmount?.operatorId}`
                )
              }
            >
              <CardStats
                statSubtitle="Most Cashout "
                statTitle={`${mostAndHighestCashoutData?.highestCashoutByAmount?.username} - ₹${mostAndHighestCashoutData?.highestCashoutByAmount?.totalCashOut?.toFixed(2)} `}
                statArrow="up"
                statPercent="12"
                statPercentColor="text-emerald-500"
                statDescripiron={`Last ${timeline} Hrs`}
                statIconName="fas fa-handshake"
                statIconColor="bg-orange-500"
              />
            </div>

            <div
              onClick={() =>
                getPlayerBetsData(
                  `${mostPlayingUser?.userDetails?.userId}`,
                  `${mostPlayingUser?.userDetails?.operatorId}`
                )
              }
            >
              <CardStats
                statSubtitle="Most Active User "
                statTitle={`${mostPlayingUser?.userDetails?.username} - ${mostPlayingUser?.totalDaysPlayed} Days`}
                statArrow="up"
                statPercent="12"
                statPercentColor="text-emerald-500"
                statDescripiron="since Day 1"
                statIconName="fas fa-handshake"
                statIconColor="bg-orange-500"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
