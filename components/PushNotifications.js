import React from 'react';
import { Notifications } from 'expo';
import { Text, View } from 'react-native';

// This refers to the function defined earlier in this guide
import registerForPushNotificationsAsync from '../APICalls/FetchPushNotifications';

export default class AppContainer extends React.Component {
  state = {
    notification: {},
  };

  componentDidMount() {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this.notificationSubscription = Notifications.addListener(
      this.handleNotification,
    );
  }

  handleNotification = notification => {
    this.setState({ notification });
  };

  render() {
    const { notification } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Origin: {notification.origin}</Text>
        <Text>Data: {JSON.stringify(notification.data)}</Text>
      </View>
    );
  }
}
