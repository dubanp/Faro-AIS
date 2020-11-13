markers = [];
var start = {
    lat: 10.959409,
    lng: -74.804982
};
map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: start,
    mapTypeId: 'hybrid'
});
infoWindow = new google.maps.InfoWindow();

function moveShip(shipLat, shipLng, mmsi, isNew, data) {
    var image = "https://icon-icons.com/icons2/519/PNG/48/boat_icon-icons.com_51225.png";
    var newPos = {
        lat: shipLat,
        lng: shipLng
    }

    if (isNew == true) {
        var marker = new google.maps.Marker({
            map: map,
            icon: image
        });
        markers.setPosition(newPos);
        markers.push(marker);
        marker.addListener("mouseover", () => {
            infoWindow.setContent(data)
            infoWindow.open(map, markers[mmsi]);
        });
        marker.addListener("mouseout", () => {
            infoWindow.close();
        });
    } else {
        markers[mmsi].setPosition(newPos);
    }



}