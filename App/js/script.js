$(document).ready(function() {
    var url = "http://localhost:3000/getBooks";

    $.getJSON(url, function(data) {
        draw(data);
    });
});

function draw(json) {

    var width = 700,
        height = 300,
        barWidth = 50,
        padding = 5;

    // example data, what counts is the number of elements.
    var arr = json; // [10, 8, 40, 34, 52, 45, 33, 75];
    console.log(arr.books);
    var maxHeight = d3.max(arr);
    var yScale = d3.scale.linear()
        .domain([0, maxHeight])
        .range([0, height]);
    var xScale = d3.scale.linear()
        .domain([0, arr.length - 1])
        .range([0, width]);

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

    svg
        .selectAll("circle")
        .data(arr)
        .enter()
        .append('circle')
        .attr({
            width: barWidth,
            height: function(d) { return yScale(d); }
        })
        .style({
            fill: 'red',
            stroke: 'black',
            'stroke-width': '2px'
        })
        .attr({
            r: 10,
            cx: function(d, i) { return xScale(i); },
            cy: function(d) { return height - yScale(d); }
        })

}