"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getFacts, addFacts, deleteFacts } from "utils/facts";

const AppContext = createContext("");

export const FactsWrapper = ({ children }) => {
  const [facts, setFacts] = useState(); 
  
  // Get the current date and time
  const currentDate = new Date();

  function convertMillisecondsToMinutesAndSeconds(milliseconds) {
    const totalSeconds = Math.floor((milliseconds * -1) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { minutes: minutes, seconds: seconds };
  }

   

  const _addFacts = async (facts) => {
    addFacts(facts).then((fetchedData) => {
        setFacts(fetchedData);
      console.log(fetchedData);
    });
  };
 

  const _getFacts = async () => {
    getFacts().then((fetchedData) => {
        setFacts(fetchedData);
      //console.log(fetchedData);
    });
  }

  const _deleteFacts = async (id) => {
    deleteFacts(id).then((fetchedData) => { 
        setFacts(fetchedData);
      console.log(fetchedData);
    });
  }

  useEffect(() => { 
    _getFacts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        facts,
          addFacts:_addFacts,
          deleteFacts:_deleteFacts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
