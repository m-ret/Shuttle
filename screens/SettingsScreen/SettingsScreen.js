import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import OptionComp from '../../components/MoreOptionsList/OptionComp';
import { removeUserTokenAction } from '../SigningScreen/actions/signinScreen';

import HelpIcon from '../../components/SVGs/MoreScreen/HelpIcon';
import LogOutIcon from '../../components/SVGs/MoreScreen/LogOutIcon';
import FileOptionIcon from '../../components/SVGs/MoreScreen/FileOptionIcon';

import MoreScreenStyles from '../../styles/MoreScreen';

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  signOutAsync = async () => {
    const { navigation, removeUserTokenActionHandler } = this.props;
    await AsyncStorage.clear();
    removeUserTokenActionHandler();
    navigation.navigate('Auth');
  };

  render() {
    return (
      // if this list grows, change View to ScrollView.
      <View style={MoreScreenStyles.WrapperContainer}>
        <OptionComp
          optionIcon={<FileOptionIcon />}
          optionText="History"
          onPressAction={() => console.log('History Icon')}
        />
        <OptionComp
          optionIcon={<HelpIcon />}
          optionText="Get Help"
          onPressAction={() => console.log('Help Icon')}
        />
        <OptionComp
          optionIcon={<LogOutIcon />}
          optionText="Log Out"
          onPressAction={() => this.signOutAsync()}
        />
      </View>
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
