import { TextInput, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/PopupsModals';

const AddEditFormInputs = ({
  isRef,
  onFocus,
  children,
  shouldFocus,
  placeholder,
  onChangeText,
  keyboardType,
  textStateValue,
}) => (
  <View style={styles.InputContainer}>
    {children}
    <TextInput
      ref={isRef}
      onFocus={onFocus}
      value={textStateValue}
      autoFocus={shouldFocus}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      style={styles.AddEditInputs}
    />
  </View>
);

AddEditFormInputs.defaultProps = {
  placeholder: '',
  isRef: undefined,
  onFocus: undefined,
  textStateValue: '',
  keyboardType: 'default',
};

AddEditFormInputs.propTypes = {
  isRef: PropTypes.func,
  onFocus: PropTypes.func,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string]),
  keyboardType: PropTypes.oneOfType([PropTypes.string]),
  textStateValue: PropTypes.oneOfType([PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
  shouldFocus: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default AddEditFormInputs;
