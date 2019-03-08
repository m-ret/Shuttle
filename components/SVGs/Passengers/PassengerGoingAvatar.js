import React from 'react';

import { Svg } from 'expo';

import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* SVGR has dropped some elements not supported by react-native-svg: title */

const PassengerGoingAvatar = ({
  passengersGoingTo,
  passengersByCardinalPointData,
}) => (
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
        fill="#FF5252"
      />
      <Svg.Text
        fontFamily="Montserrat-Medium, Montserrat"
        fontSize="14"
        fontWeight="400"
        fill="#FFF"
        transform="translate(0 26)"
      >
        <Svg.TSpan x="8.87" y="16">
          {passengersByCardinalPointData.length}
        </Svg.TSpan>
      </Svg.Text>
    </Svg.G>
  </Svg>
);

PassengerGoingAvatar.propTypes = {
  passengersGoingTo: PropTypes.oneOfType([PropTypes.string]).isRequired,
  passengersByCardinalPointData: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(store => ({
    passengersGoingTo: store.homeScreen.passengersGoingTo,
    passengersByCardinalPointData:
      store.passengersByCardinalPoint.passengersByCardinalPointData,
  })),
)(PassengerGoingAvatar);
