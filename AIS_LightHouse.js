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



socket.on('message', (content, rinfo) => {
    var nmea = content.toString();
    arr = nmea.split(',');
    if (arr[1] == 1) {
        nmea = nmea.substring(0, nmea.length - 2);
    } else {
        msgBuffer = nmea.split('!')
        console.log(nmea.length)
        console.log(msgBuffer);
        nmea = '!' + msgBuffer[2].substring(0, msgBuffer[2].length - 2);
        decoder.write('!' + msgBuffer[1].substring(0, msgBuffer[1].length - 2));
    }
    console.log(`Server got: ${nmea} from ${rinfo.address}:${rinfo.port}`);
    decoder.write(nmea);
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
    }

    if ((type == 1) || (type == 2) || (type == 3)) {
        shipLat = msg1["lat"];
        shipLng = msg1["lon"];
        var newPos = {
            lat: shipLat,
            lng: shipLng
        }
        locations.push(newPos);

        data = "holi";
        isNew = true;
    }


});
socket.on('on connection', (content, rinfo) => {
    socket.emit('mmsi', mmsi)
    socket.emit('locations', locations)


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