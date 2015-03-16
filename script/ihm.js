
function createIHM(){

    // Bouton controlant le mode aide
    var controlCommandHelp = L.control({position: 'topleft'});
    controlCommandHelp.onAdd = function(map){
                        var div = L.DomUtil.create('div', 'leaflet-control-command');
                        L.DomEvent.disableClickPropagation(div)
                        div.innerHTML = '<i class="fa fa-question-circle fa-lg"></i>'; 
                        div.setAttribute("class","control controlHelp");
                        div.setAttribute("data-container", "body");
                        div.setAttribute("data-toggle", "popover");
                        div.setAttribute("data-content", "Bouton permettant d'afficher l'aide");
                        div.setAttribute("data-placement", "right");
                        return div;
                    }
    controlCommandHelp.addTo(map);
    $(".controlHelp").on("click", function(){
        if(POPOVER_DISPLAY ? POPOVER_DISPLAY = false : POPOVER_DISPLAY = true);
        if(POPOVER_DISPLAY){
            $(this).css('background', '#000');
            $(this).css('color', '#fff');
            $('[data-toggle="popover"]').popover({trigger: 'manual'});
            $('[data-toggle="popover"]').popover('show');
        }
        else{
            $(this).css('background', '#fff');
            $(this).css('color', '#000');
            $('[data-toggle="popover"]').popover('hide');
        }
    });

    // Bouton controlant le mode nuit
    var controlNight = L.control({position: 'topleft'});
    controlNight.onAdd = function(map){
                        var div = L.DomUtil.create('div', 'leaflet-control-command');
                        L.DomEvent.disableClickPropagation(div)
                        div.innerHTML = '<i class="fa fa-moon-o fa-lg"></i>'; 
                        div.setAttribute("class","control controlNight");                        
                        div.setAttribute("data-container", "body");
                        div.setAttribute("data-toggle", "popover");
                        div.setAttribute("data-content", "Bouton permettant d'activer/désactiver le mode nuit affichant les photos prises de nuit");
                        div.setAttribute("data-placement", "bottom");
                        return div;
                    }
    controlNight.addTo(map);
    // Au click, on passe en mode nuit
    $(".controlNight").on("click", function(){
        
        if(NIGHT_MODE ? NIGHT_MODE = false : NIGHT_MODE = true); // On swicth la valeur
        if(NIGHT_MODE){            
            $(this).css('background', '#000');
            $(this).css('color', '#fff');
            //http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png
            L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18
            }).addTo(map);
            for(tag in Object.keys(ALL_DATA)){
                $(".circle-"+Object.keys(ALL_DATA)[tag]).remove();
                displayFlickrResult(Object.keys(ALL_DATA)[tag],NIGHT_MODE);
            }
        }else{
            $(this).css('background', '#fff');
            $(this).css('color', '#000');
            L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18
            }).addTo(map);
            for(tag in Object.keys(ALL_DATA)){
                $(".circle-"+Object.keys(ALL_DATA)[tag]).remove();
                displayFlickrResult(Object.keys(ALL_DATA)[tag],NIGHT_MODE);
            }
        }
    });



    // Controleur du formulaire pour la recherche de tags
    var controlFormSearch = L.control({position: 'topright'});
    controlFormSearch.onAdd = function(map){
                        var div = L.DomUtil.create('div', 'leaflet-control-command');
                        L.DomEvent.disableClickPropagation(div)
                        div.innerHTML = '\
                           <form class="form-inline">\
                              <div class="form-group">\
                                  <input type="text" class="form-control" id="inputSearchTag" style="width:150px" placeholder="Tags..">\
                              </div>\
                              <button type="submit" class="btn btn-default" id="buttonSubmitTag"><i class="fa fa-search"></i></button>\
                            </form>'; 
                        div.setAttribute("class","control");
                        div.setAttribute("id","formInputSearchTag");
                        div.setAttribute("data-container", "body");
                        div.setAttribute("data-toggle", "popover");
                        div.setAttribute("data-content", "Saissisez un tag ou plusieurs tags similaires séparés d\'une virgule");
                        div.setAttribute("data-placement", "left");
                        return div;
                    }
    controlFormSearch.addTo(map);
     $("#formInputSearchTag").submit(function(event) {
      event.preventDefault(); // Pour ne pas réaliser le comportement par défaut du submit
      if($('#inputSearchTag').val() !== ""){
            search($('#inputSearchTag').val()); 
        }
     });


    var controlTagsCheckBox = L.control({position: 'topright'});
    controlTagsCheckBox.onAdd = function(map){
                        var div = L.DomUtil.create('div', 'leaflet-control-command');
                        L.DomEvent.disableClickPropagation(div)
                        div.innerHTML = '\
                            <i class="fa fa-tags"></i>Tags : \
                            <div id="tagsCheckBox" class="checkbox">\
                            <span style="color:grey; text-align=center"><i>Aucun tag</i></span>\
                            </div>\
                            '; 
                        div.setAttribute("class","control");
                        div.setAttribute("data-container", "body");
                        div.setAttribute("data-toggle", "popover");
                        div.setAttribute("data-content", "Zone destinée à stocker les tags recherchés. Possibilité de masquer ou supprimer des tags.");
                        div.setAttribute("data-placement", "left");
                        return div;
                    }
    controlTagsCheckBox.addTo(map);


    var controlCharts = L.control({position: 'bottomleft'});
    controlCharts.onAdd = function(map){
                        var div = L.DomUtil.create('div', 'leaflet-control-command');
                        L.DomEvent.disableClickPropagation(div)
                        div.innerHTML = '<i class="fa fa-bar-chart fa-lg"></i>'; 
                        div.setAttribute("class","control controlChart");
                        div.setAttribute("data-container", "body");
                        div.setAttribute("data-toggle", "popover");
                        div.setAttribute("data-content", "Bouton permettant d'afficher le graphique de répartition du nombre de photos par régions (normalisé par leur population)");
                        div.setAttribute("data-placement", "right");
                        return div;
                    }
    controlCharts.addTo(map);
    $(".controlChart").on("click", function(){
        
        if(!DISPLAY_CHART){
            if(REGION_REPARTITION.length === 22){
                if(Object.keys(ALL_DATA).length !== 0){
                    $(".controlChart").empty();
                //    $(".controlChart").html = '<i class="fa fa-bar-chart fa-lg"></i>';
                 //   $(".controlChart").html('<i class="fa fa-times"></i>');
                    $(".controlChart").html('<i class="fa fa-bar-chart"></i>');
                    DISPLAY_CHART = true;
                    displayBarChart(REGION_REPARTITION);
                }
            }
        }
        else{
            DISPLAY_CHART = false;
            REGION_REPARTITION.forEach(function(d){ delete d.ages });
            $(".controlChart").empty();
            $(".controlChart").html ('<i class="fa fa-bar-chart fa-lg"></i>');
        }
    });
}

function createCircle(x,y,r){
    var circle = L.circle([x, y], r, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(map);
}





