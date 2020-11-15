socket.on('udp message', function(message) {
    var msg = JSON.parse(message);
    console.log(msg)
    var tempMmsi;
    var type = msg.type;
    var shipLat
    var shipLng
    newMmsi = msg["mmsi"];
    console.log(type);
    console.log(mmsi);

    for (i = 0; i < mmsi.length; i++) {
        console.log(newMmsi + " = " + mmsi[i] + " en " + i)
        if (newMmsi == mmsi[i]) {
            console.log(newMmsi + " = " + mmsi[i] + " en " + i)
            isNew = false;
            tempMmsi = i;
        }
    }
    console.log(isNew);
    if (isNew == true) {
        mmsi.push(newMmsi);
    }

    if ((type == 1) || (type == 2) || (type == 3)) {
        shipLat = msg["lat"];
        shipLng = msg["lon"];

        data = "holi";
        moveShip(shipLat, shipLng, tempMmsi, isNew, data)
        isNew = true;
    }


});