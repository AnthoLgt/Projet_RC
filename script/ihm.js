
function createIHM(){

    // Bouton controlant le mode aide
    var controlCommandHelp = L.control({position: 'topleft'});
    controlCommandHelp.onAdd = function(map){
                        var div = L.DomUtil.create('div', 'leaflet-control-command');
                        L.DomEvent.disableClickPropagation(div)
                        div.innerHTML = '<i class="fa fa-question-circle fa-lg"></i>'; 
                        div.setAttribute("class","control controlHelp");
                        div.setAttribute("data-container", "body");
                        div.setAttribute("data-toggle", "popoverHelp");
                        if($( window ).width() < 768){
                            div.setAttribute("data-content", "L'aide n'est pas disponible sur portable");
                        }else{
                            div.setAttribute("data-content", "Bouton permettant d'afficher l'aide");
                        }                        
                        div.setAttribute("data-placement", "right");
                        return div;
                    }
    controlCommandHelp.addTo(map);
    $(".controlHelp").on("click", function(){
        if(POPOVER_DISPLAY ? POPOVER_DISPLAY = false : POPOVER_DISPLAY = true);
        if(POPOVER_DISPLAY){
            $(this).css('background', '#000');
            $(this).css('color', '#fff');
            
            if($( window ).width() >= 768){
                $('[data-toggle="popover"]').popover({trigger: 'manual'});
                $('[data-toggle="popover"]').popover('show');
                $('[data-toggle="popoverNumber"]').attr("data-content", "Bouton affichant le nombres de photos de chaque tag.");
                $('[data-toggle="popoverNumber"]').popover('show');
            }

            $('[data-toggle="popoverHelp"]').popover({trigger: 'manual'});
            $('[data-toggle="popoverHelp"]').popover('show');
            $('[data-toggle="popoverHelp"]').popover({trigger: 'manual'});

        }
        else{
            $(this).css('background', '#fff');
            $(this).css('color', '#000');
            
            if($( window ).width() >=  768){
                $('[data-toggle="popover"]').popover('hide');
            }
            $('[data-toggle="popoverHelp"]').popover({trigger: 'manual'});
            $('[data-toggle="popoverHelp"]').popover('hide');
            $('[data-toggle="popoverNumber"]').popover('hide');
        }
        
        
    });
    
    $('.leaflet-control-geocoder').attr("data-content", "Geocoder permettant de rechercher une ville et de s'y placer");
    $('.leaflet-control-geocoder').attr("data-toggle", "popover");
    $('.leaflet-control-geocoder').attr("data-container", "body");
    $('.leaflet-control-geocoder').attr("data-placement", "left");

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
                                <form style="width:200px">\
                                     <div class="input-group">\
                                         <input type="text" class="form-control" id="inputSearchTag" style="height:33px" placeholder="Tags..">\
                                         <span class="input-group-btn">\
                                               <button type="submit" class="btn btn-default" id="buttonSubmitTag" style="height:33px"><i class="fa fa-search"></i></button>\
                                         </span>\
                                    </div>\
                                 </form>'; 
                        div.setAttribute("class","control");
                        div.setAttribute("id","formInputSearchTag");""
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


    // Controleur pour gérer la liste des tags
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
    
    // Controleur le nombre de photos par tag
    var controlTagsNumber = L.control({position: 'topright'});
    controlTagsNumber.onAdd = function(map){
                        var div = L.DomUtil.create('div', 'leaflet-control-command');
                        L.DomEvent.disableClickPropagation(div)
                        div.innerHTML = '\
                            <i class="fa fa-database fa-lg"></i>'; 
                        div.setAttribute("class","control controlTagsNumber");
                        div.setAttribute("data-container", "body");
                        div.setAttribute("data-toggle", "popoverNumber");
                        div.setAttribute("data-content", "Zone destinée à stocker le nombre de photos pour chaque tag.");
                        div.setAttribute("data-placement", "bottom");
                        div.setAttribute("data-html","true");
                        return div;
                    }
    controlTagsNumber.addTo(map);    
    $(".controlTagsNumber").on("click", function(){
        
         if(Object.keys(ALL_DATA).length !== 0){
            if(POPOVER_NUMBER_DISPLAY ? POPOVER_NUMBER_DISPLAY = false : POPOVER_NUMBER_DISPLAY = true);
            if(POPOVER_NUMBER_DISPLAY){
                $(this).css('background', '#000');
                $(this).css('color', '#fff');
                $('[data-toggle="popoverNumber"]').popover({trigger: 'manual'});
                var htmlTagsNumber = '';
                for(tag in Object.keys(COLOR_TAG)){
                    var nomTag = Object.keys(COLOR_TAG)[tag];
                    htmlTagsNumber = htmlTagsNumber+ '<span id="badge-tag-'+nomTag+'"class="badge" style="background-color:'+(COLOR_TAG)[nomTag]+'">'+ALL_DATA[nomTag].length+' photos ('+ALL_DATA_NIGHT[nomTag].length+' de nuit)</span><br>' 
                }
                $('[data-toggle="popoverNumber"]').attr("data-content", htmlTagsNumber);
                $('[data-toggle="popoverNumber"]').popover('show');
            }
            else{
                $(this).css('background', '#fff');
                $(this).css('color', '#000');
                $('[data-toggle="popoverNumber"]').popover('hide');
            }   
        }
        
    });


    // Controleur l'affichage du graphique
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
