import React, { Component } from "react";
import Chart from "react-apexcharts";

class AdminProfileChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Total Plays",
          align: "left",
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          row: {
            colors: ["transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [],
          align: "right",
        },
        colors: ["#A64358"],
      },

      series: [
        {
          name: "Desktops",
          data: [10, 61, 42, 77],
          align: "right",
        },
      ],
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height={350}
      />
    );
  }
}

export default AdminProfileChart;
