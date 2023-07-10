//GOAL: can we set up a local coding environment, webpage and draw 1 shape on it?

const width = 400;
const height = 400;
const rad = 20;

let canvas = d3.select("svg")
    .attr("width", width)
    .attr("height", height)



const circle1 = canvas.append("circle")
                        .attr("cx", 60)
                        .attr("cy", 60)
                        .attr("r", rad + 15)
                        .attr("fill", "#A0A0A0")


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
