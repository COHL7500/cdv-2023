// type (could be interface as well) for birthday entries
type birthdayEntry = {
    name: string,
    age: number,
    month: number,
    day: number,
};

const entryAmount = 20;

const birthdayData: birthdayEntry[] = Array(entryAmount);

// set the dimensions and margins of the graph
const margin = {top: 30, right: 70, bottom: 80, left: 60},
    width = 650 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg: d3.Selection<SVGElement, any, HTMLElement, any> = d3.select("#canvas")
    .append("svg")
    .attr("class", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")

const months: number[] = d3.range(1, 13);
const days: number[] = d3.range(1, 32);

// Build X scales and axis:
const xScale = d3.scaleBand()
    .range([0, width])
    .domain(months.map(String))

/*
svg.append("g")
    .attr("transform", "translate(0," + (height + 2) + ")")
    .call(d3.axisBottom(x));

 */

const yScale = d3.scaleBand()
    .range([height, 0])
    .domain(days.map(String))

/*
svg.append("g")
    .call(d3.axisLeft(y));
 */

for (let i = 0; i < entryAmount; i++) {
        birthdayData[i] = randomBirthdayEntry()
    }

    /*
    [
    {name: "Roger", age: 19, month: 7, day: 13},
    {name: "Michale", age: 33, month: 5, day: 1},
    {name: "Bastjan", age: 100, month: 9, day: 21},
    {name: "Baby Man", age: 0, month: 3, day: 2},
    {name: "Middle Age Man", age: 50, month: 2, day: 2},
    {name: "Richard Richardson", age: 69, month: 12, day: 24},
    {name: "Laetitia Sadier", age: 22, month: 4, day: 1}
]
     */

function randomBirthdayEntry(): birthdayEntry {
    return {name: "Test", age: randomAge(), month: randomMonth(), day: randomDay()}
}

function randomRange(min, max): number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomAge(): number {
    return randomRange(0, 100);
}

function randomMonth(): number {
    return randomRange(1, 12);
}

function randomDay(): number {
    return randomRange(1, 31);
}

svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 40)
    .attr("x", -height / 2)
    //style("font-family", "Arial")
    .attr("class", "graph-text")
    .text("Day")

svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-45)")
    .attr("y", -margin.left + 40)
    .attr("x", -height + 555)
    //.style("font-family", "Arial")
    //.style("font-style", "italic")
    .attr("class", "explain-text")
    .attr("opacity", 0.15)
    .text("31st")

svg.append("text")
    .attr("text-anchor", "end")
    .attr("y", height + margin.top + 5)
    .attr("x", width / 2)
    .attr("class", "graph-text")
    .text("Month")

svg.append("text")
    .attr("text-anchor", "end")
    //.attr("transform", "rotate(15)")
    .attr("y", height + margin.top + 5)
    .attr("x", width + 40)
    //.style("font-family", "Arial")
    //.style("font-style", "italic")
    .attr("class", "explain-text")
    .attr("opacity", 0.15)
    .text("December")

// Creation of the tooltip

const tooltip: d3.Selection<HTMLDivElement, any, HTMLElement, any> = d3.select("#canvas")
    .append("div")
    //.style("opacity", 0)

    .attr("class", "tooltip")
    //.style("background-color", "white")
    //.style("border", "solid")
    //.style("border-width", "2px")
    //.style("border-radius", "5px")
    //.style("padding", "5px")
    //.style("position", "absolute")
    //.style("max-width", "200px")

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
    tooltip.style("opacity", 0);
};


// Make a grey grid for the heatmap
const gridGroup = svg.append("g");

months.forEach(m =>
    days.forEach(d =>
        gridGroup.append("rect")
            .attr("x", xScale(String(m)))
            .attr("y", yScale(String(d)))
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            .style("stroke", "#ececec")
            .style("fill", "none")
    )
);



// from age of 0 to 100, go from green to red.

const ageRangeColor = d3.scaleLinear<string, number>()
    .range(["#ced3e5", "#164d72"])
    .domain([0, 100]);

// Creation of birthday rectangles
svg.selectAll()
    .data(birthdayData)
    .enter()
    .append("rect")
    .attr("x", d => xScale(String(d.month)) )
    .attr("y", d => yScale(String(d.day)) )
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", d => ageRangeColor(d.age))
    .on("mouseover", onMouseOver)
    .on("mousemove", onMouseMove)
    .on("mouseleave", onMouseLeave);
