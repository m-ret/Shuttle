import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import FetchDropOffPassengers from './FetchDropOffPassengers';
import FetchPickupPassengers from './FetchPickupPassengers';

import { API_URL } from '../constants/API';
import FetchPassengersByCardinalPoint from './FetchPassengersByCardinalPoint';

const FetchAddToMyPassengers = async (
  // These are params. So be careful before you change its order
  id,
  name,
  navigationStore,
  passengersGoingTo,
  passengerNameActionHandler,
  passengerCardIdActionHandler,
  pickupPassengerNameActionHandler,
  pickupPassengerCardIdActionHandler,
  unassignedPickUpPassengersActionHandler,
  unassignedDropOffPassengersActionHandler,
  isAddToMyPassengersSuccessActionHandler,
  passengersByCardinalPointDataActionHandler,
) => {
  const route = navigationStore.index ? 'PickUp' : 'DropOff';
  const userToken = await AsyncStorage.getItem('userToken');
  passengerNameActionHandler('');
  pickupPassengerNameActionHandler('');
  try {
    const response = await fetch(
      `${API_URL}addToMy${route === 'PickUp' ? 'PickUp' : 'DropOff'}Passengers`,
      {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const responseJson = await response.json();
    if (has(responseJson, 'error')) {
      Alert.alert('Error', 'Unable to process your request at this time.');
    } else {
      await isAddToMyPassengersSuccessActionHandler(responseJson.success);
      passengerCardIdActionHandler(id);
      if (route === 'DropOff') {
        passengerCardIdActionHandler(id);
        passengerNameActionHandler(name);
        FetchDropOffPassengers(
          unassignedDropOffPassengersActionHandler,
          userToken,
        );
      } else {
        pickupPassengerCardIdActionHandler(id);
        pickupPassengerNameActionHandler(name);
        FetchPickupPassengers(
          unassignedPickUpPassengersActionHandler,
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

export default FetchAddToMyPassengers;
