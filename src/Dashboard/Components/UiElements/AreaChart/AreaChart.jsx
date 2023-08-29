/**
 * AreaChart - returns area chart as statistical view, based on data it gets
 * @params {array} args.data - 
 */
import ReactApexChart from "react-apexcharts";
import cd_information from '../../../../assets/icons/cd-information-circle.svg'


const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const AreaChart = ({ data }) => {
  const onChangeHandler = (event) => {
    console.log(event.target.value)
  }
  const options = {
    chart: {
      id: "area-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.map((item) => MONTH[item.month - 1]),
      lines: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value;
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',

    },
    stroke: {
      colors: ["#3E949A", "#F2C852"],
      curve: "straight",
    },
    fill: {
      type: "gradient",
      colors: ["#3E949A", "#F2C852"],
    },
    grid: {
      show: true,
      borderColor: "#0000001f",
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
        opacity: 0.2,
      },
      column: {
        colors: undefined,
        opacity: 0.2,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    colors: ["#3E949A", "#F2C852"],
  };

  const series = [
    {
      name: "Request",
      data: data.map((item) => item.request),
    },
    {
      name: "Order",
      data: data.map((item) => item.order),
    },
  ];
  return (
    <div className="relative">
      <div className='w-full absolute flex justify-between'>
        <h4 className="text-base font-semibold text-secondary flex items-center gap-2">
          <span>Request vs Order</span>
          <img src={cd_information} alt="cd_information" />
        </h4>
        <div>
          <div className="bg-[#CFF6EF] px-2 py-1 absolute right-0 top-0  rounded">
            <div className="">
              <span className=""></span>
            </div>
            <select
              className="text-xs text-secondary border-none bg-[#CFF6EF] outline-none rounded-md py-0 px-0"
              onChange={onChangeHandler}
              name="category"
              id="category"
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={400}
      />
    </div>
  );
};

export default AreaChart;
