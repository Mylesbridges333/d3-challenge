// @TODO: YOUR CODE HERE!



//  P Width
var width = parseInt(d3.select("#scatter").style("width"));

//  P Height
var height = width - width / 3.9;

//  P Margin
var margin = 15;

//  Axis Labels
var labelArea = 110;

// Space
var tPadBot = 40;
var tPadLeft = 40;

//  SVG Container Variable
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

//  Variable - Circ. Radius
var circRadius;

//  Function to int. Cir. Radius
function crGet() {
  if (width <= 530) {
    circRadius = 5;
  }
  else {
    circRadius = 10;
  }
}

// Call Function
crGet();

// Load CSV Data
d3.csv("https://raw.githubusercontent.com/mjknj18/Demographic-Health-Risk-Analysis/master/assets/data/data.csv").then(function(data) {
  visualize(data);
});

//----------------------------------------------------------------------------------------
//--------------------------------------------------------------
//---------------------

// function for Plot Generation
function visualize(theData) {

  // Variables  X & Y Axes
  var curX = "poverty";
  var curY = "healthcare";

  //  Empty Var for min/max
  var xMin;
  var xMax;
  var yMin;
  var yMax;

  // Function -  X Axis Min & Max
  function xMinMax() {
    xMin = d3.min(theData, function(d) {
    return parseFloat(d[curX]) * 0.90})

    xMax = d3.max(theData, function(d) {
    return parseFloat(d[curX]) * 1.10})}

  //  Function -  Y Axis Min & Max
  function yMinMax() {
    yMin = d3.min(theData, function(d) {
    return parseFloat(d[curY]) * 0.90})

    yMax = d3.max(theData, function(d) {
    return parseFloat(d[curY]) * 1.10})}

  //  Functions Set Axis Min & Max Values
  xMinMax();
  yMinMax();

  //  Variable for X Axis Range
  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);

  // Variable for Y Axis Range
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - labelArea, margin]);

  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

 
  function tickCount() {
    if (width <= 500) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  }

  tickCount();


  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");


  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");

    var Circle = svg.selectAll("g Circle").data(theData).enter();


    Circle
        .append("circle")
        .attr("cx", function(d) {return xScale(d[curX])})
        .attr("cy", function(d) {return yScale(d[curY])})
        .attr("r", circRadius)
        .attr("class", function(d) {return "stateCircle " + d.abbr})

    Circle
        .append("text")
        .attr("x", function(d) {return xScale(d[curX]) - circRadius/2 - 2.5})
        .attr("y",  function(d) {return yScale(d[curY]) + circRadius/2 - 1})
        .text(function(d) {return d.abbr})
        .attr("font-size", "10px")

    svg
        .append("text")
        .attr("x", width / 2)
        .attr("y",  height - labelArea + 15)
        .text("In Poverty (%)")
        .attr("font-size", "15px")

    
    svg
        .append("text")
        .attr("x", height / 2 * -1)
        .attr("y",  labelArea - 15)
        .text("Lacks Healthcare (%)")
        .attr("font-size", "15px")
        .attr("transform", "translate(0,0) rotate(-90)")
}