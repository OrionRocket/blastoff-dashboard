import axios from "axios";


function subtractHours(date, hours) {
  date.setHours(date.getHours() - hours);
  // date.setMinutes(date.getMinutes()-5);
 console.log(date);
  return date;
}

export const addFacts = async (fact) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/funfacts/",
      {
        "funFact": fact
    }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}; 


export const getFacts = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/funFacts/",
        
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }; 


  export const deleteFacts = async (id) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/deletefunFact",{
            
                "id": id 
             
        }
        
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }