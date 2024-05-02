
/* eslint-disable react/jsx-no-target-blank */
"use client"

import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Link from "next/link";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import Tables from "./admin/tables";
import { AppWrapper } from "context/state";
import { FactsWrapper } from "context/fact";
import { GameWrapper } from "context/game";

import Navbar from "components/Navbars/AdminNavbar";
import HeaderStats from "components/Headers/HeaderStats";
import FormModal from "components/Modals/FormModal";
import Toast from "components/Toasts/Toast";
import TableModal from "components/Modals/TableModal";
import CardLineChart from "components/Cards/CardLineChart";
import CardBarChart from "components/Cards/CardBarChart";
import SettingsModal from "components/Modals/SettingsModal";
import DateDropdown from "components/Dropdowns/DateDropdown";

export default function Index() {
  useLayoutEffect(() => {
    //check if the email stored in local storage is equal to walkingmafia@aura.com
    if (localStorage.getItem("email") === "walkingmafia@aura.com") {
      // if it is, then redirect to the admin page
    }
    // if it is not, then redirect to the index page
    else window.location.href = "/auth/login";
  }, []);

  return (
    <GameWrapper>
      <AppWrapper>
        <FactsWrapper>
          <div className="">
            <FormModal />
            <TableModal />
            <div className="flex justify-start px-10 pt-6 bg-slate-200">
            <DateDropdown/>

            <SettingsModal />
            </div>
            
            <HeaderStats />
            <CardLineChart />
            <CardBarChart />
            <div className="px-4 md:px-10  w-full  ">
              <Tables />
            </div>
          </div>
          {/* <Toast /> */}
        </FactsWrapper>
      </AppWrapper>
    </GameWrapper>
  );
}
