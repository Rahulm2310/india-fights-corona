$(document).ready(function () {
  //   fetch("https://api.covid19india.org/v4/timeseries.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  //   fetch("https://api.covid19india.org/data.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data);
  //       let indiaTimeSeries = data.cases_time_series;
  //       console.log(indiaTimeSeries);
  //       const totalConfirmed = indiaTimeSeries.map((item) => item.totalconfirmed);
  //       const totalActive = indiaTimeSeries.map(
  //         (item) => item.totalconfirmed - item.totalrecovered - item.totaldeceased
  //       );
  //       const totalRecovered = indiaTimeSeries.map((item) => item.totalrecovered);
  //       const totalDeaths = indiaTimeSeries.map((item) => item.totaldeceased);
  //       const dates = indiaTimeSeries.map((item, index) => {
  //         // if (index % 30 == 0) {
  //         return item.date;
  //         // }
  //       });
  //       var ctx = document.getElementById("myChart").getContext("2d");
  //       var chart = new Chart(ctx, {
  //         // The type of chart we want to create
  //         type: "line",
  //         // The data for our dataset
  //         data: {
  //           labels: dates,
  //           datasets: [
  //             {
  //               label: "Confirmed",
  //               backgroundColor: "transparent",
  //               borderColor: "#c52d28",
  //               data: totalConfirmed,
  //             },
  //             {
  //               label: "Active",
  //               backgroundColor: "transparent",
  //               borderColor: "#DF691A",
  //               data: totalActive,
  //             },
  //             {
  //               label: "Recovered",
  //               backgroundColor: "transparent",
  //               borderColor: "#5cb85c",
  //               data: totalRecovered,
  //             },
  //             {
  //               label: "Deaths",
  //               backgroundColor: "transparent",
  //               borderColor: "#4E5D6C",
  //               data: totalDeaths,
  //             },
  //           ],
  //         },
  //         // Configuration options go here
  //         options: {
  //           responsive: true,
  //           maintainAspectRatio: true,
  //           responsiveAnimationDuration: 1000,
  //           color: "#fff",
  //         },
  //       });
  //     });
});
