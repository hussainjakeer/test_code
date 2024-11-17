import moment from "moment";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const data = [
  { Date: "2024-01-30", Clicks: 0, Impressions: 7 },
  { Date: "2024-01-29", Clicks: 0, Impressions: 9 },
  { Date: "2024-01-28", Clicks: 0, Impressions: 9 },
  { Date: "2024-01-27", Clicks: 1, Impressions: 14 },
  { Date: "2024-01-26", Clicks: 0, Impressions: 9 },
  { Date: "2024-01-25", Clicks: 1, Impressions: 7 },
  { Date: "2024-01-24", Clicks: 0, Impressions: 4 },
  { Date: "2024-01-23", Clicks: 0, Impressions: 11 },
  { Date: "2024-01-22", Clicks: 1, Impressions: 11 },
  { Date: "2024-01-21", Clicks: 0, Impressions: 9 },
  { Date: "2024-01-20", Clicks: 2, Impressions: 14 },
  { Date: "2024-01-19", Clicks: 1, Impressions: 14 },
  { Date: "2024-01-18", Clicks: 1, Impressions: 9 },
  { Date: "2024-01-17", Clicks: 0, Impressions: 16 },
  { Date: "2024-01-16", Clicks: 0, Impressions: 13 },
  { Date: "2024-01-15", Clicks: 2, Impressions: 18 },
  { Date: "2024-01-14", Clicks: 1, Impressions: 24 },
  { Date: "2024-01-13", Clicks: 1, Impressions: 7 },
  { Date: "2024-01-12", Clicks: 0, Impressions: 6 },
  { Date: "2024-01-11", Clicks: 0, Impressions: 3 },
  { Date: "2024-01-10", Clicks: 0, Impressions: 13 },
  { Date: "2024-01-09", Clicks: 0, Impressions: 11 },
  { Date: "2024-01-08", Clicks: 2, Impressions: 16 },
  { Date: "2024-01-07", Clicks: 0, Impressions: 11 },
  { Date: "2024-01-06", Clicks: 0, Impressions: 9 },
  { Date: "2024-01-05", Clicks: 0, Impressions: 13 },
  { Date: "2024-01-04", Clicks: 0, Impressions: 6 },
  { Date: "2024-01-03", Clicks: 2, Impressions: 8 },
  { Date: "2024-01-02", Clicks: 1, Impressions: 8 },
  { Date: "2024-01-01", Clicks: 0, Impressions: 5 },
  { Date: "2023-12-31", Clicks: 1, Impressions: 17 },
  { Date: "2023-12-30", Clicks: 2, Impressions: 15 },
  { Date: "2023-12-29", Clicks: 0, Impressions: 11 },
  { Date: "2023-12-28", Clicks: 0, Impressions: 22 },
  { Date: "2023-12-27", Clicks: 0, Impressions: 21 },
  { Date: "2023-12-26", Clicks: 0, Impressions: 9 },
  { Date: "2023-12-25", Clicks: 1, Impressions: 16 },
  { Date: "2023-12-24", Clicks: 0, Impressions: 7 },
  { Date: "2023-12-23", Clicks: 2, Impressions: 23 },
  { Date: "2023-12-22", Clicks: 2, Impressions: 17 },
  { Date: "2023-12-21", Clicks: 2, Impressions: 17 },
  { Date: "2023-12-20", Clicks: 2, Impressions: 13 },
  { Date: "2023-12-19", Clicks: 0, Impressions: 10 },
  { Date: "2023-12-18", Clicks: 1, Impressions: 8 },
  { Date: "2023-12-17", Clicks: 3, Impressions: 6 },
];

const ChartComponent = () => {
  const { isSideMenuOpen } = useSelector((state) => state?.common);

  const monthlyData = data.reduce((acc, curr) => {
    const month = moment(curr.Date).format("YYYY-MM");

    if (!acc[month]) {
      acc[month] = { Clicks: 0, Impressions: 0 };
    }

    acc[month].Clicks += curr.Clicks;
    acc[month].Impressions += curr.Impressions;

    return acc;
  }, {});

  const months = Object.keys(monthlyData);
  const clicks = months.map((month) => monthlyData[month].Clicks);
  const impressions = months.map((month) => monthlyData[month].Impressions);

  const chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: months,
    },
    yaxis: [
      {
        title: {
          text: "Clicks",
        },
      },
      {
        opposite: true,
        title: {
          text: "Impressions",
        },
      },
    ],
    stroke: {
      curve: "smooth",
    },
  };

  const chartSeries = [
    {
      name: "Clicks",
      data: clicks,
    },
    {
      name: "Impressions",
      data: impressions,
    },
  ];

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [isSideMenuOpen]);

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={350}
    />
  );
};

export default ChartComponent;
