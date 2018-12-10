// =================================================================
// Initiaize Parameters
// =================================================================
// set the svg size
const svgWidth = 960;
const svgHeight = 500;
 
// set the margins
const margin = {
    top: 25,
    right: 50,
    bottom: 120,
    left: 100
};
 
// calculate the plot area dimensions
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;
 
//Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
const svg = d3
   .select("#scatter")
   .append("svg")
   .attr("width", svgWidth)
   .attr("height", svgHeight);
 
const chartGroup = svg.append("g")
   .attr("transform", `translate(${margin.left}, ${margin.top})`);
 
let chosenXAxis = "team_counter"
let chosenYAxis = "positive";
 
// =================================================================
// function used for updating x-scale const upon click on axis label
// =================================================================
function xScale(nhlData, chosenXAxis) {
 
   var xLinearScale = d3.scaleLinear()
     .domain([d3.min(nhlData, d => d[chosenXAxis]) * 0.9,
       d3.max(nhlData, d => d[chosenXAxis]) * 1.0
     ])
     .range([0, width]);
   return xLinearScale;
}
 
// =================================================================
// function used for updating y-scale const upon click on axis label
// =================================================================
function yScale(nhlData, chosenYAxis) {
 
   var yLinearScale = d3.scaleLinear()
     .domain([0, d3.max(nhlData, d => d[chosenYAxis]) * 1.2])
     .range([height, 0]);
   return yLinearScale;
}
 
// =================================================================
// function used for updating xAxis const upon click on axis label
// =================================================================
function renderXAxis(newXScale, xAxis) {
 
   var bottomAxis = d3.axisBottom(newXScale);
 
   xAxis.transition()
     .duration(1000)
     .call(bottomAxis);
 
   return xAxis;
}
 
// =================================================================
// function used for updating yAxis const upon click on axis label
// =================================================================
function renderYAxis(newYScale, yAxis) {
   
   var leftAxis= d3.axisLeft(newYScale);
 
   yAxis.transition()
     .duration(1000)
     .call(leftAxis);
 
   return yAxis;
}
 
// =================================================================
// function used for updating circles group with a transition to new circles
// =================================================================
function renderXCircles(circlesGroup, newXScale, chosenXAxis) {
 
   circlesGroup.transition()
     .duration(1000)
     .attr("cx", d => newXScale(d[chosenXAxis]))
   return circlesGroup;
}
 
// =================================================================
// function used for updating circles group with a transition to new circles
// =================================================================
function renderYCircles(circlesGroup, newYScale, chosenYAxis) {
 
   circlesGroup.transition()
     .duration(1000)
     .attr("cy", d => newYScale(d[chosenYAxis]));
   return circlesGroup;
}
 
// =================================================================
// function used for updating texts group with x axis in order to
// transition to new circles
// =================================================================
function renderXTexts(textsGroup, newXScale, chosenXAxis) {
 
   textsGroup.transition()
     .duration(1000)
     .attr("x", d => newXScale(d[chosenXAxis]));
   return textsGroup;
}
 
// =================================================================
// function used for updating texts group with y axis in order to
// transition to new circles
// =================================================================
function renderYTexts(textsGroup, newYScale, chosenYAxis) {
 
   textsGroup.transition()
     .duration(1000)
     .attr("y", d => newYScale(d[chosenYAxis]));
   return textsGroup;
}
 
