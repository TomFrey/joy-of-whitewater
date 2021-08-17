let map;

function initMap() {
    let marker;
    const markerIcon = {
        url: '/assets/images/icon/googleMapsMarker.svg',
        scaledSize: new google.maps.Size(70, 70)
      };
    const mapDomElement = document.getElementById('map');
    const infoWindow = new google.maps.InfoWindow();

    // Sonst kommt es zu Fehlern auf Seiten, die keine Map verwenden.
    if (mapDomElement !== null) {
        const longitude = parseFloat(mapDomElement.getAttribute('longitude'));
		const latitude = parseFloat(mapDomElement.getAttribute('latitude'));

        map = new google.maps.Map(mapDomElement, {
            center: { lat: latitude, lng: longitude },
            zoom: 11,
        });

        marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
			position: { lat: latitude, lng: longitude },
			icon: markerIcon,
			map,
            title: 'Kanuschule - The Joy Of Whitewater'
		});

        marker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
        });
    }

 
}