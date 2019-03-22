/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';

import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import PropTypes from 'prop-types';

import { isEqual } from 'lodash';

import { withNavigation } from 'react-navigation';

import { compose } from 'redux';
import { connect } from 'react-redux';

import globalStyles from '../../styles/GlobalStyles';

import FetchGetHistory from '../../APICalls/FetchGetHistory';

import { screenNameAction } from '../../screens/HomeScreen/actions/homeScreen';
import { historyDataAction } from '../../screens/HistoryScreen/actions/historyScreen';

import HistoryScreenStyles from '../../styles/HistoryScreenStyles';
import HistoryPassengerCard from '../HistoryPassengerCard/HistoryPassengerCard';
import HistoryFiltersButtons from '../HistoryFiltersButtons/HistoryFiltersButtons';

class HistoryList extends Component {
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
    screenNameActionHandler('HistoryList');

    return this.handleFetchGetHistory();
  }

  shouldComponentUpdate(props, state) {
    const { refreshing, loadingState } = this.state;
    const { historyData, historyNavigation, minDate, maxDate } = this.props;
    return (
      !isEqual(props.minDate, minDate) ||
      !isEqual(props.maxDate, maxDate) ||
      !isEqual(state.refreshing, refreshing) ||
      !isEqual(props.historyData, historyData) ||
      !isEqual(state.loadingState, loadingState) ||
      !isEqual(props.historyNavigation, historyNavigation)
    );
  }

  componentDidUpdate(props, state) {
    const { historyNavigation, minDate, maxDate } = this.props;

    if (
      !isEqual(props.historyNavigation, historyNavigation) ||
      !isEqual(props.minDate, minDate) ||
      !isEqual(props.maxDate, maxDate)
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
    const {
      minDate,
      maxDate,
      historyNavigation,
      historyDataActionHandler,
    } = this.props;

    this.setState({ loadingState: true });

    await FetchGetHistory(
      minDate,
      maxDate,
      historyNavigation,
      historyDataActionHandler,
    );

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
          <HistoryFiltersButtons />

          {loadingState ? (
            <View
              style={[
                globalStyles.Loader,
                { flex: 1, justifyContent: 'center', marginTop: 50 },
              ]}
            >
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View style={HistoryScreenStyles.Wrapper}>
              {historyData && historyData.length
                ? historyData.map((info, index) => (
                    <HistoryPassengerCard
                      info={info}
                      key={info.id}
                      index={index}
                      pickUpOrDropOffText="Dropped"
                      pickUpOrDropOffTime={info.dropofftimestamp}
                    />
                  ))
                : null}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

HistoryList.defaultProps = {
  minDate: '',
  maxDate: '',
  historyData: [],
};

HistoryList.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  minDate: PropTypes.oneOfType([PropTypes.string]),
  maxDate: PropTypes.oneOfType([PropTypes.string]),
  historyNavigation: PropTypes.shape({}).isRequired,
  screenNameActionHandler: PropTypes.func.isRequired,
  historyDataActionHandler: PropTypes.func.isRequired,
  historyData: PropTypes.oneOfType([PropTypes.array]),
};

export default compose(
  connect(
    store => ({
      minDate: store.historyScreen.minDate,
      maxDate: store.historyScreen.maxDate,
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
)(withNavigation(HistoryList));
