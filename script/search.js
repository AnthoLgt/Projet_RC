

function search(tags){
    
    if(NIGHT_MODE){
        
    }else{


        if(Object.keys(ALL_DATA).length < 3){
        
                flickSearch(WOE_ID, tags, "2013-01-01");
       
        
        }
        else{
            alert("Trop de tags")
            
            
        }
        
    }
    
    
  /*  if(Data.length > 3){
        alert("trop de tag enregistrés")
    }else{
        
    }
    */
}

function removeTag(tag){
    
    $(".circle-"+tag).remove();
    delete ALL_DATA[tag];
    delete COLOR_TAG[tag];
    console.log(ALL_DATA);
    console.log(COLOR_TAG);
    console.log("couleur "+tag+" "+COLOR_TAG[tag])
    var htmlTags = '';
    for(tag in Object.keys(COLOR_TAG)){
        var nomTag = Object.keys(COLOR_TAG)[tag];
        htmlTags = htmlTags + '<label><input type="checkbox" checked><span id="badge-tag-'+nomTag+'"class="badge" style="background-color:'+(COLOR_TAG)[nomTag]+'" onclick="removeTag(\''+nomTag+'\');">'+nomTag+' <i class="fa fa-times"></i></span></label><br>' 
    }
    if(Object.keys(ALL_DATA).length == 0){
        $('#tagsCheckBox').html("<span style=\"color:grey; text-align=center\"><i>Aucun tag</i></span>");
    }else{
        $('#tagsCheckBox').html(htmlTags);
    }
}