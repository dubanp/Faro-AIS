var start = {
    lat: 10.9726006,
    lng: -74.7607749
};

function startMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: start,
        mapTypeId: 'hybrid'
    });
    infoWindow = new google.maps.InfoWindow();
    var image = "https://img.icons8.com/cotton/64/000000/lighthouse--v5.png";
    var marker = new google.maps.Marker({
        map: map,
        icon: image
    });

    var faro = {
        lat: 10.9657821,
        lng: -74.8095643
    }
    marker.setPosition(faro);
}

function moveShip(shipLat, shipLng, Tmmsi, isNew) {
    var image = "https://img.icons8.com/cotton/64/000000/cargo-ship--v2.png";

    var newPos = {
        lat: shipLat,
        lng: shipLng
    }

    console.log("is new: " + isNew + " which one: " + Tmmsi)
    if (isNew == true) {
        var marker = new google.maps.Marker({
            map: map,
            icon: image
        });
        marker.setPosition(newPos);

        marker.addListener("mouseover", () => {
            try { var newData = data[Tmmsi]; } catch (error) {}
            console.log(newData);
            var textMmsi = newData['mmsi'];
            var textNav = newData['navStatus'];
            var textSpeed = newData['speedOverGround'];
            var textCourse = newData['courseOverGround'];
            var textCargo = newData['typeAndCargo'];
            switch (textNav) {
                case 0:
                    textNav = "En camino con motor"
                    break;
                case 1:
                    textNav = "Anclado"
                    break;
                case 2:
                    textNav = "Fuera de control"
                    break;
                case 3:
                    textNav = "Maniobrabilidad Restringida"
                    break;
                case 4:
                    textNav = "Limitado por el calado"
                    break;
                case 5:
                    textNav = "Amarrado"
                    break;
                case 6:
                    textNav = "Encallado"
                    break;
                case 7:
                    textNav = "Pescando"
                    break;
                case 8:
                    textNav = "En camino con vela"
                    break;
                case 9:
                    textNav = "Trans. de materias peligrosas tipo C"
                    break;
                case 10:
                    textNav = "Trans. de materias peligrosas tipo A"
                    break;
                case 11:
                    textNav = "Barco remolcado por popa"
                    break;
                case 12:
                    textNav = "Barco de motor en marcha"
                    break;
                case 13:
                    textNav = "Reservado para uso futuro"
                    break;
                case 14:
                    textNav = "AIS-SART, MOB-AIS, RLS-AIS"
                    break;
                case 15:
                    textNav = "No definido"
                    break;
            }
            var tablaR = "<table><tr><td><b>MMSI:</b></td></tr><td>" + textMmsi.toString();
            tablaR += "<table><tr><td><b>Estado de Navegacion:</b></td></tr><td>" + textNav;
            tablaR += "<table><tr><td><b>Velocidad:</b></td></tr><td>" + textSpeed.toString() + " nudos";
            tablaR += "<table><tr><td><b>Curso:</b></td></tr><td>" + textCourse.toString();
            if (newData['name'] != null) {
                tablaR = "<table><tr><td><b>Nombre:</b></td></tr><td>" + newData['name'].toString() + tablaR;
                textDest = newData['destination']
                if (textDest != null) {
                    tablaR += "<table><tr><td><b>Destino:</b></td></tr><td>" + textDest.toString();
                }
                textCargo = boatTypeAndCargo(textCargo);
                tablaR += "<table><tr><td><b>Tipo y carga:</b></td></tr><td>" + textCargo;
            }
            infoWindow.setContent(tablaR)
            infoWindow.open(map, marker);
        });
        marker.addListener("mouseout", () => {
            infoWindow.close();
        });
        markers.push(marker);
    } else {
        markers[Tmmsi].setPosition(newPos);
    }
}

function boatTypeAndCargo(textCargo) {
    switch (textCargo) {

        case 50:
            textCargo = "Barco de práctico";
            return textCargo
            break;
        case 51:
            textCargo = "Barcos de búsqueda y rescate";
            return textCargo
            break;
        case 52:
            textCargo = "Barcos Remolcador";
            return textCargo
            break;
        case 53:
            textCargo = "Remolcadores";
            return textCargo
            break;
        case 54:
            textCargo = "Piloto de puerto";
            return textCargo
            break;
        case 55:
            textCargo = "Barcos con facilidades o equipos antipolución";
            return textCargo
            break;
        case 56:
            textCargo = "Reservado";
            return textCargo
            break;
        case 57:
            textCargo = "Reservado";
            return textCargo
            break;
        case 58:
            textCargo = "Transportes Médicos";
            return textCargo
            break;
        case 59:
            textCargo = "Barcos de Estados";
            return textCargo
            break;
    }

    textCargo = textCargo.toString();
    textCargo = textCargo.split("");
    switch (parseInt(textCargo[0])) {
        case 2:
            textCargo = "Ekranoplano"
            switch (parseInt(textCargo[1])) {
                case 1:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 2:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 3:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 4:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 9:
                    textCargo += ", sin información sobre la carga"
                    break;

            }
            break;
        case 3:
            textCargo = "Barco"
            switch (parseInt(textCargo[1])) {
                case 0:
                    textCargo += " pesquero"
                    break;
                case 1:
                    textCargo += "remolque"
                    break;
                case 2:
                    textCargo += "remolque extenso"
                    break;
                case 3:
                    textCargo += " de dragado u operaciones submarinas"
                    break;
                case 4:
                    textCargo += " de operaciones submarinas"
                    break;
                case 5:
                    textCargo += " de operaciones militares"
                    break;
                case 6:
                    textCargo += " de navegación a vela"
                    break;
                case 7:
                    textCargo += " para turismo"

            }
            break;
        case 4:
            textCargo = "Embarcación de alta velocidad"
            switch (parseInt(textCargo[1])) {
                case 1:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 2:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 3:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 4:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 9:
                    textCargo += ", sin información sobre la carga"
                    break;
            }
            break;
        case 6:
            textCargo = "Barco de pasajeros"
            switch (parseInt(textCargo[1])) {
                case 1:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 2:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 3:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 4:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 9:
                    textCargo += ", sin información sobre la carga"
                    break;
            }
            break;
        case 7:
            textCargo = "Barco de carga"
            switch (parseInt(textCargo[1])) {
                case 1:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 2:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 3:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 4:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 9:
                    textCargo += ", sin información sobre la carga"
                    break;
            }
            break;
        case 8:
            textCargo = "Buque cisterna"
            switch (parseInt(textCargo[1])) {
                case 1:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 2:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 3:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 4:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 9:
                    textCargo += ", sin información sobre la carga"
                    break;
            }
            break;
        case 9:
            textCargo = "Sin información del barco,"
            switch (parseInt(textCargo[1])) {
                case 1:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 2:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 3:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 4:
                    textCargo += ", transporte materia peligrosa"
                    break;
                case 9:
                    textCargo += ", sin información sobre la carga"
                    break;
            }
            break;

    }
    return textCargo

}