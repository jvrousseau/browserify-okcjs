var wonky = false,
    map = new L.Map("map", {center: [37.8, -96.9], zoom: 4})
    .addLayer(new L.TileLayer("https://{s}.tiles.mapbox.com/v3/jvrousseau.h4h90e5o/{z}/{x}/{y}.png"));

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

d3.json("us-states.json", function(collection) {
    var transform = d3.geo.transform({point: projectPoint}),
        path = d3.geo.path().projection(transform);

    var feature = g.selectAll("path")
        .data(collection.features)
        .enter().append("path");

    map.on("viewreset", reset);
    reset();

    svg.on("click", function () {
            wonky = !wonky;
            if (!wonky) {
                transform = d3.geo.transform({point: projectPoint}),
                path = d3.geo.path().projection(transform);
            } else {
                transform = d3.geo.transform({point: reprojectPoint}),
                path = d3.geo.path().projection(transform);
            }
            reset();
    });

    // Reposition the SVG to cover the features.
    function reset() {
        var bounds = path.bounds(collection),
            topLeft = bounds[0],
            bottomRight = bounds[1];

        svg .attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px");

        g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

        feature.attr("d", path);
    }

    // Use Leaflet to implement a D3 geometric transformation.
    function projectPoint(x, y) {
        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
    }
    skip = 0;
    function reprojectPoint(x, y) {
        if (skip === 0) {
            var point = map.latLngToLayerPoint(new L.LatLng(y + randomNumber(), x + randomNumber()));
            this.stream.point(point.x, point.y);
        }

    }

    function randomNumber () {
        var rand = (Math.random() * 2) - 2;
        return rand;
    }
});
