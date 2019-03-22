import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import PassengerAddedStyles from '../../styles/PassengerAdded';

const HandleUndoButton = ({ handleUndo }) => {
  return (
    <View style={PassengerAddedStyles.Button}>
      <Button onPress={handleUndo} title="Undo" color="#000" />
    </View>
  );
};

HandleUndoButton.propTypes = {
  handleUndo: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default HandleUndoButton;
