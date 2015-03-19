
/**
 * 
 * @param {type} tags
 * @returns {undefined}
 */
function search(tags){
    if(Object.keys(ALL_DATA).length < 3 && typeof(ALL_DATA[tags]) === "undefined"){
       flickSearch(WOE_ID, tags, "2013-01-01");
       

    }
    else if(Object.keys(ALL_DATA).length == 3){

    }
}

function removeTag(tag){    
    $(".circle-"+tag).remove();
    REGION_REPARTITION.forEach(function(d){ 
        if(COLOR_TAG[tag] === "#C00000"){
            delete d.nbPhotoTagC00000; 
        }else if(COLOR_TAG[tag] === "#2F75B5"){
            delete d.nbPhotoTag2F75B5;
        }else if(COLOR_TAG[tag] === "#FFC106"){
            delete d.nbPhotoTagFFC106;
        }
    });
    $('#inputSearchTag').val("Tags...");
    $('#inputSearchTag').prop('disabled', false);
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
        cpt++;
    }
    if(Object.keys(ALL_DATA).length == 0){
        $('#tagsCheckBox').html("<span style=\"color:grey; text-align=center\"><i>Aucun tag</i></span>");
    }else{
        $('#tagsCheckBox').html(htmlTags);
    }    
}