import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { SceneMap } from 'react-native-tab-view';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { withNavigation } from 'react-navigation';

import { Constants } from 'expo';
import TabView from '../../components/DropOffPickUpTabs/TabView';

import styles from '../../styles/HomeScreenStyles';

import AllPassengersPickUp from '../../components/DropOffPickUpTabs/AllPassengersPickup';
import AllPassengersDropOff from '../../components/DropOffPickUpTabs/AllPassengersDropOff';

import { indexRouteAction } from './actions/homeScreen';

import registerForPushNotificationsAsync from '../../APICalls/FetchPushNotifications';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    registerForPushNotificationsAsync();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  handleIndexChange = async indexParam => {
    const { navigation, indexRouteActionHandler } = this.props;
    await indexRouteActionHandler(indexParam);
    return indexParam
      ? navigation.navigate('App2')
      : navigation.navigate('App');
  };

  renderScene = SceneMap({
    0: AllPassengersDropOff,
    1: AllPassengersPickUp,
  });

  render() {
    const { navigationStore } = this.props;
    return (
      <TabView
        style={styles.container}
        whichNav={navigationStore}
        renderSceneNav={this.renderScene}
        topPadding={{ paddingTop: Constants.statusBarHeight }}
        handleIndexChangeProp={index => this.handleIndexChange(index)}
      />
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  indexRouteActionHandler: PropTypes.func.isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
    }),
    dispatch => ({
      indexRouteActionHandler: data => {
        dispatch(indexRouteAction(data));
      },
    }),
  ),
)(withNavigation(HomeScreen));
