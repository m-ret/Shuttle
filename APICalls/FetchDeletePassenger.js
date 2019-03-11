import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import FetchDropOffPassengers from './FetchDropOffPassengers';
import FetchPickupPassengers from './FetchPickupPassengers';

import { API_URL } from '../constants/API';

import FetchPassengersByCardinalPoint from './FetchPassengersByCardinalPoint';
import FetchAssignedPassengers from './FetchMyAssignedPassengers';

const FetchDeletePassenger = async (
  // These are params. So be careful before you change its order
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
) => {
  let chosenEndPoint;
  const route = navigationStore.index ? 'PickUp' : 'DropOff';
  const userToken = await AsyncStorage.getItem('userToken');

  const endPointBasedOnScreeName = () => {
    if (screenName === 'MyPassengersScreen') {
      chosenEndPoint = `${API_URL}remove${
        route === 'DropOff' ? 'DropOff' : 'PickUp'
      }PassengerFromMyList`;
    } else {
      chosenEndPoint = `${API_URL}deletePassenger`;
    }

    return chosenEndPoint;
  };

  try {
    await endPointBasedOnScreeName();
    const response = await fetch(chosenEndPoint, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    if (has(responseJson, 'error')) {
      Alert.alert('Error', 'Unable to process your request at this time.');
    } else {
      isDeletePassengerSuccessActionHandler(responseJson.success);
      pickupPassengerCardIdActionHandler(id);
      if (route === 'PickUp') {
        pickupPassengerCardIdActionHandler(id);
        FetchPickupPassengers(
          unassignedPickUpPassengersActionHandler,
          userToken,
        );
      } else {
        passengerCardIdActionHandler(id);
        FetchDropOffPassengers(
          unassignedDropOffPassengersActionHandler,
          userToken,
        );
      }
      FetchPassengersByCardinalPoint(
        passengersGoingTo,
        navigationStore,
        passengersByCardinalPointDataActionHandler,
      );

      if (screenName === 'MyPassengersScreen') {
        FetchAssignedPassengers(
          navigationStore,
          assignedPassengersDataActionHandler,
        );
      }
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error with your request, please try again later.',
    );
  }
};

export default FetchDeletePassenger;
