import React, { Component } from 'react';
import { View } from 'react-native';

import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import styles from '../../styles/PopupsModals';

import {
  popupsModalsAction,
  confirmationPopupAction,
  editPassengerModalAction,
} from './actions/popupsModals';

import ModalsOptionsBtn from './ModalsOptionsBtn';

class AllPassengersOptionsModal extends Component {
  callModal = async () => {
    const {
      popupsModalsActionHandler,
      confirmationPopupActionHandler,
    } = this.props;

    await popupsModalsActionHandler();
    confirmationPopupActionHandler();
  };

  callEditPassengerModal = async () => {
    const {
      popupsModalsActionHandler,
      editPassengerModalActionHandler,
    } = this.props;

    await popupsModalsActionHandler();
    editPassengerModalActionHandler();
  };

  render() {
    const { screenName } = this.props;
    const { handleCallOptionsModal, popupsModalsActionHandler } = this.props;
    return (
      <View style={styles.WrapperContainer}>
        <View style={styles.Container}>
          <ModalsOptionsBtn onPress={handleCallOptionsModal} text="Call">
            <Ionicons name="md-call" size={24} />
          </ModalsOptionsBtn>

          <ModalsOptionsBtn onPress={this.callEditPassengerModal} text="Edit">
            <MaterialCommunityIcons name="account-edit" size={24} />
          </ModalsOptionsBtn>

          <ModalsOptionsBtn
            onPress={this.callModal}
            text={
              screenName === 'PassengerCardBasedOnRoute' ||
              screenName === 'PassengerByCardinalPoint'
                ? 'Delete'
                : 'Remove'
            }
          >
            <MaterialIcons name="delete-forever" size={24} />
          </ModalsOptionsBtn>

          <ModalsOptionsBtn
            text="Cancel"
            style={styles.LastOption}
            onPress={popupsModalsActionHandler}
          >
            <MaterialIcons name="cancel" size={24} />
          </ModalsOptionsBtn>
        </View>
      </View>
    );
  }
}

AllPassengersOptionsModal.defaultProps = {
  screenName: '',
};

AllPassengersOptionsModal.propTypes = {
  handleCallOptionsModal: PropTypes.func.isRequired,
  screenName: PropTypes.oneOfType([PropTypes.string]),
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  popupsModalsActionHandler: PropTypes.oneOfType([PropTypes.func]).isRequired,
  editPassengerModalActionHandler: PropTypes.oneOfType([PropTypes.func])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      screenName: store.homeScreen.screenName,
      confirmationPopup: store.popupsModals.confirmationPopup,
      editPassengerModal: store.popupsModals.editPassengerModal,
      toggleCardOptionsModal: store.popupsModals.toggleCardOptionsModal,
    }),
    dispatch => ({
      popupsModalsActionHandler: () => {
        dispatch(popupsModalsAction());
      },
      confirmationPopupActionHandler: () => {
        dispatch(confirmationPopupAction());
      },
      editPassengerModalActionHandler: () => {
        dispatch(editPassengerModalAction());
      },
    }),
  ),
)(AllPassengersOptionsModal);
