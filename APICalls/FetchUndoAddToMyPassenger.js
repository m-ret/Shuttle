import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import { API_URL } from '../constants/API';

const FetchUndoAddToMyPassenger = async (
  // These are params. So be careful before you change its order
  id,
  navigationStore,
  isAddToMyPassengersSuccessActionHandler,
) => {
  let responseJson;
  const userToken = await AsyncStorage.getItem('userToken');
  const route = navigationStore.index ? 'PickUp' : 'DropOff';
  try {
    const response = await fetch(
      `${API_URL}remove${
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

    responseJson = await response.json();

    if (has(responseJson, 'error')) {
      Alert.alert('Error', 'Unable to process your Undo request at this time.');
    } else {
      return isAddToMyPassengersSuccessActionHandler(false);
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error with your Undo request, please try again later.',
    );
  }

  return responseJson;
};

export default FetchUndoAddToMyPassenger;
