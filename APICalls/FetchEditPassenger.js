import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import FetchDropOffPassengers from './FetchDropOffPassengers';
import FetchPickupPassengers from './FetchPickupPassengers';
import FetchPassengersByCardinalPoint from './FetchPassengersByCardinalPoint';

import { API_URL } from '../constants/API';
import FetchAssignedPassengers from './FetchMyAssignedPassengers';

const FetchEditPassenger = async (
  // These are params. So be careful before you change its order
  id,
  name,
  phone,
  address,
  latitude,
  longitude,
  screenName,
  passengersGoingTo,
  navigationStore,
  assignedPassengersDataActionHandler,
  passengerSuccessfullyEditedActionHandler,
  unassignedPickUpPassengersActionHandler,
  unassignedDropOffPassengersActionHandler,
  passengersByCardinalPointDataActionHandler,
) => {
  let responseJson;
  const userToken = await AsyncStorage.getItem('userToken');
  const route = navigationStore.index ? 'PickUp' : 'DropOff';
  try {
    const response = await fetch(
      `${API_URL}edit${route === 'DropOff' ? 'DropOff' : 'PickUp'}Passenger`,
      {
        method: 'POST',
        body: JSON.stringify({
          id,
          name,
          phone,
          address,
          latitude,
          longitude,
        }),
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    responseJson = await response.json();

    if (has(responseJson, 'error')) {
      Alert.alert('Error', 'Unable to process your request at this time.');
    } else {
      passengerSuccessfullyEditedActionHandler();
      if (screenName === 'PassengerByCardinalPoint') {
        FetchPassengersByCardinalPoint(
          passengersGoingTo,
          navigationStore,
          passengersByCardinalPointDataActionHandler,
        );
      }

      if (
        screenName === 'PassengerByCardinalPoint' ||
        screenName === 'PassengerCardBasedOnRoute'
      ) {
        FetchPickupPassengers(
          unassignedPickUpPassengersActionHandler,
          userToken,
        );

        FetchDropOffPassengers(
          unassignedDropOffPassengersActionHandler,
          userToken,
        );
      }

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

  return responseJson;
};

export default FetchEditPassenger;
