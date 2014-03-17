/*jslint node: true*/
/*jslint nomen: true*/
/*jslint stupid: true*/
/*global L*/

require('mapbox.js');
require('leaflet.heat');
require('leaflet-draw');
require('leaflet.zoomslider');
require('mapbox.js-plugins/plugins/leaflet-minimap/v1.0.0/Control.MiniMap.js');

var fs = require('fs');

var map = L.mapbox.map('map', 'weatherdecisiontechnologies.hgg1lml5', {
        zoomControl: false
    })
        .setView([35.466468, -97.524347], 18)
        .on('ready', function () {
            'use strict';
            new L.Control.MiniMap(L.mapbox.tileLayer('weatherdecisiontechnologies.map-liq6plhu'))
                .addTo(map);
        }),
    heat = L.heatLayer([[35.466468, -97.524347]], {maxZoom: 18}).addTo(map),
    geojson = JSON.parse(fs.readFileSync(__dirname + '/rb.json')),
    featureGroup = L.mapbox.featureLayer().setGeoJSON(geojson).setStyle({
        color: '#000033',
        weight: 15
    }).addTo(map),
    zoomControl = L.control.zoomslider().addTo(map),
    drawControl = new L.Control.Draw({
        edit: {
            featureGroup: featureGroup
        }
    }).addTo(map);

map.on('draw:created', function (e) {
    'use strict';
    featureGroup.addLayer(e.layer);
});
