function appViewModel() {
    var self = this;
    var map;
    var city;
    var infowindow;
    var grouponLocations = [];
    var grouponReadableNames = [];
  var bikeLayer = new google.maps.BicyclingLayer();

  var polyOptions = {
                    strokeWeight: 0,
                    fillOpacity: 0.45,
                    editable: true,
                    draggable: true
                };
                // Creates a drawing manager attached to the map that allows the user to draw
                // markers, lines, and shapes.
        var        drawingManager = new google.maps.drawing.DrawingManager({
                    drawingMode: google.maps.drawing.OverlayType.POLYGON,
                    markerOptions: {
                        draggable: true
                    },
                    polylineOptions: {
                        editable: true,
                        draggable: true
                    },
                    drawingControlOptions: {
                      position: google.maps.ControlPosition.TOP_CENTER
                    //  drawingModes: ['circle', 'polygon', 'polyline', 'rectangle']
                    },
                    rectangleOptions: polyOptions,
                    circleOptions: polyOptions,
                    polygonOptions: polyOptions,
                    map: map
                });

    google.maps.Polygon.prototype.getBounds = function () {
        var bounds = new google.maps.LatLngBounds();
        var paths = this.getPaths();
        var path;
        for (var i = 0; i < paths.getLength(); i++) {
            path = paths.getAt(i);
            for (var ii = 0; ii < path.getLength(); ii++) {
                bounds.extend(path.getAt(ii));
            }
        }
        return bounds;
    };
    this.grouponDeals = ko.observableArray([]); //initial list of deals
    this.filteredList = ko.observableArray([]); //list filtered by search keyword
    this.mapMarkers = ko.observableArray([]); //holds all map markers
    this.dealStatus = ko.observable('Searching for recent flags');
    this.searchStatus = ko.observable();
    this.searchLocation = ko.observable('Taipei');
    this.loadImg = ko.observable();
    this.infoBox = ko.observable('empty');
    this.numDeals = ko.computed(function () {
        return self.filteredList().length;
    });

    //Holds value for list togglings
    this.toggleSymbol = ko.observable('hide');


    //toggles the list view
    /*  this.listToggle = function() {
        if (self.toggleSymbol() === 'hide') {
            self.toggleSymbol('show');
        } else {
            self.toggleSymbol('hide');
        }
    };
*/
    //Error handling if Google Maps fails to load
    this.mapRequestTimeout = setTimeout(function () {
        $('#map-canvas').html('We had trouble loading Google Maps. Please refresh your browser and try again.');
    }, 8000);

    // Initialize Google map, perform initial deal search on a city.
    function mapInitialize() {
        city = new google.maps.LatLng({
            lat: 51.37634,
            lng: 0.078251
        }); // Bromley centre
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: city,
            zoom: 11,
            styles: [{
                featureType: 'poi',
                stylers: [{
                        visibility: 'off'
                    }] // Turn off points of interest.
            }, {
                featureType: 'transit.station',
                stylers: [{
                        visibility: 'off'
                    }] // Turn off bus stations, train stations, etc.
            }],
            disableDoubleClickZoom: false
        });
        clearTimeout(self.mapRequestTimeout);

        //  var infoWindow = new google.maps.InfoWindow({map: map});
        // get the current location to search
        /*if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };

                //Hold the current location's lat & lng - useful for re-centering map
                self.currentLat = ko.observable(pos.lat);
                self.currentLng = ko.observable(pos.lng);

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                map.setCenter(pos);
              }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
              });
            } else {
              // Browser doesn't support Geolocation
              handleLocationError(false, infoWindow, map.getCenter());
            }
*/
        // Add marker on user click

        // Create a heatmap.
        /*var heatmap = new google.maps.visualization.HeatmapLayer({
          data: [],
          map: map,
          radius: 50
        });*/

        firebase.database().ref().on("child_added", function (snapshot, prevChildKey) {
            // Get latitude and longitude from Firebase.
            var newPosition = snapshot.val();

            // Create a google.maps.LatLng object for the position of the marker.
            // A LatLng object literal (as above) could be used, but the heatmap
            // in the next step requires a google.maps.LatLng object.
            var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);


            var marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
            //    heatmap.getData().push(latLng);
        });

        /*
              function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                      infoWindow.setPosition(pos);
                      infoWindow.setContent(browserHasGeolocation ?
                                            'Error: The Geolocation service failed.' :
                                            'Error: Your browser doesn\'t support geolocation.');
                    }
        */

        /*  map.data.setStyle({
            strokeWeight: 1
          });*/
        /*    map.data.add({geometry: new google.maps.Data.Polygon([worldCoords

                                                                 ])})
*/



        map.data.loadGeoJson(
            'https://raw.githubusercontent.com/ginmoei/Google-Firebase/master/js/ps.json');

        map.data.setStyle(function (feature) {
            var fillcolor = 'gray';
            var strokeColor = 'gray';

            if (feature.getProperty('name') == 'BR') {
                fillcolor = 'transparent';

            }
            /*   if (feature.getProperty('isColorful')) {
                 color = feature.getProperty('color');
               }*/
            return /** @type {google.maps.Data.StyleOptions} */ ({
                fillColor: fillcolor,
                strokeColor: strokeColor,
                strokeWeight: 2
            });
        });

        //BromleyPolygon.setMap(map);
