let selectedTeams = []
choiceTable = d3.selectAll('.list-group-item.list-group-item-action');
  
choiceTable
  .on('click', function() {
    d3.select(this)
      .style('color', 'red');
      selectedTeams.push(this.innerHTML);
      console.log(selectedTeams);
  });


let gamesPlayed = []
let wins = []
let losses = []
let goalsPerGame = []

function random_rgba() {
  let o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

let faceOffWin = []
let promise2 = d3.json("/stat.faceOffWinPercentage", function(data) {
  data.forEach(d => {
    faceOffWin.push(d);
  })
  console.log(faceOffWin);
});

let teamList = []
let promise1 = d3.json("/teamname", function(data) {
  data.forEach(d => {
    teamList.push(d);
    console.log(typeof(d))
  })
  console.log(teamList[0]);
});

// let radarDataset = []
// Promise.all([promise1, promise2]).then(
//   for (i = 0; i < teamList.length; i++) {
//   radarDataset.push(
//     {
//     "label": teamList[i],
//     "fill": true,
//     "backgroundColor": random_rgba(i),
//     "borderColor": random_rgba(i),
//     "pointBorderColor": random_rgba(i),
//     "pointBackgroundColor": random_rgba(i),
//     "data": faceOffWin[i]
//   }}
// ));

// console.log(radarDataset)

let radarDataset = []
Promise.all([promise1, promise2]).then(function(d) {
  console.log(teamList)}
  // for (i = 0; i < teamList.length; i++) {
  //   console.log(radarDataset)
  //   radarDataset.push(
  //     {
  //       label: teamList[i],
  //       fill: true,
  //       backgroundColor: random_rgba(i),
  //       borderColor: random_rgba(i),
  //       pointBorderColor: random_rgba(i),
  //       pointBackgroundColor: random_rgba(i),
  //       data: faceOffWin[i]
  //     }
  );
  

  






// d3.json("/team_stats", function(data) {
//   for (i = 0; i < 31; i++) {
//   teamList.push(data[i]["stats"][0]["splits"][0]["team"]["name"]);
//   gamesPlayed.push(data[i]["stats"][0]["splits"][0]["stat"]["gamesPlayed"]);
//   wins.push(data[i]["stats"][0]["splits"][0]["stat"]["wins"]);
//   losses.push(data[i]["stats"][0]["splits"][0]["stat"]["losses"]);
//   goalsPerGame.push(data[i]["stats"][0]["splits"][0]["stat"]["goalsPerGame"]);
//   console.log(teamList[i])
// }});
// new Chart(document.getElementById("radar-chart"), {

//   type: 'radar',
//   data: {
//     labels: [
//       "Face Off Win Percentage", 
//       "Goals Against Per Game", 
//       "Goals Per Game", 
//       "Save Percentage", 
//       "Shooting"
//     ],
//     datasets: radarDataset
//   },
//   options: {
//     title: {
//       display: true,
//       text: 'NHL Team Statistics'
//     }
//   }
// };