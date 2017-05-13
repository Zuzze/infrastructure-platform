  // Note: This example requires that you consent to location sharing when
  // prompted by your browser. If you see the error "The Geolocation service
  // failed.", it means you probably did not give permission for the browser to
  // locate you.
  var pos; //current pos 60.1700831,24.8056837 (Business school)
  var map;
  var selectedType = 'Fault'
  var iconBase = 'http://maps.google.com/mapfiles/kml/pal3';
  var iconPath;
  var description;
  var icons = {
    attention: {
      icon: 'img/flat/map-warning.png'
    },
    suggestion: {
      icon: 'img/flat/map-idea.png'
    },
    fault: {
      icon: 'img/flat/map-blocked.png'
    }
  };


//===================== 1. MAP FUNCTIONS ======================
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      // center: {lat: 60.2045577, lng: 24.6568111}, Espoo
      center: {
        lat: 60.171865,
        lng: 24.923146
      }, //Runeberginkatu 14-16

      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      zoomControl: true,
      streetViewControl: true,
      styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
        });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //add marker to current location
        var marker = new google.maps.Marker({
          position: pos,
          icon: 'img/location.png',
          map: map
        });
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
      pos = {
        // lat: 60.2045577,
        // lng: 24.6568111
        lat: 60.171865,
        lng: 24.923146
      };
    }
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    //init existing problems
    var features = [{
      position: new google.maps.LatLng(60.17038, 24.938442),
      type: 'fault'
    }, {
      position: new google.maps.LatLng(60.1870101, 24.8193514),
      type: 'suggestion'
    }, {
      position: new google.maps.LatLng(60.1718263, 24.9207661),
      type: 'attention'
    }];
    // Create markers
    features.forEach(function(feature) {
      var marker = new google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map
      });

      var iconPath;
      var description;
      var picPath;
      if (feature.type == 'fault') {
        iconPath = 'img/flat/map-blocked.png';
        description = "Road blocked due to construction site";
        picPath = 'img/blocked.png';
      } else if (feature.type == 'attention') {
        iconPath = 'img/flat/map-warning.png';
        description = "Unclear traffic rules due to detour, be careful";
        picPath = 'img/attention.png';
      } else {
        iconPath = 'img/flat/map-idea.png';
        description = "Add safe bike park here";
        picPath = 'http://www.kulkulaari.fi/sites/default/files/picture_416.jpg';
      }

      var contentString = '<div align="center" id="content" style="max-width: 150px;">' +
        '<h2>' + feature.type + '</h2>' +
        '<div id="siteNotice">' +
        '<img src=' + picPath + ' alt="picture" style="max-width: 130px;">' +
        '</div>' +
        '<div id="bodyContent">' +
        '<p>' + description + '</p>' +
        '<br><small>Reported 1 hour ago</small><br>' +
        '<img src="https://freeiconshop.com/wp-content/uploads/edd/like-flat.png" alt="picture" style="width: 35px;"><br> 7 likes' +
        '<br><a href="report-description.html" style="font-size: 0.9em;" align="right"></a>' +
        //'See more...</a>' +
        '</div>' +
        '</div>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  }


  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'No location found, please turn GPS on' :
      'Error: Your browser doesn\'t support geolocation.');
  }

  function updateType(type) {
    selectedType = type;
    console.log(document);
    console.log(type);
  }

  // Create marker for new problem
  function addProblem() {
    //add marker to the map
    var iconPath;
    var description;
    var picPath;

    //"Other" type will not be marked on the map
    if (selectedType !== 'Other') {
      if (selectedType == 'Fault') {
        iconPath = 'img/flat/map-blocked.png';
        description = "Road blocked due to construction site";
        picPath = 'img/blocked.png';
      } else if (selectedType == 'Attention') {
        iconPath = 'img/flat/map-warning.png';
        description = "Unclear traffic rules due to detour, be careful";
        picPath = 'img/attention.png';
      } else if (selectedType == 'Suggestion') {
        iconPath = 'img/flat/map-idea.png';
        description = "Add safe bike park here";
        picPath = 'http://www.kulkulaari.fi/sites/default/files/picture_416.jpg';
      }
      console.log("icon path " + iconPath);
      console.log("report type: " + selectedType);
      var marker = new google.maps.Marker({
        position: pos,
        icon: iconPath,
        map: map,
        title: selectedType
      });

      //add info window to problem
      var contentString = '<div align="center" id="content" style="max-width: 150px;">' +
      '<h2>' + selectedType + '</h2>' +
      '<div id="siteNotice">' +
      '<img src=' + picPath + ' alt="picture" style="max-width: 130px;">' +
      '</div>' +
      '<div id="bodyContent">' +
      '<p>' + description + '</p>' +
      '<br><small>Reported 1 minute ago</small><br>' +
      '<img src="https://freeiconshop.com/wp-content/uploads/edd/like-flat.png" alt="picture" style="width: 35px;"><br> 7 likes' +
      '<br><a href="report-description.html" style="font-size: 0.9em;" align="right">' +
      'See more...</a>' +
      '</div>' +
      '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      console.log(marker);
    }
    //For all markers, also for "other type"
    console.log("problem added");
    showNotification();
    document.getElementById('report').style.display = 'none';
    document.getElementById('map-container').style.display = 'block';
    document.getElementById('filter').style.display = 'block';
  }

  function showNotification() {

    var x = document.getElementById("snackbar")
    x.style.display = 'block';
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  function showReportInfo(marker, type) {
    var reportPosition = marker.position;
    var infoWindow = new google.maps.InfoWindow({
      map: map
    });
    /*google.maps.event.addListener(marker, 'click', function() {
      console.log(marker.get('id'));
    });
    */
    infoWindow.setPosition(pos);
    var contentString = '<div align="center" id="content" style="max-width: 300px;">' +
      '<h2>' + type + '</h2>' +
      '<div id="siteNotice">' +
      '<img src="img/blocked.png" alt="picture" style="max-width: 130px;">' +
      '</div>' +
      '<div id="bodyContent">' +
      '<p>Road blocked due to Construction site</p>' +
      '<br><small>Reported 1 minute ago</small><br>' +
      '<img src="https://freeiconshop.com/wp-content/uploads/edd/like-flat.png" alt="picture" style="width: 35px;"><br> 7 likes' +
      '<br><a href="report-description.html" style="font-size: 0.9em;" align="right">' +
      'See more...</a>' +
      '</div>' +
      '</div>';
    infoWindow.setContent(contentString);

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    console.log(marker);
    console.log("show info");
  }

  function takePicture() {
    document.getElementById("picture-status").style.visibility = 'visible';
    document.getElementById("delete-pic").style.visibility = 'visible';
    console.log("picture taken");
  }

  function removePicture() {
    document.getElementById("picture-status").style.visibility = 'hidden';
    document.getElementById("delete-pic").style.visibility = 'hidden';
    console.log("picture removed");
  }

  function showReportView() {
    document.getElementById("report").style.display = 'block';
    document.getElementById("map-container").style.display = 'none';
    document.getElementById("snackbar").style.display = 'none';
    document.getElementById("pageTitle").innerHTML = "Send Feedback";
    document.getElementById("filter").style.display = "none";
    document.getElementById("mySidenav").style.display = "none";
  }

  function showNews(){
    document.getElementById("news").style.display = 'block';
    document.getElementById("ranking").style.display = 'none';
    document.getElementById("filter").style.display = "block";
  }

  function showRanking(){
    document.getElementById("news").style.display = 'none';
    document.getElementById("ranking").style.display = 'block';
  }

  function like(button) {
    var currentLikes = parseInt(button.getElementsByTagName('span')[0].innerHTML);
    console.log("current likes: " + currentLikes);
    var newLikes;
    //liked
    if(button.style.background == "rgb(45, 188, 139)"){
      button.style.background = "#0151BC";
      newLikes = currentLikes - 1;
      button.innerHTML = "<span class='like-counter'>"+ newLikes + "  </span><i class='fa fa-thumbs-up'></i>  Upvote";
    } else {
      //not liked yet
      button.style.background = "#2DBC8B";
      newLikes = currentLikes + 1;
      document.getElementsByClassName("like-counter").innerHTML = "22";
      button.innerHTML = "<span class='like-counter'>"+ newLikes + "  </span><i class='fa fa-thumbs-up'></i>  Upvoted";
    }
  }

  function openReportView(){
    window.location.href = "index.html";
    document.getElementById("report").style.display = 'block';
    document.getElementById("map-container").style.display = 'none';
    document.getElementById("snackbar").style.display = 'none';
    document.getElementById("pageTitle").innerHTML = "Send Feedback";
    window.location.href = "#report";
  }

  /*SIDE NAVIGATION*/
  function openNav() {
    document.getElementById("mySidenav").style.display = "block";
      document.getElementById("mySidenav").style.width = "250px";
  }

  function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
  }
  //================== GENERAL FUNCTIONS ==========================
