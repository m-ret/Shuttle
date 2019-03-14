import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import PassengerAddedSvg from '../SVGs/Passengers/PassengerAdded';
import PassengerAddedStyles from '../../styles/PassengerAdded';

import HandleUndoButton from '../HandleUndoButton/HandleUndoButton';

const PassengersAdded = ({ id, handleUndo, buttonText, x }) => {
  return (
    <View style={PassengerAddedStyles.Container}>
      <View>
        <PassengerAddedSvg buttonText={buttonText} x={x} />
        <HandleUndoButton handleUndo={handleUndo} />
        <Text style={{ textAlign: 'center' }}>Passenger ID: {id}</Text>
      </View>
    </View>
  );
};

PassengersAdded.defaultProps = {
  x: undefined,
};

PassengersAdded.propTypes = {
  handleUndo: PropTypes.func.isRequired,
  x: PropTypes.oneOfType([PropTypes.number]),
  id: PropTypes.oneOfType([PropTypes.number]).isRequired,
  buttonText: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default PassengersAdded;
