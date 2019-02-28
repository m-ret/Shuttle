import React from 'react';
import { View, Button, Text } from 'react-native';
import PropTypes from 'prop-types';
import PassengerAddedSvg from '../SVGs/Passengers/PassengerAdded';
import PassengerAddedStyles from '../../styles/PassengerAdded';

const PassengersAdded = ({ id }) => {
  const handleUndo = () => console.log('handleUndo');

  return (
    <View style={PassengerAddedStyles.Container}>
      <View>
        <PassengerAddedSvg />
        <Button
          onPress={handleUndo}
          title="Undo"
          color="#000"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text style={{ textAlign: 'center' }}>Passenger ID: {id}</Text>
      </View>
    </View>
  );
};

PassengersAdded.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number]).isRequired,
};

export default PassengersAdded;
