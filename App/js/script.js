$(document).ready(function() {
    var url = "http://localhost:3000/getcup";

    $.getJSON(url, function(data) {
        draw(data);
    });
});

function draw(json) {

    var width = 700,
        height = 300,
        barWidth = 50,
        padding = 5;

    // example data, finally we use values => they are heights of bars.
    var arr = [10, 8, 40, 34, 52, 45, 33, 75];
    // 1
    var svg = d3.select("#canvas")
        .append("svg")
        .attr({
            width: width,
            height: height,
        })
        .style({
            width: width,
            height: height,
            border: '1px lightgray solid'
        })

    var maxHeight = d3.max(arr);
    console.log(maxHeight);

    var yScale = d3.scale.linear()
        .domain([0, maxHeight])
        .range([0, height]);

    var xScale = d3.scale.linear()
        .domain([0, arr.length - 1])
        .range([0, width]);

    // the same with scale of X
    svg
        .selectAll("circle")
        .data(arr)
        .enter()
        .append('circle')
        .attr({
            width: 100,
            height: function(d) { return yScale(d) } //- padding; }
        })
        .style({
            fill: 'red',
            stroke: 'black',
            'stroke-width': '2px'
        })
        .attr({
            r: 30,
            cx: function(d, i) { return xScale(i) },
            cy: function(d) { return height - yScale(d); } //+ padding; }
        })

}