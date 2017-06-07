$(document).ready(function () {
    'use strict';
    function loadMap() {
        var styles = [
            {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [{ color: "#ffffff" }]
            },
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{ color: "#bbbbbb" }]
            },
            {
                featureType: "poi",
                elementType: "all",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [{ color: "#e6f3d6" }, { visibility: "on" }]
            },
            {
                featureType: "road",
                elementType: "all",
                stylers: [{ saturation: -100 }, { lightness: 45 }, { visibility: "simplified" }]
            },
            {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{ visibility: "simplified" }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{ color: "#f4d2c5" }, { visibility: "simplified" }]
            },
            {
                featureType: "road.highway",
                elementType: "labels.text",
                stylers: [{ color: "#4e4e4e" }]
            },
            {
                featureType: "road.arterial",
                elementType: "geometry.fill",
                stylers: [{ color: "#f4f4f4" }]
            },
            {
                featureType: "road.arterial",
                elementType: "labels.text.fill",
                stylers: [{ color: "#787878" }]
            },
            {
                featureType: "water",
                elementType: "all",
                stylers: [{ visibility: "simplified" }, { color: "#5f94ff" }, { lightness: 26 }, { gamma: 5.86 }]
            },
            {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }]
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{ visibility: "off" }]
            },
            {
                elementType: "labels.text.fill",
                stylers: [{ color: "#888888" }]
            },
            {
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
            }
        ],
        node = document.getElementById('map'),
        center = new google.maps.LatLng($(node).data('center')[0], $(node).data('center')[1]),
        zoom = $(node).data('zoom'),
        coordinates = $(node).data('coordinates'),
        options = {
            center: center,
            zoom: parseInt(zoom),
            styles: styles,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        map = new google.maps.Map(node, options),
        coordinate,
        i,
        icon;

        for (i in coordinates) {
            coordinate = coordinates[i];
            icon = 'http://maps.google.com/mapfiles/ms/icons/' + (i === '0' ? 'red-dot' : 'blue' ) + '.png';
            new google.maps.Marker({
                position: new google.maps.LatLng(coordinate[0], coordinate[1]),
                map: map,
                icon: icon,
                zIndex: coordinates.length - parseInt(i)
            });
        }
    }

    $('.responsive-menu').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('.main-nav > ul').css({ display: 'block' });
        return false;
    });
    $('body').on('click', function () {
        $('.main-nav > ul').css({ display: 'none' });
    });
    $('.go-to-top').on('click', function () {
        $('body, html').animate({ scrollTop: 0 }, 1200, 'swing');
        return false;
    });

    $('a.lightbox').fluidbox({
        immediateOpen: true
    });

    $('textarea').autoExpand({ animationTime: 20 });

    if ($('#map').length) {
        google.maps.event.addDomListener(window, 'load', loadMap);
    }
});
