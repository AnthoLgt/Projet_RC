/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var map = new L.Map("map", {center: [46.5, 2], zoom: 6, minZoom: 1, maxZoom: 18, });
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
    }).addTo(map);
    
var svg = d3.select(map.getPanes().overlayPane).append("svg"),
g = svg.append("g").attr("class", "leaflet-zoom-hide");
/*
 d3.json("us-states.json", function(collection) {
 // code here
 });
 */
/*
var transform = d3.geo.transform({
    point: projectPoint
});
var d3path = d3.geo.path().projection(transform);
function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
};
*/


function createCircle(x,y,r){
    var circle = L.circle([x, y], r, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(map);
}