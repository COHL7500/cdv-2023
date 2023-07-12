

/*

// DAY 2

const width: number = 500;
const height: number = 500;
const leftMargin: number = 20;
const canvas = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const cupsCoffee: number[] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0];

// d = data, i = index

const coffeeCircles = canvas.selectAll("circle")
    .data(cupsCoffee)
    .join("circle")
    .attr("cx",  (d, i) =>  leftMargin + 10 + (i * 20))
    .attr("cy", height / 2)
    .attr("r", d => (d == 0 ? 1 : d * 10))
    .attr("fill", d => (d == 0 ? "pink" : "purple"))
    .attr("stroke", d => (d == 0 ? "pink" : "purple"));

 */

/*
// DAY 1

const width: number = 400;
const height: number = 400;
const rad: number = 30;

let canvas = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "purple");

const circle1 = canvas.append("circle")
                        .attr("cx", 60)
                        .attr("cy", 60)
                        .attr("r", rad + 15)
                        .attr("fill", "#A0A0A0") // this is grey;


const circle2 = canvas.append("circle")
                        .attr("cx", 50)
                        .attr("cy", 50)
                        .attr("r", rad)
                        .attr("fill", "green");


const circle3 = canvas.append("circle")
    .attr("cx", 180)
    .attr("cy", 60)
    .attr("r", rad + 15)
    .attr("fill", "#A0A0A0")


const circle4 = canvas.append("circle")
    .attr("cx", 170)
    .attr("cy", 50)
    .attr("r", rad)
    .attr("fill", "orange");
*/

// var w = 500;
// var h = 500;
// var rad = 20;

// var svg = d3.select("svg")
// 			.attr("width",w)
// 			.attr("height",h);

// var circles = d3.selectAll("circle")
// 				.attr("r", rad)
// 				.attr("cx", w/2)
// 				.attr("cy", h/2);


// var w = 500;
// var h = 500;
// var rad = 20;

// var svg = d3.select("svg")
// 			.attr("width",w)
// 			.attr("height",h);

// var circles = d3.selectAll("circle")
// 				.attr("r", rad)
// 				.attr("cx", w/2)
// 				.attr("cy", h/2);
