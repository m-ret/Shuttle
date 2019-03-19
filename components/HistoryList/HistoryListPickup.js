/* eslint-disable no-nested-ternary */
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FetchGetHistory from '../../APICalls/FetchGetHistory';
import { screenNameAction } from '../../screens/HomeScreen/actions/homeScreen';
import { historyDataAction } from '../../screens/HistoryScreen/actions/historyScreen';
import globalStyles from '../../styles/GlobalStyles';

class HistoryListPickUp extends Component {
  static navigationOptions = {
    title: null,
    headerStyle: { shadowColor: 'transparent', borderBottomWidth: 0 },
  };

  state = {
    refreshing: false,
    loadingState: false,
  };

  componentDidMount() {
    const { screenNameActionHandler } = this.props;
    screenNameActionHandler('HistoryListPickUp');

    return this.handleFetchGetHistory();
  }

  shouldComponentUpdate(props, state) {
    const { refreshing, loadingState } = this.state;
    const { historyData, historyNavigation } = this.props;
    return (
      !isEqual(state.refreshing, refreshing) ||
      !isEqual(props.historyData, historyData) ||
      !isEqual(state.loadingState, loadingState) ||
      !isEqual(props.historyNavigation, historyNavigation)
    );
  }

  componentDidUpdate(props, state) {
    const { historyData, historyNavigation } = this.props;

    if (
      !isEqual(props.historyData, historyData) ||
      !isEqual(props.historyNavigation, historyNavigation)
    ) {
      this.handleFetchGetHistory();
    }
  }

  componentWillUnmount() {
    const { historyDataActionHandler, screenNameActionHandler } = this.props;
    screenNameActionHandler('');
    return historyDataActionHandler([]);
  }

  handleFetchGetHistory = async () => {
    const { historyNavigation, historyDataActionHandler } = this.props;

    this.setState({ loadingState: true });

    await FetchGetHistory(historyNavigation, historyDataActionHandler);

    this.setState({ loadingState: false });
  };

  render() {
    const { historyData } = this.props;
    const { refreshing, loadingState } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.handleFetchGetHistory}
          />
        }
      >
        <View style={globalStyles.ContainerWithHorizontalPadding}>
          {loadingState ? (
            <View style={globalStyles.Loader}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <Text>{JSON.stringify(historyData)}</Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

HistoryListPickUp.defaultProps = {
  historyData: [],
};

HistoryListPickUp.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  historyNavigation: PropTypes.shape({}).isRequired,
  screenNameActionHandler: PropTypes.func.isRequired,
  historyDataActionHandler: PropTypes.func.isRequired,
  historyData: PropTypes.oneOfType([PropTypes.array]),
};

export default compose(
  connect(
    store => ({
      historyData: store.historyScreen.historyData,
      historyNavigation: store.historyScreen.historyNavigation,
    }),
    dispatch => ({
      historyDataActionHandler: data => {
        dispatch(historyDataAction(data));
      },
      screenNameActionHandler: data => {
        dispatch(screenNameAction(data));
      },
    }),
  ),
)(withNavigation(HistoryListPickUp));
