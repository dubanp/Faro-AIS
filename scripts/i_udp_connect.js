mmsi = [];
isNew = true;
socket.on('udp message', function(message) {
    var msg = message;
    var tempMmsi;
    var type = msg["type"];
    var shipLat
    var shipLng
    newMmsi = msg["mmsi"];
    for (i in mmsi) {
        if (newMmsi == mmsi[i]) {
            isNew = false;
            tempMmsi = i;
        }
    }
    if (isNew == true) {
        mmsi.push(newMmsi);
    }

    if ((type == 1) || (type == 2) || (type == 3)) {
        shipLat = msg["lat"];
        shipLng = msg["lon"];
        data = "holi";
        moveShip(shipLat, shipLng, tempMmsi, isNew)
    }

    console.log(message);
});