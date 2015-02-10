/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * 
 * 
 */ 

var apiKey = "b219c0547599fce82466b3efced42b5d";
var tag = "dog";

/*
$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + tag + '&format=json&nojsoncallback=1',
    function(data){
 
        //if the image has a location, build an html snippet containing the data
        if(data.stat != 'fail') {
        //    pLocation = '<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
        }
        console.log(data);
        
    });
    
   */
    /*
$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + tag + '&location=france&format=json&nojsoncallback=1',
    function(data){
 
        //if the image has a location, build an html snippet containing the data
        if(data.stat != 'fail') {
        //    pLocation = '<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
        }
        console.log(data);
        
    });
    */
    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=' + apiKey + '&lat=48.855556&lon=2.74&accuracy=16&format=json&nojsoncallback=1',
    function(data2){
 
        //if the image has a location, build an html snippet containing the data
        if(data2.stat != 'fail') {
        //    pLocation = '<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
        }
        console.log(data2);
        
    });
    
        
$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&woe_id=584467&format=json&nojsoncallback=1',
    function(data3){
 
        //if the image has a location, build an html snippet containing the data
        if(data3.stat != 'fail') {
        //    pLocation = '<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
        }
        console.log(data3);
        
    });
    
        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=' + apiKey + '&lat=48.855556&lon=2.74&accuracy=3&format=json&nojsoncallback=1',
    function(data4){
 
        //if the image has a location, build an html snippet containing the data
        if(data4.stat != 'fail') {
        //    pLocation = '<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
        }
        console.log(data4);
        
    });
    
var data = {};
var cpt = 1;
var nbpages;
$.ajaxSetup({
    async: false
})
do {
$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=dogs&woe_id=23424819&min_taken_date=2014-01-01&min_upload_date=2014-01-01&has_geo=1&page='+cpt+'&extras=geo&format=json&nojsoncallback=1',
    function(data3){
        nbpages = data3.photos.pages
        console.log(nbpages)
        //if the image has a location, build an html snippet containing the data
        if(data3.stat != 'fail') {
        //    pLocation = '<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
        }

        
        //console.log("compte :"+count);
        
        //for(key in data3){
        //    console.log(key);
        //    for(key2 in data3[key]){
              //  console.log(key2[photo][0][title])
              //  console.log(key2);
        //    }
        //}
        //console.log(data3.photos.photo[0].title);
        //console.log(data3.photos.photo);
        var i = 0;
        data = data3.photos
        console.log(data)
        //$.each(data3.photos.photo, function(i, item) {
        //    i= i +1;
        //});
        //alert(i);
        
    console.log(cpt+"<"+nbpages)
    cpt++;
    });
} while (cpt < nbpages);
