

function displayFlickrResult(Data, NIGHT_MODE, periode){
    
 /*   $.each(Data, function(i, pages) {


        var photos = pages.photo;
        console.log()
        var circles = d3.select("g").selectAll("circle")
            .data(photos)
            .enter().append("circle")
            .attr("r", "30")
            .attr("fill", "red").attr("cx", function (d) { console.log("x="+project(d.longitude, d.latitude)[1]);return project(d.longitude, d.latitude)[1]; })
           .attr("cy", function (d) { console.log("y="+project(d.longitude, d.latitude)[0]); return project(d.longitude, d.latitude)[0]; });
     //   $.each(photos, function(i, photo) {

            
           // console.log(photo.latitude);

    //    });
        //createCircle(item.latitude, item.longitude,700);

    }); */
 /*   console.log(Data)
    console.log(Data.pages.photo)
    var circles = d3.select("g").selectAll("circle")
            .data(Data.pages.photo)
            .enter().append("circle")
            .attr("r", "300")
            .attr("fill", "red").attr("cx", function (d) { return project(d.longitude)[0]; })
           .attr("cy", function (d) { return project(d.latitude)[1]; });
    */
    $('#myModal').modal('hide');
}



function project(longitude,latitude) {
    console.log(longitude+" "+latitude)
    var point = map.latLngToLayerPoint(new L.LatLng(latitude, longitude));
    return [point.x, point.y];
}