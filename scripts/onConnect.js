mmsi = [];
isNew = true;
locations = [];
data = [];
markers = [];


// socket.on('startUpData', function(message) {
//     data[i] = message;
//     console.log(message);
//     startShips();
// })

try {
    $.get('/startup', function(message) {
        locations = message['b'];
        dataTemplate(mmsi.length)
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

            infoWindow.setContent(JSON.stringify(data[i]))
            infoWindow.open(map, marker);
        });
        marker.addListener("mouseout", () => {
            infoWindow.close();
        });
        markers.push(marker);
    }
}

function dataTemplate(fin) {
    for (u = 0; u < fin; u++) {
        var newData = {};
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
    }
}