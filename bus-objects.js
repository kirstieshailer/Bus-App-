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
        this.nextDOM = document.getElementById("next");
        this.timesDOM = document.getElementById("times");
    }

    getDay() {
        var date = new Date();
        var day = date.getDay();

        if (day == 1 || day == 2 || day == 3 || day == 4) {
         day =  this.monFriTimes;
        } else if (day == 5) {
            var friO = [];
            friO = this.friTimes
            var fri = [];
            fri = this.monFriTimes
            var day =  fri.concat(friO);
        }else if (day == 6) {
            var day = this.satTimes;
        }else {
            var day = this.sunTimes;
        }
    return day;
    }
    //function that inserts content into DOM


    getStops() {
        var html = '<ul>';
        for (var i = 0; i < this.stops.length; i++) {
            html += "<li class='busStops' onclick=\"routes['" +this.name.toLowerCase() + "'].showStops(" + i + ")\">" + this.stops[i] + "</li>";
        }
        html += '</ul>';
        return html;
    }

    getTimes(index) {
        var times = '';
        var day = this.getDay()

        for (var i = 0; i < day.length; i++) {
            if (day[i][index] == null || day[i][index] == undefined){
                times += ""
            }
            else {
            times += "<li class='tinmesRow'>" + day[i][index].toFixed(2) + "</li>";
            }
        }
        return times;
    }

    showNext(index) {
        var day = this.getDay()
        var date = new Date();
        var h = date.getHours()
        var m = date.getMinutes()
        var time = h + "." + m

        for (var i = 0; i < day.length; i++) {
            if (time < day[i][index]) {
                var next = day[i][index].toFixed(2)
                return next
            }
        }
        nextDOM = next
    }

    showStops(index) {
        this.routeNameDOM.innerHTML = this.name;
        this.stopsDOM.innerHTML = this.stops[index];
        this.createMarker(index);
        this.timesDOM.innerHTML = this.getTimes(index);
        this.nextDOM.innerHTML = this.showNext(index)

    }

    createMarker(index) {
        if (this.marker != null) {
            this.marker.setMap(null);
            this.marker = null;
        }
        var stopPosition = this.stopPositions[index];
        var stopName = this.stops[index];
        this.marker = new google.maps.Marker({
            map: map,
            position: stopPosition,
            title: stopName
        });

        map.setCenter (stopPosition);
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
