import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "./Button";

import { List, ListItem } from "./List";

const Bar = styled.aside`
  height: 100vh;
  overflow-y: scroll;
  background: #f7f4f3;
  padding: 10px;
  @media (max-width: 700px) {
    height: 400px;
  }
`;

class Navigation extends Component {
  state = {
    locations: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.markers !== this.props.markers) {
      this.setState({ locations: nextProps.markers });
    }
  }

  render() {
    const { openInfoWindow } = this.props;
    const { locations } = this.state;

    return (
      <Bar>
        <h2 tabIndex="1">Sightseeing in Gdynia</h2>

        <Button
          onClick={this.props.showMarkers}
          aria-label="Show all markers"
          tabIndex="1"
        >
          Show places
        </Button>
        <Button
          onClick={this.props.hideMarkers}
          aria-label="Hide all markers"
          tabIndex="1"
        >
          Hide places
        </Button>
       
        <List role="list" aria-label="City places" tabIndex="1">
          {locations.map((marker, index) => (
            <ListItem
              tabIndex="1"
              role="listitem"
              key={index}
              onClick={() => openInfoWindow(marker)}
            >
              {marker.title}
            </ListItem>
          ))}
        </List>
      </Bar>
    );
  }
}

export default Navigation;