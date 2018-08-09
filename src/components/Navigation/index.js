import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Search } from "./Search";

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
  searchLocations = e => {
    const { value } = e.target;
    const { markers, closeInfoWindow } = this.props;

    // Close info window before starting to search
    closeInfoWindow();

    const filteredLocations = markers.filter(location => {
      // Regular expression to match the value
      // ig = i is for ignore case. g is for global.
      const matching = new RegExp(value, "ig");
      if (location.title.match(matching)) {
        location.setVisible(true);
      } else {
        location.setVisible(false);
      }

      return location.title.match(matching);
    });

    // Update locations state with filtered locations
    this.setState({ locations: filteredLocations });
  };

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
        <Search
          type="text"
          placeholder="Search"
          onChange={this.searchLocations}
          aria-label="Search places"
          tabIndex="1"
        />
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