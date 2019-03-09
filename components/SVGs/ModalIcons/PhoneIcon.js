import React from 'react';
import { View } from 'react-native';
import { Svg } from 'expo';
import PropTypes from 'prop-types';

const UserIcon = ({ style }) => (
  <View style={style}>
    <Svg width={24} height={24}>
      <Svg.G fill="none" fillRule="evenodd">
        <Svg.Path d="M0 0h24v24H0z" />
        <Svg.Path
          fill="#474350"
          fillRule="nonzero"
          d="M20.1 7.7l-1 1c1.8 1.8 1.8 4.6 0 6.5l1 1c2.5-2.3 2.5-6.1 0-8.5zM18 9.8l-1 1c.5.7.5 1.6 0 2.3l1 1c1.2-1.2 1.2-3 0-4.3zM14 1H4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 19H4V4h10v16z"
        />
      </Svg.G>
    </Svg>
  </View>
);

UserIcon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default UserIcon;
