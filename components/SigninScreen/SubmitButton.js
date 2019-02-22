import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import signingStyles from '../../styles/SigningScreenStyles';

const jsonCopy = require('../../copy-text/copy');

const SigninSubmitButton = ({ signInAsync, disabledProp, style }) => (
  <TouchableOpacity
    style={style}
    onPress={signInAsync}
    disabled={!disabledProp}
  >
    <Text style={signingStyles.loginText}>{jsonCopy.loginScreen.login}</Text>
  </TouchableOpacity>
);

SigninSubmitButton.propTypes = {
  signInAsync: PropTypes.func.isRequired,
  disabledProp: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
    .isRequired,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default SigninSubmitButton;
