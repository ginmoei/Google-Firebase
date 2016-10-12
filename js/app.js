

function appViewModel() {

    var self = this;
    var map;
    var city;
    var infowindow;
    var grouponLocations = [];
    var grouponReadableNames = [];
    var selectedShape;
    var colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
    var selectedColor;
    var colorButtons = {};
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


    this.mapRequestTimeout = setTimeout(function () {
        $('#map-canvas').html('We had trouble loading Google Maps. Please refresh your browser and try again.');
    }, 8000);
    // Initialize Google map, perform initial deal search on a city.







this.initMap = function () {

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
                      position: google.maps.ControlPosition.TOP_CENTER,
                      drawingModes: ['circle', 'polygon', 'polyline', 'rectangle']
                    },
                    rectangleOptions: polyOptions,
                    circleOptions: polyOptions,
                    polygonOptions: polyOptions,
                    map: map
                });
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



        city = new google.maps.LatLng({
            lat: 51.37634,
            lng: 0.078251
        }); // Bromley centre
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: city,
            zoom: 11,
            zoomControl: true,
         zoomControlOptions: {
             position: google.maps.ControlPosition.RIGHT_BOTTOM
         },
         scaleControl: true,
         mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap','satellite', 'hybrid','terrain'],
            position: google.maps.ControlPosition.RIGHT_TOP
          },
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
//drawingToolbox = document.getElementById("panel-drawing");

drawingCheckbox.addEventListener('change', function() {

  if(drawingCheckbox.checked == true){
    drawingManager.setMap(map);
    $( "#panel-drawing" ).toggle();
  //  drawingToolbox.toggle();
   }else{
drawingManager.setMap(null);
    $( "#panel-drawing" ).toggle();
  }

});

// add drawing tools to the map.


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

                       // Clear the current selection when the drawing mode is changed, or when the
                       // map is clicked.
                       google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
                       google.maps.event.addListener(map, 'click', clearSelection);
                       google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);

                       buildColorPalette();

                       google.maps.event.addDomListener(window, "resize", function () {
                           var center = map.getCenter();
                           google.maps.event.trigger(map, "resize");
                           map.setCenter(center);
                       });

    }




    //google.maps.event.addDomListener(window, 'load', mapInitialize);
}

//custom binding highlights the search text on focus


  var s = new appViewModel();

  ko.bindingHandlers.selectOnFocus = {
      update: function (element) {
          ko.utils.registerEventHandler(element, 'focus', function (e) {
              element.select();
          });
      }
  };

  ko.applyBindings(s);

  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelectorAll('#map-canvas').length > 0)
    {
      if (document.querySelector('html').lang)
        lang = document.querySelector('html').lang;
      else
        lang = 'en';

      var js_file = document.createElement('script');
      js_file.type = 'text/javascript';
      js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=s.initMap&libraries=geometry,places,drawing,visualization&key=AIzaSyANKIEC2aBDDkj29xDaQKrz3Cq8PST51Ho&language=' + lang;
      document.getElementsByTagName('head')[0].appendChild(js_file);
    }
  });
