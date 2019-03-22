import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/PopupsModals';

const ConfirmationPopupBtn = ({
  text,
  onPress,
  isDisabled,
  background,
  buttonTextStyle,
  saveButtonStyle,
  cancelButtonStyle,
  cancelButtonTextStyle,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={isDisabled}
    background={background}
    style={[styles.ConfirmationOption, saveButtonStyle, cancelButtonStyle]}
  >
    <View>
      <View>
        <Text
          style={[
            styles.ModalButtonText,
            buttonTextStyle,
            cancelButtonTextStyle,
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

ConfirmationPopupBtn.defaultProps = {
  isDisabled: true,
  background: undefined,
  saveButtonStyle: undefined,
  buttonTextStyle: undefined,
  cancelButtonStyle: undefined,
  cancelButtonTextStyle: undefined,
};

ConfirmationPopupBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  isDisabled: PropTypes.oneOfType([PropTypes.bool]),
  background: PropTypes.oneOfType([PropTypes.object]),
  text: PropTypes.oneOfType([PropTypes.string]).isRequired,
  cancelButtonStyle: PropTypes.oneOfType([PropTypes.object]),
  cancelButtonTextStyle: PropTypes.oneOfType([PropTypes.object]),
  saveButtonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  buttonTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ConfirmationPopupBtn;
