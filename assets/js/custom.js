$(document).ready(function () {
    'use strict';

    var scripts = {
        init: function () {
            this.responsiveMenu();
            this.masonry();
            this.gallery();
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
                                '<small>Looking for <a href="' + link + '" class="print-link">the original (non-watermarked) photo</a> or <a href="' + link + '" class="print-link">a print</a>?</small>';
                        }
                    },
                    callbacks: {
                        updateStatus: function(data) {
                            if (data.status !== 'ready') {
                                return;
                            }

                            var link = $('.print-link').attr('href');
                            $('.mfp-content').find('.print-button').remove();
                            $('.mfp-content').append('<a href="' + link + '" class="print-button">Get a print</a>');
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
