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
  newAddressFromGoogleAction,
  toggleAddPassengerModalAction,
  toggleGooglePlacesInputAction,
} from './actions/popupsModals';

import {
  unassignedDropOffPassengersAction,
  unassignedPickUpPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

import EditAddressInput from './EditAddressInput';
import PassengerFormWrapper from './PassengerFormWrapper';
import UserIcon from '../SVGs/ModalIcons/UserIcon';
import AddressIcon from '../SVGs/ModalIcons/AddressIcon';
import PhoneIcon from '../SVGs/ModalIcons/PhoneIcon';

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
      isDisabled,
      passengerInfo,
      navigationStore,
      addPassengerData,
      newAddressFromGoogle,
      toggleGooglePlacesInput,
      toggleAddPassengerModal,
    } = this.props;

    return (
      nextState.name !== name ||
      nextState.phone !== phone ||
      nextState.address !== address ||
      nextState.latitude !== latitude ||
      nextState.longitude !== longitude ||
      nextProps.isDisabled !== isDisabled ||
      nextProps.passengerInfo !== passengerInfo ||
      nextProps.navigationStore !== navigationStore ||
      nextProps.addPassengerData !== addPassengerData ||
      nextProps.newAddressFromGoogle !== newAddressFromGoogle ||
      nextProps.toggleAddPassengerModal !== toggleAddPassengerModal ||
      nextProps.toggleGooglePlacesInput !== toggleGooglePlacesInput
    );
  }

  componentDidUpdate(props) {
    const { toggleGooglePlacesInput } = this.props;

    if (props.toggleGooglePlacesInput !== toggleGooglePlacesInput) {
      this.focus();
    }
  }

  componentWillUnmount() {
    const { newAddressFromGoogleActionHandler } = this.props;

    newAddressFromGoogleActionHandler({});

    this.setState({
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

  onParamChange = (paramChanged, initialParam) => {
    const { newAddressFromGoogle } = this.props;
    return size(newAddressFromGoogle) ? paramChanged : initialParam;
  };

  callModal = async () => {
    const { toggleGooglePlacesInputActionHandler } = this.props;
    await toggleGooglePlacesInputActionHandler();
  };

  handleAddPassenger = async () => {
    const {
      navigationStore,
      newAddressFromGoogle,
      newAddressFromGoogleActionHandler,
      toggleAddPassengerModalActionHandler,
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

  onCloseEditAddressModal = () => {
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
        <View style={styles.container}>
          <EditAddressInput />
          <PassengerFormWrapper
            isDisabled={
              !(
                name.length &&
                newAddressFromGoogle &&
                newAddressFromGoogle.description &&
                phone.length
              )
            }
            modalTitle="Add"
            onPressSave={this.handleAddPassenger}
            onPressCancel={this.onCloseEditAddressModal}
            onPressToToggleModal={toggleAddPassengerModalActionHandler}
          >
            <View style={styles.AddEditInputsWrapper}>
              <AddEditFormInputs
                // eslint-disable-next-line react/jsx-boolean-value
                shouldFocus={true}
                onChangeText={name => this.setState({ name })}
                textStateValue={name}
                placeholder="Enter name"
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
                placeholder="Enter Address"
              >
                <AddressIcon style={styles.IconWithinInput} />
              </AddEditFormInputs>
              <AddEditFormInputs
                shouldFocus={false}
                keyboardType="numeric"
                textStateValue={phone}
                placeholder="Enter Phone"
                onChangeText={phone => this.setState({ phone })}
              >
                <PhoneIcon style={styles.IconWithinInput} />
              </AddEditFormInputs>
            </View>
          </PassengerFormWrapper>
        </View>
      </>
    );
  }
}

AddPassengerModal.defaultProps = {
  isDisabled: true,
  newAddressFromGoogle: {},
};

AddPassengerModal.propTypes = {
  passengerInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  isDisabled: PropTypes.oneOfType([PropTypes.bool]),
  newAddressFromGoogleActionHandler: PropTypes.func.isRequired,
  newAddressFromGoogle: PropTypes.oneOfType([PropTypes.object]),
  toggleGooglePlacesInputActionHandler: PropTypes.func.isRequired,
  toggleAddPassengerModalActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  addPassengerData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  toggleGooglePlacesInput: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  toggleAddPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      passengerInfo: store.homeScreen.passengerInfo,
      addPassengerData: store.popupsModals.addPassengerData,
      newAddressFromGoogle: store.popupsModals.newAddressFromGoogle,
      toggleGooglePlacesInput: store.popupsModals.toggleGooglePlacesInput,
      toggleAddPassengerModal: store.popupsModals.toggleAddPassengerModal,
    }),
    dispatch => ({
      newAddressFromGoogleActionHandler: data => {
        dispatch(newAddressFromGoogleAction(data));
      },
      toggleAddPassengerModalActionHandler: () => {
        dispatch(toggleAddPassengerModalAction());
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
