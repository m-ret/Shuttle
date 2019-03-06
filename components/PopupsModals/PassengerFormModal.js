import React, { Component } from 'react';
import { View } from 'react-native';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { size } from 'lodash';

import styles from '../../styles/PopupsModals';

import AddEditFormInputs from './FormInputs';

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
import EditAddressInput from './EditAddressInput';
import PassengerFormWrapper from './PassengerFormWrapper';

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
    const { passengerInfo } = this.props;

    this.focus();

    if (passengerInfo) {
      this.setState({
        id: passengerInfo.id,
        name: passengerInfo.name,
        phone: passengerInfo.phone,
        pickup: passengerInfo.pickup,
        latitude: passengerInfo.latitude,
        longitude: passengerInfo.longitude,
        address: passengerInfo.address,
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
      editPassengerData,
      editPassengerModal,
      newAddressFromGoogle,
      toggleGooglePlacesInput,
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
      nextProps.editPassengerData !== editPassengerData ||
      nextProps.editPassengerModal !== editPassengerModal ||
      nextProps.newAddressFromGoogle !== newAddressFromGoogle ||
      nextProps.toggleGooglePlacesInput !== toggleGooglePlacesInput ||
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

  componentDidUpdate(props) {
    const {
      passengerInfo,
      editPassengerData,
      editPassengerModal,
      toggleGooglePlacesInput,
    } = this.props;

    if (props.toggleGooglePlacesInput !== toggleGooglePlacesInput) {
      this.focus();
    }

    if (
      props.passengerInfo !== passengerInfo ||
      props.editPassengerData !== editPassengerData ||
      props.editPassengerModal !== editPassengerModal
    ) {
      this.newState();
    }
  }

  focus = () => {
    this.ref.focus();
  };

  newState = () => {
    const { passengerInfo, newAddressFromGoogle } = this.props;

    if (passengerInfo) {
      this.setState({
        id: passengerInfo.id,
        name: passengerInfo.name,
        phone: passengerInfo.phone,
        pickup: passengerInfo.pickup,
        address: size(newAddressFromGoogle)
          ? newAddressFromGoogle.address
          : passengerInfo.address,
        latitude: size(newAddressFromGoogle)
          ? newAddressFromGoogle.latitude
          : passengerInfo.latitude,
        longitude: size(newAddressFromGoogle)
          ? newAddressFromGoogle.longitude
          : passengerInfo.longitude,
      });
    }
  };

  onParamChange = (paramChanged, initialParam) => {
    const { newAddressFromGoogle } = this.props;
    return size(newAddressFromGoogle) ? paramChanged : initialParam;
  };

  handleEditPassenger = async () => {
    const {
      navigationStore,
      newAddressFromGoogle,
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
      this.onParamChange(newAddressFromGoogle.description, address),
      this.onParamChange(newAddressFromGoogle.latitude, latitude),
      this.onParamChange(newAddressFromGoogle.longitude, longitude),
      navigationStore,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
    );

    newAddressFromGoogleActionHandler({});
    editPassengerModalActionHandler();
  };

  callModal = async () => {
    const { toggleGooglePlacesInputActionHandler } = this.props;
    toggleGooglePlacesInputActionHandler();
  };

  onCloseEditAddressModal = async () => {
    const {
      editPassengerModalActionHandler,
      newAddressFromGoogleActionHandler,
    } = this.props;

    editPassengerModalActionHandler();
    newAddressFromGoogleActionHandler({});
  };

  render() {
    const { name, address, phone } = this.state;
    const {
      newAddressFromGoogle,
      editPassengerModalActionHandler,
    } = this.props;
    return (
      <>
        <EditAddressInput />
        <PassengerFormWrapper
          onPressSave={this.handleEditPassenger}
          onPressCancel={this.onCloseEditAddressModal}
          onPressToToggleModal={editPassengerModalActionHandler}
        >
          <View style={styles.AddEditInputsWrapper}>
            <AddEditFormInputs
              // eslint-disable-next-line react/jsx-boolean-value
              shouldFocus={true}
              onChangeText={name => this.setState({ name })}
              iconName="ios-search"
              textStateValue={name}
              isRef={ref => (this.ref = ref)}
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
            />
            <AddEditFormInputs
              shouldFocus={false}
              onChangeText={phone => this.setState({ phone })}
              iconName="ios-search"
              textStateValue={phone}
            />
          </View>
        </PassengerFormWrapper>
      </>
    );
  }
}

PassengerFormModal.defaultProps = {
  editPassengerData: {},
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
  editPassengerData: PropTypes.oneOfType([PropTypes.object]),
  newAddressFromGoogleActionHandler: PropTypes.func.isRequired,
  newAddressFromGoogle: PropTypes.oneOfType([PropTypes.object]),
  toggleGooglePlacesInputActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  editPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  toggleGooglePlacesInput: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      passengerInfo: store.homeScreen.passengerInfo,
      editPassengerData: store.popupsModals.editPassengerData,
      editPassengerModal: store.popupsModals.editPassengerModal,
      newAddressFromGoogle: store.popupsModals.newAddressFromGoogle,
      toggleGooglePlacesInput: store.popupsModals.toggleGooglePlacesInput,
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
