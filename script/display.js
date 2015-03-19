

/**
 * Méthode permettant d'afficher les résultats (cercles) d'un Tag.
 * 
 * @param {type} tag Tag recherché
 * @param {type} NIGHT_MODE L'activation ou non du mode nuit
 */
function displayFlickrResult(tag, NIGHT_MODE){

    console.log("display")
    if(!NIGHT_MODE){            
        var cpt = 0;
        var circles = d3.select("g").selectAll("circle[class='circle-"+tag+"']") // Très important !
        .data((ALL_DATA)[tag])
        .enter().append("circle")
        .attr("r", "3")
        .attr("class", "circle-"+tag)
        .attr("fill", COLOR_TAG[tag])
        .style("stroke", d3.rgb(COLOR_TAG[tag]).darker())
        .attr('fill-opacity', 0.2)
        .attr("cx", function (d) { cpt++;return project(d.longitude, d.latitude).x; })
        .attr("cy", function (d) { return project(d.longitude, d.latitude).y; })
        .on("mouseover", function(d) { console.log(d); showImage(d.longitude); });
        topBnd = Math.max.apply(Math,(ALL_DATA)[tag].map(function(o){return o.latitude;}));
        bottomBnd = Math.min.apply(Math,(ALL_DATA)[tag].map(function(o){return o.latitude;}));
        leftBnd = Math.min.apply(Math,(ALL_DATA)[tag].map(function(o){return o.longitude;}));
        rightBnd = Math.max.apply(Math,(ALL_DATA)[tag].map(function(o){return o.longitude;}));
    }
    else{
        var cpt = 0;
        var circles = d3.select("g").selectAll("circle[class='circle-nigth-"+tag+"']") // Très important !
        .data((ALL_DATA_NIGHT)[tag])
        .enter().append("circle")
        .attr("r", "3")
        .attr("class", "circle-"+tag)
        .attr("fill", COLOR_TAG[tag])
        .style("stroke", d3.rgb(COLOR_TAG[tag]).darker())
        .style("cursor", "pointer") // Plus facile pour savoir quand on survole un cercle
        .attr('fill-opacity', 0.2)
        .attr("cx", function (d) { cpt++;return project(d.longitude, d.latitude).x; })
        .attr("cy", function (d) { return project(d.longitude, d.latitude).y; })
        .on("mouseover", function(d) { return showImage(d); });

        console.log("tag= "+tag+" couleur="+COLOR_TAG[tag]+" occur="+cpt)

        topBnd = Math.max.apply(Math,(ALL_DATA_NIGHT)[tag].map(function(o){return o.latitude;}));
        bottomBnd = Math.min.apply(Math,(ALL_DATA_NIGHT)[tag].map(function(o){return o.latitude;}));
        leftBnd = Math.min.apply(Math,(ALL_DATA_NIGHT)[tag].map(function(o){return o.longitude;}));
        rightBnd = Math.max.apply(Math,(ALL_DATA_NIGHT)[tag].map(function(o){return o.longitude;}));
    }

    map.on("viewreset", update);
    update();
    function update() {

        bottomLeft = project(leftBnd, bottomBnd);
        topRight = project(rightBnd, topBnd);

        svg.attr("width", topRight.x - bottomLeft.x)
            .attr("height", bottomLeft.y - topRight.y)
            .style("margin-left", bottomLeft.x + "px")
            .style("margin-top", topRight.y + "px");
        g.attr("transform", "translate(" + -bottomLeft.x + "," + -topRight.y + ")");
            circles.attr("fill", COLOR_TAG[tag])
            .style("stroke", d3.rgb(COLOR_TAG[tag]).darker())
            .style("cursor", "pointer") // Plus facile pour savoir quand on survole un cercle
            .attr('fill-opacity', 0.2)
            .attr("cx", function (d) { return project(d.longitude, d.latitude).x; })
            .attr("cy", function (d) { return project(d.longitude, d.latitude).y; })
            .on("mouseover", function (d) { return showImage(d) });
    }
        

    $('#myModal').modal('hide');
}


/**
 * Méthode permettant d'afficher une popup avec l'image qui est survolée.
 * 
 * @param {type} image L'image survolée et donc à afficher
 * @returns {popup} Retourne la popup contenant un aperçu de l'image
 */
function showImage(image){    
    console.log(image)
    popup.setLatLng([image.latitude, image.longitude])
    .setContent("<div style=\"width:"+image.width_t+"px;height:"+image.height_t+"px\"><img src="+image.url_t+" /></div>")
    .openOn(map);
    return popup;
}


/**
 * Méthode permettant de projeter les coordonnées GPS d'une image sur le fond de carte Leaflet.
 * 
 * @param {type} longitude Longitude à projeter
 * @param {type} latitude Latitude à projeter
 * @returns {unresolved} Le point contenant le x et y correspondant à la projection de la lattitude et de la longitude
 */
function project(longitude,latitude) {
    return map.latLngToLayerPoint(new L.LatLng(latitude, longitude));
}
