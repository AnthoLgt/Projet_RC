
var npPhotos=0;

var cpt = 1;
var nbPages;
var nbPhotos = 0;

var Data = [];
// woe 23424819
// date  2014-01-01
function flickSearch(woe, tags, minDate){

    console.log("flickSearch");
    var Data = [];
     $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&accuracy=16&tags='+ tags +'&woe_id='+ woe+'&min_taken_date='+ minDate +'&min_upload_date='+ minDate +'&has_geo=1&page='+cpt+'&extras=geo&format=json&nojsoncallback=1',
        function(data3){
            nbPages = data3.photos.pages
            nbPhotos = data3.photos.total
                $('#myModal').modal('show');
                $('#modal-titleh4').html(nbPhotos+' photos trouvées');                 

                getAllPageFlick(nbPages, tags, woe, minDate);
        });
    

        

}


function getAllPageFlick(nbPages, tags, woe, minDate){   
     
    var cpt = 1;
    console.log(cpt+" "+nbPages)
    do {
    
    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&accuracy=16&tags='+ tags +'&woe_id='+ woe+'&min_taken_date='+ minDate +'&min_upload_date='+ minDate +'&has_geo=1&page='+cpt+'&extras=geo&format=json&nojsoncallback=1',
        function(data3){
            
            nbPages = data3.photos.pages
            currentPage = data3.photos.page
            //if the image has a location, build an html snippet containing the data
            if(data3.stat != 'fail') {
            //    pLocation = '<a href="http://www.flickr.com/map?fLat=' + data.photo.location.latitude + '&amp;fLon=' + data.photo.location.longitude + '&amp;zl=1" target="_blank">' + data.photo.location.locality._content + ', ' + data.photo.location.region._content + ' (Click for Map)</a>';
            }

            var i = 0;
            data = data3.photos
            Data = Data.concat(data);
            $.each(data3.photos.photo, function(i, item) {

            //    createCircle(item.latitude, item.longitude,700);

            }); 
          //   console.log("width="+parseInt(widthOld)+"+"+100/nbPages+"="+(parseInt(widthOld)+100/nbPages))
          //      console.log(cpt+"<"+nbPages+"="+(parseInt(widthOld)+100/nbPages))
          //  console.log(data)
          //    console.log(Data)

            if(Data.length === nbPages){
             //   console.log(Data)
                var DataAllPages = [];
                var cpt= 0;
                $.each(Data, function(i, pages) {
                    console.log(pages);
                    var photos = pages.photo
                    $.each(photos, function(j, photo){
                         console.log(photo.latitude);
                         DataAllPages[cpt] = photo;
                         cpt++;
                    });
                });
                console.log("ici"+cpt)
                console.log(DataAllPages)
                ALL_DATA[tags] = DataAllPages;
           //     console.log(ALL_DATA);
                displayFlickrResult(ALL_DATA[tags], NIGHT_MODE, DATE_DEFAULT); // En travaux...
            }
        
        });
        cpt++;
    } while (cpt <= nbPages);
 }
