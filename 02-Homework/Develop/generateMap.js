//Display location of the user
//This is refered to google map documentations https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/tutorial , https://developers.google.com/places/web-service/search

function generateMap (latitude, longtitude) {
    return  `<!DOCTYPE html>
    <html>
      <head>
        <title>Simple Map</title>
        <meta name="viewport" content="initial-scale=1.0">
        <meta charset="utf-8">
        <style>
          /* Always set the map height explicitly to define the size of the div
           * element that contains the map. */
          #map {
            height: 100%;
          }
          /* Optional: Makes the sample page fill the window. */
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map;
          function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: ${latitude}, lng: ${longtitude}},
              zoom: 14
            });
            var marker = new google.maps.Marker({
                position: {lat: ${latitude}, lng: ${longtitude}},
                map: map
              });
          }
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBo0ZfFj1umWDURDypJtkiLA4cVinSFnrk&callback=initMap"
        async defer></script>
      </body>
    </html>`;
}
module.exports = generateMap;