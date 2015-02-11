/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var apiKey = "b219c0547599fce82466b3efced42b5d";

var npPhotos=0;

var cpt = 1;




 // Initialize the SVG layer
 map._initPathRoot()    

 // We pick up the SVG from the map object
 var svg = d3.select("#map").select("svg"),
 g = svg.append("g");
 
console.log(dog);
 d3.json(dog, function(collection) {
  // Add a LatLng object to each item in the dataset
  collection.objects.forEach(function(d) {
   d.LatLng = new L.LatLng(d.photos.photo.latitude,
      d.photos.photo.longitude)
  })
  
  var feature = g.selectAll("circle")
   .data(collection.objects)
   .enter().append("circle")
   .style("stroke", "black")  
   .style("opacity", .6) 
   .style("fill", "red")
   .attr("r", 20);  
  
  map.on("viewreset", update);
  update();

  function update() {
   feature.attr("transform", 
   function(d) { 
       return "translate("+ 
    map.latLngToLayerPoint(d.LatLng).x +","+ 
    map.latLngToLayerPoint(d.LatLng).y +")";
       }
   )
  }
 })    






/*
var nbpages;
$.ajaxSetup({
    async: false
})
var dataPhotos;
do {
$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&accuracy=16&tags=dog&woe_id=23424819&min_taken_date=2014-01-01&min_upload_date=2014-01-01&has_geo=1&page='+cpt+'&extras=geo&format=json&nojsoncallback=1',
    function(data){
        nbpages = data.photos.pages
        console.log(nbpages)
        //if the image has a location, build an html snippet containing the data
        if(data.stat != 'fail') {
        //    pLocation = '<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
        }

        var i = 0;
        dataPhotos = data.photos;
     //   console.log(data)
        $.each(data.photos.photo, function(i, item) {
     //       console.log(item.title+":"+item.latitude);
     
       //     $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key='+apiKey+'&photo_id='+item.id+'&format=json&nojsoncallback=1',
       //     function(data4){
       //         console.log(data4.photo.camera);
       //         console.log(data4.exifs.);
           // createCircle(item.latitude, item.longitude,700);
        //    });
            createCircle(item.latitude, item.longitude,700);
            npPhotos++;
        });
        
        
    console.log(cpt+"<"+nbpages)
    cpt++;
    });
} while (cpt <= nbpages);

alert(npPhotos);
console.log(dataPhotos);
*/