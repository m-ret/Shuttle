import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { ScrollView, Text } from 'react-native';
import AllPassengersIcon from '../components/SVGs/BottomNavigation/AllPassengersIcon';
import MyPassengersIcon from '../components/SVGs/BottomNavigation/MyPassengersIcon';
import MoreIcon from '../components/SVGs/BottomNavigation/MoreIcon';
import tabViewStyles from '../styles/TabViewStyles';

const HomeScreen = () => (
  <ScrollView style={tabViewStyles.container}>
    <Text>SecondRoute</Text>
  </ScrollView>
);

const LinkScreen = () => (
  <ScrollView style={tabViewStyles.container}>
    <Text>SecondRoute</Text>
  </ScrollView>
);

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'All Passengers',
  tabBarIcon: ({ focused }) => <AllPassengersIcon focused={focused} />,
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#f7f7f7',
  },
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'My Passengers',
  tabBarIcon: ({ focused }) => <MyPassengersIcon focused={focused} />,
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#f7f7f7',
  },
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => <MoreIcon focused={focused} />,
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#f7f7f7',
  },
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
