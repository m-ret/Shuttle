import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import FetchDropOffPassengers from './FetchDropOffPassengers';

const FetchAddToMyPassengers = async (
  id,
  navigationStore,
  passengerCardIdActionHandler,
  unassignedDropOffPassengersActionHandler,
  isAddToMyPassengersSuccessActionHandler,
) => {
  const route = navigationStore.index ? 'PickUp' : 'DropOff';
  const userToken = await AsyncStorage.getItem('userToken');
  try {
    const response = await fetch(
      `http://34.235.222.72/public/api/addToMy${route}Passengers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      },
    );
    const responseJson = await response.json();
    if (has(responseJson, 'error')) {
      Alert.alert('Error', 'Unable to process your request at this time.');
    } else {
      isAddToMyPassengersSuccessActionHandler(responseJson.success);
      // FetchDropOffPassengers(
      //   unassignedDropOffPassengersActionHandler,
      //   userToken,
      // );
      passengerCardIdActionHandler(id);
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error with your request, please try again later.',
    );
  }
};

export default FetchAddToMyPassengers;
