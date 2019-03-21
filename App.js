import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import { Provider as ReduxProvider } from 'react-redux';

import { AppLoading, Font, Icon, Notifications } from 'expo';

import store from './redux/store';

import AppNavigator from './navigation/AppNavigator';

import CardOptionsModalParent from './components/PopupsModals/CardOptionsModalParent';
import AddPassengerModalParent from './components/PopupsModals/AddPassengerModalParent';
import ConfirmationPopupParent from './components/PopupsModals/ConfirmationPopupParent';
import PassengerFormModalParent from './components/PopupsModals/PassengerFormModalParent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class App extends React.Component {
  state = { isLoadingComplete: false };

  loadResourcesAsync = async () => {
    return Promise.all([
      // Asset.loadAsync([require('./assets/images/drawable-hdpi/shuttle.png')]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        ...Icon.MaterialIcons.font,
        ...Icon.MaterialCommunityIcons.font,
        montserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
        montserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
        montserratSemibold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
      }),
    ]);
  };

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <ReduxProvider store={store}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          style={styles.container}
        >
          <AppNavigator />
          <CardOptionsModalParent />
          <ConfirmationPopupParent />
          <AddPassengerModalParent />
          <PassengerFormModalParent />
        </KeyboardAvoidingView>
      </ReduxProvider>
    );
  }
}

export default App;
