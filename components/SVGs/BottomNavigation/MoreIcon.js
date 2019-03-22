import React from 'react';
import { Svg } from 'expo';
import PropTypes from 'prop-types';

const MoreIcon = ({ focused, tabIconSelected, tabIconDefault }) => (
  <Svg width="28" height="17" viewBox="0 0 28 17">
    <Svg.Path
      fill={focused ? tabIconSelected : tabIconDefault}
      fillRule="nonzero"
      d="M14.286 4.762H0v2.38h14.286v-2.38zm0-4.762H0v2.381h14.286V0zM0 11.905h9.524V9.524H0v2.38zm23.214-5.357L25 8.333l-8.333 8.334-5.357-5.357 1.785-1.786 3.572 3.571 6.547-6.547z"
    />
  </Svg>
);

MoreIcon.propTypes = {
  focused: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  tabIconSelected: PropTypes.oneOfType([PropTypes.string]).isRequired,
  tabIconDefault: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default MoreIcon;
