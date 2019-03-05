import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/PopupsModals';

const ModalsOptionsBtn = ({ text, style, onPress, children }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.Option, style]}
    background={TouchableOpacity.Ripple('#ccc', false)}
  >
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.OptionIconContainer}>
        <View>{children}</View>
      </View>
      <View style={styles.OptionTextContainer}>
        <Text style={styles.OptionText}>{text}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

ModalsOptionsBtn.defaultProps = {
  style: {},
};

ModalsOptionsBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
  text: PropTypes.oneOfType([PropTypes.string]).isRequired,
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ModalsOptionsBtn;
