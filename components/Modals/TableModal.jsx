import React , {useState, useEffect} from "react";
import { getPlayerBets } from "utils/bets";
import { useAppContext } from "context/state";

function TableModal() {
    const [operatorWiseUserDetails, setOperatorWiseUserDetails] = useState([]);
    const {
     
        selectedUserDetails, 
      } = useAppContext();


      const fetchPlayerBets = async () => {
        try {
          const data = await getPlayerBets(
            selectedUserDetails?.userId,
            selectedUserDetails?.operatorId
          );
          setOperatorWiseUserDetails(data);
          console.log("operatorWiseUserDetails", data);
        } catch (error) {
          console.error("Error fetching player bets:", error);
        }
      };
    
      useEffect(() => {
        if (selectedUserDetails) {
          fetchPlayerBets();
        }
      }, [selectedUserDetails]);



  const formatDate = (timestamp) => {
    // console.log(parseInt(timestamp));
    const date = new Date(parseInt(timestamp));
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <> 
      <dialog id="my_modal_2" className="modal p-0">
 
      <form method="dialog" className="modal-box w-11/12 max-w-5xl">
        
        <div className=" bg-white p-0">
            {/* Projects table */}

            <table className="items-center w-full bg-white border-collapse rounded-md p-0">
              <thead className="bg-white">
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left  bg-blueGray-50 text-black border-blueGray-100"
                         
                    }
                  >
                    Bet ID
                    <i
                      className="fa fa-sort p-2 cursor-pointer"
                      type="button" 
                    ></i>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left  bg-blueGray-50 text-black border-blueGray-100"
                         
                    }
                  >
                    Round ID
                    <i
                      className="fa fa-sort p-2 cursor-pointer"
                      type="button" 
                    ></i>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left  bg-blueGray-50 text-black border-blueGray-100"
                         
                    }
                  >
                    Bet Amount
                    <i
                      className="fa fa-sort p-2 cursor-pointer"
                      type="button" 
                    ></i>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left  bg-blueGray-50 text-black border-blueGray-100"
                         
                    }
                  >
                    Cashout
                    <i
                      className="fa fa-sort p-2 cursor-pointer"
                      type="button" 
                    ></i>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left  bg-blueGray-50 text-black border-blueGray-100"
                         
                    }
                  >
                    Odds
                    <i
                      className="fa fa-sort p-2 cursor-pointer"
                      type="button" 
                    ></i>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left  bg-blueGray-50 text-black border-blueGray-100"
                         
                    }
                  >
                    Status
                    <i
                      className="fa fa-sort p-2 cursor-pointer"
                      type="button" 
                    ></i>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left  bg-blueGray-50 text-black border-blueGray-100"
                         
                    }
                  >
                    Timestamp
                    <i
                      className="fa fa-sort p-2 cursor-pointer"
                      type="button" 
                    ></i>
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left  bg-blueGray-50 text-black border-blueGray-100"
                         
                    }
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {operatorWiseUserDetails?.betHistory?.map((values) => {
                  return (
                    <tr   className="cursor-pointer hover:bg-gray-100 transition-all duration-200 drop-shadow-md "
                      key={values._id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black text-left flex items-center">
                        <img
                          src="/img/bootstrap.jpg"
                          className="h-12 w-12 bg-white rounded-full border hidden"
                          alt="..."
                        ></img>{" "}
                        <span
                          className={
                            "ml-3 font-bold    text-black" 
                          }
                        >
                          {values._id}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black">
                        {values.roundId}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black">
                        ₹ {values.betAmount}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black">
                        ₹ {(values.cashOut * values.betAmount).toFixed(2)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black">
                        {values.odds > 0 ? values.odds : values.cashOut}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {" "}
                            <i
                              className={`${
                                values.status == "INIT" ||
                                values.status == "CRASH"
                                  ? "text-red-500"
                                  : "text-emerald-500"
                              } fas fa-circle    `}
                            ></i>{" "}
                            {values.status}{" "}
                          </span>
                          <div className="relative w-full hidden">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                              <div
                                style={{ width: "60%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-black justify-center bg-red-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black">
                        {formatDate(values.timestamp)}
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
      </dialog>
    </>
  );
}

export default TableModal;
