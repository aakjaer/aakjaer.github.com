$(document).ready(function(){

    function initialize (){
        
        // create each of the stations
        $.each(stations, function(i, item) {

            // create the gauge markup
            createWindGauge( item.id, item.name );

            // load the data
            getGaugeData( url, item.id, item.name );
            
        });
    }



    function getGaugeData(url, id) {
        // if the URL starts with http
        if(url.match('^http')){
          // assemble the YQL call
            $.getJSON("https://query.yahooapis.com/v1/public/yql?"+
            "q=select%20*%20from%20html%20where%20url%3D%22"+
            encodeURIComponent(url)+id+
            "%22&format=xml'&callback=?",
            function(data){
                if(data.results[0]){
                    var data = filterData(data.results[0]);
                    //alert(data);
                    var windData = extractWindData(data);
                    fillData(windData, id);

                } else {
                    console.log("not working dummy!");
                }
            });
        } 
    }

    function filterData(data){
        // filter all the nasties out
        // no body tags
        data = data.replace(/<?\/body[^>]*>/g,'');
        // no linebreaks
        data = data.replace(/[\r|\n]+/g,'');
        // no comments
        data = data.replace(/<--[\S\s]*?-->/g,'');
        // no noscript blocks
        data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
        // no script blocks
        data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
        // no self closing scripts
        data = data.replace(/<script.*\/>/,'');
        // no images
        data = data.replace(/<img.*\/>/,'');
        // [... add as needed ...]
        return data;
    }

    function extractWindData(data) {

        var re1='.*?';  // Non-greedy match on filler
        var re2='((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)'; // HourMinuteSec 1
        var re3='.*?';    // Non-greedy match on filler
        var re4='(\\d+)'; // Integer Number 1
        var re5='.*?';    // Non-greedy match on filler
        var re6='([+-]?\\d*\\.\\d+)(?![-+0-9\\.])';   // Float 1
        var re7='.*?';    // Non-greedy match on filler
        var re8='([+-]?\\d*\\.\\d+)(?![-+0-9\\.])';   // Float 2

        var p = new RegExp(re1+re2+re3+re4+re5+re6+re7+re8,["i"]);
        var m = p.exec(data);
        if (m != null) {
            var $time = m[1].replace(/</,"&lt;"),
                $angle = m[2].replace(/</,"&lt;");
                $speed = m[3].replace(/</,"&lt;");
                $temperature = m[4].replace(/</,"&lt;");
            
            return {angle: $angle, speed: $speed, timestamp: $time, temperature: $temperature};
        }
    }


    function createWindGauge( stationID, stationName ){
        if ( $("#content .weather-stations").length == 0 ) {
            // create the list element
            $("#content").append("<ul class='weather-stations list-unstyled'></ul>");
        }

        var listItem = 
            "<li class=\"station station-" + stationID + "\" >" +
                "<a data-toggle=\"collapse\" data-target=\"#details-"+ stationID +"\">" +
                    "<div class=\"row\">" +
                        "<div class=\"col-xs-6\">" +
                            "<h3>" + stationName + "</h3>" +
                        "</div>" +
                        "<div class=\"col-xs-6 text-right\">" +
                            "<span class=\"speed\"><b>0.0</b> m/s</span>" +
                            "<div class=\"wind-direction\">" +
                                "<i class=\"wind-arrow fa fa-long-arrow-down\"></i>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</a>" +
                "<div id=\"details-"+ stationID +"\" class=\"station-details-container collapse\">" +
                    "<div class=\"station-details\">" +
                        "<i class=\"fa fa-clock-o\"></i> <time class=\"station-timestamp\"></time> - " +
                        "<span class=\"station-temperature\"></span> &deg;C" +
                    "</div>" +
                    "<figure class=\"station-chart\">" +
                        "<img src=\"" + urlImage + stationID + "&param=wind\" />" +
                    "</figure>" +
                "</div>" +
            "</li>";
            
        // append list item
        $("#content .weather-stations").append( listItem );
        
        return listItem;
    }

    function setWindAngle( elm, angle ) {
        $(elm[0]).css("-moz-transform","rotate("+ angle + "deg)");  
        $(elm[0]).css("-webkit-transform","rotate("+ angle + "deg)");   
        $(elm[0]).css("-ms-transform","rotate("+ angle + "deg)");   
        $(elm[0]).css("-o-transform","rotate("+ angle + "deg)");    
    }

    function fillData( data, stationID ) {

        // create reference to the list item
        var listItem = $(".weather-stations li.station-"+ stationID);
        
        // fill in the wind speed
        $(listItem).find(".speed b").html(data.speed);

        // fill in the wind direction
        $(listItem).find(".degrees").html(data.angle + "&deg;");
        
        // set the rotation of the wind arrow
        setWindAngle( $(listItem).find(".wind-arrow"), data.angle ); 

        // fill the time
        $(listItem).find(".station-timestamp").html(data.timestamp)

        // fill the temperature
        $(listItem).find(".station-temperature").html(data.temperature)

        var arrow = $(listItem).find(".direction");
    }

        // container     
    var container = $('#target'),

        // remote url - ssshh... don't tell anyone
        url = "http://servlet.dmi.dk/bv/servlet/bv?stat=",
        urlImage = "http://servlet.dmi.dk/bv/servlet/bvImage?stat=",

        // remote 
        stations = [
            { name: "Drogden", id: "6183" },
            { name: "Kbh lufthavn", id: "6180" },
            { name: "Gniben", id: "6169" },           
            { name: "Thorsminde", id: "6052" }            
        ];

    // welp... lets get those wind data
    initialize(url);
});
