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
  textStateValue,
}) => (
  <View style={styles.InputContainer}>
    {children}
    <TextInput
      placeholder={placeholder}
      onFocus={onFocus}
      value={textStateValue}
      onChangeText={onChangeText}
      style={styles.AddEditInputs}
      autoFocus={shouldFocus}
      ref={isRef}
    />
  </View>
);

AddEditFormInputs.defaultProps = {
  placeholder: '',
  isRef: undefined,
  onFocus: undefined,
  textStateValue: '',
};

AddEditFormInputs.propTypes = {
  isRef: PropTypes.func,
  onFocus: PropTypes.func,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string]),
  textStateValue: PropTypes.oneOfType([PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
  shouldFocus: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default AddEditFormInputs;