// add bicycle layer to the current map
bicycleCheckbox = document.getElementById("icon-cycle");

bicycleCheckbox.addEventListener('change', function() {

  if(bicycleCheckbox.checked == true){
    bikeLayer.setMap(map);
   }else{
bikeLayer.setMap(null);
  }

});

drawingCheckbox = document.getElementById("icon-drawing");

drawingCheckbox.addEventListener('change', function() {

  if(drawingCheckbox.checked == true){
    drawingManager.setMap(map);
   }else{
drawingManager.setMap(null);
  }

});

// add drawing tools to the map.

function clearSelection () {
               if (selectedShape) {
                   if (selectedShape.type !== 'marker') {
                       selectedShape.setEditable(false);
                   }

                   selectedShape = null;
               }
           }

           function setSelection (shape) {
               if (shape.type !== 'marker') {
                   clearSelection();
                   shape.setEditable(true);
                   selectColor(shape.get('fillColor') || shape.get('strokeColor'));
               }

               selectedShape = shape;
           }

           function deleteSelectedShape () {
               if (selectedShape) {
                   selectedShape.setMap(null);
               }
           }

           function selectColor (color) {
               selectedColor = color;
               for (var i = 0; i < colors.length; ++i) {
                   var currColor = colors[i];
                   colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff';
               }

               // Retrieves the current options from the drawing manager and replaces the
               // stroke or fill color as appropriate.
               var polylineOptions = drawingManager.get('polylineOptions');
               polylineOptions.strokeColor = color;
               drawingManager.set('polylineOptions', polylineOptions);

               var rectangleOptions = drawingManager.get('rectangleOptions');
               rectangleOptions.fillColor = color;
               drawingManager.set('rectangleOptions', rectangleOptions);

               var circleOptions = drawingManager.get('circleOptions');
               circleOptions.fillColor = color;
               drawingManager.set('circleOptions', circleOptions);

               var polygonOptions = drawingManager.get('polygonOptions');
               polygonOptions.fillColor = color;
               drawingManager.set('polygonOptions', polygonOptions);
           }

           function setSelectedShapeColor (color) {
               if (selectedShape) {
                   if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
                       selectedShape.set('strokeColor', color);
                   } else {
                       selectedShape.set('fillColor', color);
                   }
               }
           }

           function makeColorButton (color) {
               var button = document.createElement('span');
               button.className = 'color-button';
               button.style.backgroundColor = color;
               google.maps.event.addDomListener(button, 'click', function () {
                   selectColor(color);
                   setSelectedShapeColor(color);
               });

               return button;
           }

           function buildColorPalette () {
               var colorPalette = document.getElementById('color-palette');
               for (var i = 0; i < colors.length; ++i) {
                   var currColor = colors[i];
                   var colorButton = makeColorButton(currColor);
                   colorPalette.appendChild(colorButton);
                   colorButtons[currColor] = colorButton;
               }
               selectColor(colors[0]);
           }
