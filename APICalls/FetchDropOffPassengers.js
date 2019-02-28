import { Alert } from 'react-native';

import { has } from 'lodash';

import { API_URL } from '../constants/API';

const FetchDropOffPassengers = async (
  unassignedDropOffPassengersActionHandler,
  userToken,
) => {
  if (userToken) {
    try {
      console.log('CALLING');
      const response = await fetch(`${API_URL}getUnassignedDropOffPassengers`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJson = await response.json();
      if (has(responseJson, 'error')) {
        Alert.alert(
          'Error',
          'There was an error trying to fetch Unassigned DropOff Passengers data. Please try again later.',
        );
      } else {
        console.log({ response: responseJson.success.data });
        unassignedDropOffPassengersActionHandler(responseJson.success.data);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error while attempting to load Unassigned DropOff Passengers data. Please try again later.',
      );
    }
  }
};

export default FetchDropOffPassengers;
