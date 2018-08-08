export const cityPlaces = [
    {name: 'Orłowski Cliff', location: {lat: 54.485316, lng: 18.56885}},
    {name: 'Molo Orłowskie', location: {lat: 54.479943, lng: 18.565404}},
    {name: 'Skwer Kościuszki', location: {lat: 54.519488, lng: 18.546301}},
    {name: 'Muzeum Emigracji w Gdyni', location: {lat: 54.533186, lng: 18.54981}},
    {name: 'Dar Pomorza', location: {lat: 54.519474, lng: 18.552819}},
    {name: 'Punkt widokowy na Kamiennej Górze', location: {lat: 54.511387, lng: 18.54726}},
    {name: 'Plaża Gdynia Śródmieście', location: {lat: 54.51568, lng: 18.55036}},
    {name: 'Błyskawica Destroyer', location: {lat: 54.519561, lng: 18.551176}},
    {name: 'Bulwar Nadmorski', location: {lat: 54.510859, lng: 18.552373}}

];

// https://snazzymaps.com/style/61/blue-essence

export const mapStyle = [
{
"featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dcdcd"
            }
        ]
    }
];

