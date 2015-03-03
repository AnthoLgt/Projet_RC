
var npPhotos=0;

var cpt = 1;
var nbPages;
var nbPhotos = 0;


function flickSearch(woe, tags, minDate){

    console.log("flickSearch");
    var Data = [];
     $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&accuracy=16&tags='+ tags +'&woe_id='+ woe+'&min_taken_date='+ minDate +'&min_upload_date='+ minDate +'&has_geo=1&page='+cpt+'&format=json&nojsoncallback=1',
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
    
    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&accuracy=16&tags='+ tags +'&woe_id='+ woe+'&min_taken_date='+ minDate +'&min_upload_date='+ minDate +'&has_geo=1&page='+cpt+'&extras=geo,date_taken&format=json&nojsoncallback=1',
        function(data3){
            
            nbPages = data3.photos.pages
            currentPage = data3.photos.page
            //if the image has a location, build an html snippet containing the data
            if(data3.stat != 'fail') {
            
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
                ALL_DATA_NIGHT[tagsProper] = [];
                DISPLAY_TAG[tagsProper] = true; 
                console.log(ALL_DATA_NIGHT.length);
                // Sélection des photos prises de nuit
                $.each(ALL_DATA[tagsProper], function(i, photo) {
                    var date = photo.datetaken;
                    var mois= date.split(" ")[0].split("-")[1];
                    var heure = date.split(" ")[1].split(":")[0];
                    console.log(date)
                    if(heure < 7 || heure > 21){ // Nuit
                        ALL_DATA_NIGHT[tagsProper].push(photo);
                    }
                    
                    // Saisons ?
                });
                
                        console.log(ALL_DATA_NIGHT[tagsProper])
                console.log("night :"+ALL_DATA_NIGHT[tagsProper].length+" all:"+ALL_DATA[tagsProper].length);
                
                
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


                showListTag();
               displayFlickrResult(tagsProper, NIGHT_MODE, DATE_DEFAULT);
            }
        });
        cpt++;
    } while (cpt <= nbPages);
 }
