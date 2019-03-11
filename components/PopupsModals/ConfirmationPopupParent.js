import { View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import OptionsModal from './OptionsAlertPassenger';

import { confirmationPopupAction } from './actions/popupsModals';
import ConfirmationPopup from './ConfirmationPopup';
import FetchDeletePassenger from '../../APICalls/FetchDeletePassenger';
import {
  passengerCardIdAction,
  pickupPassengerCardIdAction,
  isDeletePassengerSuccessAction,
  unassignedPickUpPassengersAction,
  unassignedDropOffPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';
import { passengersByCardinalPointDataAction } from '../../screens/PassengersByCardinalPoint/actions/passengersByCardinalPoint';
import { assignedPassengersDataAction } from '../../screens/MyPassengersScreen/actions/myPassengersScreen';

const ConfirmationPopupParent = ({
  screenName,
  passengerInfo,
  navigationStore,
  confirmationPopup,
  passengersGoingTo,
  passengerCardIdActionHandler,
  confirmationPopupActionHandler,
  pickupPassengerCardIdActionHandler,
  assignedPassengersDataActionHandler,
  isDeletePassengerSuccessActionHandler,
  unassignedPickUpPassengersActionHandler,
  unassignedDropOffPassengersActionHandler,
  passengersByCardinalPointDataActionHandler,
}) => {
  const handleDeletePassenger = async id => {
    await FetchDeletePassenger(
      id,
      screenName,
      navigationStore,
      passengersGoingTo,
      passengerCardIdActionHandler,
      pickupPassengerCardIdActionHandler,
      assignedPassengersDataActionHandler,
      isDeletePassengerSuccessActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      passengersByCardinalPointDataActionHandler,
    );

    confirmationPopupActionHandler();
  };

  return (
    <View>
      <>
        <OptionsModal
          openBy={confirmationPopup}
          onRequestClose={confirmationPopupActionHandler}
        >
          {
            <ConfirmationPopup
              id={passengerInfo.id}
              handleDeleteOptionsModal={() =>
                handleDeletePassenger(passengerInfo.id)
              }
            />
          }
        </OptionsModal>
      </>
    </View>
  );
};

ConfirmationPopupParent.defaultProps = {
  screenName: '',
  passengersGoingTo: '',
};

ConfirmationPopupParent.propTypes = {
  passengerInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  screenName: PropTypes.oneOfType([PropTypes.string]),
  passengerCardIdActionHandler: PropTypes.func.isRequired,
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  passengersGoingTo: PropTypes.oneOfType([PropTypes.string]),
  pickupPassengerCardIdActionHandler: PropTypes.func.isRequired,
  assignedPassengersDataActionHandler: PropTypes.func.isRequired,
  isDeletePassengerSuccessActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  confirmationPopup: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  passengersByCardinalPointDataActionHandler: PropTypes.func.isRequired,
};

export default compose(
  connect(
    store => ({
      screenName: store.homeScreen.screenName,
      navigationStore: store.homeScreen.navigation,
      passengerInfo: store.homeScreen.passengerInfo,
      passengerCardId: store.homeScreen.passengerCardId,
      passengersGoingTo: store.homeScreen.passengersGoingTo,
      confirmationPopup: store.popupsModals.confirmationPopup,
      pickupPassengerCardId: store.homeScreen.pickupPassengerCardId,
      toggleCardOptionsModal: store.popupsModals.toggleCardOptionsModal,
      isDeletePassengerSuccess: store.homeScreen.isDeletePassengerSuccess,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      passengerCardIdActionHandler: id => {
        dispatch(passengerCardIdAction(id));
      },
      confirmationPopupActionHandler: () => {
        dispatch(confirmationPopupAction());
      },
      pickupPassengerCardIdActionHandler: id => {
        dispatch(pickupPassengerCardIdAction(id));
      },
      assignedPassengersDataActionHandler: value => {
        dispatch(assignedPassengersDataAction(value));
      },
      unassignedPickUpPassengersActionHandler: data => {
        dispatch(unassignedPickUpPassengersAction(data));
      },
      unassignedDropOffPassengersActionHandler: data => {
        dispatch(unassignedDropOffPassengersAction(data));
      },
      isDeletePassengerSuccessActionHandler: isSuccess => {
        dispatch(isDeletePassengerSuccessAction(isSuccess));
      },
      passengersByCardinalPointDataActionHandler: data => {
        dispatch(passengersByCardinalPointDataAction(data));
      },
    }),
  ),
)(ConfirmationPopupParent);
