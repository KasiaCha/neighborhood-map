import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import MapInfo from "./MapInfo";

class Map extends Component {
  render() {
    return (
      <MapInfo
        google={this.props.google}
        locations={this.props.locations}
      />
    );
  }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDaZ0fP4DZjoR3k1ndicPIUEnj4cG_XdF0"
})(Map);