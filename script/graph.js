/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function graphPopulation() {
    var margin = {top: 20, right: 20, bottom: 90, left: 70},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("./population.csv", type, function(error, data) {
        x.domain(data.map(function(d) { return d.region; }));
        y.domain([0, d3.max(data, function(d) { return d.population; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Population");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.region); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.population); })
            .attr("height", function(d) { return height - y(d.population); });
    });
    
    function type(d) {
        d.population = +d.population;
        return d;
    }   
}


function photoTagByRegion(tags) {
    var REGION = {};
    var photoRegion = [];

    
    d3.csv("./region.csv", function(data) {
         
  
        for(i = 0; i < data.length; i++) {
            console.log("region: "+data[i].woeid)
            region = data[i].region;
            console.log(region)
            var nbPhotos = 0;
            $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&accuracy=16&tags='+ tags +'&woe_id='+ data[i].woeid +'&min_taken_date='+ DATE_DEFAULT +'&min_upload_date='+ DATE_DEFAULT +'&has_geo=1&page=1&extras=geo&format=json&nojsoncallback=1',
                region,function(data3){
                    //console.log(data3.photos.total)
                    console.log(data3)
                    nbPhotos = data3.photos.total;
                  //  photoRegion[i] = nbPhotos;

                    var tmp = {};
                    tmp[this.region] = nbPhotos;

                    REGION[this.region] = nbPhotos
                    //REGION.push([this.region, nbPhotos])
                    
                    
                    if(Object.keys(REGION).length === 22){
                       console.log(REGION)
                       
                       for(regionCur in Object.keys(REGION)){
                           console.log(Object.keys(REGION)[regionCur]+"="+(REGION)[Object.keys(REGION)[regionCur]])
                       }
                    }
                }.bind({region:region}));
            
        //    console.log("region "+data[i].region+" = "+photoRegion[i])
        }
    });
    
    
    return photoRegion;
}

function photosRegion() {
    var array = [1,2,3]
    ALL_DATA = {"dogs":array}
    var photosTags = [];
    var tags = Object.keys(ALL_DATA);
    console.log(tags)
    for(i = 0; i < tags.length; i++) {
        photosTags[i] = photoTagByRegion(tags[i]);
    }
    console.log(photosTags);
    
    return photosTags;
}

var photosR = photosRegion();

function groupedBarChart() {
    
    
    var margin = {top: 20, right: 20, bottom: 90, left: 70},
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("./region.csv", function(error, data) {
        //var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "region"; });
        var regionNames = [];
        for(i = 0; i < data.length; i++) {
            regionNames[i] = data[i].region;
        }

        data.forEach(function(d) {
            d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
        });
        
        /*var photos = photosRegion();
       
        for(i = 0; i < data.length; i++) {
            tags = regionNames.map(function(name) { return {name: name, value: +photos[name]}; });
        }*/

        //x0.domain(data.map(function(d) { return d.region; }));
        x0.domain(regionNames);
        x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Pourcentage");

        var state = svg.selectAll(".state")
            .data(data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d) { return "translate(" + x0(regionNames) + ",0)"; });

        state.selectAll("rect")
            .data(function(d) { return d.ages; })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function(d) { return x1(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .style("fill", function(d) { return color(d.name); });

        var legend = svg.selectAll(".legend")
            .data(ageNames.slice().reverse())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });

    });
}

//graphPopulation();

groupedBarChart();


