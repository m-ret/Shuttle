import React, { Component } from 'react';
import { View } from 'react-native';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import OptionComp from '../../components/MoreOptionsList/OptionComp';

import HelpIcon from '../../components/SVGs/MoreScreen/HelpIcon';
import LogOutIcon from '../../components/SVGs/MoreScreen/LogOutIcon';
import FileOptionIcon from '../../components/SVGs/MoreScreen/FileOptionIcon';

import MoreScreenStyles from '../../styles/MoreScreen';

import { screenNameAction } from '../HomeScreen/actions/homeScreen';
import { confirmationPopupAction } from '../../components/PopupsModals/actions/popupsModals';

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const { screenNameActionHandler } = this.props;
    screenNameActionHandler('MoreScreen');
  }

  shouldComponentUpdate(props, state) {
    const { userToken } = this.props;

    return props.userToken !== userToken;
  }

  componentDidUpdate(props, state) {
    const { userToken, navigation } = this.props;

    if (props.userToken !== userToken) navigation.navigate('Auth');
  }

  callModal = async () => {
    const {
      confirmationPopupActionHandler,
      screenNameActionHandler,
    } = this.props;
    screenNameActionHandler('MoreScreen');
    confirmationPopupActionHandler();
  };

  render() {
    const { navigation } = this.props;
    return (
      // if this list grows, change View to ScrollView.
      <View style={MoreScreenStyles.WrapperContainer}>
        <OptionComp
          optionIcon={<FileOptionIcon />}
          optionText="History"
          onPressAction={() => navigation.navigate('History')}
        />
        <OptionComp
          optionIcon={<HelpIcon />}
          optionText="Get Help"
          onPressAction={() => navigation.navigate('History')}
        />
        <OptionComp
          optionIcon={<LogOutIcon />}
          optionText="Log Out"
          onPressAction={() => this.callModal()}
        />
      </View>
    );
  }
}

SettingsScreen.defaultProps = {
  userToken: '',
};

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  userToken: PropTypes.oneOfType([PropTypes.string]),
  screenNameActionHandler: PropTypes.func.isRequired,
  confirmationPopupActionHandler: PropTypes.func.isRequired,
};

export default compose(
  connect(
    store => ({
      userToken: store.signinScreen.userToken,
      confirmationPopup: store.popupsModals.confirmationPopup,
      editPassengerModal: store.popupsModals.editPassengerModal,
      toggleCardOptionsModal: store.popupsModals.toggleCardOptionsModal,
    }),
    dispatch => ({
      screenNameActionHandler: value => {
        dispatch(screenNameAction(value));
      },
      confirmationPopupActionHandler: () => {
        dispatch(confirmationPopupAction());
      },
    }),
  ),
)(SettingsScreen);
