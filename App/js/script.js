$(document).ready(function() {
    var url = "http://localhost:3000/getcup";

    $.getJSON(url, function(data) {
        draw(data);
    });
});

function draw(json) {

    console.log(json.teams);
    var width = 700,
        height = 300,
        barWidth = 50,
        padding = 5;

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

    var arr = json.teams; //var arr = [10, 8, 40, 34, 52, 45, 33, 75];
    // reference to data field - points
    var _points = "points";
    var _color = "group";
    var colorScale = d3.scale.category10(); /* mamy też .category20/20b/20c */
    /* możemy sami ustalić kolory, podając własny range */

    var maxHeight = d3.max(arr, function(d) { return d[_points] });

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
            // width: 100,
            height: function(d) { return yScale(d) } //- padding; }
        })
        .style({
            fill: function(d) { return colorScale(d[_color]); },
            stroke: 'black',
            'stroke-width': '2px'
        })
        .attr({
            r: 30,
            cx: function(d, i) { return xScale(i) },
            cy: function(d) { return height - yScale(d[_points]); } //+ padding; }
        })

}