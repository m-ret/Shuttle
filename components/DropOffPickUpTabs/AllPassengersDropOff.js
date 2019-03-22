import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { size } from 'lodash';

import FetchDropOffPassengers from '../../APICalls/FetchDropOffPassengers';

import AllPassengersContainer from './AllPassengersContainer';

import { unassignedDropOffPassengersAction } from '../../screens/HomeScreen/actions/homeScreen';

import { pushNotificationDataAction } from '../../screens/GlobalStoreRedux/actions/GlobalStore';

class AllPassengersDropOff extends Component {
  state = { refreshing: false };

  componentDidMount() {
    const { unassignedDropOffPassengersActionHandler, userToken } = this.props;
    FetchDropOffPassengers(unassignedDropOffPassengersActionHandler, userToken);
  }

  shouldComponentUpdate(props, state) {
    const { refreshing } = this.state;
    const { pushNotificationData, userToken } = this.props;

    return (
      props.userToken !== userToken ||
      state.refreshing !== refreshing ||
      props.pushNotificationData !== pushNotificationData
    );
  }

  async componentDidUpdate(prevProps, prevState) {
    const {
      userToken,
      pushNotificationData,
      unassignedDropOffPassengersActionHandler,
    } = this.props;
    if (prevProps.userToken !== userToken) {
      FetchDropOffPassengers(
        unassignedDropOffPassengersActionHandler,
        userToken,
      );
    }
    if (prevProps.pushNotificationData !== pushNotificationData) {
      if (size(pushNotificationData)) {
        FetchDropOffPassengers(
          unassignedDropOffPassengersActionHandler,
          userToken,
        );
      }
    }
  }

  onRefresh = async () => {
    const { unassignedDropOffPassengersActionHandler, userToken } = this.props;
    this.setState({ refreshing: true });
    await FetchDropOffPassengers(
      unassignedDropOffPassengersActionHandler,
      userToken,
    );
    this.setState({ refreshing: false });
  };

  render() {
    const {
      dropOffTabColor,
      pushNotificationData,
      pushNotificationDataActionHandler,
    } = this.props;
    const { refreshing } = this.state;
    return (
      <ScrollView
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={(contentWidth, contentHeight) => {
          return pushNotificationData.origin === 'selected'
            ? (this.scrollView.scrollToEnd({ animated: true }),
              pushNotificationDataActionHandler({}))
            : null;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
        <AllPassengersContainer fill={dropOffTabColor} />
      </ScrollView>
    );
  }
}

AllPassengersDropOff.defaultProps = {
  userToken: '',
  pushNotificationData: {},
};

AllPassengersDropOff.propTypes = {
  pushNotificationData: PropTypes.shape({}),
  navigationStore: PropTypes.shape({}).isRequired,
  userToken: PropTypes.oneOfType([PropTypes.string]),
  pushNotificationDataActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  dropOffTabColor: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default compose(
  connect(
    store => ({
      userToken: store.signinScreen.userToken,
      navigationStore: store.homeScreen.navigation,
      dropOffTabColor: store.homeScreen.dropOffTabColor,
      pushNotificationData: store.globalStore.pushNotificationData,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      unassignedDropOffPassengersActionHandler: data => {
        dispatch(unassignedDropOffPassengersAction(data));
      },
      pushNotificationDataActionHandler: data => {
        dispatch(pushNotificationDataAction(data));
      },
    }),
  ),
)(AllPassengersDropOff);
