markers = [];
var start = {
    lat: 10.9726006,
    lng: -74.7607749
};

function startMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: start,
        mapTypeId: 'hybrid'
    });
    infoWindow = new google.maps.InfoWindow();
    socket.emit('on connection', "ACK")
}

function moveShip(shipLat, shipLng, mmsi, isNew, data) {
    var image = "https://img.icons8.com/cotton/64/000000/cargo-ship--v2.png";

    var newPos = {
        lat: shipLat,
        lng: shipLng
    }

    console.log("is new: " + isNew + " which one: " + mmsi)
    if (isNew == true) {
        var marker = new google.maps.Marker({
            map: map,
            icon: image
        });
        marker.setPosition(newPos);

        marker.addListener("mouseover", () => {
            infoWindow.setContent(data)
            infoWindow.open(map, marker);
        });
        marker.addListener("mouseout", () => {
            infoWindow.close();
        });
        markers.push(marker);
    } else {
        markers[mmsi].setPosition(newPos);
    }



}