// only areas which are turned on can have markers added. find a way to check these and have an admin screen to allow new areas.
        map.data.addListener('click', function (e) {

            var marker = new google.maps.Marker({
                position: {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                }
            });
            if (e.feature.getProperty('name') == 'BR') {
                firebase.database().ref().push({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                });

            } else {
                console.log('not yet open');
            }


        });


        map.data.addListener('mouseover', function (e) {
            //if(e.feature.getProperty('name')!='BR'){
            map.data.overrideStyle(e.feature, {
                strokeWeight: 8
            });
            self.infoBox(e.feature.getProperty('name'));
          //  document.getElementById('info-box').textContent = e.feature.getProperty('name');
            //console.log(e.feature.getProperty('name'));
            //}
        });

        map.data.addListener('mouseout', function (event) {
            map.data.revertStyle();
        });

    }
    google.maps.event.addDomListener(window, "resize", function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
                       var newShape = e.overlay;

                       newShape.type = e.type;

                       if (e.type !== google.maps.drawing.OverlayType.MARKER) {
                           // Switch back to non-drawing mode after drawing a shape.
                           drawingManager.setDrawingMode(null);

                           // Add an event listener that selects the newly-drawn shape when the user
                           // mouses down on it.
                           google.maps.event.addListener(newShape, 'click', function (e) {
                               if (e.vertex !== undefined) {
                                   if (newShape.type === google.maps.drawing.OverlayType.POLYGON) {
                                       var path = newShape.getPaths().getAt(e.path);
                                       path.removeAt(e.vertex);
                                       if (path.length < 3) {
                                           newShape.setMap(null);
                                       }
                                   }
                                   if (newShape.type === google.maps.drawing.OverlayType.POLYLINE) {
                                       var path = newShape.getPath();
                                       path.removeAt(e.vertex);
                                       if (path.length < 2) {
                                           newShape.setMap(null);
                                       }
                                   }
                               }
                               setSelection(newShape);
                           });
                           setSelection(newShape);
                       }
                       else {
                           google.maps.event.addListener(newShape, 'click', function (e) {
                               setSelection(newShape);
                           });
                           setSelection(newShape);
                       }
                   });


    // Create and place markers and info windows on the map based on data from API
    //Manages the toggling of the list view, location centering, and search bar on a mobile device.

    /*    this.mobileShow = ko.observable(false);
        this.searchBarShow = ko.observable(true);

        this.mobileToggleList = function() {
            if (self.mobileShow() === false) {
                self.mobileShow(true);
            } else {
                self.mobileShow(false);
            }
        };

        this.searchToggle = function() {
            if (self.searchBarShow() === true) {
                self.searchBarShow(false);
            } else {
                self.searchBarShow(true);
            }
        };
*/
    //Re-center map to current city if you're viewing deals that are further away
    /*  this.centerMap = function() {
            //  infowindow.close();
            var currCenter = map.getCenter();
            var cityCenter = new google.maps.LatLng(self.currentLat(), self.currentLng());
            if (cityCenter === currCenter) {
                self.searchStatus('Map is already centered.');
            } else {
                self.searchStatus('');
                map.panTo(cityCenter);
                map.setZoom(30);
            }
        };
*/
    mapInitialize();
}


//custom binding highlights the search text on focus

ko.bindingHandlers.selectOnFocus = {
    update: function (element) {
        ko.utils.registerEventHandler(element, 'focus', function (e) {
            element.select();
        });
    }
};

ko.applyBindings(new appViewModel());
