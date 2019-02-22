import React from 'react';
import { Svg } from 'expo';
import PropTypes from 'prop-types';

const AllPassengersIcon = ({ focused, tabIconSelected, tabIconDefault }) => {
  return (
    <Svg width="28" height="17" viewBox="0 0 28 17">
      <Svg.Path
        fill={focused ? tabIconSelected : tabIconDefault}
        d="M14 0a3.818 3.818 0 1 0 0 7.636A3.818 3.818 0 0 0 14 0zM6.364 2.762a3.182 3.182 0 1 0 0 6.363c1.12 0 2.1-.585 2.66-1.45-.853-1.082-1.388-2.393-1.388-3.857 0-.254 0-.509.051-.763a3.098 3.098 0 0 0-1.323-.293zm15.272 0c-.47 0-.916.102-1.323.293.05.254.05.509.05.763 0 1.464-.534 2.775-1.387 3.857a3.169 3.169 0 0 0 4.91.519 3.182 3.182 0 0 0-2.25-5.432zM14 10.182c-2.545 0-7.636 1.273-7.636 3.818v2.545h15.272V14c0-2.545-5.09-3.818-7.636-3.818zm-9.33 1.234C2.546 11.786 0 12.778 0 14.42v2.125h3.818V14c0-.993.37-1.87.853-2.584zm18.66 0c.483.713.852 1.591.852 2.584v2.545H28V14.42c0-1.642-2.545-2.635-4.67-3.004z"
      />
    </Svg>
  );
};

AllPassengersIcon.propTypes = {
  focused: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  tabIconSelected: PropTypes.oneOfType([PropTypes.string]).isRequired,
  tabIconDefault: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default AllPassengersIcon;
