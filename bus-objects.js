var buses = ["awapuni",
    "rugby",
    "highbury",
    "takaro",
    "cloverlea",
    "milson",
    "rhodes",
    "roslyn",
    "rangiora",
    "brightwater",
    "fernlea",
    "heights",];


class Bus {
    constructor(name, stops, stopPositions, monFriTimes, friTimes, satTimes, sunTimes) {
        this.name = name;
        this.stops = stops;
        this.stopPositions = stopPositions;
        this.monFriTimes = monFriTimes;
        this.friTimes = friTimes;
        this.satTimes = satTimes;
        this.sunTimes = sunTimes;


        this.routeNameDOM = document.getElementById("route");
        this.stopsDOM = document.getElementById("stops");
        this.timesDOM = document.getElementById("times");
    }

    //function that inserts content into DOM


    getStops() {
        var html = '<ul>';
        for (var i = 0; i < this.stops.length; i++) {
            html += "<li class='busStops' onclick=\"routes[\"" +this.name.toLowerCase() + "\"].showTimes(" + i + ")'>" + this.stops[i] + "</li>";
        }
        html += '</ul>';
        return html;
    }

    showTimes(index) {
        this.routeNameDOM.innerHTML = this.name;
        this.stopDom.innerHTML = this.busStops[index];
        this.createMarker(index);


    }

    createMarker(index) {
        if (this.marker != null) {
            this.marker.setMap(null);
            this.marker = null;
        }
        var stopPosition = this.stopPositions[index];
        var stopName = this.busStops[index];
        this.marker = new google.maps.Marker({
            map: map,
            position: stopPosition,
            title: stopName
        });

        map.setCentre(stopPosition);
        map.setZoom(15);
    }
}

var routes = {};

for (var i = 0; i < this.buses.length; i++) {
    var name = buses[i];

    var newRoute = new Bus(
            name,
            data.stops[name],
            data.stopCoordinates[name],
            data.timesMonFri[name],
            data.timesFri[name],
            data.timesSat[name],
            data.timesSun[name]
    );

    routes[name] = newRoute;
}


//Jquery
//eval() can be changed by any hacker DO NOT USE
$(document).ready(function(){
    var theSquare = {
        lat: -40.356207,
        lng: 175.610062
    };
    //Create a new Map object
    window.map = new google.maps.Map (document.getElementById('map'), {
        center: theSquare,
        zoom: 13
    });

    $(".stopsmenu").hide();

    $(".bus h2").click(function(){
        $("#" + this.id + "Stops").html(routes[this.id].getStops());
        $("#" + this.id + "Stops").slideToggle();
    });

});