// =================================================================
// function used for updating X-axis circles group with new tooltip
// =================================================================
function updateXToolTip(chosenXAxis, circlesGroup) {
  
  if (chosenXAxis === "team_counter") {
     var label = "Tweets Ago: ";
  }
  else if(chosenXAxis === "created_at"){
      var label = "Tweet Time: ";
  }

  var chosenYAxis = d3.select(".yLabel").select(".active").attr("value");
 
  if (chosenYAxis === "positive") {
    var yLabel = "Positive Reaction:";
  }
  else if (chosenYAxis === "negative") {
     var yLabel = "Negative Reaction:";
  }
  else if (chosenYAxis === "compound") {
    var yLabel = "Overall Reaction:";
  }
  else if (chosenYAxis === "neutral") {
     var yLabel = "Neutral Reaction:";
  } 
  const toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
       return (`${d.hockey_team}<br>${label} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
    });
 
 
  // Create tooltip
  circlesGroup.call(toolTip);
 
  circlesGroup.on("mouseover", toolTip.show)
    .on("mouseout", toolTip.hide);
  return circlesGroup;
}
 
// =================================================================
// function used for updating Y-axis circles group with new tooltip
// =================================================================
function updateYToolTip(chosenYAxis, circlesGroup) {
  //console.log('in updateYToolTip')
  if (chosenYAxis === "positive") {
    var yLabel = "Positive Reaction:";
  }
  else if (chosenYAxis === "negative") {
     var yLabel = "Negative Reaction:";
  }
  else if (chosenYAxis === "compound") {
    var yLabel = "Average Reaction:";
  }
  else if (chosenYAxis === "neutral") {
    var yLabel = "Neutral Reaction:";
  }


  var chosenXAxis = d3.select(".xLabel").select(".active").attr("value");
 
//  console.log(`ylabel`,yLabel)
//  console.log(`chosen x axis`, chosenXAxis)
//  console.log(`chosen y axis`, chosenYAxis)
 
  if (chosenXAxis === "tweets_ago") {
    var label = "Tweets Ago: ";
  }
  else if (chosenXAxis === "created_at") {
    var label = "Tweet Time: ";
  }
 
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
       return (`${d.hockey_team}<br>${label} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
    });
 
  // Create tooltip
  circlesGroup.call(toolTip);
 
  circlesGroup.on("mouseover", toolTip.show)
  .on("mouseout", toolTip.hide);
 
  return circlesGroup;
}
 
// =====================end of functions============================================
// Get data by calling Flask
//d3.json(`/twitter/all`).then((nhlData,err) => {
//  if (err) throw err;
  
