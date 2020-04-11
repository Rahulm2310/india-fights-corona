$(document).ready(function () {
  let confirmed = 0;
  let active = 0;
  let recovered = 0;
  let deaths = 0;
  let confirmedToday = 0;
  let recoveredToday = 0;
  let deathsToday = 0;
  let mortalityRate = 0;
  let updatedTime = "";
  let stateWiseData = [];
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

      let timeFromNow = moment(updatedTime, "DD-MM-YYYY HH:mm:ss").fromNow();

      $(".card-body .confirmed").text(confirmed);
      $(".card-body .active").text(active);
      $(".card-body .recovered").text(recovered);
      $(".card-body .deaths").text(deaths);
      $(".card-body .mortality-rate").text(`${mortalityRate} %`);
      $(".card-body .confirmed-today").text(`(+${confirmedToday})`);
      $(".card-body .recovered-today").text(`(+${recoveredToday})`);
      $(".card-body .deaths-today").text(`(+${deathsToday})`);
      $(".updated-time").text(`Last updated : ${timeFromNow}`);

      stateWiseData = data.statewise;

      stateWiseData = stateWiseData.slice(1);

      dateWiseData = data.cases_time_series;
      dateWiseData = dateWiseData
        .slice(dateWiseData.length - 7, dateWiseData.length)
        .reverse();

      stateWiseData.sort((a, b) => b.confirmed - a.confirmed);

      stateTableRows = stateWiseData.map(
        (item) => `<tr class="table-secondary">
        <th scope="row">${item.state}</th>
        <td class="text-center">${item.confirmed}</td>
        <td class="text-center">${item.active}</td>
        <td class="text-center">${item.recovered}</td>
        <td class="text-center">${item.deaths}</td>
      </tr>`
      );

      $(".statewise-table").html(stateTableRows.join(""));

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

  $("footer p").text("Designed and Maintained by Rahul Mohata");
});
