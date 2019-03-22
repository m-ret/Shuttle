import React from 'react';
import { Svg } from 'expo';
import PropTypes from 'prop-types';

const MyPassengersIcon = ({ focused, tabIconSelected, tabIconDefault }) => (
  <Svg width="28" height="17" viewBox="0 0 28 17">
    <Svg.G fill="none" fillRule="evenodd">
      <Svg.Path d="M-1-5h24v24H-1z" />
      <Svg.Path
        fill={focused ? tabIconSelected : tabIconDefault}
        d="M15 6c1.66 0 2.99-1.34 2.99-3S16.66 0 15 0c-1.66 0-3 1.34-3 3s1.34 3 3 3zM7 6c1.66 0 2.99-1.34 2.99-3S8.66 0 7 0C5.34 0 4 1.34 4 3s1.34 3 3 3zm-7 5.5V14h14v-2.5C14 9.17 9.33 8 7 8s-7 1.17-7 3.5zM15 8c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V14h6v-2.5C22 9.17 17.33 8 15 8z"
      />
    </Svg.G>
  </Svg>
);

MyPassengersIcon.propTypes = {
  focused: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  tabIconSelected: PropTypes.oneOfType([PropTypes.string]).isRequired,
  tabIconDefault: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default MyPassengersIcon;
