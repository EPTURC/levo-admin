/* ============================================================
 * Google Map
 * Render maps using Google Maps JS API
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */
(function ($) {

    'use strict';

    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    var map;
    var zoomLevel = 15;

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: zoomLevel,
            disableDefaultUI: true,
            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(-5.8321357, -35.2053167), // New York

            // Map styling
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
            }
        ]
    },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
            }
        ]
    },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
            }
        ]
    },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
            },
                        {
                            "lightness": 45
            }
        ]
    },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
            }
        ]
    },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
            }
        ]
    },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
            }
        ]
    },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#46bcec"
            },
                        {
                            "visibility": "on"
            }
        ]
    }
]
        };

        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('google-map');

        // Create the Google Map using out element and options defined above
        map = new google.maps.Map(mapElement, mapOptions);
    }

    $(document).ready(function () {
        $('#map-zoom-in').click(function () {
            map.setZoom(++zoomLevel);
        });
        $('#map-zoom-out').click(function () {
            map.setZoom(--zoomLevel);
        });
    });

})(window.jQuery);
