
var npPhotos=0;

var cpt = 1;
var nbPages;
var nbPhotos = 0;


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
    var Data = [];
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


            if(Data.length === nbPages){
                //   console.log(Data)
                var DataAllPages = [];
                var cpt= 0;
                $.each(Data, function(i, pages) {
                    var photos = pages.photo
                    $.each(photos, function(j, photo){
                        DataAllPages[cpt] = photo;
                        cpt++;
                    });
                });
                var tagsProper = tags.replace(" ","-"); // Pour enlever les problèmes des classes CSS
                tagsProper = tagsProper.replace(",","-"); // Pour enlever les problèmes des classes CSS
                ALL_DATA[tagsProper] = DataAllPages;
                
                var availableRed = true;
                var availableBlue = true;
                var availableYellow = true;
                for(tag in Object.keys(COLOR_TAG)){
                   // var nomTag = Object.keys(COLOR_TAG)[tag];
                    if((COLOR_TAG)[Object.keys(COLOR_TAG)[tag]] === RED){
                        availableRed = false;
                    } else if((COLOR_TAG)[Object.keys(COLOR_TAG)[tag]] === BLUE){
                        availableBlue = false;
                    } else if((COLOR_TAG)[Object.keys(COLOR_TAG)[tag]] === YELLOW){
                        availableYellow = false;
                    }  

                }
                if(availableRed){
                    COLOR_TAG[tagsProper] = RED;
                }else if(availableBlue){
                    COLOR_TAG[tagsProper] = BLUE;
                }else if(availableYellow){
                    COLOR_TAG[tagsProper] = YELLOW;
                }
                console.log(COLOR_TAG)
                //     console.log(ALL_DATA);
                var cpt = 0;


               var htmlTags = '';
               for(tag in Object.keys(COLOR_TAG)){
                   var nomTag = Object.keys(COLOR_TAG)[tag];
                   htmlTags = htmlTags + '<label><input type="checkbox" onchange="showTag(\''+nomTag+'\');" checked><span id="badge-tag-'+nomTag+'"class="badge" style="background-color:'+(COLOR_TAG)[nomTag]+'" onclick="removeTag(\''+nomTag+'\');">'+nomTag+' <i class="fa fa-times"></i></span></label><br>' 
                   cpt++
               }
               $('#tagsCheckBox').html(htmlTags);
               displayFlickrResult(tagsProper, NIGHT_MODE, DATE_DEFAULT);
            }
        });
        cpt++;
    } while (cpt <= nbPages);
 }
