/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SceneMap } from 'react-native-tab-view';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { screenNameAction } from '../HomeScreen/actions/homeScreen';
import {
  historyDataAction,
  historyNavigationAction,
} from './actions/historyScreen';
import styles from '../../styles/HomeScreenStyles';
import TabView from '../../components/DropOffPickUpTabs/TabView';
import HistoryList from '../../components/HistoryList/HistoryList';
import HistoryListPickUp from '../../components/HistoryList/HistoryListPickup';

class HistoryScreen extends Component {
  static navigationOptions = {
    title: null,
    headerStyle: { shadowColor: 'transparent', borderBottomWidth: 0 },
  };

  componentDidMount() {
    const { screenNameActionHandler } = this.props;
    screenNameActionHandler('HistoryScreen');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  handleIndexChange = indexParam => {
    const { historyNavigationActionHandler } = this.props;
    historyNavigationActionHandler(indexParam);
  };

  renderScene = SceneMap({
    0: HistoryList,
    1: HistoryListPickUp,
  });

  render() {
    const { historyNavigation } = this.props;
    return (
      <TabView
        style={styles.container}
        whichNav={historyNavigation}
        topPadding={{ paddingTop: 0 }}
        renderSceneNav={this.renderScene}
        handleIndexChangeProp={index => this.handleIndexChange(index)}
      />
    );
  }
}

HistoryScreen.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  historyNavigation: PropTypes.shape({}).isRequired,
  screenNameActionHandler: PropTypes.func.isRequired,
  historyNavigationActionHandler: PropTypes.func.isRequired,
};

export default compose(
  connect(
    store => ({
      historyData: store.historyScreen.historyData,
      historyNavigation: store.historyScreen.historyNavigation,
    }),
    dispatch => ({
      screenNameActionHandler: data => {
        dispatch(screenNameAction(data));
      },
      historyDataActionHandler: data => {
        dispatch(historyDataAction(data));
      },
      historyNavigationActionHandler: data => {
        dispatch(historyNavigationAction(data));
      },
    }),
  ),
)(withNavigation(HistoryScreen));
