console.log("map.js");

let myCoord = [-37.88838, -57.84431];

let myMap = L.map("myMap").setView(myCoord, 13);

let tile = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;

// let tile2 = `https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png`;

let tile3 = `https://{s}.tile-cyclosm.openstreetmap.fr/[cyclosm|cyclosm-lite]/{z}/{x}/{y}.png`;

let tile4 = `https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png`;

L.tileLayer(tile, {
	maxZoom: 18,
}).addTo(myMap);

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
