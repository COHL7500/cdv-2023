const width = 1000;
const height = 800;
const margin = {top: 100, right: 100, left: 100, bottom: 100};

type dataInterval = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type SkyEntry = {
    minute: dataInterval
    cloudCov: dataInterval
    size: dataInterval
};

const entryAmount = 50;

let skyDataMap: Map<number, SkyEntry[]> = new Map<dataInterval, SkyEntry[]>();

for (let i = 0; i < 10; i++) {
    skyDataMap.set(i + 1, [])
}

for (let i = 0; i < entryAmount; i++) {
    const entry = generateSkyEntry();
    skyDataMap.get(entry.minute)!.push(entry);
}

function generateSkyEntry(min?: number): SkyEntry {

    const maxInterval = 10;
    const minInterval = 1;

    function randomSkyData(): dataInterval {
        return (Math.floor(Math.random() * (maxInterval - minInterval + 1) + minInterval)) as dataInterval;
    }

    return {
        minute: min ? min as dataInterval : randomSkyData(),
        cloudCov: randomSkyData(),
        size: randomSkyData(),
    }
}

const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

const triangleSize = 38;

const xScale = d3.scaleLinear<number>()
    .domain([0, 20])
    .range([margin.left, width-(margin.right)]);

const yScale = d3.scaleBand<number>()
    .padding(.1)
    .domain(Array.from(skyDataMap.keys()))
    .range( [height-margin.top, margin.bottom]);

const colorScale = d3.scaleLinear<string, number>()
    .domain([1, 10])
    .range(["#eeeeee", "#595959"])

const innerTriangleScale = d3.scaleLinear<number>()
    .domain([1, 10])
    .range([2.0, 1.0])

const tooltip: d3.Selection<HTMLDivElement, any, HTMLElement, any> = d3.select("#canvas")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")

const onMouseOver = function() {
    tooltip.style("opacity", 1)
}

const onMouseMove = function (event: any, d: SkyEntry) {
    tooltip
        .html("Minute: " + d.minute + "<br>Size: " + d.size + "<br>CloudCov: " + d.cloudCov)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY + 10 + "px")
}

const onMouseLeave = function() {
    tooltip.style("opacity", 0)
}


svg.selectAll("g")
    .data(Array.from(skyDataMap.entries()))
    .enter()
    .append("g")
    .selectAll("g")
    .data(d => d[1])
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(${xScale(i + 1)}, ${yScale(d.minute)})`)
    .each(function (d: SkyEntry) {
        const group = d3.select(this);
        const outerTriangle = group.append("polygon")
            .attr("points", (_, i) => {
                const halfSize = triangleSize / 2;
                return `0, ${-halfSize} ${halfSize},${halfSize} ${-halfSize},${halfSize}`;
            })
            .attr("fill", "#5077c7")

        const innerTriangleSize = triangleSize / innerTriangleScale(d.size); // Adjust the size of the inner triangle as needed

        const innerTriangle = group.append("polygon")
            .attr("points", (d, i) => {
                const halfSize = innerTriangleSize / 2;
                return `0, ${-halfSize} ${halfSize},${halfSize} ${-halfSize},${halfSize}`;
            })
            .attr("fill", (d: SkyEntry) => colorScale(d.cloudCov))

            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseleave", onMouseLeave);
    });


// FIRST ITERATION

/*

svg.selectAll("g")
    .data(Array.from(skyDataMap.entries()))
    .enter()
    .append("g")
    .selectAll("polygon")
    .data(d => d[1])
    .enter()
    .append("polygon")
    .attr("points", (d, i) => {
        const x = xScale(i + 1);
        const y = yScale(d.minute);
        const halfSize = triangleSize / 2;

        return `${x - halfSize},${y} ${x + halfSize},${y} ${x},${y - (i % 2 === 0 ? triangleSize : -triangleSize)}`;
    })
    .attr("fill", d => colorScale(d.cloudCov))
    .attr("stroke", "blue")
    .on("mouseover", onMouseOver)
    .on("mousemove", onMouseMove)
    .on("mouseleave", onMouseLeave);


 */
