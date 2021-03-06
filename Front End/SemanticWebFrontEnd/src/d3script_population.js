(function(){
//Width and height
var w = 900;
var h = 580;

//Define map projection
var projection = d3.geo.mercator()
    .center([ -72.5, 41.7 ])
    .scale([ 20*w ]);

//Define path generator
var path = d3.geo.path()
    .projection(projection);

//Create SVG element
var svg = d3.select("#cont2").append("svg").attr({width:w, height: h});

//Load in GeoJSON data
d3.json("data/CT-towns.geojson", function(json) {

    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill","#666666");

    d3.csv("data/Coordinates.csv", function(data) {

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return projection([d.long, d.lat])[0];
            })
            .attr("cy", function(d) {
                return projection([d.long, d.lat])[1];
            })
            .attr("r", function(d) {
                return Math.sqrt(parseInt(d.total_pop_2015)* 0.0005);
            })
            .style("fill", function(d){
                if (d.total_pop_2015 < 10000) { return "blue"; }
                else if (d.total_pop_2015<=40000 && d.total_pop_2015 >10000) { return "green";}
                else if (d.total_pop_2015 > 40000){return "red";}
            });


        console.log("population");
    });
});




})();