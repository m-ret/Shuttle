import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MoreScreenStyles from '../../styles/MoreScreen';

const OptionComp = ({ onPressAction, optionText, optionIcon }) => (
  <View style={MoreScreenStyles.container}>
    <TouchableOpacity style={MoreScreenStyles.option} onPress={onPressAction}>
      <View style={{ flexDirection: 'row' }}>
        <View style={MoreScreenStyles.optionIconContainer}>{optionIcon}</View>
        <View style={MoreScreenStyles.optionTextContainer}>
          <Text style={MoreScreenStyles.optionText}>{optionText}</Text>
          <MaterialCommunityIcons
            size={24}
            color="#474350"
            name="chevron-right"
          />
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

OptionComp.propTypes = {
  onPressAction: PropTypes.func.isRequired,
  optionIcon: PropTypes.shape({}).isRequired,
  optionText: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default OptionComp;
