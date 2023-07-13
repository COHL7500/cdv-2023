//GOAL: can we move shapes around based on their data?
// Can we store more information inside every data piece aside from just numbers?

// type (could be interface as well) for birthday entries
type birthdayEntry = {
    name: string,
    age: number,
    month: number,
    day: number
}

const birthdayData: {name: string, age: number, month: number, day: number}[] = [
    {name: "Roger", age: 19, month: 7, day: 13},
    {name: "Michale", age: 33, month: 5, day: 1},
    {name: "Bastjan", age: 100, month: 9, day: 21},
    {name: "Baby Man", age: 0, month: 3, day: 2}

]

// set the dimensions and margins of the graph
const margin = {top: 10, right: 10, bottom: 50, left: 60},
    width = 650 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

const months = d3.range(1, 13);
const days = d3.range(1, 32);

svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2)
    .text("Day")

svg.append("text")
    .attr("text-anchor", "end")
    .attr("y", height + margin.top + 35)
    .attr("x", width / 2)
    .text("Month")

// Build X scales and axis:
const x = d3.scaleBand()
    .range([ 0, width])
    .domain(months.map(String))
svg.append("g")
    .attr("transform", "translate(0," + (height + 2) + ")")
    .call(d3.axisBottom(x));

const y = d3.scaleBand()
    .range([height, 0])
    .domain(days.map(String))
svg.append("g")
    .call(d3.axisLeft(y));

// Creation of the tooltip

const tooltip = d3.select("#canvas")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("position", "absolute")
    .style("max-width", "200px")

const onMouseOver = function() {
    tooltip.style("opacity", 1)
}

const onMouseMove = function (event: any, d: birthdayEntry) {
    tooltip
        .html("Name: " + d.name + "<br>Age: " + d.age)
        .style("left", (d3.pointer(event)[0] + 100) + "px")
        .style("top", (d3.pointer(event)[1]) + "px")
}

const onMouseLeave = function() {
    tooltip.style("opacity", 0)
}


// Make a grey grid for the heatmap
const gridGroup = svg.append("g")
months.forEach(function(m) {
    days.forEach(function(d) {
        gridGroup.append("rect")
            .attr("x", x(String(m)))
            .attr("y", y(String(d)))
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("stroke", "#ececec")
            .style("fill", "none");
    });
});

// from age of 0 to 100, go from green to red.

const ageRangeColor = d3.scaleLinear<string, number>()
    .range(["#2bcc2b", "#FF0000"])
    .domain([0, 100])

// Creation of birthday rectangles
svg.selectAll()
    .data(birthdayData)
    .enter()
    .append("rect")
    .attr("x", d => x(String(d.month)) )
    .attr("y", d => y(String(d.day)) )
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", d => ageRangeColor(d.age))
    .on("mouseover", onMouseOver)
    .on("mousemove", onMouseMove)
    .on("mouseleave", onMouseLeave);
