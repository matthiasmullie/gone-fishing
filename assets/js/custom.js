$(document).ready(function () {
    'use strict';

    var map = {
        map: null,
        options: {
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
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
            ]
        },

        load: function (node, config) {
            this.map = new google.maps.Map(node, this.options);

            this.setCenter(config.center);
            this.setZoom(config.zoom);
            this.setMarkers(config.markers);
            this.setDirections(config.directions);
        },

        setCenter: function (center) {
            if (!center || !(0 in center) || !(1 in center)) {
                return;
            }

            var coordinate = new google.maps.LatLng(center[0], center[1]);
            this.map.setCenter(coordinate);
        },

        setZoom: function (zoom) {
            if (isNaN(zoom)) {
                return;
            }

            this.map.setZoom(parseInt(zoom));
        },

        setMarkers: function (coordinates) {
            var coordinate, icon, i;

            if (!coordinates || coordinates.length === 0) {
                return;
            }

            for (i in coordinates) {
                if (!coordinates.hasOwnProperty(i)) {
                    continue;
                }

                coordinate = coordinates[i];
                icon = 'http://maps.google.com/mapfiles/ms/icons/' + (parseInt(i) === coordinates.length - 1 ? 'red-dot' : 'blue' ) + '.png';
                this.addMarker(new google.maps.LatLng(coordinate[0], coordinate[1]), icon);
            }
        },

        setDirections: function (coordinates) {
            var directionsService = new google.maps.DirectionsService,
                directionsDisplay = new google.maps.DirectionsRenderer({
                    suppressMarkers: true,
                    suppressInfoWindows: true
                }),
                waypoints = [],
                coordinate,
                start,
                stop,
                legs,
                i;

            if (!coordinates || coordinates.length === 0) {
                return;
            }

            directionsDisplay.setMap(this.map);

            for (i in coordinates) {
                if (!coordinates.hasOwnProperty(i)) {
                    continue;
                }

                coordinate = coordinates[i];
                waypoints.push({
                    location: new google.maps.LatLng(coordinate[0], coordinate[1]),
                    stopover: true
                });
            }

            start = waypoints.shift();
            stop = waypoints.pop();
            directionsService.route({
                origin: start.location,
                destination: stop.location,
                waypoints: waypoints,
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);

                    legs = response.routes[0].legs;
                    for (i = 0; i < legs.length; i++) {
                        this.addMarker(
                            legs[i].start_location,
                            'http://maps.google.com/mapfiles/ms/icons/red.png',
                            coordinates[i][2] || ''
                        );
                    }
                }
            }.bind(this));
        },

        addMarker: function (latlng, icon, text) {
            var marker = new google.maps.Marker({
                    map: this.map,
                    position: latlng,
                    icon: icon,
                    zIndex: 999
                }),
                infowindow;

            if (text) {
                infowindow = new google.maps.InfoWindow;
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(text);
                    infowindow.open(this.map, marker);
                }.bind(this));
            }
        }
    };

    var scripts = {
        init: function () {
            this.responsiveMenu();
            this.masonry();
            this.gallery();
            this.map();
            this.goToTop();
            this.autoExpand();
        },

        responsiveMenu: function () {
            $('.responsive-menu').on('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                $('.main-nav > ul').css({ display: 'block' });
                return false;
            });

            $('body').on('click', function () {
                $('.main-nav > ul').css({ display: 'none' });
            });
        },

        masonry: function () {
            $('.masonry').masonry({ horizontalOrder: true });
        },

        gallery: function () {
            $('.gallery').each(function() {
                $(this).magnificPopup({
                    delegate: 'a.lightbox',
                    type: 'image',
                    gallery: {
                        enabled: true
                    },
                    image: {
                        titleSrc: function(item) {
                            var link = '/request-photo/#photo-' + item.el.attr('href').replace('/photos/full/', '');
                            return item.el.attr('title') +
                                '<small>Looking for <a href="' + link + '">the original (non-watermarked) photo</a> or <a href="' + link + '">a print</a>?</small>';
                        }
                    }
                });
            });
        },

        map: function () {
            var $map = $('#map'),
                config = {};

            if ($map.length) {
                config.center = $map.data('center');
                config.zoom = $map.data('zoom');
                config.markers = $map.data('markers');
                config.directions = $map.data('directions');

                google.maps.event.addDomListener(window, 'load', map.load.bind(map, $map[0], config));
            }
        },

        goToTop: function () {
            $('.go-to-top').on('click', function () {
                $('body, html').animate({ scrollTop: 0 }, 1200, 'swing');
                return false;
            });
        },

        autoExpand: function () {
            $('textarea').autoExpand({ animationTime: 20 });
        }
    };

    scripts.init();
});
