
function createIHM(){

    // Bouton controlant le mode aide
    var controlCommandHelp = L.control({position: 'topleft'});
    controlCommandHelp.onAdd = function(map){
                        var div = L.DomUtil.create('div', 'leaflet-control-command');
                        L.DomEvent.disableClickPropagation(div)
                        div.innerHTML = '<i class="fa fa-question-circle fa-lg"></i>'; 
                        div.setAttribute("class","control")			
                        return div;
                    }
    controlCommandHelp.addTo(map);


    // Bouton controlant le mode nuit
    var controlNight = L.control({position: 'topleft'});
    controlNight.onAdd = function(map){
                        var div = L.DomUtil.create('div', 'leaflet-control-command');
                        L.DomEvent.disableClickPropagation(div)
                        div.innerHTML = '<i class="fa fa-moon-o fa-lg"></i>'; 
                        div.setAttribute("class","control controlNight")			
                        return div;
                    }
    controlNight.addTo(map);
    // Au click, on passe en mode nuit
    $(".controlNight").on("click", function(){
        
        if(NIGHT_MODE ? NIGHT_MODE = false : NIGHT_MODE = true); // On swicth la valeur
        if(NIGHT_MODE){            
            $(this).css('background', '#000');
            $(this).css('color', '#fff');
        }else{
            $(this).css('background', '#fff');
            $(this).css('color', '#000');      
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
                                <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>\
                                  <input type="text" class="form-control" id="inputSearchTag" placeholder="Tags..">\
                              </div>\
                              <button type="submit" class="btn btn-default" id="buttonSubmitTag"><i class="fa fa-search"></i></button>\
                            </form>'; 
                        div.setAttribute("class","control");
                        div.setAttribute("id","formInputSearchTag");
                        return div;
                    }
    controlFormSearch.addTo(map);
     $("#formInputSearchTag").submit(function(event) {
      event.preventDefault(); // Pour ne pas réaliser le comportement par défaut du submit
      search($('#inputSearchTag').val()); 
     });


    var controlTagsCheckBox = L.control({position: 'topright'});
    controlTagsCheckBox.onAdd = function(map){
                        var div = L.DomUtil.create('div', 'leaflet-control-command');
                        L.DomEvent.disableClickPropagation(div)
                        div.innerHTML = '\
                            <i class="fa fa-tags"></i>Tags : \
                            <div id="tagsCheckBox" class="checkbox">\
                            <label><input type="checkbox"><span class="badge" style="background-color:'+RED+'">tag1 <i class="fa fa-times"></i></span></label><br>\
                            <label><input type="checkbox"><span class="badge" style="background-color:'+BLUE+'">tag2 <i class="fa fa-times"></i></span></label><br>\
                            <label><input type="checkbox"><span class="badge" style="background-color:'+YELLOW+'">tag3 <i class="fa fa-times"></i></span></label><br>\
                            <label><input type="checkbox"><span class="badge" style="background-color:'+GREEN+'">tag4 <i class="fa fa-times"></i></span></label><br>\
                            <label><input type="checkbox"><span class="badge" style="background-color:'+PURPLE+'">tag5 <i class="fa fa-times"></i></span></label><br>\
                            </div>\
                            '; 
                        div.setAttribute("class","control")			
                        return div;
                    }
    controlTagsCheckBox.addTo(map);


    var controlCharts = L.control({position: 'bottomleft'});
    controlCharts.onAdd = function(map){
                        var div = L.DomUtil.create('div', 'leaflet-control-command');
                        L.DomEvent.disableClickPropagation(div)
                        div.innerHTML = '<i class="fa fa-bar-chart fa-lg"></i>'; 
                        div.setAttribute("class","control")			
                        return div;
                    }
    controlCharts.addTo(map);

   

}

function createCircle(x,y,r){
    var circle = L.circle([x, y], r, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(map);
}


