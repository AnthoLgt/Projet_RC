
var npPhotos=0;

var cpt = 1;
var nbPages;
var nbPhotos = 0;

/**
 * Méthode permettant de lancer une requête vers l'API Flickr.
 * 
 * On lance une première requête pour connaitre le nombre de photos à récupérer, puis on lance les requêtes nécessaires pour récuperer toutes les pages.
 * 
 * @param {type} woe Lieu de recherche
 * @param {type} tags Tags de recherche
 * @param {type} minDate Date d'upload minimum
 */
function flickSearch(woe, tags, minDate){

    console.log("flickSearch");
    var Data = [];
     $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&accuracy=16&tags='+ tags +'&woe_id='+ woe+'&min_taken_date='+ minDate +'&min_upload_date='+ minDate +'&has_geo=1&page='+cpt+'&format=json&nojsoncallback=1',
        function(data3){
            nbPages = data3.photos.pages
            nbPhotos = data3.photos.total
                $('#myModal').modal('show');
                $('#modal-titleh4').html(nbPhotos+' photos trouvées');                 
                if(nbPhotos == 0){
                    $('.modal-footer').html('<i class="fa fa-times fa-lg"></i>')
                }else{
                    $('.modal-footer').html('<i class="fa fa-spinner fa-pulse fa-lg"></i>')
                    getAllPageFlick(nbPages, tags, woe, minDate);
                }
        });     

}

/**
 * Méthode permettant de récupérer l'ensemble des pages de résultats d'une requête.
 * 
 * @param {type} nbPages Le nombre de pages à récupérer
 * @param {type} tags Tags de recherche
 * @param {type} woe Lieu de de recherche
 * @param {type} minDate Date d'upload minimum
 */
function getAllPageFlick(nbPages, tags, woe, minDate){   
     
    var cpt = 1;
    var Data = [];
    do {
    
        $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&accuracy=16&tags='+ tags +'&woe_id='+ woe+'&min_taken_date='+ minDate +'&min_upload_date='+ minDate +'&has_geo=1&page='+cpt+'&extras=geo,date_taken,url_t&format=json&nojsoncallback=1',
            function(data3){

                nbPages = data3.photos.pages
                currentPage = data3.photos.page
                //if the image has a location, build an html snippet containing the data
                if(data3.stat != 'fail') {
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
                            tagsProper = tagsProper.replace("--","-"); // Pour enlever les problèmes des classes CSS
                            ALL_DATA[tagsProper] = DataAllPages;
                            ALL_DATA_NIGHT[tagsProper] = [];
                            DISPLAY_TAG[tagsProper] = true; 
                            // Sélection des photos prises de nuit
                            $.each(ALL_DATA[tagsProper], function(i, photo) {
                                var date = photo.datetaken;
                                var mois= date.split(" ")[0].split("-")[1];
                                var heure = date.split(" ")[1].split(":")[0];
                                //console.log(date)
                                if(heure < 7 || heure > 22){ // Nuit
                                    ALL_DATA_NIGHT[tagsProper].push(photo);
                                }

                                // Saisons ?
                            });



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
                            var cpt = 0;
                            if(Object.keys(ALL_DATA).length == 3){
                                $('#inputSearchTag').val("3 tags maximum");
                                $('#inputSearchTag').prop('disabled', true);
                            }

                            showListTag();
                            displayFlickrResult(tagsProper, NIGHT_MODE, DATE_DEFAULT);
                            
                            groupBarChart(tags);
                        }
                    }
                
                else{
                    alert("Erreur Flickr..")
                }
            });
        cpt++;
    } while (cpt <= nbPages);
 }
