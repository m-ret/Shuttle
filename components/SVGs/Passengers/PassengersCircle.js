import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Svg } from 'expo';

import { countBy, property } from 'lodash';

import { compose } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import PassengerAvatar from './PassengerAvatar';

import Constants from './Constants'; // Check this file first before applying any changes

let passengersGoingNorth;
let passengersGoingEast;
let passengersGoingSouth;
let passengersGoingWest;
let passengersGoingNorthPickup;
let passengersGoingEastPickup;
let passengersGoingSouthPickup;
let passengersGoingWestPickup;

const dropOffTab = '#ff5252';
const pickupTab = '#3DA7DC';

class PassengersCircle extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  callFilter = () => {
    const { passengersData } = this.props;
    ({
      N: passengersGoingNorth,
      S: passengersGoingSouth,
      W: passengersGoingWest,
      E: passengersGoingEast,
    } = countBy(passengersData, property('cardinalpoint')));

    ({
      N: passengersGoingNorthPickup,
      S: passengersGoingSouthPickup,
      W: passengersGoingWestPickup,
      E: passengersGoingEastPickup,
    } = countBy(passengersData, o => o.pickup && o.cardinalpoint));
  };

  render() {
    this.callFilter();
    const { navigationStore } = this.props;
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
              fill={navigationStore.index ? pickupTab : dropOffTab}
              callFunction={() =>
                navigationStore.index
                  ? Alert.alert('PICKUP:', 'passengersGoingNorth')
                  : Alert.alert('DROPOFF:', 'passengersGoingNorth')
              }
              opacity={!passengersGoingNorth ? '0.459' : '1'}
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
              fill={navigationStore.index ? pickupTab : dropOffTab}
              callFunction={() =>
                navigationStore.index
                  ? Alert.alert('PICKUP:', 'passengersGoingSouth')
                  : Alert.alert('DROPOFF:', 'passengersGoingSouth')
              }
              opacity={!passengersGoingSouth ? '0.459' : '1'}
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
              fill={navigationStore.index ? pickupTab : dropOffTab}
              callFunction={() =>
                navigationStore.index
                  ? Alert.alert('PICKUP:', 'passengersGoingEast')
                  : Alert.alert('DROPOFF:', 'passengersGoingEast')
              }
              opacity={!passengersGoingEast ? '0.459' : '1'}
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
              fill={navigationStore.index ? pickupTab : dropOffTab}
              callFunction={() =>
                navigationStore.index
                  ? Alert.alert('PICKUP:', 'passengersGoingWest')
                  : Alert.alert('DROPOFF:', 'passengersGoingWest')
              }
              opacity={!passengersGoingWest ? '0.459' : '1'}
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
  navigationStore: PropTypes.shape({}).isRequired,
  passengersData: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default compose(
  connect(store => ({
    navigationStore: store.homeScreen.navigation,
    passengersData: store.homeScreen.passengersData,
  })),
)(PassengersCircle);
