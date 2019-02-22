import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import tabViewStyles from '../../styles/TabViewStyles';
import PassengersCircle from '../SVGs/Passengers/PassengersCircle';
import AllPassengersList from './AllPassengersList';

const AllPassengers = () => (
  <ScrollView>
    <View style={{ height: 50 }} />
    <View
      style={[
        tabViewStyles.container,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Text style={{ fontWeight: 'bold' }}>
        Select passengers to start your route
      </Text>
      <View style={{ height: 50 }} />
      <PassengersCircle />
    </View>
    <AllPassengersList />
  </ScrollView>
);

export default AllPassengers;
