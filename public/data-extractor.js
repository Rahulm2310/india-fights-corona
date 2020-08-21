let confirmed = 0;
let active = 0;
let recovered = 0;
let deaths = 0;
let confirmedToday = 0;
let recoveredToday = 0;
let deathsToday = 0;
let mortalityRate = 0;
let recoveryRate = 0;
let tested = 0;
let testedToday = 0;
let updatedTime = "";
let stateWiseData = [];
let districtWiseData = [];
let dateWiseData = [];
let indiaTimeSeriesArray = [];
var myChart = null;
let highestConfirmed = 0;
let highestConfirmedToday = 0;
let highestRecovery = 0;
let highestMortality = 0;

$(document).ready(function () {
  fetch("https://api.covid19india.org/data.json")
    .then((res) => res.json())
    .then((data) => {
      confirmed = data.statewise[0].confirmed;
      active = data.statewise[0].active;
      recovered = data.statewise[0].recovered;
      deaths = data.statewise[0].deaths;
      confirmedToday = data.statewise[0].deltaconfirmed;
      recoveredToday = data.statewise[0].deltarecovered;
      deathsToday = data.statewise[0].deltadeaths;
      updatedTime = data.statewise[0].lastupdatedtime;
      mortalityRate = ((deaths / confirmed) * 100).toFixed(2);
      recoveryRate = ((recovered / confirmed) * 100).toFixed(2);
      tested = data.tested[data.tested.length - 1].totalsamplestested;
      testedToday = data.tested[data.tested.length - 1].samplereportedtoday;

      let timeFromNow = moment(updatedTime, "DD-MM-YYYY HH:mm:ss").fromNow();

      $(".card-body .confirmed").text(confirmed);
      $(".card-body .active").text(active);
      $(".card-body .recovered").text(recovered);
      $(".card-body .deaths").text(deaths);
      $(".card-body .mortality-rate").text(`${mortalityRate} %`);
      $(".card-body .recovery-rate").text(`${recoveryRate} %`);
      $(".card-body .tested").text(tested);
      $(".card-body .tested-today").text(`(+${testedToday})`);
      $(".card-body .confirmed-today").text(`(+${confirmedToday})`);
      $(".card-body .recovered-today").text(`(+${recoveredToday})`);
      $(".card-body .deaths-today").text(`(+${deathsToday})`);
      $(".updated-time").text(`Last updated ${timeFromNow}`);

      stateWiseData = data.statewise;

      stateWiseData = stateWiseData.slice(1);

      dateWiseData = data.cases_time_series;
      dateWiseData = dateWiseData
        .slice(dateWiseData.length - 7, dateWiseData.length)
        .reverse();

      stateWiseData.sort((a, b) => b.confirmed - a.confirmed);

      highestConfirmed = stateWiseData[0].confirmed;
      highestConfirmedToday = stateWiseData[0].deltaconfirmed;
      stateWiseData.forEach((item) => {
        if ((item.recovered / item.confirmed) * 100 > highestRecovery) {
          highestRecovery = (item.recovered / item.confirmed) * 100;
        }
        if ((item.deaths / item.confirmed) * 100 > highestMortality) {
          highestMortality = (item.deaths / item.confirmed) * 100;
        }
      });

      $(".highest-confirmed").text(highestConfirmed);
      $(".highest-confirmed-today").text(`(+${highestConfirmedToday})`);
      $(".highest-recovery").text(`${highestRecovery.toFixed(2)} %`);
      $(".highest-mortality").text(`${highestMortality.toFixed(2)} %`);

      stateTableRows = stateWiseData.map(
        (
          item
        ) => `<tr class="table-secondary" data-toggle="modal" data-target="#exampleModalCenter">
        <th scope="row">${item.state}</th>
        <td class="text-center">${item.confirmed}</td>
        <td class="text-center">${item.active}</td>
        <td class="text-center">${item.recovered}</td>
        <td class="text-center">${item.deaths}</td>
      </tr>`
      );

      $(".statewise-table").html(stateTableRows.join(""));

      // ========================= CHARTS =====================================

      indiaTimeSeriesArray = data.cases_time_series;
      // console.log(indiaTimeSeriesArray);
      createChart(indiaTimeSeriesArray.filter((item, index) => index % 7 == 0));

      // ==================== DATE WISE TABLE ==========================
      dateTableRows = dateWiseData.map(
        (item) => `<tr class="table-secondary">
        <th scope="row">${item.date}</th>
        <td class="text-center">${item.totalconfirmed}</td>
        <td class="text-center">${
          item.totalconfirmed - item.totalrecovered - item.totaldeceased
        }</td>
        <td class="text-center">${item.totalrecovered}</td>
        <td class="text-center">${item.totaldeceased}</td>
      </tr>`
      );

      $(".datewise-table").html(dateTableRows.join(""));
    });

  $(".chart-control-btns .btn").on("click", function () {
    const chartType = document.querySelector("select.dropdown-container").value;
    // console.log("chart type:", chartType);
    // console.log("pressed");
    const time = $(this).text().trim();
    // console.log(time);
    if (time == "Beginning") {
      console.log(indiaTimeSeriesArray.filter((item, index) => index % 7 == 0));
      createChart(
        indiaTimeSeriesArray.filter((item, index) => index % 7 == 0),
        chartType
      );
    } else if (time == "3 months") {
      console.log(
        indiaTimeSeriesArray.filter(
          (item, index) =>
            index > indiaTimeSeriesArray.length - 90 && index % 3 == 0
        )
      );
      createChart(
        indiaTimeSeriesArray.filter(
          (item, index) =>
            index > indiaTimeSeriesArray.length - 90 && index % 3 == 0
        ),
        chartType
      );
    } else if (time == "1 month") {
      console.log(
        indiaTimeSeriesArray.filter(
          (item, index) => index > indiaTimeSeriesArray.length - 31
        )
      );
      createChart(
        indiaTimeSeriesArray.filter(
          (item, index) => index > indiaTimeSeriesArray.length - 31
        ),
        chartType
      );
    }
  });

  // ==============================================================

  // ============================== DISTRICT WISE TABLE ========================
  fetch("https://api.covid19india.org/state_district_wise.json")
    .then((res) => res.json())
    .then((data) => {
      districtWiseData = data;
    });

  $(".statewise-table").on("click", "tr", function () {
    let stateName = $(this).children("th").text();
    $(".modal-title").text(stateName);

    if (districtWiseData[stateName] == null) {
      $(".state-updated-time").text("");

      $(".districtwise-table").html(
        `<tr class="table-secondary">
        <th scope="row">-</th>
        <td class="text-center">-</td>
        <td class="text-center">-</td>
        <td class="text-center">-</td>
        <td class="text-center">-</td></tr>`
      );
      $(".state-confirmed").text("0");
      $(".state-confirmed-today").text("");

      $(".state-active").text("0");

      $(".state-recovered").text("0");
      $(".state-recovered-today").text("");

      $(".state-deaths").text("0");
      $(".state-deaths-today").text("");

      return;
    }

    let districtwisedata = districtWiseData[stateName].districtData;

    var districtTableRows = Object.keys(districtwisedata).map(function (key) {
      return `<tr class="table-secondary">
      <th scope="row">${key}</th>
      <td class="text-center">${districtwisedata[key].confirmed}</td>
      <td class="text-center">${districtwisedata[key].active}</td>
      <td class="text-center">${districtwisedata[key].recovered}</td>
      <td class="text-center">${districtwisedata[key].deceased}</td>
    </tr>`;
    });

    $(".districtwise-table").html(districtTableRows.join(""));

    let stateData = stateWiseData.filter((item) => item.state === stateName);
    console.log(stateData);

    $(".state-confirmed").text(stateData[0].confirmed);
    if (stateData[0].deltaconfirmed !== "0") {
      $(".state-confirmed-today").text(`(+${stateData[0].deltaconfirmed})`);
    } else {
      $(".state-confirmed-today").text("");
    }
    $(".state-active").text(stateData[0].active);
    $(".state-recovered").text(stateData[0].recovered);

    if (stateData[0].deltarecovered !== "0") {
      $(".state-recovered-today").text(`(+${stateData[0].deltarecovered})`);
    } else {
      $(".state-recovered-today").text("");
    }
    $(".state-deaths").text(stateData[0].deaths);

    if (stateData[0].deltadeaths !== "0") {
      $(".state-deaths-today").text(`(+${stateData[0].deltadeaths})`);
    } else {
      $(".state-deaths-today").text("");
    }

    let lastUpdatedTime = stateData[0].lastupdatedtime;
    let updatedFromNow = moment(
      lastUpdatedTime,
      "DD-MM-YYYY HH:mm:ss"
    ).fromNow();

    $(".state-updated-time").text(`( Last updated ${updatedFromNow} )`);
  });
});

