console.log("map.js");

let myCoord = [-38.011083, -57.541015];

let myMap = L.map("myMap").setView(myCoord, 13);

let tile = `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;

// let tile2 = `https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png`;

let tile3 = `https://{s}.tile-cyclosm.openstreetmap.fr/[cyclosm|cyclosm-lite]/{z}/{x}/{y}.png`;

let tile4 = `https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png`;

L.tileLayer(tile, {
	maxZoom: 18,
	attribution: "© OpenStreetMap",
}).addTo(myMap);

var gpx = "./maps/map01.gpx"; // URL to your GPX file or the GPX itself
new L.GPX(gpx, { async: true })
	.on("loaded", function (e) {
		e.target.getBounds();
	})
	.addTo(myMap);

let elevations = new L.GPX(gpx, { async: true }).on("loaded", function (e) {
	return e.target.get_elevation_data();
});

console.log(elevations._info.elevation._points);

let marker = L.marker(myCoord).addTo(myMap);

// let iconMarker = L.icon({
// 	// iconUrl: "marker.png",
// 	iconSize: [60, 60],
// 	iconAnchor: [30, 60],
// });

let marker2 = L.marker(myCoord).addTo(myMap);

myMap.doubleClickZoom.disable();
myMap.on("dblclick", (e) => {
	let latLng = myMap.mouseEventToLatLng(e.originalEvent);

	L.marker([latLng.lat, latLng.lng]).addTo(myMap);
});

navigator.geolocation.getCurrentPosition(
	(pos) => {
		const { coords } = pos;
		const { latitude, longitude } = coords;
		L.marker([latitude, longitude]).addTo(myMap);

		setTimeout(() => {
			myMap.panTo(new L.LatLng(latitude, longitude));
		}, 5000);
	},
	(error) => {
		console.log(error);
	},
	{
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	}
);
