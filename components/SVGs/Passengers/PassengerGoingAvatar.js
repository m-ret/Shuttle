import React from 'react';
import { View } from 'react-native';

import { Svg } from 'expo';

import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const dropOffTabColor = '#ff5252';
const pickupTabColor = '#3DA7DC';

const PassengerGoingAvatar = ({
  navigationStore,
  passengersGoingTo,
  passengersByCardinalPointData,
}) => (
  <View style={{ paddingTop: 20 }}>
    <Svg width="269" height="57">
      <Svg.G fill="none" fillRule="evenodd">
        <Svg.Path
          d="M38.52 24C44.892 24 50 18.64 50 12S44.893 0 38.52 0C32.144 0 27 5.36 27 12s5.145 12 11.52 12zM12 46v10h55V46c0-9.32-18.346-14-27.5-14S12 36.68 12 46z"
          fill="#474350"
        />
        <Svg.Text
          fontFamily="Montserrat-Regular, Montserrat"
          fontSize="10"
          fill="#474350"
        >
          <Svg.TSpan x="83" y="52">
            {'Passangers going'}
          </Svg.TSpan>
        </Svg.Text>
        <Svg.Text
          fontFamily="Montserrat-Bold, Montserrat"
          fontSize="23"
          fontWeight="bold"
          fill="#474350"
        >
          <Svg.TSpan x="185" y="52">
            {passengersGoingTo.toUpperCase()}
          </Svg.TSpan>
        </Svg.Text>
        <Svg.Path
          d="M2.667 27.333a2.33 2.33 0 0 0-2.322 2.334v14.33c0 1.106.898 2.003 2.001 2.003h21.321A2.34 2.34 0 0 0 26 43.667v-14a2.34 2.34 0 0 0-2.333-2.334h-21z"
          fill={navigationStore.index ? pickupTabColor : dropOffTabColor}
        />
        <Svg.Text
          fontFamily="Montserrat-Medium, Montserrat"
          fontSize="14"
          fontWeight="400"
          fill="#FFF"
          transform="translate(0 26)"
        >
          <Svg.TSpan
            y="15.5"
            x={passengersByCardinalPointData.length > 9 ? '5' : '7.87'}
          >
            {passengersByCardinalPointData.length}
          </Svg.TSpan>
        </Svg.Text>
      </Svg.G>
    </Svg>
  </View>
);

PassengerGoingAvatar.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  passengersGoingTo: PropTypes.oneOfType([PropTypes.string]).isRequired,
  passengersByCardinalPointData: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(store => ({
    navigationStore: store.homeScreen.navigation,
    passengersGoingTo: store.homeScreen.passengersGoingTo,
    passengersByCardinalPointData:
      store.passengersByCardinalPoint.passengersByCardinalPointData,
  })),
)(PassengerGoingAvatar);
