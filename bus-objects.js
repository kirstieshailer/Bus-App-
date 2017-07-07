var buses = [
    "awapuni",
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
    "heights",
]


class Bus {
    constructor(name, stops, stopPositions, timesMonFri, timesFri, timesSat, timesSun) {
        this.name = name;
        this.stops = stops;
        this.stopPositions = stopPositions;
        this.timesMonFri = timesMonFri;
        this.timesFri = timesFri;
        this.timesSat = timesSat;
        this.timesSun = timesSun;


        this.routeNameDOM = document.getElementById("busTitle");
        this.stopsDOM = document.getElementById("busStops");
        this.timesDOM = document.getElementById("busTimesMonFri")
    }

    //function that inserts content into DOM


    formatStops() {
        var content = ""
        for(var i = 0; i < this.stops.length; i++) {
            content += "<li class=\"stopLi\" onclick=\"routes['" +this.name+ "'].showTimes(" + i + ")\">" + this.stops[i]+ "</li>"
        }
        return content;
    }

    formatTitle() {
        var titleWithCap = this.name.toUpperCase();
        this.routeNameDOM.innerHTML = titleWithCap
    }

    formatTimes(index) {
        var content = ""
        for(var i = 0; i < this.timesMonFri.length; i++) {
            content += "<li class=\"timesLi\">"+this.timesMonFri[i][index]+"</li>"
        }
        return content;
    }

    showTimes(index) {
        this.timesDOM.innerHTML = this.formatTimes(index);
        //
        //
        //
        //
        //


    }

    createMarker(index) {
        if (this.marker != null) {
            this.marker.setMap(null);
            this.marker = null;
        }
        var stopPositions = this.stopPositions[index];
        var stopNames = this.busStops[index];

        this.marker = new google.maps.Marker ({
            map: map,
            position: stopPosition,
            title: stopName
        });
        map.setCentre(stopPosition);
        map.setZoom(15);
    }
}

var routes = {};
for (var i = 0; i < buses.length; i++) {
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
    }
    var map;
    //Create a new Map object
//    window.map = new
//        google.maps.Map (document.getElementById('map'), {
//                                    center: theSquare,
//                                    zoom: 13
//    });

    $(".top .bus").click(function(){
        $("#busStops").html(routes[this.id].formatStops())
        $("#busTitle").html(routes[this.id].formatTitle())
    })

})

//GOOGLE MAPS API

//Locations
//var cloverleaPath = new google.maps.Polyline({
//    path: cloverleaCoordinates,
//    geodsic: true,
//    strokeColor: cloverlea,
//    strokeOpacity: 1.0,
//    strokeWidth: 2
//});



//MAPS stuff
//function initMap() {
//    var map = new google.maps.Map(document.getElementById('map'), {
//      center: freybergHS,
//      zoom: 15
//    });
//var marker = new google.maps.Marker({
//    position: freybergHS,
//    map: map
//});
//}


