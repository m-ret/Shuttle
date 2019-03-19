import React from 'react';
import { Svg } from 'expo';
import PropTypes from 'prop-types';

const PassengerAvatar = ({
  x,
  y,
  d1,
  d2,
  fill,
  opacity,
  transform1,
  transform2,
  callFunction,
  cardinalPoint,
  numberOfPassengers,
}) => (
  <Svg.G opacity={opacity} onPress={callFunction}>
    <Svg.Path d={d1} fill="#474350" opacity="0.5" />
    <Svg.Text
      fill="#474350"
      fontFamily="Montserrat-Regular, Montserrat"
      fontSize="10"
      transform={transform1}
    >
      <Svg.TSpan x="-3.36" y="75">
        Passengers going
      </Svg.TSpan>
    </Svg.Text>
    <Svg.Text
      fill="#474350"
      fontFamily="Montserrat-Bold, Montserrat"
      fontSize="23"
      fontWeight="bold"
      transform={transform1}
    >
      <Svg.TSpan x={x} y={y}>
        {cardinalPoint}
      </Svg.TSpan>
    </Svg.Text>
    <Svg.Path fill={fill} d={d2} />
    <Svg.Text
      fill="#FFF"
      fontFamily="Montserrat-Medium, Montserrat"
      fontSize="14"
      fontWeight="400"
      transform={transform2}
    >
      <Svg.TSpan x="7.87" y="14">
        {numberOfPassengers}
      </Svg.TSpan>
    </Svg.Text>
  </Svg.G>
);

PassengerAvatar.defaultProps = {
  numberOfPassengers: 0,
};

PassengerAvatar.propTypes = {
  x: PropTypes.oneOfType([PropTypes.string]).isRequired,
  y: PropTypes.oneOfType([PropTypes.string]).isRequired,
  d1: PropTypes.oneOfType([PropTypes.string]).isRequired,
  d2: PropTypes.oneOfType([PropTypes.string]).isRequired,
  fill: PropTypes.oneOfType([PropTypes.string]).isRequired,
  opacity: PropTypes.oneOfType([PropTypes.string]).isRequired,
  cardinalPoint: PropTypes.oneOfType([PropTypes.string]).isRequired,
  transform1: PropTypes.oneOfType([PropTypes.string]).isRequired,
  transform2: PropTypes.oneOfType([PropTypes.string]).isRequired,
  callFunction: PropTypes.oneOfType([PropTypes.func]).isRequired,
  numberOfPassengers: PropTypes.oneOfType([PropTypes.number]),
};

export default PassengerAvatar;
