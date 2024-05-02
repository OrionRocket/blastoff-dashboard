"use client"
import React, { useLayoutEffect } from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { AppWrapper, useAppContext } from "context/state";
import FormModal from "components/Modals/FormModal";
import DateDropdown from "components/Dropdowns/DateDropdown";

export default function Admin({ children }) {
  const {  gameRTP, getRoundsData } = useAppContext();
  useLayoutEffect(() => {
    //check if the email stored in local storage is equal to walkingmafia@aura.com
    if(localStorage.getItem("email") === "walkingmafia@aura.com"){
     // if it is, then redirect to the admin page
      }
      else
     // if it is not, then redirect to the index page
      window.location.href = "/auth/login";

      
}, []);
  return (
     
     <AppWrapper>
       <div className="relative md:ml-64 bg-blueGray-100">
        
        <AdminNavbar />
        <FormModal />
        {/* Header */}
        <DateDropdown/>
        <HeaderStats />

        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
         </div>
      </div></AppWrapper>
     
  );
}
