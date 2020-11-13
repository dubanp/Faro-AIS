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





socket.on('message', (content, rinfo) => {
    var nmea = content.toString();
    arr = content.toString.split(',');
    if (arr[2] == 1) {
        nmea = nmea.substring(0, nmea.length - 2);
    }
    console.log(`Server got: ${nmea} from ${rinfo.address}:${rinfo.port}`);
    decoder.write(nmea);
    io.sockets.emit('udp message', msg);


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