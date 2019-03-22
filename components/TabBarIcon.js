import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

const TabBarIcon = ({ name, focused }) => {
  return (
    <Icon.Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

TabBarIcon.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string]).isRequired,
  focused: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default TabBarIcon;
