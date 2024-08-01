// eslint-disable-next-line no-unused-vars
const GoogleMaps = (function () {

    const mapDomElement = document.getElementById('map');


    async function putGoogleMapScriptIntoHtml() {
        if (mapDomElement !== null) {
            try {
                const script = document.createElement('script');
                script.innerText = '(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});' +
                                'var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));' +
                                'e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);' + 
                                'a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));' + 
                                'a.nonce=m.querySelector("script[nonce]")?.nonce||"";' + 
                                'm.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})(' +
                                '{' +
                                ' key: "googleMapsApiKeyReplacedWithGulp", ' +
                                '});';

                document.body.appendChild(script);
            } catch (error) {
                console.error('Fehler beim Laden der Konfigurationsdatei oder beim Hinzufügen des Google Maps API-Skripts:', error);
            }
        }
    }


	async function setMap()	{
        let map;
        const { Map } = await google.maps.importLibrary('maps');
        const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
        const { PinElement } = await google.maps.importLibrary('marker');
        const {InfoWindow} = await google.maps.importLibrary("maps")
        const infoWindowContent =  '<div style="border: 2px solid #00B1E5; padding: 4px; border-radius: 8px;">' +
                                        '<h1 style="margin-bottom: 8px; text-align: center;">Die Kanuschule am Vorderrhein</h1>' +
                                        '<div>' +
                                            "<p><b>The Joy Of Whitewater</b>, die Kanuschule, direkt am Vorderrhein gelegen. " +
                                                "Individuelle Kajak -, Kanadier - und Packraft - Kurse. In einem sicheren Umfeld wirst du kompetent " +
                                                "unterrichtet. Die Freude steht im Vordergrund, dann ist lernen einfach." +
                                            "</p>" +
                                        "</div>" +
                                    "</div>";

        const glyphImg = document.createElement('img');
        glyphImg.src = '/assets/images/icon/Spirale.svg';

        const pin = new PinElement({
            background: '#ffffff',
            borderColor: '#00B1E5',
            scale: 1.5,
            glyph: glyphImg,
        });

        const infoWindow = new InfoWindow({
            content: infoWindowContent
        });
    
        // Sonst kommt es zu Fehlern auf Seiten, die keine Map verwenden.
        if (mapDomElement !== null) {
            const longitude = parseFloat(mapDomElement.getAttribute('longitude'));
            const latitude = parseFloat(mapDomElement.getAttribute('latitude'));
    
            map = new Map(mapDomElement, {
                center: { lat: latitude, lng: longitude },
                zoom: 11,
                mapId: '6432480babd2c364'
            });
    
            const marker = new AdvancedMarkerElement({
                position: { lat: latitude, lng: longitude },
                content: pin.element,
                map,
                title: 'Kanuschule - The Joy Of Whitewater'
            });
    
            marker.addListener("click", () => {
                if(infoWindow.isOpen){
                    infoWindow.close();
                } else {
                    infoWindow.open({
                        anchor: marker,
                        map,
                    });
                }
            });
        }
	}


    async function initMap(){
        if (mapDomElement !== null) {
            await putGoogleMapScriptIntoHtml();
            setMap();
        }
    }


	// public api
	return {
		init: initMap
	};
})();
