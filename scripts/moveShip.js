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
            console.log(Tmmsi);
            var textMmsi = newData["mmsi"];
            var textNav = newData["navStatus"];
            var textSpeed = newData["speedOverGround"];
            var textCourse = newData["courseOverGround"];
            var tablaR = "<table><tr><td>MMSI:</td></tr><td>" + textMmsi.toString();
            tablaR += "<table><tr><td>EstadodeNavegacion:</td></tr><td>" + textNav.toString();
            tablaR += "<table><tr><td>speedOverGround:</td></tr><td>" + textSpeed.toString();
            tablaR += "<table><tr><td>courseOverGround:</td></tr><td>" + textCourse.toString();
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