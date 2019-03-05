import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/PopupsModals';

const AddEditFormInputs = ({ iconName, onChangeText, textStateValue }) => (
  <View style={styles.InputContainer}>
    <Ionicons style={styles.IconWithinInput} name={iconName} size={24} />
    <TextInput
      style={styles.AddEditInputs}
      onChangeText={onChangeText}
      value={textStateValue}
    />
  </View>
);

AddEditFormInputs.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  iconName: PropTypes.oneOfType([PropTypes.string]).isRequired,
  textStateValue: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default AddEditFormInputs;
