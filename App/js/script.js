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
    var _name = "country",
        _goals = "goals",
        _points = "points",
        _color = "group",
        _wins = "wins";

    var colorScale = d3.scale.category10() /* mamy też .category20/20b/20c */
        .range(["red", "yellow", "white", "green", "orange", "brown", "cyan", "pink", "purple", "blue"]);


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

    // changing svg to g.svg
    // obszar wykresu
    var g = svg.append("g")
        .attr("transform", "translate(" + margin + "," + margin / 2 + ")")
        .attr("width", w);

    var bubbles = g
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
            'stroke-width': '1px'
        })
        .attr({
            r: function(d) { return radiusScale(d[_wins]) },
            cx: function(d, i) { return xScale(i) },
            cy: function(d) { return height - yScale(d[_points]); } //+ padding; }
        })

    bubbles
        .append('text')
        .attr('dx', 10)
        .text(function(d) { return d.country; });

    // - scales
    var axisScale = d3.scale.linear()
        .domain([maxHeight, 0])
        .range([margin, h]);

    var yAxis = d3.svg.axis()
        .scale(axisScale)
        .orient("left")
        .innerTickSize(-w)
        .tickPadding(10)

    var yAxisG = g.append("g") /* */
        .attr("class", "axis y") /* */

    yAxisG.call(yAxis);

    // tytul osi Y
    yAxisG.append("text")
        .attr("transform", "translate (-40,0) rotate(-90)")
        .attr("text-anchor", "end")
        .text("zdobyte punkty")


    var title = d3.select('#title')
        .append("text")
        .attr({
            class: 'titles',
            x: margin.left,
            y: (margin.top) * (1 / 3)
        })
        .style({
            'font-size': '30px',
            'color': 'red',
            'font-weight': 'bold'
        })
        .text("Pooolskaaaa miiiistrzeem Pooolskiii..!!!! ;)   ");

    var today = new Date(Date.now()).toLocaleString();

    var subtitle = d3.select('#subtitle')
        .append("text")
        .attr({
            class: 'titles',
            x: margin.left,
            y: (margin.top)
        })
        // .attr("x", 100)//.left)             
        // .attr("y", (margin.top)*(3))
        .style("font-size", "16px")
        .text("Eliminacje do MŚ w kopanej 2018 - " + today);

    // info
    var tip = d3.select("#info")
        .append('div')
        .attr('id', 'tip')
        .style('opacity', .5);

    var message = function(d) {
        return '<br>' + d[_name] + ' - ' + d[_goals] + ' goals, ' + d[_points] + 'pts. </br>';
    };

    bubbles
        .on('mouseover', function(d) {
            if (d.country == 'Polska') {
                d3.select('#title')
                    .style({
                        visibility: 'visible'
                    })
            }
            tip.html(message(d));
        })
        .on('mouseout', function() {
            tip.html('');
            d3.select('#title')
                .style('visibility', 'hidden')
        });
}