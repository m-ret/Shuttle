import { Text, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import tabViewStyles from '../../styles/TabViewStyles';
import PassengersCircle from '../SVGs/Passengers/PassengersCircle';
import AllPassengersList from './AllPassengersList';

const AllPassengersContainer = ({ fill }) => (
  <>
    <View style={{ height: 50 }} />
    <View
      style={[
        tabViewStyles.container,
        { alignItems: 'center', justifyContent: 'center', flex: 1 },
      ]}
    >
      <Text style={{ fontWeight: 'bold' }}>
        Select passengers to start your route
      </Text>
      <View style={{ height: 50 }} />
      <PassengersCircle fill={fill} />
    </View>

    <AllPassengersList />
  </>
);

AllPassengersContainer.propTypes = {
  fill: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default AllPassengersContainer;
