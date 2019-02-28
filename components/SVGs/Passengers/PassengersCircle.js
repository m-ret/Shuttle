import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Svg } from 'expo';

import { countBy, property } from 'lodash';

import { compose } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation'; // Check this file first before applying any changes
import PassengerAvatar from './PassengerAvatar';

import Constants from './Constants';

let passengersGoingNorth;
let passengersGoingEast;
let passengersGoingSouth;
let passengersGoingWest;
let passengersGoingNorthPickup;
let passengersGoingEastPickup;
let passengersGoingSouthPickup;
let passengersGoingWestPickup;

class PassengersCircle extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  callFilter = (dropff, pickup) => {
    ({
      North: passengersGoingNorth,
      South: passengersGoingSouth,
      West: passengersGoingWest,
      East: passengersGoingEast,
    } = countBy(dropff, property('cardinalpoint')));

    ({
      North: passengersGoingNorthPickup,
      South: passengersGoingSouthPickup,
      West: passengersGoingWestPickup,
      East: passengersGoingEastPickup,
    } = countBy(pickup, property('cardinalpoint')));
  };

  setFilters = () => {
    const {
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;

    this.callFilter(unassignedDropOffPassengers, unassignedPickUpPassengers);
  };

  setOpacity = passengersLength => (passengersLength ? '1' : '0.459');

  render() {
    const { navigationStore, fill } = this.props;
    this.setFilters();
    return (
      <View>
        <Svg
          width="320"
          height="340"
          viewBox="0 0 290 340"
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg.G fill="none" fillRule="evenodd">
            <Svg.Ellipse
              cx="141"
              cy="162.5"
              fill="#FFF"
              stroke="#979797"
              strokeWidth="7"
              opacity="0.041"
              rx="111"
              ry="111.5"
            />
            <PassengerAvatar
              fill={fill}
              callFunction={() =>
                navigationStore.index
                  ? Alert.alert('PICKUP:', 'passengersGoingNorth')
                  : Alert.alert('DROPOFF:', 'passengersGoingNorth')
              }
              opacity={
                !navigationStore.index
                  ? this.setOpacity(passengersGoingNorth)
                  : this.setOpacity(passengersGoingNorthPickup)
              }
              numberOfPassengers={
                navigationStore.index
                  ? passengersGoingNorthPickup
                  : passengersGoingNorth
              }
              cardinalPoint="NORTH"
              d1={Constants.d1N}
              d2={Constants.d2N}
              transform1={Constants.transform1N}
              transform2={Constants.transform2N}
              x="-3.5"
              y="99.731"
            />

            <PassengerAvatar
              fill={fill}
              callFunction={() =>
                navigationStore.index
                  ? Alert.alert('PICKUP:', 'passengersGoingSouth')
                  : Alert.alert('DROPOFF:', 'passengersGoingSouth')
              }
              opacity={
                !navigationStore.index
                  ? this.setOpacity(passengersGoingSouth)
                  : this.setOpacity(passengersGoingSouthPickup)
              }
              numberOfPassengers={
                navigationStore.index
                  ? passengersGoingSouthPickup
                  : passengersGoingSouth
              }
              cardinalPoint="SOUTH"
              d1={Constants.d1S}
              d2={Constants.d2S}
              transform1={Constants.transform1S}
              transform2={Constants.transform2S}
              x="-3.5"
              y="99.731"
            />

            <PassengerAvatar
              fill={fill}
              callFunction={() =>
                navigationStore.index
                  ? Alert.alert('PICKUP:', 'passengersGoingEast')
                  : Alert.alert('DROPOFF:', 'passengersGoingEast')
              }
              opacity={
                !navigationStore.index
                  ? this.setOpacity(passengersGoingEast)
                  : this.setOpacity(passengersGoingEastPickup)
              }
              numberOfPassengers={
                navigationStore.index
                  ? passengersGoingEastPickup
                  : passengersGoingEast
              }
              cardinalPoint="EAST"
              d1={Constants.d1E}
              d2={Constants.d2E}
              transform1={Constants.transform1E}
              transform2={Constants.transform2E}
              x="13"
              y="99.731"
            />

            <PassengerAvatar
              fill={fill}
              callFunction={() =>
                navigationStore.index
                  ? Alert.alert('PICKUP:', 'passengersGoingWest')
                  : Alert.alert('DROPOFF:', 'passengersGoingWest')
              }
              opacity={
                !navigationStore.index
                  ? this.setOpacity(passengersGoingWest)
                  : this.setOpacity(passengersGoingWestPickup)
              }
              numberOfPassengers={
                navigationStore.index
                  ? passengersGoingWestPickup
                  : passengersGoingWest
              }
              cardinalPoint="WEST"
              d1={Constants.d1W}
              d2={Constants.d2W}
              transform1={Constants.transform1W}
              transform2={Constants.transform2W}
              x="4"
              y="99.731"
            />
          </Svg.G>
        </Svg>
      </View>
    );
  }
}

PassengersCircle.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  fill: PropTypes.oneOfType([PropTypes.string]).isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(store => ({
    tabColor: store.homeScreen.tabColor,
    navigationStore: store.homeScreen.navigation,
    unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
    unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
  })),
)(withNavigation(PassengersCircle));
