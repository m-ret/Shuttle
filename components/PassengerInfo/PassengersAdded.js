import React from 'react';
import { View, Button } from 'react-native';
import PassengerAddedSvg from '../SVGs/Passengers/PassengerAdded';
import PassengerAddedStyles from '../../styles/PassengerAdded';

const PassengersAdded = () => {
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
      </View>
    </View>
  );
};

export default PassengersAdded;
