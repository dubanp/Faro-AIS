socket.on('udp message', function(message) {
    var msg = JSON.parse(message);
    console.log(msg)
    var tempMmsi;
    var type = msg.type;
    var shipLat
    var shipLng
    newMmsi = msg["mmsi"];


    for (i = 0; i < mmsi.length; i++) {
        if (newMmsi == mmsi[i]) {
            isNew = false;
            tempMmsi = i;
        }
    }
    console.log(isNew);
    if (isNew == true) {
        mmsi.push(newMmsi);
        var newData = [];
        //mensaje tipo 1
        newData.navStatus = null;
        newData.rateOfTurn = null;
        newData.speedOverGround = null;
        newData.accuracy = null;
        newData.lon = null;
        newData.lat = null;
        newData.courseOverGround = null;
        newData.heading = null;
        newData.utcSecond = null;
        newData.specialManoeuvre = null;
        newData.raim = null;
        newData.radio = null;
        newData.type = null;
        newData.channel = null;
        newData.repeat = null;
        newData.mmsi = null;
        //Mensaje tipo 5
        newData.aisVersion = null;
        newData.imo = null;
        newData.callsign = null;
        newData.name = null;
        newData.typeAndCargo = null;
        newData.dimBow = null;
        newData.dimStern = null;
        newData.dimPort = null;
        newData.dimStarboard = null;
        newData.epfd = null;
        newData.etaMonth = null;
        newData.etaDay = null;
        newData.etaHour = null;
        newData.etaMinute = null;
        newData.draught = null;
        newData.destination = null;
        newData.dte = null;
        data.push(newData);
        tempMmsi = mmsi.length - 1;
    }

    if ((type == 1) || (type == 2) || (type == 3)) {
        shipLat = msg["lat"];
        shipLng = msg["lon"];
        data[tempMmsi].navStatus = msg.navStatus;
        data[tempMmsi].rateOfTurn = msg.rateOfTurn;
        data[tempMmsi].speedOverGround = msg.speedOverGround;
        data[tempMmsi].accuracy = msg.accuracy;
        data[tempMmsi].lon = msg.lon;
        data[tempMmsi].lat = msg.lat;
        data[tempMmsi].courseOverGround = msg.courseOverGround;
        data[tempMmsi].heading = msg.heading;
        data[tempMmsi].utcSecond = msg.utcSecond;
        data[tempMmsi].specialManoeuvre = msg.specialManoeuvre;
        data[tempMmsi].raim = msg.raim;
        data[tempMmsi].radio = msg.radio;
        data[tempMmsi].type = msg.type;
        data[tempMmsi].channel = null;
        data[tempMmsi].repeat = null;
        data[tempMmsi].mmsi = msg.mmsi;
        moveShip(shipLat, shipLng, tempMmsi, isNew)
        isNew = true;

    }
    if (type == 5) {

        data[tempMmsi].aisVersion = msg.aisVersion;
        data[tempMmsi].imo = msg.imo;
        data[tempMmsi].callsign = msg.callsign;
        data[tempMmsi].name = msg.name;;
        data[tempMmsi].typeAndCargo = msg.typeAndCargo;
        data[tempMmsi].dimBow = msg.dimBow;
        data[tempMmsi].dimStern = msg.dimStern;
        data[tempMmsi].dimPort = msg.dimPort;
        data[tempMmsi].dimStarboard = msg.dimStarboard;
        data[tempMmsi].epfd = msg.epfd;
        data[tempMmsi].etaMonth = msg.etaMonth;
        data[tempMmsi].etaDay = msg.etaDay;
        data[tempMmsi].etaHour = msg.etaHour;
        data[tempMmsi].etaMinute = msg.etaMinute;
        data[tempMmsi].draught = msg.draught;
        data[tempMmsi].destination = msg.destination;
        data[tempMmsi].dte = msg.dte;

        isNew = true;
    }


});