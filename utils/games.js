import axios from "axios";

export const getGameStatus = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/fetchGameStatus"
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const putGameToMaintenance = async (rounds) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/maintenance",
      {
        rounds: parseInt(rounds),
        adminSecret: "blastoffAdmin",
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const voidRound = async (roundId) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/voidRound",
      {
        roundId: roundId,
        adminSecret: "blastoffAdmin",
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}; 

export const gameOn = async () => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_SERVER_IP + "/api/dashboard/gameOn",
      {
        adminSecret: "blastoffAdmin",
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}