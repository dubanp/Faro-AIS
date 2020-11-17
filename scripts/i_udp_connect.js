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
        var newData = {};
        //mensaje tipo 1
        newData['navStatus'] = null;
        newData['rateOfTurn'] = null;
        newData['speedOverGround'] = null;
        newData['accuracy'] = null;
        newData['lon'] = null;
        newData['lat'] = null;
        newData['courseOverGround'] = null;
        newData['heading'] = null;
        newData['utcSecond'] = null;
        newData['specialManoeuvre'] = null;
        newData['raim'] = null;
        newData['radio'] = null;
        newData['type'] = null;
        newData['channel'] = null;
        newData['repeat'] = null;
        newData['mmsi'] = null;
        //Mensaje tipo 5
        newData['aisVersion'] = null;
        newData['imo'] = null;
        newData['callsign'] = null;
        newData['name'] = null;
        newData['typeAndCargo'] = null;
        newData['dimBow'] = null;
        newData['dimStern'] = null;
        newData['dimPort'] = null;
        newData['dimStarboard'] = null;
        newData['epfd'] = null;
        newData['etaMonth'] = null;
        newData['etaDay'] = null;
        newData['etaHour'] = null;
        newData['etaMinute'] = null;
        newData['draught'] = null;
        newData['destination'] = null;
        newData['dte'] = null;
        data.push(newData);
        tempMmsi = mmsi.length - 1;
    }

    if ((type == 1) || (type == 2) || (type == 3)) {
        shipLat = msg["lat"];
        shipLng = msg["lon"];
        var tempData = data[tempMmsi];
        console.log(data[tempMmsi] + mmsi)
        var newPos = {
            lat: shipLat,
            lng: shipLng
        }
        tempData["navStatus"] = msg["navStatus"];
        tempData["rateOfTurn"] = msg["rateOfTurn"];
        tempData["speedOverGround"] = msg["speedOverGround"];
        tempData["accuracy"] = msg["accuracy"];
        tempData["lon"] = msg["lon"];
        tempData["lat"] = msg["lat"];
        tempData["courseOverGround"] = msg["courseOverGround"];
        tempData["heading"] = msg["heading"];
        tempData["utcSecond"] = msg["utcSecond"];
        tempData["specialManoeuvre"] = msg["specialManoeuvre"];
        tempData["raim"] = msg["raim"];
        tempData["radio"] = msg["radio"];
        tempData["type"] = msg["type"];
        tempData["channel"] = null;
        tempData["repeat"] = null;
        tempData["mmsi"] = msg["mmsi"];
        moveShip(shipLat, shipLng, tempMmsi, isNew)
        isNew = true;
        data[tempMmsi] = tempData;
    }
    if (type == 5) {
        var tempData = data[tempMmsi];
        tempData["aisVersion"] = msg["aisVersion"];
        tempData["imo"] = msg["imo"];
        tempData["callsign"] = msg["callsign"];
        tempData["name"] = msg["name"];
        tempData["typeAndCargo"] = msg["typeAndCargo"];
        tempData["dimBow"] = msg["dimBow"];
        tempData["dimStern"] = msg["dimStern"];
        tempData["dimPort"] = msg["dimPort"];
        tempData["dimStarboard"] = msg["dimStarboard"];
        tempData["epfd"] = msg["epfd"];
        tempData["etaMonth"] = msg["etaMonth"];
        tempData["etaDay"] = msg["etaDay"];
        tempData["etaHour"] = msg["etaHour"];
        tempData["etaMinute"] = msg["etaMinute"];
        tempData["draught"] = msg["draught"];
        tempData["destination"] = msg["destination"];
        tempData["dte"] = msg["dte"];
        data[tempMmsi] = tempData;
        isNew = true;
    }


});