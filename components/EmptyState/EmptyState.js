import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import EmptyStateStyles from '../../styles/EmptyState';

const EmptyState = ({ children }) => (
  <View style={EmptyStateStyles.Container}>
    <Text style={EmptyStateStyles.Text}>{children}</Text>
  </View>
);

EmptyState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
};

export default EmptyState;
