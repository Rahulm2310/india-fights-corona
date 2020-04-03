$(document).ready(function() {
  let confirmed = 0;
  let active = 0;
  let recovered = 0;
  let deaths = 0;
  let updatedTime = "";
  let stateWiseData = [];
  fetch("https://api.covid19india.org/data.json")
    .then(res => res.json())
    .then(data => {
      confirmed = data.statewise[0].confirmed;
      active = data.statewise[0].active;
      recovered = data.statewise[0].recovered;
      deaths = data.statewise[0].deaths;
      updatedTime = data.statewise[0].lastupdatedtime;
      let timeFromNow = moment(updatedTime, "DD-MM-YYYY HH:mm:ss").fromNow();

      $(".card-body .confirmed").text(confirmed);
      $(".card-body .active").text(active);
      $(".card-body .recovered").text(recovered);
      $(".card-body .deaths").text(deaths);
      $(".updated-time").text(`Last updated : ${timeFromNow}`);

      stateWiseData = data.statewise;
      stateWiseData = stateWiseData.slice(1);

      stateWiseData.sort((a, b) => b.confirmed - a.confirmed);

      tableRows = stateWiseData.map(
        item => `<tr class="table-secondary">
        <th scope="row">${item.state}</th>
        <td class="text-center">${item.confirmed}</td>
        <td class="text-center">${item.active}</td>
        <td class="text-center">${item.recovered}</td>
        <td class="text-center">${item.deaths}</td>
      </tr>`
      );

      $(".statewise-table").html(tableRows.join(""));
    });

  $("footer p").text("Designed and Maintained by Rahul Mohata");
});
