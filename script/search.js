

function search(tags){
    if(Object.keys(ALL_DATA).length < 3){
       flickSearch(WOE_ID, tags, "2013-01-01");
    }
    else{
        alert("Trop de tags")
    }
}

function removeTag(tag){    
    $(".circle-"+tag).remove();
    REGION_REPARTITION.forEach(function(d){ 
        if(Object.keys(ALL_DATA).indexOf(tag) === 0){
            delete d.nbPhotoTag0; 
        }else if(Object.keys(ALL_DATA).indexOf(tag) === 1){
            delete d.nbPhotoTag1;
        }else if(Object.keys(ALL_DATA).indexOf(tag) === 1){
            delete d.nbPhotoTag2;
        }
    });
    delete ALL_DATA[tag];
    delete COLOR_TAG[tag];
    
    showListTag();
    
}

function showTag(tag){
    if(DISPLAY_TAG[tag]){
        $('.circle-'+tag+'').hide();
        DISPLAY_TAG[tag] = false;            
    }else{
        $('.circle-'+tag+'').show();
        DISPLAY_TAG[tag] = true;     
    }       
}


function showListTag(){
    var htmlTags = '';
    for(tag in Object.keys(COLOR_TAG)){
        var nomTag = Object.keys(COLOR_TAG)[tag];
        if(DISPLAY_TAG[nomTag]){ // Checkbox du tag "checked"
            htmlTags = htmlTags + '<label><input type="checkbox" onchange="showTag(\''+nomTag+'\');" checked><span id="badge-tag-'+nomTag+'"class="badge" style="background-color:'+(COLOR_TAG)[nomTag]+'" onclick="removeTag(\''+nomTag+'\');">'+nomTag+' <i class="fa fa-times"></i></span></label><br>' 
        }else{
            htmlTags = htmlTags + '<label><input type="checkbox" onchange="showTag(\''+nomTag+'\');" ><span id="badge-tag-'+nomTag+'"class="badge" style="background-color:'+(COLOR_TAG)[nomTag]+'" onclick="removeTag(\''+nomTag+'\');">'+nomTag+' <i class="fa fa-times"></i></span></label><br>' 
        }
        cpt++
    }
    if(Object.keys(ALL_DATA).length == 0){
        $('#tagsCheckBox').html("<span style=\"color:grey; text-align=center\"><i>Aucun tag</i></span>");
    }else{
        $('#tagsCheckBox').html(htmlTags);
    }    
}