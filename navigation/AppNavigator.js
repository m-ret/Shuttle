import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import PickupNavigator from './PickupNavigator';
import SigninScreen from '../screens/SigningScreen/SigninScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';

const AuthStack = createStackNavigator({ SignIn: SigninScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: MainTabNavigator,
      App2: PickupNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
