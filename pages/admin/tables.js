"use client"

import React, { useLayoutEffect } from "react";
import axios from "axios";
import { useState,useEffect } from "react";

// components

import CardTable from "components/Cards/CardTable.js";

// layout for page

import Admin from "layouts/Admin.js";
import { useAppContext } from "context/state";
import FormModal from "components/Modals/FormModal";

export default function Tables() {

const [tableData,setTableData] = useState()
const [averageRTP,setAverageRTP] = useState(0)
const { data,getRoundsData, getMostAndHighestCashout,getMostPlayingUserData } = useAppContext();

  
useLayoutEffect(() => { 
    setTableData(data);  
}, [data])

useEffect(() => {
  getRoundsData();
  getMostAndHighestCashout();
  getMostPlayingUserData();
}
, [])
 
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full m-12 px-4 ">
          <FormModal />
           <CardTable tableData={tableData} />
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}

Tables.layout = Admin;
