import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import FetchDropOffPassengers from './FetchDropOffPassengers';
import FetchPickupPassengers from './FetchPickupPassengers';

import { API_URL } from '../constants/API';

import FetchPassengersByCardinalPoint from './FetchPassengersByCardinalPoint';

const FetchDeletePassenger = async (
  // These are params. So be careful before you change its order
  id,
  navigationStore,
  passengersGoingTo,
  passengerCardIdActionHandler,
  pickupPassengerCardIdActionHandler,
  isDeletePassengerSuccessActionHandler,
  unassignedPickUpPassengersActionHandler,
  unassignedDropOffPassengersActionHandler,
  passengersByCardinalPointDataActionHandler,
) => {
  const route = navigationStore.index ? 'PickUp' : 'DropOff';
  const userToken = await AsyncStorage.getItem('userToken');
  try {
    const response = await fetch(`${API_URL}deletePassenger`, {
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
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error with your request, please try again later.',
    );
  }
};

export default FetchDeletePassenger;
