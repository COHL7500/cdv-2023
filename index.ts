const w = 500;
const h = 500;
const r = 20;
const svg = d3.select("#canvas")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .style("background-color","black")


function animateCircle() {
	circs.transition()
		.duration(8000)
		.attr("stroke-width", 8)
		.attr('r',100);
}


////TRANSITIONS
let arrData: number[] = [3, 10, 18]
const circs = svg
	.selectAll('circle')
	.data(arrData)
	.join('circle')
	.attr('cx', w/2)
	.attr('cy', h/2)
	.attr('r', d => (d * 10))
	.attr('fill','none')
	.attr('stroke','pink')
	.attr('stroke-width', 0)
	.transition()
	.duration(8000)
	.attr("stroke-width", 8)
	.attr('r',100);
////CHAINED TRANSITIONS
//   .transition()
// .duration(1000)
// .attr('cy',0)





////CHANGING DATA
// var data = [];
// svg.on("click", function(){
// 	updateData();
// 	updateVis();
// })
// function updateData() {
//   data = []; //empty the data
//   var howLong = Math.random()*10;
//   for(var i=0; i<howLong; i++) {
//     data.push(Math.random()*w);
//   }
// }
// function updateVis() {
//   d3.select('svg')
//     .selectAll('circle')
//     .data(data)
//     .join('circle')
//     .attr('cy', h/2)
//     .attr('r', r)
//     .attr('fill','white')
//     .attr('stroke','pink')
//     .transition()
// 		.duration(4000)
//     .attr('cx', function(d) {
//       return d;
//     });
// }


////CHUNKS OF DATA
// var wholeData = [0,3,5,10,13,15,20,23,25];
// var partData = [];
// var index = 0;

// svg.on("click", function(){
// 	updateData();
// })
// var index = 0;
// var inc = 3;
// function updateData() {
// 	partData = []; //empty the data
// 	for(var i=index; i<index+inc; i++) {
// 		partData.push(wholeData[i]);
// 	}
// 	console.log(partData)
// 	index = index+inc;
// 	updateVis();
// }
// function updateVis() {
//   d3.select('svg')
//     .selectAll('circle')
//     .data(partData)
//     .join('circle')
//     .attr('cy', h/2)
//     .attr('r', r)
//     .attr('fill','white')
//     .transition()
//     .duration(4000)
//     .attr('cx', function(d) {
//       return d*10;
//     });
// }
