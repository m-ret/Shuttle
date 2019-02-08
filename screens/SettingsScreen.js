import React from 'react';
import { Button, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Log Out Screen',
  };

  signOutAsync = async () => {
    const { navigation } = this.props;
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  render() {
    return (
      <Button
        onPress={this.signOutAsync}
        title="Log Out"
      />
    );
  }
}

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};
