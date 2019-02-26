import React, { Component } from 'react';
import TabView from '../../components/DropOffPickUpTabs/TabView';

import styles from '../../styles/HomeScreenStyles';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  render() {
    return <TabView style={styles.container} />;
  }
}

export default HomeScreen;
