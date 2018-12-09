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
  let o = Math.round, r = Math.random, s = 205;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.5 + ')';
}

let teamList = []
let faceOffWin = []
let shootingPctRank = []
let winsRank = []
let ptsRank = []
let goalsPerGameRank = []
let radarDataset = []

d3.json("/test").then(function(d) {
  teamList.push(d['teamName'])
  ptsRank.push(d['pts'])
  faceOffWin.push(d['faceOffWinPercentage'])
  goalsPerGameRank.push(d['goalsPerGame'])
  shootingPctRank.push(d['shootingPctRank'])
  winsRank.push(d['wins'])
  
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
      "data": [ptsRank[0][i], faceOffWin[0][i], goalsPerGameRank[0][i], shootingPctRank[0][i], winsRank[0][i], ]
    })};

}).then(new Chart(document.getElementById("radar-chart"), {

  type: 'radar',
  data: {
    labels: [
      "Points Rank", 
      "Face off Win Rank", 
      "Goals Per Game Rank", 
      "Shooting Percentage Rank", 
      "Wins Rank"
    ],
    datasets: radarDataset
  },

  options: {

    legend: {
      position: 'top',
      labels: {
        fontColor: 'white',
        fontSize: 30
      }

    },
    title: {
      display: true,
      text: 'NHL Team Statistics',
      fontColor: 'white'
    },

    scale: {

      ticks: {
        reverse: true,
        beginAtZero: true,
        suggestedMin: 31,
        suggestedMax: 31,
        stepSize: 1
      },
      pointLabels: {
        fontColor: 'white'
      },
      angleLines: {
        color: 'white'
      },
      gridLines: {
        color: 'white'
      },
    }

  }
}));



