import React from 'react';
import { Button, AsyncStorage, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ExpoLinksView } from '@expo/samples';
import { removeUserTokenAction } from '../SigningScreen/actions/signinScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

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
    return (
      <ScrollView style={styles.container}>
        <ExpoLinksView />
        <Button onPress={this.signOutAsync} title="Log Out" />
      </ScrollView>
    );
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
