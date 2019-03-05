import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import FetchDropOffPassengers from './FetchDropOffPassengers';
import FetchPickupPassengers from './FetchPickupPassengers';

import { API_URL } from '../constants/API';

const FetchEditPassenger = async (
  // These are params. So be careful before you change its order
  id,
  name,
  phone,
  pickup,
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
    const response = await fetch(`${API_URL}editDropOffPassenger`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        name,
        phone,
        pickup,
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

export default FetchEditPassenger;