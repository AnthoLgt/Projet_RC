/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var apiKey = "b219c0547599fce82466b3efced42b5d";

var npPhotos=0;
var data = {};
var cpt = 1;
var nbpages;
$.ajaxSetup({
    async: false
})
do {
$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&accuracy=16&tags=dog&woe_id=23424819&min_taken_date=2014-01-01&min_upload_date=2014-01-01&has_geo=1&page='+cpt+'&extras=geo&format=json&nojsoncallback=1',
    function(data3){
        nbpages = data3.photos.pages
        console.log(nbpages)
        //if the image has a location, build an html snippet containing the data
        if(data3.stat != 'fail') {
        //    pLocation = '<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
        }

        var i = 0;
        data = data3.photos
     //   console.log(data)
        $.each(data3.photos.photo, function(i, item) {
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

alert(npPhotos)