import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import { API_URL } from '../constants/API';

const FetchAssignedPassengers = async (
  navigationStore,
  assignedPassengersDataActionHandler,
) => {
  let responseJson;
  const userToken = await AsyncStorage.getItem('userToken');
  const route = navigationStore.index ? 'PickUp' : 'DropOff';
  try {
    const response = await fetch(
      `${API_URL}getMy${route === 'DropOff' ? 'DropOff' : 'PickUp'}Passengers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    responseJson = await response.json();

    if (has(responseJson, 'error')) {
      Alert.alert(
        'Error',
        'Unable to process your FetchAssignedPassengers request at this time.',
      );
    } else {
      assignedPassengersDataActionHandler(responseJson.success.data);
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error with your FetchAssignedPassengers request, please try again later.',
    );
  }
};

export default FetchAssignedPassengers;
