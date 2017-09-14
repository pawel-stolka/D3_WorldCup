$(document).ready(function() {
    var url = "http://localhost:3000/getcup";

    $.getJSON(url, function(data) {
        draw(data);
    });
});

function draw(json) {

    console.log(json.teams);
    var margin = 50,
        w = 700,
        h = 300,
        width = w + margin,
        height = h + margin,
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

    var arr = json.teams;
    // reference to data field - points
    var _points = "points";
    var _color = "group";
    var _wins = "wins";

    var colorScale = d3.scale.category10(); /* mamy też .category20/20b/20c */
    /* możemy sami ustalić kolory, podając własny range */

    var maxRadius = d3.max(arr, function(d) { return d[_wins]; });
    var radiusScale = d3.scale.linear() //.sqrt()
        .domain([0, maxRadius])
        .range([2, 40]);

    var maxHeight = d3.max(arr, function(d) { return d[_points] });

    var yScale = d3.scale.linear()
        .domain([0, maxHeight])
        .range([margin, height - margin]);

    var xScale = d3.scale.linear()
        .domain([0, arr.length - 1])
        .range([margin, width - margin]);

    // the same with scale of X
    svg
        .selectAll("circle")
        .data(arr)
        .enter()
        .append('circle')
        .attr({
            width: 100,
            // width: w / arr.length - margin,
            height: function(d) { return yScale(d) } //- padding; }
        })
        .style({
            fill: function(d) { return colorScale(d[_color]); },
            stroke: 'black',
            'stroke-width': '2px'
        })
        .attr({
            r: function(d) { return radiusScale(d[_wins]) },
            cx: function(d, i) { return xScale(i) },
            cy: function(d) { return height - yScale(d[_points]); } //+ padding; }
        })

}