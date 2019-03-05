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
  isDeletePassengerSuccessAction,
  passengerCardIdAction,
  pickupPassengerCardIdAction,
  unassignedDropOffPassengersAction,
  unassignedPickUpPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

const ConfirmationPopupParent = ({
  passengerInfo,
  navigationStore,
  confirmationPopup,
  passengerCardIdActionHandler,
  confirmationPopupActionHandler,
  pickupPassengerCardIdActionHandler,
  isDeletePassengerSuccessActionHandler,
  unassignedPickUpPassengersActionHandler,
  unassignedDropOffPassengersActionHandler,
}) => {
  const handleDeletePassenger = async id => {
    await FetchDeletePassenger(
      id,
      navigationStore,
      passengerCardIdActionHandler,
      pickupPassengerCardIdActionHandler,
      isDeletePassengerSuccessActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
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

ConfirmationPopupParent.propTypes = {
  passengerInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  passengerCardIdActionHandler: PropTypes.func.isRequired,
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  pickupPassengerCardIdActionHandler: PropTypes.func.isRequired,
  isDeletePassengerSuccessActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  confirmationPopup: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      passengerInfo: store.homeScreen.passengerInfo,
      passengerCardId: store.homeScreen.passengerCardId,
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
      unassignedPickUpPassengersActionHandler: data => {
        dispatch(unassignedPickUpPassengersAction(data));
      },
      unassignedDropOffPassengersActionHandler: data => {
        dispatch(unassignedDropOffPassengersAction(data));
      },
      isDeletePassengerSuccessActionHandler: isSuccess => {
        dispatch(isDeletePassengerSuccessAction(isSuccess));
      },
    }),
  ),
)(ConfirmationPopupParent);
