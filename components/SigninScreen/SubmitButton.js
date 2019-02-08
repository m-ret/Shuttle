import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/SigningScreenStyles';

const SigninSubmitButton = ({ signInAsync, disabledProp, style }) => (
  <TouchableHighlight
    style={style}
    onPress={signInAsync}
    disabled={!disabledProp}
  >
    <Text style={styles.loginText}>Log In</Text>
  </TouchableHighlight>
);

SigninSubmitButton.propTypes = {
  signInAsync: PropTypes.func.isRequired,
  disabledProp: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
    .isRequired,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default SigninSubmitButton;
