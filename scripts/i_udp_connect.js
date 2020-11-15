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
        newData['navStatus '] = null;
        newData['rateOfTurn '] = null;
        newData['speedOverGround '] = null;
        newData['accuracy '] = null;
        newData['lon '] = null;
        newData['lat '] = null;
        newData['courseOverGround '] = null;
        newData['heading '] = null;
        newData['utcSecond '] = null;
        newData['specialManoeuvre '] = null;
        newData['raim '] = null;
        newData['radio '] = null;
        newData['type '] = null;
        newData['channel '] = null;
        newData['repeat '] = null;
        newData['mmsi '] = null;
        //Mensaje tipo 5
        newData['aisVersion '] = null;
        newData['imo '] = null;
        newData['callsign '] = null;
        newData['name '] = null;
        newData['typeAndCargo '] = null;
        newData['dimBow '] = null;
        newData['dimStern '] = null;
        newData['dimPort '] = null;
        newData['dimStarboard '] = null;
        newData['epfd '] = null;
        newData['etaMonth '] = null;
        newData['etaDay '] = null;
        newData['etaHour '] = null;
        newData['etaMinute '] = null;
        newData['draught '] = null;
        newData['destination '] = null;
        newData['dte '] = null;
        data.push(newData);
        tempMmsi = mmsi.length - 1;
    }

    if ((type == 1) || (type == 2) || (type == 3)) {
        shipLat = msg1["lat"];
        shipLng = msg1["lon"];
        var tempData = data[tempMmsi];
        var newPos = {
            lat: shipLat,
            lng: shipLng
        }
        tempData["navStatus "] = msg1["navStatus"];
        tempData["rateOfTurn "] = msg1["rateOfTurn"];
        tempData["speedOverGround "] = msg1["speedOverGround"];
        tempData["accuracy "] = msg1["accuracy"];
        tempData["lon "] = msg1["lon"];
        tempData["lat "] = msg1["lat"];
        tempData["courseOverGround "] = msg1["courseOverGround"];
        tempData["heading "] = msg1["heading"];
        tempData["utcSecond "] = msg1["utcSecond"];
        tempData["specialManoeuvre "] = msg1["specialManoeuvre"];
        tempData["raim "] = msg1["raim"];
        tempData["radio "] = msg1["radio"];
        tempData["type "] = msg1["type"];
        tempData["channel "] = null;
        tempData["repeat "] = null;
        tempData["mmsi "] = msg1["mmsi"];
        moveShip(shipLat, shipLng, tempMmsi, isNew)
        isNew = true;
        data[tempMmsi] = tempData;
    }
    if (type == 5) {
        var tempData = data[tempMmsi];
        tempData["aisVersion "] = msg1["aisVersion"];
        tempData["imo "] = msg1["imo"];
        tempData["callsign "] = msg1["callsign"];
        tempData["name "] = msg1["name"];
        tempData["typeAndCargo "] = msg1["typeAndCargo"];
        tempData["dimBow "] = msg1["dimBow"];
        tempData["dimStern "] = msg1["dimStern"];
        tempData["dimPort "] = msg1["dimPort"];
        tempData["dimStarboard "] = msg1["dimStarboard"];
        tempData["epfd "] = msg1["epfd"];
        tempData["etaMonth "] = msg1["etaMonth"];
        tempData["etaDay "] = msg1["etaDay"];
        tempData["etaHour "] = msg1["etaHour"];
        tempData["etaMinute "] = msg1["etaMinute"];
        tempData["draught "] = msg1["draught"];
        tempData["destination "] = msg1["destination"];
        tempData["dte "] = msg1["dte"];
        data[tempMmsi] = tempData;
        isNew = true;
    }


});