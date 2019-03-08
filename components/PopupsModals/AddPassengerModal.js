import React, { Component } from 'react';
import { View } from 'react-native';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { size } from 'lodash';

import styles from '../../styles/PopupsModals';

import AddEditFormInputs from './FormInputs';

import FetchAddPassenger from '../../APICalls/FetchAddPassenger';

import {
  toggleAddPassengerModalAction,
  newAddressFromGoogleAction,
  toggleGooglePlacesInputAction,
} from './actions/popupsModals';

import {
  unassignedDropOffPassengersAction,
  unassignedPickUpPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

import EditAddressInput from './EditAddressInput';
import PassengerFormWrapper from './PassengerFormWrapper';

class AddPassengerModal extends Component {
  state = {
    name: '',
    phone: '',
    address: '',
    latitude: '',
    longitude: '',
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { name, phone, address, latitude, longitude } = this.state;

    const {
      passengerInfo,
      navigationStore,
      addPassengerData,
      newAddressFromGoogle,
      toggleGooglePlacesInput,
      toggleAddPassengerModal,
      toggleAddPassengerModalActionHandler,
      toggleGooglePlacesInputActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
    } = this.props;

    return (
      nextState.name !== name ||
      nextState.phone !== phone ||
      nextState.address !== address ||
      nextState.latitude !== latitude ||
      nextState.longitude !== longitude ||
      nextProps.passengerInfo !== passengerInfo ||
      nextProps.navigationStore !== navigationStore ||
      nextProps.addPassengerData !== addPassengerData ||
      nextProps.newAddressFromGoogle !== newAddressFromGoogle ||
      nextProps.toggleAddPassengerModal !== toggleAddPassengerModal ||
      nextProps.toggleGooglePlacesInput !== toggleGooglePlacesInput ||
      nextProps.toggleAddPassengerModalActionHandler !==
        toggleAddPassengerModalActionHandler ||
      nextProps.toggleGooglePlacesInputActionHandler !==
        toggleGooglePlacesInputActionHandler ||
      nextProps.unassignedPickUpPassengersActionHandler !==
        unassignedPickUpPassengersActionHandler ||
      nextProps.unassignedDropOffPassengersActionHandler !==
        unassignedDropOffPassengersActionHandler
    );
  }

  componentDidUpdate(props) {
    const { toggleGooglePlacesInput } = this.props;

    if (props.toggleGooglePlacesInput !== toggleGooglePlacesInput) {
      this.focus();
    }
  }

  focus = () => {
    this.ref.focus();
  };

  onParamChange = (paramChanged, initialParam) => {
    const { newAddressFromGoogle } = this.props;
    return size(newAddressFromGoogle) ? paramChanged : initialParam;
  };

  handleAddPassenger = async () => {
    const {
      navigationStore,
      newAddressFromGoogle,
      toggleAddPassengerModalActionHandler,
      newAddressFromGoogleActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
    } = this.props;

    const { name, phone, address, latitude, longitude } = this.state;

    await FetchAddPassenger(
      name,
      phone,
      this.onParamChange(newAddressFromGoogle.description, address),
      this.onParamChange(newAddressFromGoogle.latitude, latitude),
      this.onParamChange(newAddressFromGoogle.longitude, longitude),
      navigationStore,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
    );

    newAddressFromGoogleActionHandler({});
    toggleAddPassengerModalActionHandler();
  };

  callModal = async () => {
    const { toggleGooglePlacesInputActionHandler } = this.props;
    toggleGooglePlacesInputActionHandler();
  };

  onCloseEditAddressModal = async () => {
    const {
      toggleAddPassengerModalActionHandler,
      newAddressFromGoogleActionHandler,
    } = this.props;

    toggleAddPassengerModalActionHandler();
    newAddressFromGoogleActionHandler({});
  };

  render() {
    const { name, address, phone } = this.state;
    const {
      newAddressFromGoogle,
      toggleAddPassengerModalActionHandler,
    } = this.props;
    return (
      <>
        <EditAddressInput />
        <PassengerFormWrapper
          onPressSave={this.handleAddPassenger}
          onPressCancel={this.onCloseEditAddressModal}
          onPressToToggleModal={toggleAddPassengerModalActionHandler}
        >
          <View style={styles.AddEditInputsWrapper}>
            <AddEditFormInputs
              // eslint-disable-next-line react/jsx-boolean-value
              shouldFocus={true}
              onChangeText={name => this.setState({ name })}
              iconName="ios-search"
              textStateValue={name}
              placeholder="Enter name"
            />
            <AddEditFormInputs
              shouldFocus={false}
              onChangeText={address => this.setState({ address })}
              iconName="ios-search"
              textStateValue={
                size(newAddressFromGoogle)
                  ? newAddressFromGoogle.description
                  : address
              }
              onFocus={this.callModal}
              placeholder="Enter Address"
            />
            <AddEditFormInputs
              shouldFocus={false}
              iconName="ios-search"
              textStateValue={phone}
              placeholder="Enter Phone"
              isRef={ref => (this.ref = ref)}
              onChangeText={phone => this.setState({ phone })}
            />
          </View>
        </PassengerFormWrapper>
      </>
    );
  }
}

AddPassengerModal.defaultProps = {
  newAddressFromGoogle: {},
};

AddPassengerModal.propTypes = {
  passengerInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  newAddressFromGoogleActionHandler: PropTypes.func.isRequired,
  newAddressFromGoogle: PropTypes.oneOfType([PropTypes.object]),
  toggleGooglePlacesInputActionHandler: PropTypes.func.isRequired,
  toggleAddPassengerModalActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  toggleAddPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  addPassengerData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  toggleGooglePlacesInput: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      passengerInfo: store.homeScreen.passengerInfo,
      addPassengerData: store.popupsModals.addPassengerData,
      toggleAddPassengerModal: store.popupsModals.toggleAddPassengerModal,
      newAddressFromGoogle: store.popupsModals.newAddressFromGoogle,
      toggleGooglePlacesInput: store.popupsModals.toggleGooglePlacesInput,
    }),
    dispatch => ({
      toggleAddPassengerModalActionHandler: () => {
        dispatch(toggleAddPassengerModalAction());
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
)(AddPassengerModal);
