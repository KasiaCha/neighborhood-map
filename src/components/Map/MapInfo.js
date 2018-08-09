import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { mapStyle, cityPlaces } from "../../vis/visualisation";
import axios from "axios";
import Navigation from "../Navigation";

const Bar = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  font-family: 'Baloo Bhaijaan', cursive;
  font-size: 20px;
  color: #696969;
  
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const MapDiv = styled.div`
  width: 100%;
  height: 100vh;
`;

class MapInfo extends Component {
  state = {
    locations: cityPlaces,
    defaultMapZoom: 13,
    center: {
      lat: 54.51889,
      lng: 18.530541
    },
   
    iconSize: 35,
    mapTypeControl: false,
    markers: [],
    infoWindow: "",
    markerDetails: {
      name: null,
      address: null,
      url: null,
      img: null,
      rating: null
    }
  };

  componentDidMount() {
    this.loadMap();
  }

  // Loading a Google map
   
  loadMap = () => {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const { defaultMapZoom, center } = this.state;

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: defaultMapZoom,
          styles: mapStyle
        }
      );

      // Create infoWindow
      const infoWindow = new google.maps.InfoWindow({ maxWidth: 200 });
      this.setState({ infoWindow: infoWindow });

      // Create a new Google map on the specified configuration set above
      this.map = new maps.Map(node, mapConfig);

      this.addMarkers();
    }
  };

     // Add markers to a map from state
   
     addMarkers = () => {
      const { google } = this.props;
      const { iconSize, locations } = this.state;
      const markers = [];

    // Create 2 markers with different colours
    const yellowIcon = {
      url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      size: new google.maps.Size(iconSize, iconSize),
      scaledSize: new google.maps.Size(iconSize, iconSize)
    };

    const blueIcon = {
      url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      size: new google.maps.Size(iconSize, iconSize),
      scaledSize: new google.maps.Size(iconSize, iconSize)
    };
    // Start markers
    locations.forEach((location, index) => {
      const marker = new google.maps.Marker({
        map: this.map,
        position: { lat: location.location.lat, lng: location.location.lng },
        title: location.name,
        animation: google.maps.Animation.DROP,
        id: index,
        icon: yellowIcon,
        anchorPoint: new google.maps.Point(0, -30)
      });

      // Push the markers to array of markers
      markers.push(marker);

      marker.addListener("click", () => {
        this.openInfoWindow(marker);
      });

      // Change colour of clicking marker
      marker.addListener('mouseover', function() {
        this.setIcon(blueIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(yellowIcon);
      });
    });

    // Set up the markers state
    this.setState({ markers });
  };

   // Open infoWindow for the marker
   openInfoWindow = marker => {
    const { map } = this;
    const { infoWindow } = this.state;
    
    // Check if the infoWindow is not already opened for this marker
    if (infoWindow.marker !== marker) {
      infoWindow.marker = marker;
      infoWindow.setContent(`We can't load more information now. Check it later.`);
      infoWindow.open(this.map, marker);

      // Clear the marker property when it is closed
      infoWindow.addListener("closeclick", () => {
        infoWindow.setMarker = null;
      });
    }

    this.getMarkerDetails(marker);

    // Center map to a marker position
    map.panTo(marker.getPosition());
  };

   // Hide all markers from map
   
   hideMarkers = () => {
    const { markers } = this.state;

    markers.forEach(marker => {
      marker.setMap(null);
    });
  };

  // Show all markers on the map
  
  showMarkers = () => {
    const { markers } = this.state;

    markers.forEach(marker => {
      marker.setMap(this.map);
    });
  };

  updateMarkers = markers => {
    this.setState({ markers });
  };

  // Information from Foursquare API
   
  getMarkerDetails = marker => {
    const clientId = "AWMOXJS4RHDOOSJJLFW34QCNCYY4JLCYUTQFLDHIFRV3WUBL"; // my client ID
    const clientSecret = "4QSTBLC3P4SM5IFRHNIK5EW135TBTDAGRZSLXYT5NAH0QMIR"; // my Client Secret
    const { infoWindow } = this.state;

    // Venues Search
    axios
      .get("https://api.foursquare.com/v2/venues/search", {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          ll: `${marker.getPosition().lat()},${marker.getPosition().lng()}`,
          v: "20180323",
          query: marker.title,
          limit: 1
        }
      })
      .then(res => {
        const venueId = res.data.response.venues[0].id;

        return axios.get(`https://api.foursquare.com/v2/venues/${venueId}`, {
          params: {
            client_id: clientId,
            client_secret: clientSecret,
            v: "20180323"
          }
        });
      })
      .then(res => {
        // Set variables and update the state
        const { venue } = res.data.response;
        const name = venue.name;
        const address = venue.location.formattedAddress.join(", ");
        const url = venue.url;
        const img = `${venue.bestPhoto.prefix}200x200${venue.bestPhoto.suffix}`;
        const rating = venue.rating;

        this.setState({
          markerDetails: {
            name,
            address,
            url,
            img,
            rating
          }
        });
      })
      .then(res => {
        // Take details from state and create content for infoWindow
        const {
          name,
          address,
          url,
          img,
          rating
        } = this.state.markerDetails;

       
        const urlField =
          url !== undefined ? `<a href=${url} target="_blank">${url}</a>` : "";
        const ratingField =
          rating !== undefined
            ? `<span><b>${rating}</b></span>`
            : "not available";
        const imgField =
          img !== undefined ? `<img src=${img} alt=${name} />` : "";

        const content = `
          <div style="width: 100%;">
            <h2>${name}</h2>
            <p>${address}</p>
            <p>${urlField}</p>
            <p>Rating: ${ratingField}</p>
            <div style='width: 90%; text-align: center'>${imgField}</div>   
        `;

        // Set the infoWindow content
        infoWindow.setContent(content);
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  // Close the InfoWindow
   closeInfoWindow = () => {
    this.state.infoWindow.close();
  };
  
  render() {
    const { markers, locations } = this.state;

    return (
      <Bar>
        <Navigation
          locations={locations}
          markers={markers}
          showMarkers={this.showMarkers}
          hideMarkers={this.hideMarkers}
          openInfoWindow={this.openInfoWindow}
          closeInfoWindow={this.closeInfoWindow}
          searchLocations={this.searchLocations}
        />
        <MapDiv role="application" ref="map">
          loading map...
        </MapDiv>
      </Bar>
    );
  }
}

export default MapInfo;