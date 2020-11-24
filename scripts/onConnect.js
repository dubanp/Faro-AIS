mmsi = [];
isNew = true;
locations = [];
markers = [];
data = []

// socket.on('startUpData', function(message) {
//     data[i] = message;
//     console.log(message);
//     startShips();
// })

try {
    $.get('/startup', function(message) {
        locations = message['b'];
        mmsi = message['a'];
        getData()
        console.log(message);
        startShips();
    });
} catch (error) {
    console.log(error)
}

function startShips() {
    for (u = 0; u < mmsi.length; u++) {
        var tempLocation = locations[u];
        slat = tempLocation["lat"];
        slng = tempLocation["lng"];
        moveShip(slat, slng, u, true)
    }
}

function getData() {
    for (i in mmsi) {
        $.get('getdata', { "id": i }, function(requestedData) {
            data.push(requestedData)
            console.log(data[i])
        });
    }
}

function dataTemplate(fin) {
    for (u = 0; u < fin; u++) {
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

    }
}