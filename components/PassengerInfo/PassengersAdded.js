import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import PassengerAddedSvg from '../SVGs/Passengers/PassengerAdded';
import PassengerAddedStyles from '../../styles/PassengerAdded';

import HandleUndoButton from '../HandleUndoButton/HandleUndoButton';

const PassengersAdded = ({ handleUndo, buttonText, x }) => {
  return (
    <View style={PassengerAddedStyles.Container}>
      <View>
        <PassengerAddedSvg buttonText={buttonText} x={x} />
        <HandleUndoButton handleUndo={handleUndo} />
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
  buttonText: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default PassengersAdded;
