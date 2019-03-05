import React, { Component } from 'react';
import { Text, View } from 'react-native';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { size } from 'lodash';

import styles from '../../styles/PopupsModals';

import AddEditFormInputs from './FormInputs';
import ConfirmationPopupBtn from './ConfirmationPopupBtn';
import FetchEditPassenger from '../../APICalls/FetchEditPassenger';

import {
  editPassengerModalAction,
  newAddressFromGoogleAction,
  toggleGooglePlacesInputAction,
} from './actions/popupsModals';

import {
  unassignedDropOffPassengersAction,
  unassignedPickUpPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

class PassengerFormModal extends Component {
  state = {
    id: '',
    name: '',
    phone: '',
    pickup: '',
    address: '',
    latitude: '',
    longitude: '',
  };

  componentDidMount() {
    const {
      passengerInfo,
      newAddressFromGoogle,
      editPassengerModal,
    } = this.props;

    if (passengerInfo) {
      this.setState({
        id: passengerInfo.id,
        name: passengerInfo.name,
        phone: passengerInfo.phone,
        pickup: passengerInfo.pickup,
        latitude: passengerInfo.latitude,
        longitude: passengerInfo.longitude,
        address:
          editPassengerModal && size(newAddressFromGoogle)
            ? newAddressFromGoogle.description
            : passengerInfo.address,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      id,
      name,
      phone,
      pickup,
      address,
      latitude,
      longitude,
    } = this.state;

    const {
      passengerInfo,
      navigationStore,
      editPassengerModal,
      newAddressFromGoogle,
      editPassengerModalActionHandler,
      toggleGooglePlacesInputActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
    } = this.props;

    return (
      nextState.id !== id ||
      nextState.name !== name ||
      nextState.phone !== phone ||
      nextState.pickup !== pickup ||
      nextState.address !== address ||
      nextState.latitude !== latitude ||
      nextState.longitude !== longitude ||
      nextProps.passengerInfo !== passengerInfo ||
      nextProps.navigationStore !== navigationStore ||
      nextProps.editPassengerModal !== editPassengerModal ||
      nextProps.newAddressFromGoogle !== newAddressFromGoogle ||
      nextProps.editPassengerModalActionHandler !==
        editPassengerModalActionHandler ||
      nextProps.toggleGooglePlacesInputActionHandler !==
        toggleGooglePlacesInputActionHandler ||
      nextProps.unassignedPickUpPassengersActionHandler !==
        unassignedPickUpPassengersActionHandler ||
      nextProps.unassignedDropOffPassengersActionHandler !==
        unassignedDropOffPassengersActionHandler
    );
  }

  handleEditPassenger = async () => {
    const {
      navigationStore,
      editPassengerModalActionHandler,
      newAddressFromGoogleActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
    } = this.props;

    const {
      id,
      name,
      phone,
      pickup,
      address,
      latitude,
      longitude,
    } = this.state;

    await FetchEditPassenger(
      id,
      name,
      phone,
      pickup,
      address,
      latitude,
      longitude,
      navigationStore,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
    );

    await newAddressFromGoogleActionHandler({});
    editPassengerModalActionHandler();
  };

  callModal = async () => {
    const {
      editPassengerModalActionHandler,
      newAddressFromGoogleActionHandler,
      toggleGooglePlacesInputActionHandler,
    } = this.props;

    newAddressFromGoogleActionHandler({});
    await editPassengerModalActionHandler();
    toggleGooglePlacesInputActionHandler();
  };

  onCloseEditAddressModal = async () => {
    const {
      newAddressFromGoogleActionHandler,
      editPassengerModalActionHandler,
    } = this.props;

    editPassengerModalActionHandler();
    newAddressFromGoogleActionHandler({});
  };

  render() {
    console.log('PASSENGER FORM RENDERING');
    const { name, address, phone } = this.state;
    const { editPassengerModalActionHandler } = this.props;
    return (
      <View style={styles.AddEditWrapper}>
        <View style={styles.AddEditContainer}>
          <View style={styles.AddEditModalTitle}>
            <View style={styles.AddEditIconContainer}>
              <MaterialCommunityIcons name="account-edit" size={24} />
            </View>
            <View style={styles.AddEditOptionTextContainer}>
              <Text style={styles.OptionText}>Edit passenger info</Text>
            </View>
          </View>
          <View>
            <Ionicons
              name="ios-close"
              size={24}
              onPress={editPassengerModalActionHandler}
            />
          </View>
        </View>
        <View style={styles.AddEditInputsWrapper}>
          <AddEditFormInputs
            onChangeText={name => this.setState({ name })}
            iconName="ios-search"
            textStateValue={name}
          />
          <AddEditFormInputs
            onChangeText={address => this.setState({ address })}
            iconName="ios-search"
            textStateValue={address}
            onFocus={this.callModal}
          />
          <AddEditFormInputs
            onChangeText={phone => this.setState({ phone })}
            iconName="ios-search"
            textStateValue={phone}
          />
        </View>

        <View style={[styles.ButtonsWrapper, styles.AddEditButtonsWrapper]}>
          <ConfirmationPopupBtn
            text="Cancel"
            onPress={this.onCloseEditAddressModal}
            cancelButtonStyle={styles.CancelButtonStyle}
            cancelButtonTextStyle={styles.CancelButtonTextStyle}
          />
          <ConfirmationPopupBtn
            text="Save"
            saveButtonStyle={styles.SaveButtonStyle}
            buttonTextStyle={styles.ButtonTextStyle}
            onPress={() => this.handleEditPassenger()}
          />
        </View>
      </View>
    );
  }
}

PassengerFormModal.defaultProps = {
  newAddressFromGoogle: {},
};

PassengerFormModal.propTypes = {
  passengerInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  editPassengerModalActionHandler: PropTypes.func.isRequired,
  newAddressFromGoogleActionHandler: PropTypes.func.isRequired,
  newAddressFromGoogle: PropTypes.oneOfType([PropTypes.object]),
  toggleGooglePlacesInputActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  editPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      passengerInfo: store.homeScreen.passengerInfo,
      editPassengerModal: store.popupsModals.editPassengerModal,
      newAddressFromGoogle: store.popupsModals.newAddressFromGoogle,
    }),
    dispatch => ({
      editPassengerModalActionHandler: () => {
        dispatch(editPassengerModalAction());
      },
      newAddressFromGoogleActionHandler: data => {
        dispatch(newAddressFromGoogleAction(data));
      },
      toggleGooglePlacesInputActionHandler: () => {
        dispatch(toggleGooglePlacesInputAction());
      },
      unassignedPickUpPassengersActionHandler: data => {
        dispatch(unassignedPickUpPassengersAction(data));
      },
      unassignedDropOffPassengersActionHandler: data => {
        dispatch(unassignedDropOffPassengersAction(data));
      },
    }),
  ),
)(PassengerFormModal);
