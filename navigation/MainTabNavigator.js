import React from 'react';

import {
  createStackNavigator,
  createBottomTabNavigator,
  HeaderBackButton,
} from 'react-navigation';

import AllPassengersIcon from '../components/SVGs/BottomNavigation/AllPassengersIcon';
import MyPassengersIcon from '../components/SVGs/BottomNavigation/MyPassengersIcon';
import MoreIcon from '../components/SVGs/BottomNavigation/MoreIcon';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LinksScreen from '../screens/LinksScreen/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import PassengersByCardinalPoint from '../screens/PassengersByCardinalPoint/PassengersByCardinalPoint';

import Colors from '../constants/Colors';

const tabBarOptions = {
  activeTintColor: 'black',
  activeBackgroundColor: '#f7f7f7',
};

const cardinalPointScreenNavigationOptions = ({ navigation }) => ({
  headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  headerStyle: { shadowColor: 'transparent', borderBottomWidth: 0 },
});

const HomeStack = createStackNavigator({
  DropOffAllPassengers: HomeScreen,
  CardinalPoint: {
    screen: PassengersByCardinalPoint,
    navigationOptions: cardinalPointScreenNavigationOptions,
  },
});

HomeStack.navigationOptions = {
  tabBarLabel: 'All Passengers',
  tabBarIcon: ({ focused }) => {
    return (
      <AllPassengersIcon
        focused={focused}
        tabIconSelected={Colors.tabIconSelected}
        tabIconDefault={Colors.tabIconDefault}
      />
    );
  },
  tabBarOptions,
};

const LinksStack = createStackNavigator({
  DropOffMyPassengers: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'My Passengers',
  tabBarIcon: ({ focused }) => (
    <MyPassengersIcon
      focused={focused}
      tabIconSelected={Colors.tabIconSelected}
      tabIconDefault={Colors.tabIconDefault}
    />
  ),
  tabBarOptions,
};

const SettingsStack = createStackNavigator({
  DropOffMore: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => (
    <MoreIcon
      focused={focused}
      tabIconSelected={Colors.tabIconSelected}
      tabIconDefault={Colors.tabIconDefault}
    />
  ),
  tabBarOptions,
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
