//Creates the variable with all the bus names
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

//Creates the bus class to put all the functions in
class Bus {
//The constructor which will show all the corrosponding features in the app
    constructor(name, stops, stopPositions, monFriTimes, friTimes, satTimes, sunTimes) {
        this.name = name;
        this.stops = stops;
        this.stopPositions = stopPositions;
        this.monFriTimes = monFriTimes;
        this.friTimes = friTimes;
        this.satTimes = satTimes;
        this.sunTimes = sunTimes;

//Document Object Model for the link to HTML
        this.routeNameDOM = document.getElementById("route");
        this.stopsDOM = document.getElementById("stops");
        this.nextDOM = document.getElementById("next");
        this.timesDOM = document.getElementById("times");
    }
//Function called Get day that can be used later on
    getDay() {
//Gets the date
        var date = new Date();
//Gets the day of the week
        var day = date.getDay();
//If statement with the condition to get monday through to thursay
        if (day == 1 || day == 2 || day == 3 || day == 4) {
//changes the day variable to the monfriTimes array
         day =  this.monFriTimes;
//else if statement for friday times
        } else if (day == 5) {
//New variable to display the friday only times
            var friO = [];
//Adds the friday only times to the new array
            friO = this.friTimes
//New variable to display the friday times from a different array
            var fri = [];
//Adds the friday times from the monFriTimes array
            fri = this.monFriTimes
//Joins the two arrays together do it shows in one array
            var day =  fri.concat(friO);
//else if statement for the saturday times
        }else if (day == 6) {
//changes the day variable to display the saturday times
            var day = this.satTimes;
//else statement that will show the sunday times as the array only shows from sunday to saturday
        }else {
//changes the day variable to display the sunday times
            var day = this.sunTimes;
        }
//holds the day as new variable that can be used later
    return day;
    }

//New function to get the stops for a specific route
    getStops() {
//New variable that starts the unordered list
        var html = '<ul>';
//for statement witht a new variable to loop over all options
        for (var i = 0; i < this.stops.length; i++) {
//Variable gets filled with the new stops for the routes, sets the route name to lower case and displays it lower, when the stop is clicked on it will also show the stop lower.
            html += "<li class='busStops' onclick=\"routes['" +this.name.toLowerCase() + "'].showStops(" + i + ")\">" + this.stops[i] + "</li>";
        }
        html += '</ul>';
//Returns the html variable and displays the information
        return html;
    }

    //New function that gets the times from the index to display
    getTimes(index) {
//new empty variable called "times"
        var times = '';
//calling the function "getDay" to be saved as a new variable called "day"
        var day = this.getDay()
//for loop that will loop over all of the arrays and find the right stop time to display
        for (var i = 0; i < day.length; i++) {
//if statement with the condition of if the array is incomplete because the bus does not pick up any more people then it will display nothing
            if (day[i][index] == null || day[i][index] == undefined){
                times += ""
            }
//else statment so if there is stuff in in the array then it will display the times in a list with with two number after the "." to make sure it looks like a time
            else {
            times += "<li class='tinmesRow'>" + day[i][index].toFixed(2) + "</li>";
            }
        }
//returns the times to be displayed on the page
        return times;
    }

//new Function that will show the time of the next avilable bus
    showNext(index) {
//calling the function "getDay" to be saved as a new variable called "day"
        var day = this.getDay()
//getting the date in a new variable
        var date = new Date();
//gets the hours of the current days time
        var h = date.getHours()
//gets the minutes of the current days time
        var m = date.getMinutes()
//joins the hours and minutes together so we now know the current time
        var time = h + "." + m
//loops over the new variable to get the day number
        for (var i = 0; i < day.length; i++) {
//if statement to see if the time is less than the day of the selected one in the index
            if (time < day[i][index]) {
//new variable to display the day of the selected route next bus time showing the correct time
                var next = day[i][index].toFixed(2)
//Returns the next variable to display
                return next
            }
        }
//Displays the next variable from the function in the correct place in the HTML
        this.nextDOM = next
    }

//Function that shows the correct information in the correct places
    showStops(index) {
        this.routeNameDOM.innerHTML = this.name;
        this.stopsDOM.innerHTML = this.stops[index];
        this.createMarker(index);
        this.timesDOM.innerHTML = this.getTimes(index);
        this.nextDOM.innerHTML = this.showNext(index)

    }
//Function that creates the little marker that shows up on the map on google maps
    createMarker(index) {
//if statment that means if there is a marker on the map then get rid of it before displaying the next one so there arent lots of markers on the map at one time
        if (this.marker != null) {
//setting the marker to null, making sure there is none on the map
            this.marker.setMap(null);
            this.marker = null;
        }
//New variable for the stop postiion that has been clicked on
        var stopPosition = this.stopPositions[index];
//New variable for the stop name that has been clicked on
        var stopName = this.stops[index];
//Creating the new google maps marker using the google maps
        this.marker = new google.maps.Marker({
            map: map,
//setting the position to the stop position that has been clicked on
            position: stopPosition,
//setting the title to the stop that has been clicked on
            title: stopName
        });
//setting the map centre to the stop that has been clicked on
        map.setCenter (stopPosition);
//setting the map zoom close
        map.setZoom(15);
    }
}

//Empty variable for the routes
var routes = {};

//loop over the new variable to get the right bus
for (var i = 0; i < this.buses.length; i++) {
//new variable that os the bus that has been clicked on
    var name = buses[i];
//new variable that goes over the bus object getting the information from other java script files that hold all of the information
    var newRoute = new Bus(
            name,
            data.stops[name],
            data.stopCoordinates[name],
            data.timesMonFri[name],
            data.timesFri[name],
            data.timesSat[name],
            data.timesSun[name]
    );
//setting the routes variable for the bus name and adding all the information to it
    routes[name] = newRoute;
}


//Jquery

//getting the functions ready
$(document).ready(function(){
//setting the latatude and longatude of the square
    var theSquare = {
        lat: -40.356207,
        lng: 175.610062
    };
    //Create a new Map object
//setting the map on reload to sentre at the square with a zoom
    window.map = new google.maps.Map (document.getElementById('map'), {
        center: theSquare,
        zoom: 13
    });
//hiding the menu for the stops until the route is clicked on
    $(".stopsmenu").hide();
//creating the click fuction so that when the route is clicked on it will slide down to show the stops
    $(".bus h2").click(function(){
        $("#" + this.id + "Stops").html(routes[this.id].getStops());
        $("#" + this.id + "Stops").slideToggle();
    });

});
