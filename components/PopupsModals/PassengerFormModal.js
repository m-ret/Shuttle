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
  passengerSuccessfullyEditedAction,
} from '../../screens/HomeScreen/actions/homeScreen';

import EditAddressInput from './EditAddressInput';
import PassengerFormWrapper from './PassengerFormWrapper';

import { passengersByCardinalPointDataAction } from '../../screens/PassengersByCardinalPoint/actions/passengersByCardinalPoint';

import UserIcon from '../SVGs/ModalIcons/UserIcon';
import PhoneIcon from '../SVGs/ModalIcons/PhoneIcon';
import AddressIcon from '../SVGs/ModalIcons/AddressIcon';
import { assignedPassengersDataAction } from '../../screens/MyPassengersScreen/actions/myPassengersScreen';

class PassengerFormModal extends Component {
  state = {
    id: '',
    name: '',
    phone: '',
    address: '',
    latitude: '',
    longitude: '',
  };

  componentDidMount() {
    const {
      passengerInfo,
      passengerSuccessfullyEditedActionHandler,
    } = this.props;

    this.focus();

    passengerSuccessfullyEditedActionHandler();

    if (passengerInfo) {
      this.setState({
        id: passengerInfo.id,
        name: passengerInfo.name,
        phone: passengerInfo.phone,
        address: passengerInfo.address,
        latitude: passengerInfo.latitude,
        longitude: passengerInfo.longitude,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { id, name, phone, address, latitude, longitude } = this.state;

    const {
      passengerInfo,
      navigationStore,
      editPassengerData,
      passengersGoingTo,
      editPassengerModal,
      newAddressFromGoogle,
      toggleGooglePlacesInput,
      passengerSuccessfullyEdited,
    } = this.props;

    return (
      nextState.id !== id ||
      nextState.name !== name ||
      nextState.phone !== phone ||
      nextState.address !== address ||
      nextState.latitude !== latitude ||
      nextState.longitude !== longitude ||
      nextProps.passengerInfo !== passengerInfo ||
      nextProps.navigationStore !== navigationStore ||
      nextProps.passengersGoingTo !== passengersGoingTo ||
      nextProps.editPassengerData !== editPassengerData ||
      nextProps.editPassengerModal !== editPassengerModal ||
      nextProps.newAddressFromGoogle !== newAddressFromGoogle ||
      nextProps.toggleGooglePlacesInput !== toggleGooglePlacesInput ||
      nextProps.passengerSuccessfullyEdited !== passengerSuccessfullyEdited
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

  componentWillUnmount() {
    const { newAddressFromGoogleActionHandler } = this.props;

    newAddressFromGoogleActionHandler({});

    this.setState({
      id: '',
      name: '',
      phone: '',
      address: '',
      latitude: '',
      longitude: '',
    });
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
      screenName,
      navigationStore,
      passengersGoingTo,
      newAddressFromGoogle,
      editPassengerModalActionHandler,
      newAddressFromGoogleActionHandler,
      assignedPassengersDataActionHandler,
      unassignedPickUpPassengersActionHandler,
      passengerSuccessfullyEditedActionHandler,
      unassignedDropOffPassengersActionHandler,
      passengersByCardinalPointDataActionHandler,
    } = this.props;

    const { id, name, phone, address, latitude, longitude } = this.state;

    await FetchEditPassenger(
      id,
      name,
      phone,
      this.onParamChange(newAddressFromGoogle.description, address),
      this.onParamChange(newAddressFromGoogle.latitude, latitude),
      this.onParamChange(newAddressFromGoogle.longitude, longitude),
      screenName,
      passengersGoingTo,
      navigationStore,
      assignedPassengersDataActionHandler,
      passengerSuccessfullyEditedActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      passengersByCardinalPointDataActionHandler,
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
          isDisabled={
            !(
              (name.length &&
                phone.length &&
                newAddressFromGoogle &&
                newAddressFromGoogle.description) ||
              (name.length && phone.length && address.length)
            )
          }
          modalTitle="Edit"
          onPressSave={this.handleEditPassenger}
          onPressCancel={this.onCloseEditAddressModal}
          onPressToToggleModal={editPassengerModalActionHandler}
        >
          <View style={styles.AddEditInputsWrapper}>
            <AddEditFormInputs
              // eslint-disable-next-line react/jsx-boolean-value
              shouldFocus={true}
              onChangeText={name => this.setState({ name })}
              textStateValue={name}
              isRef={ref => (this.ref = ref)}
            >
              <UserIcon style={styles.IconWithinInput} />
            </AddEditFormInputs>
            <AddEditFormInputs
              shouldFocus={false}
              onChangeText={address => this.setState({ address })}
              textStateValue={
                size(newAddressFromGoogle)
                  ? newAddressFromGoogle.description
                  : address
              }
              onFocus={this.callModal}
            >
              <AddressIcon style={styles.IconWithinInput} />
            </AddEditFormInputs>
            <AddEditFormInputs
              shouldFocus={false}
              onChangeText={phone => this.setState({ phone })}
              textStateValue={phone}
            >
              <PhoneIcon style={styles.IconWithinInput} />
            </AddEditFormInputs>
          </View>
        </PassengerFormWrapper>
      </>
    );
  }
}

PassengerFormModal.defaultProps = {
  screenName: '',
  passengersGoingTo: '',
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
  screenName: PropTypes.oneOfType([PropTypes.string]),
  passengersGoingTo: PropTypes.oneOfType([PropTypes.string]),
  editPassengerModalActionHandler: PropTypes.func.isRequired,
  editPassengerData: PropTypes.oneOfType([PropTypes.object]),
  newAddressFromGoogleActionHandler: PropTypes.func.isRequired,
  newAddressFromGoogle: PropTypes.oneOfType([PropTypes.object]),
  assignedPassengersDataActionHandler: PropTypes.func.isRequired,
  toggleGooglePlacesInputActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  passengerSuccessfullyEditedActionHandler: PropTypes.func.isRequired,
  editPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  passengersByCardinalPointDataActionHandler: PropTypes.func.isRequired,
  toggleGooglePlacesInput: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  passengerSuccessfullyEdited: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default compose(
  connect(
    store => ({
      screenName: store.homeScreen.screenName,
      navigationStore: store.homeScreen.navigation,
      passengerInfo: store.homeScreen.passengerInfo,
      passengersGoingTo: store.homeScreen.passengersGoingTo,
      editPassengerData: store.popupsModals.editPassengerData,
      editPassengerModal: store.popupsModals.editPassengerModal,
      newAddressFromGoogle: store.popupsModals.newAddressFromGoogle,
      toggleGooglePlacesInput: store.popupsModals.toggleGooglePlacesInput,
      passengerSuccessfullyEdited: store.homeScreen.passengerSuccessfullyEdited,
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
      passengerSuccessfullyEditedActionHandler: () => {
        dispatch(passengerSuccessfullyEditedAction());
      },
      unassignedPickUpPassengersActionHandler: data => {
        dispatch(unassignedPickUpPassengersAction(data));
      },
      unassignedDropOffPassengersActionHandler: data => {
        dispatch(unassignedDropOffPassengersAction(data));
      },
      passengersByCardinalPointDataActionHandler: data => {
        dispatch(passengersByCardinalPointDataAction(data));
      },
      assignedPassengersDataActionHandler: assignedPassengersData => {
        dispatch(assignedPassengersDataAction(assignedPassengersData));
      },
    }),
  ),
)(PassengerFormModal);
