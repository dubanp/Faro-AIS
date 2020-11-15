var fs = require('fs');
var dgram = require('dgram');
var socketio = require('socket.io');
var express = require('express');
const mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var ais = require('ais-stream-decoder');
const { default: AisDecoder } = require('ais-stream-decoder');
decoder = new AisDecoder();
decoder.on('error', err => console.error(err));
decoder.on('data', decodedMessage => msg = decodedMessage);
var app = express();
var server = require('http').Server(app);
var io = socketio.listen(server);
var socket = dgram.createSocket('udp4');
require('dotenv').config();

//Render CSS
app.use(express.static(__dirname));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
mmsi = [];
locations = [];
isNew = true;
data = [];


socket.on('message', (content, rinfo) => {
    var nmea = content.toString();

    msgBuffer = nmea.split('!')
    console.log(msgBuffer);
    for (i = 0; i < msgBuffer.length; i++) {
        temp = msgBuffer[i]
        nmea = '!' + msgBuffer[i].substring(0, msgBuffer[i].length - 2);
        console.log(`Server got: ${nmea} from ${rinfo.address}:${rinfo.port}`);
        decoder.write(nmea);
    }


    io.sockets.emit('udp message', msg);

    var msg1 = JSON.parse(msg);
    var tempMmsi;
    var type = msg1.type;
    var shipLat
    var shipLng
    var newMmsi = msg1["mmsi"];


    for (i = 0; i < mmsi.length; i++) {
        if (newMmsi == mmsi[i]) {
            isNew = false;
            tempMmsi = i;
        }
    }

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
        shipLat = msg1["lat"];
        shipLng = msg1["lon"];

        var newPos = {
            lat: shipLat,
            lng: shipLng
        }
        data[tempMmsi].navStatus = msg1.navStatus;
        data[tempMmsi].rateOfTurn = msg1.rateOfTurn;
        data[tempMmsi].speedOverGround = msg1.speedOverGround;
        data[tempMmsi].accuracy = msg1.accuracy;
        data[tempMmsi].lon = msg1.lon;
        data[tempMmsi].lat = msg1.lat;
        data[tempMmsi].courseOverGround = msg1.courseOverGround;
        data[tempMmsi].heading = msg1.heading;
        data[tempMmsi].utcSecond = msg1.utcSecond;
        data[tempMmsi].specialManoeuvre = msg1.specialManoeuvre;
        data[tempMmsi].raim = msg1.raim;
        data[tempMmsi].radio = msg1.radio;
        data[tempMmsi].type = msg1.type;
        data[tempMmsi].channel = null;
        data[tempMmsi].repeat = null;
        data[tempMmsi].mmsi = msg1.mmsi;

        locations.push(newPos);


        isNew = true;
    }
    if (type == 5) {

        data[tempMmsi].aisVersion = msg1.aisVersion;
        data[tempMmsi].imo = msg1.imo;
        data[tempMmsi].callsign = msg1.callsign;
        data[tempMmsi].name = msg1.name;;
        data[tempMmsi].typeAndCargo = msg1.typeAndCargo;
        data[tempMmsi].dimBow = msg1.dimBow;
        data[tempMmsi].dimStern = msg1.dimStern;
        data[tempMmsi].dimPort = msg1.dimPort;
        data[tempMmsi].dimStarboard = msg1.dimStarboard;
        data[tempMmsi].epfd = msg1.epfd;
        data[tempMmsi].etaMonth = msg1.etaMonth;
        data[tempMmsi].etaDay = msg1.etaDay;
        data[tempMmsi].etaHour = msg1.etaHour;
        data[tempMmsi].etaMinute = msg1.etaMinute;
        data[tempMmsi].draught = msg1.draught;
        data[tempMmsi].destination = msg1.destination;
        data[tempMmsi].dte = msg1.dte;

        isNew = true;
    }


});
io.on('connection', socket => {
    socket.on('on connection', (content, rinfo) => {
        socket.emit('mmsi', mmsi)
        socket.emit('data', data)
        socket.emit('locations', locations)


    });
});

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/historico', (request, response) => {
    response.sendFile(path.join(__dirname + '/historico.html'));
});


socket.bind(50001);
server.listen(10000, () => {
    console.log("Servidor abierto en puerto 10000");
});