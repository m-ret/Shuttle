import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import FetchDropOffPassengers from './FetchDropOffPassengers';
import FetchPickupPassengers from './FetchPickupPassengers';

const FetchUndoAddToMyPassenger = async (
  // These are params. So be careful before you change its order
  id,
  navigationStore,
  unassignedPickUpPassengersActionHandler,
  unassignedDropOffPassengersActionHandler,
  isAddToMyPassengersSuccessActionHandler,
) => {
  const route = navigationStore.index ? 'PickUp' : 'DropOff';
  const userToken = await AsyncStorage.getItem('userToken');
  try {
    const response = await fetch(
      `http://34.235.222.72/public/api/remove${
        route === 'DropOff' ? 'DropOff' : 'PickUp'
      }PassengerFromMyList`,
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
      Alert.alert('Error', 'Unable to process your Undo request at this time.');
    } else {
      await isAddToMyPassengersSuccessActionHandler(false);
      if (route === 'DropOff') {
        FetchDropOffPassengers(
          unassignedDropOffPassengersActionHandler,
          userToken,
        );
      } else {
        FetchPickupPassengers(
          unassignedPickUpPassengersActionHandler,
          userToken,
        );
      }
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error with your Undo request, please try again later.',
    );
  }
};

export default FetchUndoAddToMyPassenger;
