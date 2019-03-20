import React from 'react';
import { Svg } from 'expo';
import PropTypes from 'prop-types';
import TouchableOpacityG from '../SvgHighlight';

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
  <TouchableOpacityG onPress={callFunction}>
    <Svg.G opacity={opacity} onPress={callFunction}>
      <Svg.Path d={d1} fill="#474350" opacity="0.5" onPress={callFunction} />
      <Svg.Text
        fontSize="10"
        fill="#474350"
        onPress={callFunction}
        transform={transform1}
        fontFamily="Montserrat-Regular, Montserrat"
      >
        <Svg.TSpan x="-3.36" y="75" onPress={callFunction}>
          Passengers going
        </Svg.TSpan>
      </Svg.Text>
      <Svg.Text
        fontSize="23"
        fill="#474350"
        fontWeight="bold"
        onPress={callFunction}
        transform={transform1}
        fontFamily="Montserrat-Bold, Montserrat"
      >
        <Svg.TSpan x={x} y={y} onPress={callFunction}>
          {cardinalPoint}
        </Svg.TSpan>
      </Svg.Text>
      <Svg.Path fill={fill} d={d2} onPress={callFunction} />
      <Svg.Text
        fill="#FFF"
        fontSize="14"
        fontWeight="400"
        transform={transform2}
        onPress={callFunction}
        fontFamily="Montserrat-Medium, Montserrat"
      >
        <Svg.TSpan x="7.87" y="14" onPress={callFunction}>
          {numberOfPassengers}
        </Svg.TSpan>
      </Svg.Text>
    </Svg.G>
  </TouchableOpacityG>
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
  numberOfPassengers: PropTypes.oneOfType([PropTypes.number]),
  opacity: PropTypes.oneOfType([PropTypes.string]).isRequired,
  transform1: PropTypes.oneOfType([PropTypes.string]).isRequired,
  transform2: PropTypes.oneOfType([PropTypes.string]).isRequired,
  callFunction: PropTypes.oneOfType([PropTypes.func]).isRequired,
  cardinalPoint: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default PassengerAvatar;
