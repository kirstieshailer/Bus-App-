var colours = ["#f69238",
                "#009e57",
                "#00aeef",
                "#ee1b2d",
                "#873c96",
                "#ef59a1",
                "#0153a0",
                "#c6870e",
                "#005040",
                "#fbb555",
                "#008b98",
                "#f0563b"]

//CLASS
class Bus {
    //the different properties that Bus objects should have
    constructor(name, stops, colour, monFriTimes, friTimes, satTimes, sunTimes) {
        this.name = name;
        this.busStops = stops;
        this.colour = colour;
        this.monFriTimes = monFriTimes;
        this.satTimes = satTimes;
        this.sunTimes = sunTimes;
    }


    getStops() {
        var html = '<ul>';
        for (var i = 0; i < this.busStops.length; i++) {

            //onclick="                                  awapuni.showTimes(1)                                                 Deaprt MST
            html += "<li class='busStop' onclick='" + this.name.toLowerCase() + ".showTimes(" + i + ")'>" + this.busStops[i] + "</li>"
        }
        html += '</ul>'
        return html
    }

    showTimes(index) {
        alert("You've clicked index: " + index)
        //get the correct times. that match this stop. using the index argument
        //show the time on the webpage.
    }

}


//OBJECTS
var awapuni = new Bus("Awapuni", awapuniStops, colours[0], awapuniTimesMonFri, awapuniTimesFri, awapuniTimesSat, awapuniTimesSun);
var rugby = new Bus("Rugby", rugbyStops, colours[1], rugbyTimesMonFri, rugbyTimesFri, rugbyTimesSat, rugbyTimesSun)
var highbury = new Bus("Highbury", highburyStops, colours[2], highburyTimesMonFri, highburyTimesFri, highburyTimesSat, highburyTimesSun)
var takaro = new Bus("Takaro", takaroStops, colours[3], takaroTimesMonFri, takaroTimesFri, takaroTimesSat, takaroTimesSun)
var cloverlea = new Bus("Cloverlea", cloverleaStops, colours[4], cloverleaTimesMonFri, cloverleaTimesFri, cloverleaTimesSat, cloverleaTimesSun)
var milson = new Bus("Milson", milsonStops, colours[5], milsonTimesMonFri, milsonTimesFri, milsonTimesSat, milsonTimesSun)
var rhodes = new Bus("Rhodes", rhodesStops, colours[6], rhodesTimesMonFri, rhodesTimesFri, rhodesTimesSat, rhodesTimesSun)
var roslyn = new Bus("Roslyn", roslynStops, colours[7], roslynTimesMonFri, roslynTimesFri, roslynTimesSat, roslynTimesSun)
var rangiora = new Bus("Rangiora", rangioraStops, colours[8], rangioraTimesMonFri, rangioraTimesFri, rangioraTimesSat, rangioraTimesSun)
var brightwater = new Bus("Brightwater", brightwaterStops, colours[9], brightwaterTimesMonFri, brightwaterTimesFri, brightwaterTimesSat, brightwaterTimesSun)
var fernlea = new Bus("Fernlea", fernleaStops, colours[10], fernleaTimesMonFri, fernleaTimesFri, fernleaTimesSat, fernleaTimesSun)
var heights = new Bus("Heights", heightsStops, colours[11], heightsTimesMonFri, heightsTimesFri, heightsTimesSat, heightsTimesSun)


//JQUERY STUFF
$(document).ready(function () {

    $(".stopsMenu").hide();

    $(".bus h2").click(function () {
        $("#" + this.id + "Stops").html(eval(this.id).getStops());
        $("#" + this.id + "Stops").slideToggle();
    })

});
