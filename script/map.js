
var map;
var g;
var transform;
var svg;
var popup;
   
/**
 * Méthode qui permet de créer le fond de carte en utilisant Leaflet
 */
function createMap(){
    
    var attributions = '';
    var minzoom = 5;
    if($( window ).width() >= 768){
        attributions = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
        minzoom = 6;    
    }
     
    map = new L.Map("map", {center: [46.5, 2], zoom: minzoom, minZoom: minzoom, maxZoom: 18, });
    // http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: attributions,
        maxZoom: 18
    }).addTo(map);
    map._initPathRoot(); 

    svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");
    svg.attr("width", $(window).width()).attr("height", $(window).height());
    
    popup = L.popup();
    
    
    // Plugin geocoder
    var options = {
    collapsed: true, /* Whether its collapsed or not */
    position: 'bottomright', /* The position of the control */
    text: 'Locate', /* The text of the submit button */
    bounds: null, /* a L.LatLngBounds object to limit the results to */
    email: null, /* an email string with a contact to provide to Nominatim. Useful if you are doing lots of queries */
    callback: function (results) {
            var bbox = results[0].boundingbox,
                first = new L.LatLng(bbox[0], bbox[2]),
                second = new L.LatLng(bbox[1], bbox[3]),
                bounds = new L.LatLngBounds([first, second]);
            this._map.fitBounds(bounds);
        }
    };
    var osmGeocoder = new L.Control.OSMGeocoder(options);
    map.addControl(osmGeocoder);

}
