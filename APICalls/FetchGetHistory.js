import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import { API_URL } from '../constants/API';

const FetchGetHistory = async (
  // These are params. So be careful before you change its order
  historyNavigation,
  historyDataActionHandler,
) => {
  let responseJson;
  const userToken = await AsyncStorage.getItem('userToken');
  try {
    const response = await fetch(
      `${API_URL}get${historyNavigation.index ? 'PickUp' : 'DropOff'}History`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        // body: JSON.stringify({ fromdate: '', todate: '' }),
      },
    );

    responseJson = await response.json();

    if (has(responseJson, 'error')) {
      Alert.alert(
        'Error',
        'Unable to process your FetchGetHistory request at this time.',
      );
    } else {
      historyDataActionHandler(responseJson.success.data);
      console.log({ responseJson: responseJson.success });
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error with your FetchGetHistory request, please try again later.',
    );
  }

  return responseJson;
};

export default FetchGetHistory;
