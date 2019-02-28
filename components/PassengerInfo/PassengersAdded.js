import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import PassengerAddedSvg from '../SVGs/Passengers/PassengerAdded';
import PassengerAddedStyles from '../../styles/PassengerAdded';

import HandleUndoButton from '../HandleUndoButton/HandleUndoButton';

const PassengersAdded = ({ id, handleUndo }) => {
  return (
    <View style={PassengerAddedStyles.Container}>
      <View>
        <PassengerAddedSvg />
        <HandleUndoButton handleUndo={handleUndo} />
        <Text style={{ textAlign: 'center' }}>Passenger ID: {id}</Text>
      </View>
    </View>
  );
};

PassengersAdded.propTypes = {
  handleUndo: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number]).isRequired,
};

export default PassengersAdded;
