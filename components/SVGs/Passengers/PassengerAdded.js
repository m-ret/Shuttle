import React from 'react';
import PropTypes from 'prop-types';

import { Svg } from 'expo';

import { compose } from 'redux';
import { connect } from 'react-redux';

const pickupTabColor = '#3DA7DC';
const dropOffTabColor = '#ff5252';

const PassengerAddedSvg = ({ navigationStore, buttonText, x }) => (
  <Svg width={214} height={125}>
    <Svg.Defs>
      <Svg.Path
        id="prefix__a"
        d="M102.03 42.458l-9.72-9.64-3.31 3.26L102.03 49 130 21.26 126.713 18z"
      />
    </Svg.Defs>
    <Svg.G transform="translate(-2 2)" fill="none" fillRule="evenodd">
      <Svg.Text
        opacity={0.87}
        fontFamily="Montserrat-Regular, Montserrat"
        fontSize={24}
        fill={navigationStore.index ? pickupTabColor : dropOffTabColor}
      >
        <Svg.TSpan x={x} y={110}>
          {buttonText}
        </Svg.TSpan>
      </Svg.Text>
      <Svg.Use
        fill={navigationStore.index ? pickupTabColor : dropOffTabColor}
        xlinkHref="#prefix__a"
        href="#prefix__a"
      />
      <Svg.Use stroke="#FFF" xlinkHref="#prefix__a" href="#prefix__a" />
      <Svg.Use
        stroke="#FFF"
        strokeWidth={2}
        xlinkHref="#prefix__a"
        href="#prefix__a"
      />
      <Svg.Ellipse
        stroke={navigationStore.index ? pickupTabColor : dropOffTabColor}
        strokeWidth={3}
        cx={109.5}
        cy={33}
        rx={32.5}
        ry={33}
      />
    </Svg.G>
  </Svg>
);

PassengerAddedSvg.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  x: PropTypes.oneOfType([PropTypes.number]).isRequired,
  buttonText: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default compose(
  connect(store => ({
    navigationStore: store.homeScreen.navigation,
  })),
)(PassengerAddedSvg);
