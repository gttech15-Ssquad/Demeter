// drawPlugin.ts
declare const L: any // Declare L globally
import "leaflet-draw" // Import leaflet-draw for polygon functionality

export function drawPlugin(map: any) {
	const drawnItems = L.featureGroup().addTo(map)

	const drawControl = new L.Control.Draw({
		edit: {
			featureGroup: drawnItems,
		},
		draw: {
			polygon: false, // Disable polygon drawing
			polyline: false, // Disable polyline drawing
			marker: false, // Disable marker drawing
			circlemarker: false, // Disable circlemarker drawing
		},
	})
	map.addControl(drawControl)

	// Event listener for when drawing is created
	map.on(L.Draw.Event.CREATED, function (event: any) {
		const layer = event.layer
		drawnItems.addLayer(layer)
	})
}