function selectChart(value) {
  // console.log(value);
  // console.log(indiaTimeSeriesArray);
  // if (value == "pie") {
  //   $(".chart-control-btns input").attr("disabled", true);
  //   createPieChart();
  // }
  // if (value == "radar") {
  //   $(".chart-control-btns input").attr("disabled", true);
  //   createChart(
  //     indiaTimeSeriesArray.filter(
  //       (item, index) => index > indiaTimeSeriesArray.length - 31
  //     ),
  //     value
  //   );
  // } else {
  //   $(".chart-control-btns input").attr("disabled", false);
  createChart(
    indiaTimeSeriesArray.filter((item, index) => index % 7 == 0),
    value
  );
  // }
}

function createChart(indiaTimeSeries, chartType = "line") {
  const totalConfirmed = indiaTimeSeries.map((item) => item.totalconfirmed);
  const totalActive = indiaTimeSeries.map(
    (item) => item.totalconfirmed - item.totalrecovered - item.totaldeceased
  );
  const totalRecovered = indiaTimeSeries.map((item) => item.totalrecovered);
  const totalDeaths = indiaTimeSeries.map((item) => item.totaldeceased);
  const dates = indiaTimeSeries.map((item, index) => {
    // if (index % 30 == 0) {
    return item.date;
    // }
  });
  if (myChart) {
    myChart.destroy();
  }
  var ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    // The type of chart we want to create
    type: chartType == "area" ? "line" : chartType,

    // The data for our dataset
    data: {
      labels: dates,
      datasets: [
        {
          label: "Confirmed",
          backgroundColor:
            chartType == "line" ? "transparent" : "rgba(213,102,98,0.7)",
          borderColor: "#c52d28",
          data: totalConfirmed,
        },
        {
          label: "Active",
          backgroundColor:
            chartType == "line" ? "transparent" : "rgba(213,102,98,0.7)",
          borderColor: "#DF691A",
          data: totalActive,
        },

        {
          label: "Recovered",
          backgroundColor:
            chartType == "line" ? "transparent" : "rgba(92,184,92,0.7)",
          borderColor: "#5cb85c",
          data: totalRecovered,
        },
        {
          label: "Deaths",
          backgroundColor: chartType == "line" ? "transparent" : "grey",
          borderColor: "#4E5D6C",
          data: totalDeaths,
        },
      ],
    },

    // Configuration options go here
    options: {
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 1000,
      color: "#fff",
    },
  });
}

// const createPieChart = () => {
//   var ctx = document.getElementById("myChart").getContext("2d");
//   var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: "pie",

//     // The data for our dataset
//     data: {
//       labels: ["Active", "Recovered", "Deaths"],
//       datasets: [
//         {
//           label: "Active",
//           backgroundColor: "rgba(213,102,98,0.7)",
//           borderColor: "#c52d28",
//           data: [{ active, backgroundColor: "red" }],
//         },
//         {
//           label: "Recovered",
//           backgroundColor: "green",
//           borderColor: "green",
//           data: [recovered],
//         },
//         {
//           label: "Recovered",
//           backgroundColor: "grey",
//           borderColor: "grey",
//           data: [deaths],
//         },
//       ],
//     },

//     // Configuration options go here
//     options: {
//       responsive: true,
//       maintainAspectRatio: true,
//       responsiveAnimationDuration: 1000,
//       // color: "#fff",
//     },
//   });
// };
