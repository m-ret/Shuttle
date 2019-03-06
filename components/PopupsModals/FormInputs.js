import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/PopupsModals';

class AddEditFormInputs extends Component {
  render() {
    const {
      isRef,
      onFocus,
      iconName,
      shouldFocus,
      placeholder,
      onChangeText,
      textStateValue,
    } = this.props;

    return (
      <View style={styles.InputContainer}>
        <Ionicons style={styles.IconWithinInput} name={iconName} size={24} />
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
  }
}

AddEditFormInputs.defaultProps = {
  placeholder: '',
  isRef: undefined,
  textStateValue: '',
  onFocus: undefined,
};

AddEditFormInputs.propTypes = {
  isRef: PropTypes.func,
  onFocus: PropTypes.func,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string]),
  textStateValue: PropTypes.oneOfType([PropTypes.string]),
  iconName: PropTypes.oneOfType([PropTypes.string]).isRequired,
  shouldFocus: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default AddEditFormInputs;
