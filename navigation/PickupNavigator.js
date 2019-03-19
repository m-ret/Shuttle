import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { TouchableOpacity } from 'react-native';
import AllPassengersIcon from '../components/SVGs/BottomNavigation/AllPassengersIcon';
import MyPassengersIcon from '../components/SVGs/BottomNavigation/MyPassengersIcon';
import MoreIcon from '../components/SVGs/BottomNavigation/MoreIcon';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MyPassengersScreen from '../screens/MyPassengersScreen/MyPassengersScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';

import Colors from '../constants/Colors';
import GoBackButton from '../components/SVGs/GoBackButton/GoBackButtonSVG';
import PassengersByCardinalPointPickup from '../screens/PassengersByCardinalPoint/ByPickup';

import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';

const tabBarOptions = {
  activeTintColor: 'black',
  activeBackgroundColor: '#f7f7f7',
};

const goBackButtonNavOptions = ({ navigation }) => ({
  headerLeft: (
    <TouchableOpacity
      onPress={() => navigation.goBack(null)}
      style={{ paddingHorizontal: 10 }}
    >
      <GoBackButton />
    </TouchableOpacity>
  ),
  headerStyle: { shadowColor: 'transparent', borderBottomWidth: 0 },
});

const HomeStack = createStackNavigator({
  PickupHome: HomeScreen,
  CardinalPointPickup: {
    screen: PassengersByCardinalPointPickup,
    navigationOptions: goBackButtonNavOptions,
  },
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
  PickupLinks: MyPassengersScreen,
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
  History: {
    screen: HistoryScreen,
    navigationOptions: goBackButtonNavOptions,
  },
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
