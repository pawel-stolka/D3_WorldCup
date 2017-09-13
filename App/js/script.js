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

    // we fit scale of Y from 0-75 input into 0-h values of output
    var yScale = d3.scale.linear()
        .domain([0, 75])
        .range([0, height]);
    // checking values of 1.max, 2.2/3 and 3.~half
    console.log(yScale(75));
    console.log(yScale(50));
    console.log(yScale(35));

    svg
        .selectAll("rect")
        .data(arr)
        .enter()
        .append('rect')
        .attr({
            width: barWidth - padding,
            height: function(d) { return yScale(d); }
        })
        .style({
            fill: 'red',
            stroke: 'black',
            'stroke-width': '2px'
        })
        .attr({
            x: function(d, i) { return (i * barWidth + padding) },
            y: function(d) { return height - yScale(d); } // 
        })

}