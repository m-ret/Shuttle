import React from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { isEqual } from 'lodash';

import OptionsModal from './OptionsAlertPassenger';

import ConfirmationPopup from './ConfirmationPopup';

import { confirmationPopupAction } from './actions/popupsModals';

import FetchDeletePassenger from '../../APICalls/FetchDeletePassenger';

import {
  passengerCardIdAction,
  pickupPassengerCardIdAction,
  isDeletePassengerSuccessAction,
  unassignedPickUpPassengersAction,
  unassignedDropOffPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

import { removeUserTokenAction } from '../../screens/SigningScreen/actions/signinScreen';

import { assignedPassengersDataAction } from '../../screens/MyPassengersScreen/actions/myPassengersScreen';
import { passengersByCardinalPointDataAction } from '../../screens/PassengersByCardinalPoint/actions/passengersByCardinalPoint';

const ConfirmationPopupParent = ({
  screenName,
  passengerInfo,
  navigationStore,
  passengersGoingTo,
  confirmationPopup,
  removeUserTokenActionHandler,
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

  const handleLogOut = async () => {
    await AsyncStorage.clear();
    await removeUserTokenActionHandler();
    confirmationPopupActionHandler();
  };

  const handleTexts = () => {
    if (isEqual(screenName, 'MoreScreen')) {
      return ['Are you sure you want to log out?', 'LOG OUT'];
    }

    if (isEqual(screenName, 'MyPassengersScreen')) {
      return [
        'Are you sure you want to remove this passenger from your list? ',
        'REMOVE',
      ];
    }

    if (
      isEqual(screenName, 'PassengerCardBasedOnRoute') ||
      isEqual(screenName, 'PassengerByCardinalPoint')
    ) {
      return ['Are you sure you want to delete this passenger? ', 'DELETE'];
    }

    return ['', ''];
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
              textTitle={handleTexts()[0]}
              buttonText={handleTexts()[1]}
              id={passengerInfo.id}
              handleDeleteOptionsModal={() =>
                isEqual(screenName, 'MoreScreen')
                  ? handleLogOut()
                  : handleDeletePassenger(passengerInfo.id)
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
  removeUserTokenActionHandler: PropTypes.func.isRequired,
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
      userToken: store.signinScreen.userToken,
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
      removeUserTokenActionHandler: () => {
        dispatch(removeUserTokenAction());
      },
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
