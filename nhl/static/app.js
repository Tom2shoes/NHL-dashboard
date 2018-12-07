let teamList = ['New Jersey Devils', 'New York Islanders', 'New York Rangers', 'Philadelphia Flyers', 'Pittsburgh Penguins', 'Boston Bruins', 'Buffalo Sabres', 'Montréal Canadiens', 'Ottawa Senators', 'Toronto Maple Leafs', 'Carolina Hurricanes', 'Florida Panthers', 'Tampa Bay Lightning', 'Washington Capitals', 'Chicago Blackhawks', 'Detroit Red Wings', 'Nashville Predators', 'St. Louis Blues', 'Calgary Flames', 'Colorado Avalanche', 'Edmonton Oilers', 'Vancouver Canucks', 'Anaheim Ducks', 'Dallas Stars', 'Los Angeles Kings', 'San Jose Sharks', 'Columbus Blue Jackets', 'Minnesota Wild', 'Winnipeg Jets', 'Arizona Coyotes', 'Vegas Golden Knights']


let gamesPlayed = [25, 25, 27, 25, 25, 26, 27, 26, 27, 27, 25, 25, 27, 26, 27, 26, 27, 25, 26, 26, 26, 29, 29, 27, 26, 27, 26, 26, 25, 25, 28]
let wins = [9, 13, 13, 11, 10, 14, 17, 12, 12, 19, 12, 10, 19, 15, 9, 12, 18, 9, 15, 15, 13, 11, 14, 14, 9, 12, 15, 14, 15, 12, 14]
let losses = [11, 9, 12, 12, 10, 8, 7, 9, 12, 8, 9, 10, 7, 8, 13, 11, 8, 13, 9, 6, 11, 15, 10, 10, 16, 10, 9, 10, 8, 11, 13]
let goalsPerGame = [2.96, 3.0, 2.704, 3.0, 3.32, 2.692, 3.037, 3.077, 3.63, 3.63, 2.6, 3.24, 3.778, 3.56, 2.778, 2.846, 3.259, 2.96, 3.385, 3.731, 2.692, 2.793, 2.214, 2.741, 2.115, 3.037, 3.462, 3.192, 3.48, 2.6, 2.893]


let scrollTable = d3.select('.list-group')

// itterates though teamList and appends a new selection
// teamList.forEach(function(d) {
//   console.log(d);
//   scrollTable.append("li")
//     .attr('class', "list-group-item list-group-item-action")
//     .text(d)
// })




let trace1 = {
  x: gamesPlayed,
  y: teamList.slice(0, 6),
  xaxis: 'x',
  yaxis: 'y',
  name: 'Games Played',
  type: 'bar',
  orientation: 'h'
};

let trace2 = {
  x: losses,
  y: teamList.slice(0, 6),
  xaxis: 'x2',
  yaxis: 'y2',
  name: 'Losses',
  type: 'bar',
  orientation: 'h'
};

let trace3 = {
  x: wins,
  y: teamList.slice(0, 6),
  xaxis: 'x3',
  yaxis: 'y3',
  name: 'Wins',
  type: 'bar',
  orientation: 'h'
};

let trace4 = {
  x: goalsPerGame,
  y: teamList.slice(0, 6),
  xaxis: 'x4',
  yaxis: 'y4',
  name: 'Goals Per Game',
  type: 'bar',
  orientation: 'h'
};


let data = [trace1, trace2, trace3, trace4];

let layout = {
  grid: {
    rows: 2, 
    columns: 2, 
    pattern: 'independent'
  },
  showlegend: true,
  legend: {"orientation": "h"},
  yaxis: {
    tickfont: {
      size: 5
    }
  },
  margin: {
    l: 150,
    r: 50,
    b: 50,
    t: 50,
    pad: 10
  },
  
};

Plotly.newPlot('myDiv', data, layout);