//  nhlData.forEach(function(team) {
//    team.Compound = +team.Compound;
//    team.Positive = +team.Positive;
//    team.Negative = +team.Negative;
//    team.Neutral = +team.Neutral
//  });
d3.json(`/twitter/all`).then((nhlData,err) => {
  if (err) throw err;
  
  nhlData.forEach(function(team) {
    team.team_counter = +team.team_counter;
    team.neutral = +team.neutral;
    team.positive = +team.positive;
    team.negative = +team.negative
    team.compound = +team.compound
   
  });

  var xLinearScale = xScale(nhlData, chosenXAxis);
 
  var yLinearScale = d3.scaleLinear()
     .domain([0, d3.max(nhlData, d => d.positive)])
     .range([height, 0]);
   
  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
 
   // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
 
  // append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);
 
  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(nhlData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 35)
    .attr("fill", "blue")
    .attr("opacity", ".5");
 
  // add text to circles
  var textsGroup = chartGroup.append("text")
    .selectAll("tspan")
    .data(nhlData)
    .enter()
    .append("tspan")
    .text(d => d.hockey_team)
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .attr("fill", "white")
    .attr("font-size", 8)
    .attr("class", "text");
 
  // Responsive scatter size and text labels
  if (svgWidth < 500) {
    circlesGroup.attr("r", 10);
    textsGroup.style("display", "none");
  }
  else {
    circlesGroup.attr("r", 20);
    textsGroup.style("display", "inline");
  }
 
  // Create group for  2 x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`)
    .classed("xLabel", true);
 
  var team_counter = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "team_counter") // value to grab for event listener
    .classed("active", true)
    .text("Tweets Ago: ");
 
  var created_at = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "created_at") // value to grab for event listener
    .classed("inactive", true)
    .text("Tweet Time: ");
 
  // Create group for  4 y- axis labels
  var ylabelsGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)")
    .classed("yLabel", true);
 
  var positive = ylabelsGroup.append("text")
    .attr("y", 0 -50)
    .attr("x", 0 - (height / 2) )
    .attr("dy", "1em") 
    .attr("value", "positive")
    .classed("active", true)
    .text("Positive Reaction: ");
 
  var neutral = ylabelsGroup.append("text")
    .attr("y", 0 - 85)
    .attr("x", 0 - (height / 2))
    .attr("value", "neutral") // value to grab for event listener
    .attr("dy", "2em")
    .classed("inactive", true)
    .text("Neutral Reaction: ");
 
  var negative = ylabelsGroup.append("text")
    .attr("y", 0 - 120)
    .attr("x", 0 - (height / 2))
    .attr("value", "negative") // value to grab for event listener
    .attr("dy", "3em")
    .classed("inactive", true)
    .text("Negative Reaction: ");

  var compound = ylabelsGroup.append("text")
    .attr("y", 0 - 155)
    .attr("x", 0 - (height / 2))
    .attr("value", "compound") // value to grab for event listener
    .attr("dy", "4em")
    .classed("inactive", true)
    .text("Compound Reaction: ");
    
    
  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selectionS
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {
 
        // replaces chosenXaxis with value
        chosenXAxis = value;
 
        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(nhlData, chosenXAxis);
 
        // updates x axis with transition
        xAxis = renderXAxis(xLinearScale, xAxis);
 
        // updates circles with new x values
        circlesGroup = renderXCircles(circlesGroup, xLinearScale,chosenXAxis);
 
        // update texts with new x values
        textsGroup = renderXTexts(textsGroup, xLinearScale, chosenXAxis);
  
        // updates tooltips with new info
        circlesGroup = updateXToolTip(chosenXAxis,circlesGroup);
 
        // changes classes to change bold text
        if (chosenXAxis === "team_counter") {
          team_counter
            .classed("active", true)
            .classed("inactive", false);
          created_at
            .classed("active", false)
            .classed("inactive", true);
        } 
        else if (chosenXAxis === "created_at") {
          team_counter
            .classed("active", false)
            .classed("inactive", true);
          created_at
            .classed("active", true)
            .classed("inactive", false);

        }
      }
    });
 
  // y axis labels event listener
  ylabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
 
      if (value !== chosenYAxis) {
 
        // replaces chosenyaxis with value
        chosenYAxis = value;
 
        // functions here found above csv import
        // updates y scale for new data
        yLinearScale = yScale(nhlData, chosenYAxis);
        //console.log(`ylinear`, yLinearScale)
 
        // updates y axis with transition
        yAxis = renderYAxis(yLinearScale, yAxis);
        //console.log(`yAxis`, yAxis)
 
        // updates circles with new y values
        circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);
       
        // update texts with new y values
        textsGroup = renderYTexts(textsGroup, yLinearScale, chosenYAxis);
      
        // updates tooltips with new info
        circlesGroup = updateYToolTip(chosenYAxis, circlesGroup);
 
        // changes classes to change bold text
        if (chosenYAxis === "positive") {
          positive
            .classed("active", true)
            .classed("inactive", false);
          neutral
            .classed("active", false)
            .classed("inactive", true);
          negative
           .classed("active", false)
           .classed("inactive", true); 
          compound
           .classed("active", false)
           .classed("inactive", true);
        }
        else if (chosenYAxis === "neutral") {
          positive
            .classed("active", false)
            .classed("inactive", true);
          neutral
           .classed("active", true)
           .classed("inactive", false);
          positive
           .classed("active", false)
           .classed("inactive", true);
          compound
            .classed("active", false)
            .classed("inactive", true);
        }
        else if(chosenYAxis === "negative") {
          positive
           .classed("active", false)
           .classed("inactive", true);
          neutral
           .classed("active", false)
           .classed("inactive", true);
          negative
           .classed("active", true)
           .classed("inactive", false);
          compound
           .classed("active", false)
           .classed("inactive", true);
        }        
        else if(chosenYAxis === "compound") {
          positive
           .classed("active", false)
           .classed("inactive", true);
          neutral
           .classed("active", false)
           .classed("inactive", true);
          negative
           .classed("active", false)
           .classed("inactive", true);
          compound
           .classed("active", true)
           .classed("inactive", false);
        }        
      }
  });
});