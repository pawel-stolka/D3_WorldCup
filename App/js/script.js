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
    var arr = json.books;
    console.log(arr);
    var borrows = "borrows";

    var maxHeight = //d3.max(arr);
        d3.max(arr, function(d) { return d[borrows].length; });
        // barWidth = 

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
        .selectAll("rect")
        .data(arr)
        .enter()
        .append('rect')
        .attr({
            // width: barWidth,
            width: width / arr.length,
            height: function(d) { return yScale(d.borrows.length); }
        })
        .style({
            fill: 'red',
            stroke: 'black',
            'stroke-width': '2px'
        })
        .attr({
            // r: 10,
            x: function(d, i) { return xScale(i); },
            // cy: 10
            y: function(d) { 
                var ret = yScale(d.borrows.length);
                console.log(height - ret);
                return height - ret; }
        })

}