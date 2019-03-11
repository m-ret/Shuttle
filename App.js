import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { AppLoading, Font, Icon } from 'expo';
import store from './redux/store';
import AppNavigator from './navigation/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  loadResourcesAsync = async () => {
    return Promise.all([
      // Asset.loadAsync([require('./assets/images/drawable-hdpi/shuttle.png')]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        montserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
        montserratSemibold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
        montserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
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
          <AppNavigator />
      </ReduxProvider>
    );
  }
}

export default App;
