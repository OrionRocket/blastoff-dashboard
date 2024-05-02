import React, { useContext } from "react";

import { useAppContext } from "context/state";
import SettingsModal from "components/Modals/SettingsModal";

export default function Navbar() {
  const store = useAppContext();
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-black md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          {/* Form */}

          <div
            className="button btn"
            onClick={() => window.my_modal_1.showModal()}
          >
            Facts Modal
          </div>
         
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
