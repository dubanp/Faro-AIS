markers = [];
var start = {
    lat: 10.959409,
    lng: -74.804982
};

function startMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: start,
        mapTypeId: 'hybrid'
    });
    infoWindow = new google.maps.InfoWindow();
}

function moveShip(shipLat, shipLng, mmsi, isNew, data) {
    var image = "https://img.icons8.com/cotton/64/000000/cargo-ship--v2.png";

    var newPos = {
        lat: shipLat,
        lng: shipLng
    }


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