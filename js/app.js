function appViewModel() {
  var self = this;
  var map, city, infowindow;
  var grouponLocations = [];
  var grouponReadableNames = [];

  this.grouponDeals = ko.observableArray([]);
  this.mapMarkers = ko.observableArray([]);
  this.searchStatus = ko.observable('Searching for deals nearby...');
  this.searchLocation = ko.observable('washington-dc');


  this.goToMarker = function(clickedDeal) {
    var clickedDealName = clickedDeal.dealName;
    for(var key in self.mapMarkers()) {
      if(clickedDealName === self.mapMarkers()[key].marker.title) {
        map.panTo(self.mapMarkers()[key].marker.position);
        infowindow.setContent(self.mapMarkers()[key].content);
        infowindow.open(map, self.mapMarkers()[key].marker);
      }
    }
  };

  this.processSearch = function() {
    var newAddress = self.searchLocation();
    var newGrouponId;
    console.log(grouponReadableNames);
    for(var i = 0; i < 171; i++) {
      var name = grouponLocations.divisions[i].name;
      if(newAddress == name) {
        newGrouponId = grouponLocations.divisions[i].id;
      }
    }
    console.log(newGrouponId);
  };

// Initialize Google map
  function mapInitialize() {
    city = new google.maps.LatLng(38.906830, -77.038599);
    map = new google.maps.Map(document.getElementById('map-canvas'), {
          center: city,
          zoom: 14
        });
    infowindow = new google.maps.InfoWindow({maxWidth: 400});
    getGroupons(self.searchLocation());
    getGrouponLocations();
  }

// Use API to get deal data and store the info as objects in an array
  function getGroupons(location) {
    var grouponUrl = "https://partner-api.groupon.com/deals.json?tsToken=US_AFF_0_203644_212556_0&filters=category:food-and-drink&offset=0&radius=10&limit=20&division_id=";

    var divId = location;

    $.ajax({
      url: grouponUrl + divId,
      dataType: 'jsonp',
      success: function(data) {
        self.searchStatus('Deals found!');
        console.log(data);
        for(var i = 0; i < 20; i++) {
          var venueLocation = data.deals[i].options[0].redemptionLocations[0];
            if (venueLocation === undefined) continue;
          var venueName = data.deals[i].merchant.name;
              venueLat = venueLocation.lat,
              venueLon = venueLocation.lng,
              gLink = data.deals[i].dealUrl,
              gImg = data.deals[i].mediumImageUrl,
              blurb = data.deals[i].pitchHtml,
              address = venueLocation.streetAddress1,
              city = venueLocation.city,
              state = venueLocation.state,
              zip = venueLocation.postalCode,
              shortBlurb = data.deals[i].announcementTitle,
              tags = data.deals[i].tags;

          self.grouponDeals.push({
            dealName: venueName, 
            dealLat: venueLat, 
            dealLon: venueLon, 
            dealLink: gLink, 
            dealImg: gImg, 
            dealBlurb: blurb,
            dealAddress: address + "<br>" + city + ", " + state + " " + zip,
            dealShortBlurb: shortBlurb,
            dealTags: tags
          });
        }
        mapMarkers(self.grouponDeals());
      },
      error: function() {
        self.searchStatus('Oops, something went wrong, please try again.');
      }
    });
  }

// Create and place markers and info windows on the map based on data from API
  function mapMarkers(array) {
    $.each(array, function(index, value) {
      var latitude = array[index].dealLat;
      var longitude = array[index].dealLon;
      var geoLoc = new google.maps.LatLng(latitude, longitude);
      var thisRestaurant = array[index].dealName;

      var contentString = '<div id="infowindow">' +
      '<img src="' + array[index].dealImg + '">' +
      '<h2>' + array[index].dealName + '</h2>' +
      '<p>' + array[index].dealAddress + '</p>' +
      '<p><a href="' + array[index].dealLink + '" target="_blank">Click to view deal</a></p>' +
      '<p>' + array[index].dealBlurb + '</p></div>';

      var marker = new google.maps.Marker({
        position: geoLoc,
        title: thisRestaurant,
        map: map
      });

      self.mapMarkers.push({marker: marker, content: contentString});

      google.maps.event.addListener(marker, 'click', function() {
         infowindow.setContent(contentString);
         infowindow.open(map, marker);
         console.log(self.grouponDeals());
         console.log(self.mapMarkers());
         console.log(grouponLocations);
       });
    });
  }

// Groupon's deal locations have a separate ID than the human-readable name (eg washington-dc instead of Washington, DC). This ajax call uses the Groupon Division API to pull a list of IDs and their corresponding names to use in the search bar.

  function getGrouponLocations() {
    $.ajax({
      url: 'https://partner-api.groupon.com/division.json',
      dataType: 'jsonp',
      success: function(data) {
        grouponLocations = data;
        for(var i = 0; i < 171; i++) {
          var readableName = data.divisions[i].name;
          grouponReadableNames.push(readableName);
        }

        // $('#autocomplete').autocomplete({
        //   lookup: namesArray
        // });

        // var namesArray = $.map(grouponReadableNames, function (value, key) { return { value: value, data: key }; });
      }
    });
  }



  mapInitialize();


}


ko.applyBindings(new appViewModel());