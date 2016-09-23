function appViewModel() {
    var self = this;
    var map;
    var city;
    var infowindow;
    var grouponLocations = [];
    var grouponReadableNames = [];

    var BromleyCoords = [{lng: 0.167067,lat: 51.35600500000001}, {lng: 0.168764,lat: 51.366706}, {lng: 0.18475,lat: 51.375323}, {lng: 0.198849,lat: 51.381606}, {lng: 0.200268,lat: 51.38798700000001}, {lng: 0.211927,lat: 51.394313}, {lng: 0.216719,lat: 51.40132700000001}, {lng: 0.216692,lat: 51.412261}, {lng: 0.210605,lat: 51.415371}, {lng: 0.202884,lat: 51.414611}, {lng: 0.195172,lat: 51.414059}, {lng: 0.19358,lat: 51.415691}, {lng: 0.188926,lat: 51.416196}, {lng: 0.182396,lat: 51.41471600000001}, {lng: 0.180461,lat: 51.413846}, {lng: 0.174499,lat: 51.414932}, {lng: 0.167827,lat: 51.410459}, {lng: 0.159437,lat: 51.40963899999999}, {lng: 0.150503,lat: 51.406739}, {lng: 0.137974,lat: 51.405506}, {lng: 0.12632,lat: 51.40871299999999}, {lng: 0.114078,lat: 51.411302}, {lng: 0.110623,lat: 51.411225}, {lng: 0.109154,lat: 51.410764}, {lng: 0.108626,lat: 51.41139999999999}, {lng: 0.108267,lat: 51.41328699999999}, {lng: 0.106312,lat: 51.41436700000001}, {lng: 0.102752,lat: 51.414431}, {lng: 0.098743,lat: 51.416871}, {lng: 0.09038300000000001,lat: 51.421617}, {lng: 0.08236200000000001,lat: 51.428933}, {lng: 0.079419,lat: 51.430378}, {lng: 0.073388,lat: 51.430824}, {lng: 0.072392,lat: 51.430687}, {lng: 0.07183000000000001,lat: 51.42920099999999}, {lng: 0.070038,lat: 51.427892}, {lng: 0.064294,lat: 51.42490000000001}, {lng: 0.061153,lat: 51.424748}, {lng: 0.056462,lat: 51.424986}, {lng: 0.054635,lat: 51.426565}, {lng: 0.053482,lat: 51.426585}, {lng: 0.051858,lat: 51.425324}, {lng: 0.04862899999999999,lat: 51.423215}, {lng: 0.04772200000000001,lat: 51.423231}, {lng: 0.047518,lat: 51.422358}, {lng: 0.041641,lat: 51.421893}, {lng: 0.030739,lat: 51.42528}, {lng: 0.027469,lat: 51.42781099999999}, {lng: 0.024019,lat: 51.428129}, {lng: 0.021476,lat: 51.426574}, {lng: 0.02048,lat: 51.426437}, {lng: 0.020349,lat: 51.42721199999999}, {lng: 0.020369,lat: 51.429533}, {lng: 0.018811,lat: 51.431622}, {lng: 0.016795,lat: 51.43454500000001}, {lng: 0.012849,lat: 51.43487}, {lng: 0.009155999999999999,lat: 51.43343800000001}, {lng: 0.006912,lat: 51.433064}, {lng: 0.005426,lat: 51.433038}, {lng: 0.004385,lat: 51.43187}, {lng: 0.002168,lat: 51.432114}, {lng: -0.002665,lat: 51.43101}, {lng: -0.010808,lat: 51.429654}, {lng: -0.011345,lat: 51.428683}, {lng: -0.013489,lat: 51.428719}, {lng: -0.014353,lat: 51.427806}, {lng: -0.011765,lat: 51.426627}, {lng: -0.010185,lat: 51.42690999999999}, {lng: -0.009648,lat: 51.425972}, {lng: -0.00718,lat: 51.425827}, {lng: -0.007136,lat: 51.42495}, {lng: -0.009361,lat: 51.424988}, {lng: -0.011329,lat: 51.423371}, {lng: -0.014378,lat: 51.423423}, {lng: -0.015918,lat: 51.42215999999999}, {lng: -0.024594,lat: 51.421791}, {lng: -0.02563,lat: 51.42263300000001}, {lng: -0.029085,lat: 51.422846}, {lng: -0.03349,lat: 51.420135}, {lng: -0.037203,lat: 51.420095}, {lng: -0.037841,lat: 51.420621}, {lng: -0.037458,lat: 51.421852}, {lng: -0.037663,lat: 51.422835}, {lng: -0.039956,lat: 51.423235}, {lng: -0.042553,lat: 51.42229800000001}, {lng: -0.045434,lat: 51.42049}, {lng: -0.046462,lat: 51.417671}, {lng: -0.046486,lat: 51.413236}, {lng: -0.048015,lat: 51.412179}, {lng: -0.048188,lat: 51.410068}, {lng: -0.04911400000000001,lat: 51.409619}, {lng: -0.05076799999999999,lat: 51.409492}, {lng: -0.052384,lat: 51.408333}, {lng: -0.05513199999999999,lat: 51.40770800000001}, {lng: -0.055356,lat: 51.406319}, {lng: -0.058122,lat: 51.405231}, {lng: -0.05814900000000001,lat: 51.40461200000001}, {lng: -0.05708900000000001,lat: 51.40433699999999}, {lng: -0.05759,lat: 51.402231}, {lng: -0.057616,lat: 51.395786}, {lng: -0.052514,lat: 51.393638}, {lng: -0.05054100000000001,lat: 51.39350199999999}, {lng: -0.04562399999999999,lat: 51.390894}, {lng: -0.042749,lat: 51.38873100000001}, {lng: -0.040773,lat: 51.38869800000001}, {lng: -0.039733,lat: 51.387959}, {lng: -0.038816,lat: 51.38820100000001}, {lng: -0.038634,lat: 51.388611}, {lng: -0.036417,lat: 51.388419}, {lng: -0.028726,lat: 51.37751200000001}, {lng: -0.027437,lat: 51.37682}, {lng: -0.026545,lat: 51.376496}, {lng: -0.026758,lat: 51.375365}, {lng: -0.025537,lat: 51.375035}, {lng: -0.025229,lat: 51.372606}, {lng: -0.023894,lat: 51.371088}, {lng: -0.023448,lat: 51.36613000000001}, {lng: -0.021813,lat: 51.363937}, {lng: -0.012421,lat: 51.35826000000001}, {lng: -0.003792,lat: 51.35213100000001}, {lng: 0.000688,lat: 51.34153499999999}, {lng: 0.000526,lat: 51.337825}, {lng: 0.005052,lat: 51.335891}, {lng: 0.012958,lat: 51.33596100000001}, {lng: 0.014166,lat: 51.333465}, {lng: 0.013091,lat: 51.330045}, {lng: 0.025693,lat: 51.333128}, {lng: 0.034066,lat: 51.331883}, {lng: 0.040235,lat: 51.324516}, {lng: 0.047041,lat: 51.319667}, {lng: 0.059744,lat: 51.32109400000001}, {lng: 0.066582,lat: 51.32482399999999}, {lng: 0.068216,lat: 51.333814}, {lng: 0.076157,lat: 51.342473}, {lng: 0.08947900000000002,lat: 51.34190599999999}, {lng: 0.09296400000000001,lat: 51.32974500000001}, {lng: 0.100507,lat: 51.32191000000001}, {lng: 0.110324,lat: 51.321623}, {lng: 0.112557,lat: 51.328183}, {lng: 0.119716,lat: 51.331133}, {lng: 0.114781,lat: 51.338372}, {lng: 0.115981,lat: 51.34154}, {lng: 0.120245,lat: 51.346413}, {lng: 0.135223,lat: 51.34746100000001}, {lng: 0.149216,lat: 51.346215}, {lng: 0.167067,lat: 51.35600500000001}
    ];

    var WestminsterCoords = [{lng:0.013091, lat: 51.330045}, {lng: 0.008018000000000001, lat: 51.322433}, {lng: 0.012522, lat: 51.301017}, {lng: 0.012572, lat: 51.282786}, {lng: -0.000271, lat: 51.274187}, {lng: -0.010495, lat: 51.27086800000001}, {lng: -0.017852, lat: 51.27249}, {lng: -0.022164, lat: 51.270899}, {lng: -0.041962, lat: 51.266906}, {lng: -0.05356, lat: 51.268597}, {lng: -0.06481099999999999, lat: 51.265955}, {lng: -0.071645, lat: 51.261076}, {lng: -0.085725, lat: 51.260475}, {lng: -0.09443600000000001, lat: 51.261449}, {lng: -0.100972, lat: 51.263719}, {lng: -0.105878, lat: 51.26695900000001}, {lng: -0.12142, lat: 51.269539}, {lng: -0.129828, lat: 51.271504}, {lng: -0.132887, lat: 51.274548}, {lng: -0.130333, lat: 51.27866700000001}, {lng: -0.131517, lat: 51.28217999999999}, {lng: -0.143082, lat: 51.284859}, {lng: -0.148245, lat: 51.288435}, {lng: -0.152739, lat: 51.288839}, {lng: -0.15732, lat: 51.287081}, {lng: -0.166376, lat: 51.27957}, {lng: -0.176025, lat: 51.277058}, {lng: -0.187052, lat: 51.273236}, {lng: -0.193958, lat: 51.27301}, {lng: -0.196926, lat: 51.271725}, {lng: -0.203917, lat: 51.280613}, {lng: -0.203592, lat: 51.28360700000001}, {lng: -0.194194, lat: 51.284637}, {lng: -0.18598, lat: 51.287248}, {lng: -0.18761, lat: 51.293403}, {lng: -0.185274, lat: 51.299887}, {lng: -0.178198, lat: 51.310471}, {lng: -0.172531, lat: 51.311719}, {lng: -0.170555, lat: 51.311688}, {lng: -0.169796, lat: 51.31245899999999}, {lng: -0.167834, lat: 51.31471}, {lng: -0.16552, lat: 51.315326}, {lng: -0.163167, lat: 51.319527}, {lng: -0.163146, lat: 51.32265700000001}, {lng: -0.164417, lat: 51.327306}, {lng: -0.159614, lat: 51.33029599999999}, {lng: -0.151563, lat: 51.331212}, {lng: -0.147545, lat: 51.332779}, {lng: -0.149544, lat: 51.33483200000001}, {lng: -0.15155, lat: 51.339297}, {lng: -0.146043, lat: 51.34162300000001}, {lng: -0.144941, lat: 51.34323000000001}, {lng: -0.14374, lat: 51.34452099999999}, {lng: -0.140131, lat: 51.34622399999999}, {lng: -0.134091, lat: 51.346258}, {lng: -0.1328, lat: 51.347281}, {lng: -0.127498, lat: 51.347066}, {lng: -0.124164, lat: 51.354772}, {lng: -0.127108, lat: 51.359188}, {lng: -0.126324, lat: 51.360544}, {lng: -0.122785, lat: 51.360488}, {lng: -0.121707, lat: 51.361383}, {lng: -0.121816, lat: 51.363798}, {lng: -0.122513, lat: 51.364591}, {lng: -0.131798, lat: 51.36421799999999}, {lng: -0.131646, lat: 51.365389}, {lng: -0.13308, lat: 51.365999}, {lng: -0.133024, lat: 51.367367}, {lng: -0.134151, lat: 51.36784200000001}, {lng: -0.134616, lat: 51.369218}, {lng: -0.13335, lat: 51.36959}, {lng: -0.133212, lat: 51.37043500000001}, {lng: -0.135246, lat: 51.371641}, {lng: -0.138629, lat: 51.372999}, {lng: -0.141723, lat: 51.378916}, {lng: -0.149603, lat: 51.38504}, {lng: -0.154847, lat: 51.38421}, {lng: -0.156681, lat: 51.382641}, {lng: -0.158454, lat: 51.382604}, {lng: -0.159884, lat: 51.380735}, {lng: -0.164049, lat: 51.380801}, {lng: -0.166059, lat: 51.382658}, {lng: -0.167933, lat: 51.382687}, {lng: -0.168527, lat: 51.383479}, {lng: -0.168365, lat: 51.384911}, {lng: -0.167303, lat: 51.385416}, {lng: -0.163627, lat: 51.386141}, {lng: -0.16327, lat: 51.387244}, {lng: -0.16491, lat: 51.387921}, {lng: -0.167085, lat: 51.388282}, {lng: -0.170136, lat: 51.390155}, {lng: -0.171475, lat: 51.393175}, {lng: -0.173407, lat: 51.39437900000001}, {lng: -0.17378, lat: 51.395493}, {lng: -0.175035, lat: 51.395383}, {lng: -0.175167, lat: 51.39466699999999}, {lng: -0.176417, lat: 51.394687}, {lng: -0.176389, lat: 51.395404}, {lng: -0.177845, lat: 51.395491}, {lng: -0.183499, lat: 51.39747}, {lng: -0.18378, lat: 51.398257}, {lng: -0.185122, lat: 51.39860400000001}, {lng: -0.184977, lat: 51.402253}, {lng: -0.183713, lat: 51.402592}, {lng: -0.183302, lat: 51.405063}, {lng: -0.184415, lat: 51.405928}, {lng: -0.184897, lat: 51.40691399999999}, {lng: -0.183425, lat: 51.407217}, {lng: -0.183254, lat: 51.40891}, {lng: -0.180967, lat: 51.408744}, {lng: -0.180995, lat: 51.408027}, {lng: -0.17901, lat: 51.408127}, {lng: -0.178964, lat: 51.409299}, {lng: -0.177362, lat: 51.410253}, {lng: -0.175922, lat: 51.412382}, {lng: -0.174455, lat: 51.412555}, {lng: -0.17437, lat: 51.41470500000001}, {lng: -0.173197, lat: 51.415339}, {lng: -0.172543, lat: 51.41604600000001}, {lng: -0.169415, lat: 51.416062}, {lng: -0.168516, lat: 51.417678}, {lng: -0.161635, lat: 51.417636}, {lng: -0.161398, lat: 51.418349}, {lng: -0.161361, lat: 51.419262}, {lng: -0.159998, lat: 51.419436}, {lng: -0.159819, lat: 51.418716}, {lng: -0.156703, lat: 51.418406}, {lng: -0.154407, lat: 51.418435}, {lng: -0.151224, lat: 51.417211}, {lng: -0.149906, lat: 51.416277}, {lng: -0.146269, lat: 51.415959}, {lng: -0.145689, lat: 51.41484199999999}, {lng: -0.147016, lat: 51.41297200000001}, {lng: -0.147149, lat: 51.412257}, {lng: -0.145898, lat: 51.412237}, {lng: -0.145633, lat: 51.411059}, {lng: -0.146988, lat: 51.41108}, {lng: -0.147124, lat: 51.4103}, {lng: -0.143164, lat: 51.410237}, {lng: -0.142886, lat: 51.409385}, {lng: -0.143724, lat: 51.408858}, {lng: -0.144702, lat: 51.408306}, {lng: -0.143836, lat: 51.406531}, {lng: -0.13962, lat: 51.405095}, {lng: -0.138526, lat: 51.40377400000001}, {lng: -0.136071, lat: 51.402626}, {lng: -0.132013, lat: 51.40243100000001}, {lng: -0.130293, lat: 51.401165}, {lng: -0.128241, lat: 51.40035}, {lng: -0.125925, lat: 51.398356}, {lng: -0.124779, lat: 51.39833800000001}, {lng: -0.12475, lat: 51.399055}, {lng: -0.124721, lat: 51.399772}, {lng: -0.122835, lat: 51.40000199999999}, {lng: -0.121764, lat: 51.400702}, {lng: -0.119053, lat: 51.400724}, {lng: -0.119015, lat: 51.401636}, {lng: -0.115676, lat: 51.401713}, {lng: -0.114391, lat: 51.40254}, {lng: -0.111787, lat: 51.402498}, {lng: -0.111167, lat: 51.40490100000001}, {lng: -0.113685, lat: 51.407028}, {lng: -0.116635, lat: 51.408836}, {lng: -0.116535, lat: 51.411247}, {lng: -0.111962, lat: 51.411948}, {lng: -0.107836, lat: 51.412346}, {lng: -0.105377, lat: 51.413253}, {lng: -0.103081, lat: 51.412976}, {lng: -0.09988900000000002, lat: 51.412058}, {lng: -0.095161, lat: 51.40924}, {lng: -0.091983, lat: 51.407986}, {lng: -0.09111300000000001, lat: 51.406721}, {lng: -0.09116300000000001, lat: 51.40552}, {lng: -0.091444, lat: 51.404322}, {lng: -0.09254499999999999, lat: 51.403715}, {lng: -0.09300799999999999, lat: 51.401846}, {lng: -0.09436799999999999, lat: 51.40057}, {lng: -0.09465200000000001, lat: 51.399276}, {lng: -0.092872, lat: 51.397708}, {lng: -0.09305199999999998, lat: 51.397086}, {lng: -0.091776, lat: 51.396343}, {lng: -0.091629, lat: 51.39432100000001}, {lng: -0.09220699999999998, lat: 51.393369}, {lng: -0.093157, lat: 51.39271099999999}, {lng: -0.093166, lat: 51.390643}, {lng: -0.09210900000000001, lat: 51.390193}, {lng: -0.092033, lat: 51.388316}, {lng: -0.091212, lat: 51.387725}, {lng: -0.08975, lat: 51.38775}, {lng: -0.08802400000000001, lat: 51.386759}, {lng: -0.085645, lat: 51.386673}, {lng: -0.07836600000000001, lat: 51.391603}, {lng: -0.077699, lat: 51.39284299999999}, {lng: -0.07677100000000001, lat: 51.392972}, {lng: -0.076025, lat: 51.392431}, {lng: -0.075006, lat: 51.391067}, {lng: -0.07362100000000001, lat: 51.389265}, {lng: -0.07364999999999999, lat: 51.388592}, {lng: -0.074422, lat: 51.388509}, {lng: -0.075083, lat: 51.387413}, {lng: -0.074903, lat: 51.386208}, {lng: -0.073087, lat: 51.385505}, {lng: -0.071355, lat: 51.384659}, {lng: -0.07049, lat: 51.385125}, {lng: -0.06908499999999999, lat: 51.385631}, {lng: -0.067011, lat: 51.385597}, {lng: -0.064481, lat: 51.385459}, {lng: -0.06354700000000001, lat: 51.385732}, {lng: -0.063829, lat: 51.386314}, {lng: -0.06466, lat: 51.386664}, {lng: -0.06461600000000001, lat: 51.38772199999999}, {lng: -0.06382500000000001, lat: 51.388238}, {lng: -0.062903, lat: 51.388222}, {lng: -0.06164799999999999, lat: 51.38882700000001}, {lng: -0.06053, lat: 51.389818}, {lng: -0.057616, lat: 51.395786}, {lng: -0.052514, lat: 51.393638}, {lng: -0.05054100000000001, lat: 51.39350199999999}, {lng: -0.04562399999999999, lat: 51.390894}, {lng: -0.042749, lat: 51.38873100000001}, {lng: -0.040773, lat: 51.38869800000001}, {lng: -0.039733, lat: 51.387959}, {lng: -0.038816, lat: 51.38820100000001}, {lng: -0.038634, lat: 51.388611}, {lng: -0.036417, lat: 51.388419}, {lng: -0.028726, lat: 51.37751200000001}, {lng: -0.027437, lat: 51.37682}, {lng: -0.026545, lat: 51.376496}, {lng: -0.026758, lat: 51.375365}, {lng: -0.025537, lat: 51.375035}, {lng: -0.025229, lat: 51.372606}, {lng: -0.023894, lat: 51.371088}, {lng: -0.023448, lat: 51.36613000000001}, {lng: -0.021813, lat: 51.363937}, {lng: -0.012421, lat: 51.35826000000001}, {lng: -0.003792, lat: 51.35213100000001}, {lng: 0.000688, lat: 51.34153499999999}, {lng: 0.000526, lat: 51.337825}, {lng: 0.005052, lat: 51.335891}, {lng: 0.012958, lat: 51.33596100000001}, {lng: 0.014166, lat: 51.333465}, {lng: 0.013091, lat: 51.330045}
    ];

   var worldCoords = [
              {lat: -85.1054596961173, lng: -180},
              {lat: 85.1054596961173, lng: -180},
              {lat: 85.1054596961173, lng: 180},
              {lat: -85.1054596961173, lng: 180},
              {lat: -85.1054596961173, lng: 0}
            ];
    var BromleyPolygon = new google.maps.Polygon({
         paths: BromleyCoords,
         strokeColor: '#FF0000',
         strokeOpacity: 0.8,
         strokeWeight: 0,
         fillColor: '#FF0000',
         fillOpacity: 0.35
       });

       var WestminsterPolygon = new google.maps.Polygon({
            paths:WestminsterCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          });

       var bermudaTriangle = new google.maps.Polygon({
   paths: [worldCoords,WestminsterPolygon.getPath(),BromleyPolygon.getPath()],
   strokeColor: '#FF0000',
   strokeOpacity: 0.8,
   strokeWeight: 0,
   fillColor: '#000000',
   fillOpacity: 0.35
 });


 google.maps.Polygon.prototype.getBounds = function() {
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
}
    this.grouponDeals = ko.observableArray([]); //initial list of deals
    this.filteredList = ko.observableArray([]); //list filtered by search keyword
    this.mapMarkers = ko.observableArray([]); //holds all map markers
    this.dealStatus = ko.observable('Searching for recent flags');
    this.searchStatus = ko.observable();
    this.searchLocation = ko.observable('Taipei');
    this.loadImg = ko.observable();
    this.numDeals = ko.computed(function() {
        return self.filteredList().length;
    });

    //Holds value for list togglings
    this.toggleSymbol = ko.observable('hide');


    //toggles the list view
    this.listToggle = function() {
        if (self.toggleSymbol() === 'hide') {
            self.toggleSymbol('show');
        } else {
            self.toggleSymbol('hide');
        }
    };

    //Error handling if Google Maps fails to load
    this.mapRequestTimeout = setTimeout(function() {
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
            zoom: 15,
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
        map.addListener('click', function(e) {
            firebase.database().ref().push({
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            });

            var marker = new google.maps.Marker({
                position: {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                }

            });
        });
        // Create a heatmap.
        /*var heatmap = new google.maps.visualization.HeatmapLayer({
          data: [],
          map: map,
          radius: 50
        });*/

        firebase.database().ref().on("child_added", function(snapshot, prevChildKey) {
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
        bermudaTriangle.setMap(map);

        map.fitBounds(BromleyPolygon.getBounds());

}
        google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });

        // Create and place markers and info windows on the map based on data from API
        //Manages the toggling of the list view, location centering, and search bar on a mobile device.

        this.mobileShow = ko.observable(false);
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

        //Re-center map to current city if you're viewing deals that are further away
        this.centerMap = function() {
            //  infowindow.close();
            var currCenter = map.getCenter();
            var cityCenter = new google.maps.LatLng(self.currentLat(), self.currentLng());
            if (cityCenter === currCenter) {
                self.searchStatus('Map is already centered.');
            } else {
                self.searchStatus('');
                map.panTo(cityCenter);
                map.setZoom(20);
            }
        };

        mapInitialize();
    }

    //custom binding highlights the search text on focus

    ko.bindingHandlers.selectOnFocus = {
        update: function(element) {
            ko.utils.registerEventHandler(element, 'focus', function(e) {
                element.select();
            });
        }
    };

    ko.applyBindings(new appViewModel());
