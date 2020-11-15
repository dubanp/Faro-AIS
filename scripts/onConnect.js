mmsi = [];
isNew = true;
locations = [];
data = {};
socket.emit('on connection', "ACK");

socket.on('mmsi', function(message) {
    mmsi = message;
    console.log(mmsi);
})
socket.on('data', function(message) {
    data = message;
    console.log(data);
})
socket.on('locations', function(message) {
    locations = message;
    console.log(locations);
    startShips();
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
            infoWindow.setContent(data[i])
            infoWindow.open(map, marker);
        });
        marker.addListener("mouseout", () => {
            infoWindow.close();
        });
        markers.push(marker);
    }
}