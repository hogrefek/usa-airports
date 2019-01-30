// 1. Create a map object.
var mymap = L.map('map', {
    center: [39.645828, -96.842413],
    zoom: 5,
    maxZoom: 10,
    minZoom: 3,
    detectRetina: true // detect whether the sceen is high resolution or not.
});

// 2. Add a base map.

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Base Map &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
OpenStreetMap_BlackAndWhite.addTo(mymap);

// 3. Add airports GeoJSON Data
// Null variable that will hold airports data
var airports = null;

// 4. build up a set of colors from colorbrewer's dark2 category
var colors = chroma.scale('Set2').mode('lch').colors(9);

// 5. dynamically append style classes to this page. This style classes will be used for colorize the markers.
for (i = 0; i < 9; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}

// Get GeoJSON and put on it on the map when it loads
airports= L.geoJson.ajax("assets/airports.geojson",{

// assign a function to the onEachFeature parameter of the airports object.
// Then each (point) feature will bind a popup window.
// The content of the popup window is the value of `feature.properties.AIRPT_NAME`
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.AIRPT_NAME);
    },

    // Assigning Style Class to each control tower class (yes or no) and
    // Applying an Icon using the "pointToLayer" option of "L.goeJson.ajax in an If-Else function"
    pointToLayer: function (feature, latlng) {
      var id = 0;
        if (feature.properties.CNTL_TWR == "N") { id = 0; }
        else { id = 1;} // "Y"
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane marker-color-' + (id + 1).toString() })});
      },
      attribution: 'Airport Data &copy; DATA.GOV | US State Boundaries &copy; Mike Bostock | Made By Kyle R. Hogrefe'
});
// Add the airports to the map.
airports.addTo(mymap);

// 6. Set function for color ramp for states according to number of airports
colors = chroma.scale('OrRd').colors(5); //colors = chroma.scale('OrRd').colors(5);

function setColor(density) {
    var id = 0;
    if (density > 60) { id = 4; }
    else if (density > 30 && density <= 60) { id = 3; }
    else if (density > 10 && density <= 30) { id = 2; }
    else if (density > 1 &&  density <= 10) { id = 1; }
    else  { id = 0; }
    return colors[id];
}
// 7. Set style function that sets fill color.md property equal to airport density
function style(feature) {
    return {
        fillColor: setColor(feature.properties.count),
        fillOpacity: 0.4,
        weight: 2,
        opacity: 1,
        color: '#b4b4b4',
        dashArray: '4'
    };
}
// 8. Add county polygons
var states = null;
states = L.geoJson.ajax("assets/us-states.geojson", {
    style: style
}).addTo(mymap);

// 9. Create Leaflet Control Object for Legend
var legend = L.control({position: 'topright'});

// 10. Function that runs when legend is added to map
legend.onAdd = function () {
    // Create Div Element and Populate it with HTML
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b># Airports</b><br />';
    div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p>>60</p>';
    div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p>31-60</p>';
    div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p>11-30</p>';
    div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 1-10</p>';
    div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p> 0</p>';
    div.innerHTML += '<hr><b>Airports<b><br />';
    div.innerHTML += '<i class="fa fa-plane marker-color-1"></i><p> *No* Control Tower</p>';
    div.innerHTML += '<i class="fa fa-plane marker-color-2"></i><p> *Yes* Control Tower</p>';
    // Return the Legend div containing the HTML content
    return div;
};

// 11. Add a legend to map
legend.addTo(mymap);

// 12. Add a scale bar to map
L.control.scale({position: 'bottomleft'}).addTo(mymap);
