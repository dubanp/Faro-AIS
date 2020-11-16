mmsi = [];
isNew = true;
locations = [];
data = [];
markers = [];


socket.on('startUpData', function(message) {
    data[i] = message;
    console.log(message);
    startShips();
})
try {
    $.get('/startup', function(message) {
        locations = message['b'];
        data = [mmsi.length];
        mmsi = message['a'];
        console.log(message);
        startShips();
    });
} catch (error) {
    console.log(error)
}

function startShips() {
    var image = "https://img.icons8.com/cotton/64/000000/cargo-ship--v2.png";
    for (i = 0; i < locations.length; i++) {
        var marker = new google.maps.Marker({
            map: map,
            icon: image
        });
        marker.setPosition(locations[i]);
        marker.addListener("mouseover", () => {
            socket.emit('on connection', i);
            infoWindow.setContent(JSON.stringify(data[i]))
            infoWindow.open(map, marker);
        });
        marker.addListener("mouseout", () => {
            infoWindow.close();
        });
        markers.push(marker);
    }
}