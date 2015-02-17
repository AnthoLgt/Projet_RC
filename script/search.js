

function search(tags){
    
    alert(tags)
    if(NIGHT_MODE){
        
    }else{

        
        $('#tagsCheckBox').html('<label><input type="checkbox" checked><span id="badge-tag1"class="badge" style="background-color:'+RED+'" onclick="alert()">'+tags+' <i class="fa fa-times"></i></span></label><br>');
        flickSearch(WOE_ID, tags, "2013-01-01");
        
    }
    
    
  /*  if(Data.length > 3){
        alert("trop de tag enregistrés")
    }else{
        
    }
    */
}