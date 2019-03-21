import { Permissions, Notifications } from 'expo';

import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import { API_URL } from '../constants/API';

const PUSH_ENDPOINT = `${API_URL}addPushNotificationToken`;

const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ token }),
    });
    console.log({ token });
    const responseJson = await response.json();
    if (has(responseJson, 'error')) {
      Alert.alert(
        'Error',
        'There was an error trying to fetch registerForPushNotificationsAsync. Please try again later.',
      );
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error while attempting to fetch registerForPushNotificationsAsync. Please try again later.',
    );
  }
};

export default registerForPushNotificationsAsync;
