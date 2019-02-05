import React from 'react';
import { Button, AsyncStorage } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Log Out Screen',
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <Button
        onPress={this._signOutAsync}
        title="Log Out"
        color="#841584"
        accessibilityLabel="Log Out"
      />
    );
  }
}
