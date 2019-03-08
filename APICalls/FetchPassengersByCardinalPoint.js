import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import { API_URL } from '../constants/API';

const FetchPassengersByCardinalPoint = async (
  cardinalpoint,
  navigationStore,
  passengersByCardinalPointDataActionHandler,
) => {
  let responseJson;
  const userToken = await AsyncStorage.getItem('userToken');
  const route = navigationStore.index ? 'PickUp' : 'DropOff';
  try {
    const response = await fetch(
      `${API_URL}get${
        route === 'DropOff' ? 'DropOff' : 'PickUp'
      }PassengersByCardinalPoint`,
      {
        method: 'POST',
        body: JSON.stringify({
          cardinalpoint,
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
      Alert.alert(
        'Error',
        'Unable to process your FetchPassengersByCardinalPoint request at this time.',
      );
    } else {
      passengersByCardinalPointDataActionHandler(responseJson.success.data);
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error with your FetchPassengersByCardinalPoint request, please try again later.',
    );
  }
};

export default FetchPassengersByCardinalPoint;
