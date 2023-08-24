/**
 * @returns JSx of heatmap in dashboard statistical view
 * 
 */
import ReactApexChart from "react-apexcharts";
import { heatMap } from "../../../../Store/Data";
// 
const HeatMap = () => {
  const options = {
    chart: {
      height: 400,
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      heatmap: {
        radius: 12,
      },
    },
    colors: ["#3E949A"],
    xaxis: {
      labels: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    grid: {
      show: true,
      borderColor: "#ffffff",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      row: {
        colors: undefined,
        opacity: 1,
      },
      column: {
        colors: undefined,
        opacity: 1,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between relative">
        <h4 className="text-base font-semibold text-secondary mb-5">
          Sales Heat Map
        </h4>
      </div>
      <ReactApexChart
        options={options}
        series={heatMap}
        type="heatmap"
        height={400}
        width={325}
      />
    </div>
  );
};
export default HeatMap;
