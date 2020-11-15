mmsi = [];
isNew = true;
locations = [];
data = "hola";
socket.emit('on connection', )
socket.on('mmsi', function(message) {
    mmsi = message;
})
socket.on('locations', function(message) {
    locations = message;

})

function startShips() {
    var image = "https://img.icons8.com/cotton/64/000000/cargo-ship--v2.png";
    for (i = 0; i < locations.length; i++) {
        var marker = new google.maps.Marker({
            map: map,
            icon: image
        });
        marker.setPosition(locations[i]);
        marker.addListener("mouseover", () => {
            infoWindow.setContent(data)
            infoWindow.open(map, marker);
        });
        marker.addListener("mouseout", () => {
            infoWindow.close();
        });
        markers.push(marker);
    }
}