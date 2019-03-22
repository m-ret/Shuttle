import React from 'react';
import { View } from 'react-native';
import { Svg } from 'expo';
import PropTypes from 'prop-types';

const AddressIcon = ({ style }) => (
  <View style={style}>
    <Svg width={24} height={24}>
      <Svg.G fill="none" fillRule="evenodd">
        <Svg.Path d="M0 0h24v24H0z" />
        <Svg.Path
          fill="#474350"
          fillRule="nonzero"
          d="M12 8.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6.5 16h-1c-.9-4.1-4-5.8-4-9 0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 3.2-3 4.9-4 9z"
        />
      </Svg.G>
    </Svg>
  </View>
);

AddressIcon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default AddressIcon;
