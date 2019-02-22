import React, { Component } from 'react';
import TabView from '../../components/DropOffPickUpTabs/TabView';

import styles from '../../styles/HomeScreenStyles';

export default class PickupAllPassengersScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return <TabView style={styles.container} />;
  }
}
