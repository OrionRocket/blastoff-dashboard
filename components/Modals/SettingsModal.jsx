import { useAppContext } from "context/game";
import React, { useState, useEffect } from "react";

function SettingsModal() {
  const { gameStatus, voidRound, putGameToMaintenance, resumeGame } = useAppContext();
  const [roundsToMaintenance, setRoundsToMaintenance] = useState(0);
  const [isLive, setIsLive] = useState(gameStatus);
  const toggleLive = () => {
    setIsLive(!isLive);

    // !isLive ? resumeGame(): null; 

  };


  useEffect(() => {
    setIsLive(gameStatus)
  
    return () => {
       
    }
  }, [gameStatus])
 
   


  return (
    <>
      <button className="btn bg-white drop-shadow m-1 " onClick={() => window.my_modal_5.showModal()}>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"> <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg> Settings
      </button>
      <dialog id="my_modal_5" className="modal">
        <form method="dialog" className="modal-box   min-w-max  w-4/12 max-w-5xl">
          <h3 className="font-bold text-lg">Game Settings!</h3>
          <p className="py-4">Maintenance Mode</p>
          <div className="flex flex-col gap-4">
            <div className="tabs tabs-boxed  w-max">
              <a
                className={`${
                  isLive ? "tab-active" : ""
                } tab transition-all duration-400 `}
                onClick={() => toggleLive()}
              >
                Live
              </a>
              <a
                className={`${
                  isLive ? "" : "tab-active"
                } tab transition-all duration-400`}
                onClick={() => toggleLive()}
              >
                Under Maintenance
              </a>
            </div>

            <div
              className={`${isLive ? `hidden` : ""} flex gap-4 items-center`}
            >
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Rounds to Maintenance</span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={roundsToMaintenance}
                  onChange={(e)=>{
                    setRoundsToMaintenance(e.target.value)
                  } }
                  className="input input-bordered w-full max-w-xs ring-0 focus:ring-0 active:ring-0 "
                />
                <label className="label">
                  <span className="label-text-alt text-transparent">
                    Bottom Left label
                  </span>
                  <span className="label-text-alt text-transparent">
                    Bottom Right label
                  </span>
                </label>
              </div>{" "}
              <button onClick={() => {putGameToMaintenance(roundsToMaintenance)}} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
          <div className="modal-action">
            {/* if there is a button, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default SettingsModal;
