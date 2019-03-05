import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/PopupsModals';

const AddEditFormInputs = ({
  iconName,
  onChangeText,
  textStateValue,
  onFocus,
}) => (
  <View style={styles.InputContainer}>
    <Ionicons style={styles.IconWithinInput} name={iconName} size={24} />
    <TextInput
      onFocus={onFocus}
      value={textStateValue}
      onChangeText={onChangeText}
      style={styles.AddEditInputs}
    />
  </View>
);

AddEditFormInputs.defaultProps = {
  onFocus: undefined,
};

AddEditFormInputs.propTypes = {
  onFocus: PropTypes.func,
  onChangeText: PropTypes.func.isRequired,
  iconName: PropTypes.oneOfType([PropTypes.string]).isRequired,
  textStateValue: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default AddEditFormInputs;
