'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';

// components
// _id, betAmount, cashOut, betCount, rtp
import TableDropdown from 'components/Dropdowns/TableDropdown.js';
import { getPlayerBets } from 'utils/bets';
import { useAppContext } from 'context/state';

export default function CardTable({ color, tableData }) {
  const [_tableData, setTableData] = useState(tableData);

  const [filteredBets, setFilteredBets] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);

  const [showGameTable, setShowGameTable] = useState(true);

  const [showRoundDetails, setShowRoundDetails] = useState(false);
  const [countDown, setCountDown] = useState(30);
  const [operatorWiseUserDetails, setOperatorWiseUserDetails] = useState();

  const { data, getRoundsData, roundBetsData, getRoundBetsData } =
    useAppContext();

  const itemsPerPage = 25; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBets?.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const goToPage = (pageNum) => setCurrentPage(pageNum);
  const [usernameCounts, setUserNameCounts] = useState();
  const [operatorBetCount, setOperatorBetCount] = useState();

  //update the tableData when data changes
  useEffect(() => {
    setTableData(tableData);
    // makePostRequest();
    setFilteredBets(tableData);
    setCountDown(60);

    return () => {};
  }, [data]);

  useEffect(() => {
    setTableData(tableData);
    // makePostRequest();
    setFilteredBets(tableData);
    setCountDown(60);

    return () => {};
  }, []);

  // Run every time searchTerm or bets array changes
  useEffect(() => {
    const results = tableData?.filter((bet) =>
      bet._id.toString().includes(searchTerm)
    );

    setFilteredBets(results);
  }, [searchTerm, tableData]);

  // Run every time sortConfig or filteredBets array changes
  useEffect(() => {
    if (sortConfig !== null) {
      const sortedBets = [...filteredBets].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'descending' ? 1 : -1;
        }
        return 0;
      });
      setFilteredBets(sortedBets);
    }
  }, [sortConfig, filteredBets]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  //Fetches the Details of Bets placed in a Round
  const fetchRoundBetsDetails = (roundId) => {
    try {
      getRoundBetsData(roundId);
      setShowRoundDetails(true);
      setShowGameTable(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlayerBetsDetails = (userId, operatorId) => {
    try {
      //getPlayerBetsData(userId, operatorId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (countDown > 0) {
      const timerId = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      makePostRequest();
    }
  }, [countDown]);

  const makePostRequest = async () => {
    try {
      getRoundsData();
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (timestamp) => {
    // console.log(parseInt(timestamp));
    const date = new Date(parseInt(timestamp));
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const findDuplicates = (arr) => {
    const counts = {};

    for (let i = 0; i < arr?.length; i++) {
      if (!counts[arr[i]]) {
        counts[arr[i]] = 0;
      }
      counts[arr[i]] += 1;
    }

    return counts;
  };

  useEffect(() => {
    setUserNameCounts(
      findDuplicates(roundBetsData?.map((item) => item.userName))
    );

    setOperatorBetCount(
      findDuplicates(roundBetsData?.map((item) => item.operatorId))
    );

    return () => {};
  }, [roundBetsData]);

  return (
    <>
      {showGameTable && (
        <div
          className={
            'relative flex flex-col min-w-0 break-words w-full mb-6   border rounded-xl   border-slate-300 ' +
            (color === 'light' ? 'bg-slate-200' : 'bg-blueGray-700 text-black')
          }
        >
          <div className='px-4 py-3 mb-0 border-0 rounded-md'>
            <div className='flex items-center justify-between'>
              <div className='relative flex px-4'>
                <h3 className={'font-semibold text-lg text-black'}>
                  Rounds Table <br></br>
                  <p className='text-sm'>{data?.length} Rounds</p>
                </h3>
              </div>

              <div className='flex items-center justify-center '>
                <div className='flex gap-4 pagination '>
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className='px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-black rounded shadow outline-none btn-pagination active:bg-blueGray-600 hover:shadow-md focus:outline-none'
                  >
                    First
                  </button>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className='px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-black rounded shadow outline-none btn-pagination active:bg-blueGray-600 hover:shadow-md focus:outline-none'
                  >
                    Prev
                  </button>
                  <p>
                    {currentPage} of {Math.ceil(data?.length / itemsPerPage)}
                  </p>

                  <button
                    onClick={nextPage}
                    disabled={
                      currentPage === Math.ceil(data?.length / itemsPerPage)
                    }
                    className='px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-black rounded shadow outline-none btn-pagination active:bg-blueGray-600 hover:shadow-md focus:outline-none'
                  >
                    Next
                  </button>
                  <button
                    onClick={() =>
                      goToPage(Math.ceil(data?.length / itemsPerPage))
                    }
                    disabled={
                      currentPage === Math.ceil(data?.length / itemsPerPage)
                    }
                    className='px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-black rounded shadow outline-none btn-pagination active:bg-blueGray-600 hover:shadow-md focus:outline-none'
                  >
                    Last
                  </button>
                </div>
              </div>

              <div className='relative pt-1 '>
                <div
                  onClick={() => makePostRequest()}
                  className='flex mb-2 cursor-pointer'
                >
                  <div>
                    <span className='inline-block px-2 py-1 text-xs font-semibold text-black uppercase rounded-full bg-blueGray-200'>
                      Updating in &nbsp;{countDown}
                    </span>
                  </div>
                </div>
                <div className='flex h-2 mb-4 overflow-hidden text-xs rounded bg-emerald-200'>
                  <div
                    style={{ width: `${countDown * 1.68}%` }}
                    className='flex flex-col justify-center text-center text-black shadow-none whitespace-nowrap bg-emerald-500'
                  ></div>
                </div>
              </div>

              {/* 
              <div className="relative max-w-sm pt-1">
                <div className="flex items-center justify-between mb-2">
                  <div
                    onClick={() => makePostRequest()}
                    className="relative inline-block px-2 py-1 text-xs font-semibold text-black uppercase rounded-full cursor-pointer bg-blueGray-200 "
                  >
                    Updating in {countDown}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className='block w-full overflow-x-auto'>
            {/* Projects table */}

            <div className='relative flex flex-wrap items-stretch w-full p-5 mb-3'>
              <span className='absolute z-10 items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-blueGray-300'>
                <i className='fas fa-search'></i>
              </span>

              <input
                type='text'
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder='Search by Round ID'
                className='relative w-full px-3 py-3 pl-10 text-sm text-black bg-white rounded shadow outline-none placeholder-blueGray-300 focus:outline-none focus:shadow-outline'
              />
            </div>

            <table className='items-center w-full bg-transparent border-collapse'>
              <thead>
                <tr>
                  <th
                    className={
                      'px-6  align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black  border-blueGray-100'
                        : 'bg-blueGray-600 text-black  border-blueGray-500')
                    }
                  >
                    Round ID
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('roundId')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Bet Amount
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('betAmount')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    CashOut
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('cashOut')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Odds
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('betAmount')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Bets
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('betCount')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    RTP
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('rtp')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  ></th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((values) => {
                  return (
                    <tr
                      className='transition-all duration-200 cursor-pointer hover:bg-gray-100 drop-shadow-md '
                      onClick={() => fetchRoundBetsDetails(values.roundId)}
                      key={values.roundId}
                    >
                      <th className='flex items-center p-4 px-6 text-xs text-left text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        <img
                          src='/img/bootstrap.jpg'
                          className='hidden w-12 h-12 bg-white border rounded-full'
                          alt='...'
                        ></img>
                        <span className={'ml-3 font-bold '}>
                          {values.roundId}
                        </span>
                      </th>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap '>
                        ₹ {values.betAmount.toFixed(2)}
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        ₹ {values.cashOut.toFixed(2)}
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        {values.odds}x
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        {values.betCount}
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <span className='mr-2'>
                            <i
                              className={`${
                                values.rtp > 0.9
                                  ? 'text-red-500'
                                  : 'text-emerald-500'
                              } fas fa-circle    `}
                            ></i>
                            {values.rtp.toFixed(2)}
                          </span>
                          <div className='relative hidden w-full'>
                            <div className='flex h-2 overflow-hidden text-xs bg-red-200 rounded'>
                              <div
                                style={{ width: '60%' }}
                                className='flex flex-col justify-center text-center text-black bg-red-500 shadow-none whitespace-nowrap'
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='p-4 px-6 text-xs text-right text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        <TableDropdown />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RoundDataTable */}
      {showRoundDetails && (
        <div
          className={
            'relative flex flex-col min-w-0 break-words w-full mb-6   border rounded ' +
            (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-black')
          }
        >
          <div className='px-4 py-3 mb-0 border-0 rounded-t'>
            <div className='flex flex-wrap items-center'>
              <div className='relative flex-1 flex-grow w-full max-w-full px-4'>
                <h3
                  className={
                    'font-semibold text-lg ' +
                    (color === 'light' ? 'text-black' : 'text-black')
                  }
                >
                  <i
                    className='mr-2 cursor-pointer fas fa-arrow-left'
                    onClick={() => {
                      setShowRoundDetails(false);
                      setShowGameTable(true);
                    }}
                  ></i>
                  Bets Table
                </h3>
              </div>
            </div>
          </div>
          <div className='flex'>
            {operatorBetCount && (
              <div className='flex gap-4 text-black'>
                <div className='p-4 m-2 bg-gray-200 border rounded-lg'>
                  <strong>OperatorWise Bet Count </strong>
                  {Object.keys(operatorBetCount).map((item) => (
                    <div className='flex gap-2'>
                      <strong>{item}</strong>: {operatorBetCount[item]}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {roundBetsData && (
              <div className='p-4 m-2 bg-gray-200 border rounded-lg h-fit'>
                <div className='flex gap-2'>
                  <strong>Total Bet Count : </strong> &nbsp;
                  {roundBetsData.length}
                </div>
                <div className='flex gap-2'>
                  <strong>Total Bet Amount : </strong> &nbsp;₹
                  {Object?.values(roundBetsData)
                    .reduce((acc, entry) => acc + entry.betAmount, 0)
                    .toFixed(2)}
                </div>
                <div className='flex gap-2'>
                  <strong>Total Cashout Amount : </strong>&nbsp;₹
                  {Object?.values(roundBetsData)
                    .reduce(
                      (acc, entry) => acc + entry.cashOut * entry.betAmount,
                      0
                    )
                    .toFixed(2)}
                </div>
              </div>
            )}
          </div>
          <div className='block w-full overflow-x-auto'>
            {/* Projects table */}
            <div className='relative flex flex-wrap items-stretch w-full p-5 mb-3'>
              <span className='absolute z-10 items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-blueGray-300'>
                <i className='fas fa-search'></i>
              </span>

              <input
                type='text'
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder='Search by Bet ID'
                className='relative w-full px-3 py-3 pl-10 text-sm text-black bg-white rounded shadow outline-none placeholder-blueGray-300 focus:outline-none focus:shadow-outline'
              />
            </div>
            <table className='items-center w-full bg-transparent border-collapse'>
              <thead>
                <tr className='transition-all duration-200 cursor-pointer hover:bg-gray-100 drop-shadow-md '>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Bet ID
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('_id')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Username
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('betAmount')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Bet Amount
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('betAmount')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Cashout
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('cashOut')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Operator ID
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('cashOut')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Status
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('betCount')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Timestamp
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('rtp')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  ></th>
                </tr>
              </thead>
              <tbody>
                {roundBetsData?.map((values) => {
                  return (
                    <tr
                      className='transition-all duration-200 cursor-pointer hover:bg-gray-100 drop-shadow-md '
                      onClick={async () => {
                        setOperatorWiseUserDetails(
                          await getPlayerBets(values.userId, values.operatorId)
                        );
                        setShowRoundDetails(false);

                        // fetchUserDetails(values.userId, values.operatorId);
                      }}
                      key={values._id}
                    >
                      <th className='flex items-center p-4 px-6 text-xs text-left text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        <img
                          src='/img/bootstrap.jpg'
                          className='hidden w-12 h-12 bg-white border rounded-full'
                          alt='...'
                        ></img>
                        <span
                          className={
                            'ml-3 font-bold ' +
                            +(color === 'light' ? 'text-black' : 'text-black')
                          }
                        >
                          {values._id}
                        </span>
                      </th>
                      <td
                        className={`${
                          usernameCounts[values?.userName] > 1
                            ? 'bg-amber-100 '
                            : ``
                        }  border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black`}
                      >
                        {values.userName}
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        ₹ {values.betAmount.toFixed(2)}
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        ₹ {(values.cashOut * values.betAmount).toFixed(2)}
                        &nbsp;({values.cashOut}X)
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        {values.operatorId}
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <span className='mr-2'>
                            <i
                              className={`${
                                values.status == 'INIT' ||
                                values.status == 'CRASH'
                                  ? 'text-red-500'
                                  : 'text-emerald-500'
                              } fas fa-circle    `}
                            ></i>
                            {values.status}
                          </span>
                          <div className='relative hidden w-full'>
                            <div className='flex h-2 overflow-hidden text-xs bg-red-200 rounded'>
                              <div
                                style={{ width: '60%' }}
                                className='flex flex-col justify-center text-center text-black bg-red-500 shadow-none whitespace-nowrap'
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        {formatDate(values.timestamp)}
                      </td>
                      <td className='p-4 px-6 text-xs text-right text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        <TableDropdown />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* UserDataTable */}

      {operatorWiseUserDetails?.betHistory && (
        <div
          className={
            'relative flex flex-col min-w-0 break-words w-full mb-6   border rounded ' +
            (color === 'light' ? 'bg-white' : 'bg-emerald-700 text-black')
          }
        >
          <div className='px-4 py-3 mb-0 border-0 rounded-t'>
            <div className='flex flex-wrap items-center'>
              <div className='relative flex-1 flex-grow w-full max-w-full px-4'>
                <h3
                  className={
                    'font-semibold text-lg ' +
                    (color === 'light' ? 'text-black' : 'text-black')
                  }
                >
                  <i
                    className='mr-2 cursor-pointer fas fa-arrow-left'
                    onClick={() => {
                      setShowRoundDetails(true);
                      setOperatorWiseUserDetails();
                    }}
                  ></i>
                  {operatorWiseUserDetails?.betHistory[0]?.userName} Bets Table
                </h3>
                <div className='flex gap-4 mt-4 text-black '>
                  <div className='p-4 bg-gray-200 border rounded-lg'>
                    <strong>Total Bets :</strong>
                    {operatorWiseUserDetails.count}
                  </div>
                  <div className='p-4 bg-gray-200 border rounded-lg'>
                    <strong>RTP : </strong>
                    {operatorWiseUserDetails.betUserInfo[0].rtp?.toFixed(2)}
                  </div>
                  <div className='p-4 bg-gray-200 border rounded-lg'>
                    <strong>Total Bets :</strong>₹
                    {operatorWiseUserDetails.betUserInfo[0].betAmount?.toFixed(
                      2
                    )}
                  </div>
                  <div className='p-4 bg-gray-200 border rounded-lg'>
                    <strong>Total Cashouts :</strong>₹
                    {operatorWiseUserDetails.betUserInfo[0].cashOut?.toFixed(2)}
                  </div>
                  <div
                    className={`${
                      parseFloat(
                        (
                          operatorWiseUserDetails.betUserInfo[0].cashOut -
                          operatorWiseUserDetails.betUserInfo[0].betAmount
                        ).toFixed(2)
                      ) > 0
                        ? 'border-emerald-600'
                        : 'border-red-600'
                    } border-r-4 border-b-4 bg-gray-200     rounded-lg    p-4`}
                  >
                    <strong>Total P&L:</strong>₹
                    {parseFloat(
                      (
                        operatorWiseUserDetails.betUserInfo[0].cashOut -
                        operatorWiseUserDetails.betUserInfo[0].betAmount
                      ).toFixed(2)
                    )}
                  </div>
                </div>
              </div>
              <div className='relative pt-1 '>
                <div
                  onClick={
                    async () =>
                      setOperatorWiseUserDetails(
                        await getPlayerBets(
                          operatorWiseUserDetails.betHistory[0].userId,
                          operatorWiseUserDetails.betHistory[0].operatorId
                        )
                        // setOperatorWiseUserDetails(
                        //   await getPlayerBets(values.userId, values.operatorId)
                        // )
                      )
                    // fetchUserDetails(
                    //   operatorWiseUserDetails.betHistory[0].userId,
                    //   operatorWiseUserDetails.betHistory[0].operatorId
                    // )
                  }
                  className='flex items-center justify-between mb-2 cursor-pointer'
                >
                  <button
                    className='px-4 py-2 mb-1 mr-1 text-xs font-bold text-black uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-md focus:outline-none'
                    type='button'
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='block w-full overflow-x-auto'>
            {/* Projects table */}

            <div className='relative flex flex-wrap items-stretch w-full p-5 mb-3'>
              <span className='absolute z-10 items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-blueGray-300'>
                <i className='fas fa-search'></i>
              </span>
              <input
                type='text'
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder='Search by Round ID'
                className='relative w-full px-3 py-3 pl-10 text-sm text-black placeholder-gray-300 bg-white rounded shadow outline-none focus:outline-none focus:shadow-outline'
              />
            </div>
            <table className='items-center w-full bg-transparent border-collapse'>
              <thead>
                <tr>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Bet ID
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('_id')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Round ID
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('betAmount')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Bet Amount
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('betAmount')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Cashout
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('cashOut')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Odds
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('cashOut')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Status
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('betCount')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  >
                    Timestamp
                    <i
                      className='p-2 cursor-pointer fa fa-sort'
                      type='button'
                      onClick={() => requestSort('rtp')}
                    ></i>
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-black border-blueGray-100'
                        : 'bg-blueGray-600 text-black border-blueGray-500')
                    }
                  ></th>
                </tr>
              </thead>
              <tbody>
                {operatorWiseUserDetails.betHistory?.map((values) => {
                  return (
                    <tr
                      className='transition-all duration-200 cursor-pointer hover:bg-gray-100 drop-shadow-md '
                      key={values._id}
                    >
                      <th className='flex items-center p-4 px-6 text-xs text-left text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        <img
                          src='/img/bootstrap.jpg'
                          className='hidden w-12 h-12 bg-white border rounded-full'
                          alt='...'
                        ></img>
                        <span
                          className={
                            'ml-3 font-bold ' +
                            +(color === 'light' ? 'text-black' : 'text-black')
                          }
                        >
                          {values._id}
                        </span>
                      </th>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        {values.roundId}
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        ₹ {values.betAmount}
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        ₹ {(values.cashOut * values.betAmount).toFixed(2)}
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        {values.odds > 0 ? values.odds : values.cashOut}
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <span className='mr-2'>
                            <i
                              className={`${
                                values.status == 'INIT' ||
                                values.status == 'CRASH'
                                  ? 'text-red-500'
                                  : 'text-emerald-500'
                              } fas fa-circle    `}
                            ></i>
                            {values.status}
                          </span>
                          <div className='relative hidden w-full'>
                            <div className='flex h-2 overflow-hidden text-xs bg-red-200 rounded'>
                              <div
                                style={{ width: '60%' }}
                                className='flex flex-col justify-center text-center text-black bg-red-500 shadow-none whitespace-nowrap'
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='p-4 px-6 text-xs text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        {formatDate(values.timestamp)}
                      </td>
                      <td className='p-4 px-6 text-xs text-right text-black align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap'>
                        <TableDropdown />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

CardTable.defaultProps = {
  color: 'light',
  tableData: [],
};

CardTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
