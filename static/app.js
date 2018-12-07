// let selectedTeams = []
// choiceTable = d3.selectAll('.list-group-item.list-group-item-action');
  
// choiceTable
//   .on('click', function() {
//     d3.select(this)
//       .style('color', 'red');
//       selectedTeams.push(this.innerHTML);
//       console.log(selectedTeams);
//   });

function random_rgba() {
  let o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

let faceOffWin = []
let teamList = []
let gamesPlayed = []
let wins = []
let losses = []
let goalsPerGame = []
let winOutshootPct = []
let winScoreFirstPct = []
let radarDataset = []

d3.json("/test").then(function(d) {
  faceOffWin.push(d['fo_win_pct'])
  teamList.push(d['team_name'])
  gamesPlayed.push(d['games_played'])
  losses.push(d['losses'])
  wins.push(d['wins'])
  winOutshootPct.push(d['win_outshoot_pct'])
  winScoreFirstPct.push(d['win_scorefirst_pct'])
}).then(function() {
  for (i = 0; i < 31; i++) {
    radarDataset.push(
      {
      "label": teamList[0][i],
      "fill": true,
      "backgroundColor": random_rgba(i),
      "borderColor": random_rgba(i),
      "pointBorderColor": random_rgba(i),
      "pointBackgroundColor": random_rgba(i),
      "hidden": true,
      "data": [faceOffWin[0][i], gamesPlayed[0][i], losses[0][i], wins[0][i], winOutshootPct[0][i]]
    })};

}).then(new Chart(document.getElementById("radar-chart"), {

  type: 'radar',
  data: {
    labels: [
      "Face Off Win Percentage", 
      "Goals Against Per Game", 
      "Goals Per Game", 
      "Save Percentage", 
      "Shooting"
    ],
    datasets: radarDataset
  },
  options: {
    title: {
      display: true,
      text: 'NHL Team Statistics'
    }
  }
}));



