import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/PopupsModals';

const ConfirmationPopupBtn = ({
  onPress,
  text,
  background,
  buttonTextStyle,
  saveButtonStyle,
  cancelButtonStyle,
  cancelButtonTextStyle,
}) => (
  <TouchableOpacity
    style={[styles.ConfirmationOption, saveButtonStyle, cancelButtonStyle]}
    background={background}
    onPress={onPress}
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
  background: undefined,
  saveButtonStyle: undefined,
  buttonTextStyle: undefined,
  cancelButtonStyle: undefined,
  cancelButtonTextStyle: undefined,
};

ConfirmationPopupBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  background: PropTypes.oneOfType([PropTypes.object]),
  text: PropTypes.oneOfType([PropTypes.string]).isRequired,
  cancelButtonStyle: PropTypes.oneOfType([PropTypes.object]),
  cancelButtonTextStyle: PropTypes.oneOfType([PropTypes.object]),
  saveButtonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  buttonTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ConfirmationPopupBtn;
