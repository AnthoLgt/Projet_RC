


// EXEMPLE CHIEN, CHAT
// EXEMPLE SOLO : BATEAU


function groupBarChart(tag){
            
    d3.csv("region.csv", function(data) {


                for(i = 0; i < data.length; i++){
                    var tmp = {};
                    tmp["region"] = data[i].region
                    tmp["population"] = data[i].population;

                    var regionInfos = data[i];
                    REGION_POP.push(tmp);
                       
            
                    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&accuracy=16&tags='+ tag +'&woe_id='+ data[i].woeid +'&min_taken_date='+ DATE_DEFAULT +'&min_upload_date='+ DATE_DEFAULT +'&has_geo=1&page=1&extras=geo&format=json&nojsoncallback=1',
                        function(data3){
                            
                            var tagsProper = tag.replace(" ","-"); // Pour enlever les problèmes des classes CSS
                            tagsProper = tagsProper.replace(",","-"); // Pour enlever les problèmes des classes CSS
                            tagsProper = tagsProper.replace("--","-"); // Pour enlever les problèmes des classes CSS
                            nbPhotos = data3.photos.total;
                            if(Object.keys(REGION_REPARTITION).length !== 22){
                                var tmp = {};
                                tmp["region"] = this.regionInfos.region;
                                var color = (COLOR_TAG)[tagsProper];
                                color = color.replace("#","");
                                tmp["nbPhotoTag"+color] = nbPhotos / this.regionInfos.population;
                                REGION_REPARTITION.push(tmp);
                            }
                            else{
                             for(regionCur in Object.keys(REGION_REPARTITION)){
                                 if(REGION_REPARTITION[regionCur].region === this.regionInfos.region){
                                     var color = (COLOR_TAG)[tagsProper];
                                     color = color.replace("#","");
                                     REGION_REPARTITION[regionCur]["nbPhotoTag"+color] = nbPhotos / this.regionInfos.population;
                                 }
                             }
                            }
                        }.bind({regionInfos:regionInfos}));
                    }
     
    });
}







function displayBarChart(data){
    
    data.sort(function(a, b){
        if(a.region < b.region) return -1;
        if(a.region > b.region) return 1;
        return 0;
    });
    var fontSizeX;
    var fontSizeY;
    var defaultWidth;
    var defaultHeight;
    var margin;
    
    if($( window ).width() <  768){
        fontSizeX = ".15em";
        fontSizeY = ".31em";
        defaultWidth = $(document).width() - 45;
        defaultHeight =  $(document).height() - 45;
        margin = {top: 20, right: 20, bottom: 50, left: 35};
    }else{
        fontSizeX = ".35em";
        fontSizeY = ".71em";
        defaultWidth = 550;
        defaultHeight = 400;
        margin = {top: 40, right: 20, bottom: 100, left: 45};
    }
    
    var width = defaultWidth - margin.left - margin.right;
    var height = defaultHeight - margin.top - margin.bottom;
    var x0 = d3.scale.ordinal().rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear().range([height, 0]);

//    var color = d3.scale.ordinal()
  //      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select(".controlChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


     var valueRegion = d3.keys(data[0]).filter(function(key) { return key !== "region"; });
      
      data.forEach(function(d) {
        d.ages = valueRegion.map(function(region) { return {name: region, value: +d[region]}; });
      }); 

      x0.domain(data.map(function(d) { return d.region; }));
      x1.domain(valueRegion).rangeRoundBands([0, x0.rangeBand()]);
      y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", fontSizeX)
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", fontSizeY)
          .style("text-anchor", "end")
          .text("Score");

      var state = svg.selectAll(".state")
          .data(data)
          .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(" + x0(d.region) + ",0)"; });

      state.selectAll("rect")
          .data(function(d) { return d.ages; })
          .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.name); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .style("fill", function(d) { return "#"+(d.name).split("g")[1]; });

      var legend = svg.selectAll(".legend")
          .data(valueRegion.slice().reverse())
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

   /*   legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);  */

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 0)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .style("fill", function(d) { return "#"+d.split("g")[1]; })
          .text(function(d) {
              var nomTag =  Object.keys(ALL_DATA)[arraySearch(COLOR_TAG,"#"+d.split("g")[1])];
              return nomTag;
            });


}


function arraySearch(arr,val) {
    for (var i=0; i< Object.keys(arr).length; i++){
        if (arr[Object.keys(arr)[i]] === val) {                   
            return i;
        }
    }
    return false;
  }

