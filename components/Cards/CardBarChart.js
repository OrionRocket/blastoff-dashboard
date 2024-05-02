import React, {useEffect} from "react";
import Chart from "chart.js";
import { useAppContext } from "context/state";

export default function CardBarChart() {
  
  const {
    barGraphData,
    getRoundsData,
  } = useAppContext();

  useEffect(() => {
    getRoundsData();
  
    return () => {
       
    }
  }, [])
  
  

  useEffect(() => {
    let config = {
      type: "bar",
      data: barGraphData,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
    return () => {
       
    }
  }, [barGraphData])
  

  return (
    <>
    <dialog id="my_modal_4" className="modal ">
    <form method="dialog" className=" modal-box p-0 w-11/12 max-w-5xl">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

      <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Total Bets
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-[500px]">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
      </form>
      <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
    </dialog>
    </>
  );
}
