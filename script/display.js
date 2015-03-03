

function displayFlickrResult(tag, NIGHT_MODE, periode){
    
    var indexTag=0;
    var photoTag1, photoTag2, photoTag3;
    for(indexTag = 0; indexTag < Object.keys(ALL_DATA).length; indexTag++){
        if(Object.keys(ALL_DATA)[tag] === tag){ 
            break;
        }
    }
    

  /*  if(photoTag1==0){
        photoTag1 = ALL_DATA[tag];
    }else if(photoTag2==1){
        photoTag2 = ALL_DATA[tag];
    }*/
                
    indexTag = indexTag - 1;
  //  console.log(ALL_DATA)
    console.log((ALL_DATA)[tag].length)
    console.log((ALL_DATA))
    var cpt = 0;
    var circles = d3.select("g").selectAll("circle[class='circle-"+tag+"']") // Très important !
    .data((ALL_DATA)[tag])
    .enter().append("circle")
    .attr("r", "3")
    .attr("class", "circle-"+tag)
    .attr("fill", COLOR_TAG[tag])
    .style("stroke", d3.rgb(COLOR_TAG[tag]).darker())
    .attr("cx", function (d) { cpt++;return project(d.longitude, d.latitude).x; })
    .attr("cy", function (d) { return project(d.longitude, d.latitude).y; });
 console.log("tag= "+tag+" couleur="+COLOR_TAG[tag]+" occur="+cpt)

    topBnd = Math.max.apply(Math,(ALL_DATA)[tag].map(function(o){return o.latitude;}));
    bottomBnd = Math.min.apply(Math,(ALL_DATA)[tag].map(function(o){return o.latitude;}));
    leftBnd = Math.min.apply(Math,(ALL_DATA)[tag].map(function(o){return o.longitude;}));
    rightBnd = Math.max.apply(Math,(ALL_DATA)[tag].map(function(o){return o.longitude;}));
    
            map.on("viewreset", update);
	    update();
            function update() {
                                
                    bottomLeft = project(leftBnd, bottomBnd);
                    topRight = project(rightBnd, topBnd);

                    svg.attr("width", topRight.x - bottomLeft.x)
                        .attr("height", bottomLeft.y - topRight.y)
                        .style("margin-left", bottomLeft.x + "px")
                        .style("margin-top", topRight.y + "px");
                    g.attr("transform", "translate(" + -bottomLeft.x + "," + -topRight.y + ")");
			circles.attr("fill", COLOR_TAG[tag])
                        .style("stroke", d3.rgb(COLOR_TAG[tag]).darker())
                        .attr("cx", function (d) { return project(d.longitude, d.latitude).x; })
                        .attr("cy", function (d) { return project(d.longitude, d.latitude).y; });
            }
        

    $('#myModal').modal('hide');
}



function project(longitude,latitude) {
    return map.latLngToLayerPoint(new L.LatLng(latitude, longitude));
}
