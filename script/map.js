


var map;
var g;
var transform;
var svg;

function createMap(){
    
    map = new L.Map("map", {center: [46.5, 2], zoom: 6, minZoom: 1, maxZoom: 18, });
    // http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18
        }).addTo(map);
    map._initPathRoot(); 

    svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");
    svg.attr("width", $(window).width()).attr("height", $(window).height());


            //  var transform = d3.geo.transform({point: projectPoint}),
  //  path = d3.geo.path().projection(transform);

    //map.on("viewreset", reset);

    // this puts stuff on the map! 
    //reset();

}

function projectPoint(x, y) {
  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
}