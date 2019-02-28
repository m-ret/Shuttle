import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';

const HandleUndoButton = ({ handleUndo }) => {
  return (
    <View>
      <Button onPress={handleUndo} title="Undo" color="#000" />
    </View>
  );
};

HandleUndoButton.propTypes = {
  handleUndo: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default HandleUndoButton;
