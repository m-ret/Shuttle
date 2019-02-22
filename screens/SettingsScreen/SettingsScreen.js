import React from 'react';
import { Button, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { removeUserTokenAction } from '../SigningScreen/actions/signinScreen';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Log Out Screen',
  };

  signOutAsync = async () => {
    const { navigation, removeUserTokenActionHandler } = this.props;
    await AsyncStorage.clear();
    removeUserTokenActionHandler();
    navigation.navigate('Auth');
  };

  render() {
    return <Button onPress={this.signOutAsync} title="Log Out" />;
  }
}

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  removeUserTokenActionHandler: PropTypes.func.isRequired,
};

export default compose(
  connect(
    store => ({
      userToken: store.signinScreen.userToken,
    }),
    dispatch => ({
      removeUserTokenActionHandler: () => {
        dispatch(removeUserTokenAction());
      },
    }),
  ),
)(SettingsScreen);
