"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { voidRound, getGameStatus, putGameToMaintenance, gameOn } from "utils/games";

const AppContext = createContext("");

export const GameWrapper = ({ children }) => {
  const [gameStatus, setGameStatus] = useState();

  // Get the current date and time
  const currentDate = new Date();

  function convertMillisecondsToMinutesAndSeconds(milliseconds) {
    const totalSeconds = Math.floor((milliseconds * -1) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { minutes: minutes, seconds: seconds };
  }

  const _getGameStatus = async () => {
    getGameStatus().then((fetchedData) => {
      setGameStatus(fetchedData);
      console.log(fetchedData);
    });
  };

  const _voidRound = async () => {
    voidRound().then((fetchedData) => { 
      console.log(fetchedData);
    });
  }

  const _putGameToMaintenance = async (rounds) => {
    putGameToMaintenance(rounds).then((fetchedData) => {
    
      console.log(fetchedData);
    });
  }

  const resumeGame = async () => {
    gameOn().then((fetchedData) => {
      console.log(fetchedData);
    });
  }

  useEffect(() => {
    _getGameStatus();
  }, []);

  return (
    <AppContext.Provider
      value={{
        gameStatus,
        voidRound:_voidRound,
        putGameToMaintenance:_putGameToMaintenance,
        resumeGame:resumeGame,

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
