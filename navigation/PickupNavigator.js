import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import AllPassengersIcon from '../components/SVGs/BottomNavigation/AllPassengersIcon';
import MyPassengersIcon from '../components/SVGs/BottomNavigation/MyPassengersIcon';
import MoreIcon from '../components/SVGs/BottomNavigation/MoreIcon';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LinksScreen from '../screens/LinksScreen/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';

import Colors from '../constants/Colors';

const tabBarOptions = {
  activeTintColor: 'black',
  activeBackgroundColor: '#f7f7f7',
};

const HomeStack = createStackNavigator({
  PickupHome: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'All Passengers',
  tabBarIcon: ({ focused }) => (
    <AllPassengersIcon
      focused={focused}
      tabIconSelected={Colors.tabIconSelectedPickup}
      tabIconDefault={Colors.tabIconDefaultPickup}
    />
  ),
  tabBarOptions,
};

const LinksStack = createStackNavigator({
  PickupLinks: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'My Passengers',
  tabBarIcon: ({ focused }) => (
    <MyPassengersIcon
      focused={focused}
      tabIconSelected={Colors.tabIconSelectedPickup}
      tabIconDefault={Colors.tabIconDefaultPickup}
    />
  ),
  tabBarOptions,
};

const SettingsStack = createStackNavigator({
  PickupSettings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => (
    <MoreIcon
      focused={focused}
      tabIconSelected={Colors.tabIconSelectedPickup}
      tabIconDefault={Colors.tabIconDefaultPickup}
    />
  ),
  tabBarOptions,
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
