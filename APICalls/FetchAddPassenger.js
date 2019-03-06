import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import FetchDropOffPassengers from './FetchDropOffPassengers';
import FetchPickupPassengers from './FetchPickupPassengers';

import { API_URL } from '../constants/API';

const FetchAddPassenger = async (
  // These are params. So be careful before you change its order
  name,
  phone,
  address,
  latitude,
  longitude,
  navigationStore,
  unassignedPickUpPassengersActionHandler,
  unassignedDropOffPassengersActionHandler,
) => {
  let responseJson;
  const userToken = await AsyncStorage.getItem('userToken');
  const route = navigationStore.index ? 'PickUp' : 'DropOff';
  try {
    const response = await fetch(`${API_URL}addDropOffPassenger`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        phone,
        pickup: route === 'PickUp' ? 1 : 0,
        address,
        latitude,
        longitude,
      }),
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    responseJson = await response.json();
    if (has(responseJson, 'error')) {
      Alert.alert('Error', 'Unable to process your request at this time.');
    } else if (route === 'PickUp') {
      return FetchPickupPassengers(
        unassignedPickUpPassengersActionHandler,
        userToken,
      );
    } else {
      return FetchDropOffPassengers(
        unassignedDropOffPassengersActionHandler,
        userToken,
      );
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error with your request, please try again later.',
    );
  }

  return responseJson;
};

export default FetchAddPassenger;
