

function displayFlickrResult(Data, NIGHT_MODE, periode){
    
    var cpt=0;
    console.log(Data)


            var circles = d3.select("g").selectAll("circle")
            .data(Data)
            .enter().append("circle")
            .attr("r", "3")
            .attr("fill", "red").attr("cx", function (d) { cpt++; return project(d.longitude, d.latitude).x; })
           .attr("cy", function (d) { return project(d.longitude, d.latitude).y; });
   
          /*  map.on("viewreset", update);
	    update();
            function update() {
			circles.attr("transform", 
			function(d) { 
				return "translate("+ 
					project(d.longitude, d.latitude).x +","+ 
					project(d.longitude, d.latitude).y +")";
				}
			)
            } */
        
        //   $.each(photos, function(i, photo) {

            
           // console.log(photo.latitude);

    //    });
        //createCircle(item.latitude, item.longitude,700);


  //  alert(cpt)
   console.log(Data)
  //  console.log(Data.pages.photo)
  
  /*
    var circles = d3.select("g").selectAll("circle")
            .data(Data.pages.photo)
            .enter().append("circle")
            .attr("r", "300")
            .attr("fill", "red").attr("cx", function (d) { return project(d.longitude).x; })
           .attr("cy", function (d) { return project(d.latitude).y; });
    */
    $('#myModal').modal('hide');
}



function project(longitude,latitude) {
    console.log(longitude+" "+latitude)
    return map.latLngToLayerPoint(new L.LatLng(latitude, longitude));
}