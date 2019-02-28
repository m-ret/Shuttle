import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import FetchDropOffPassengers from '../../APICalls/FetchDropOffPassengers';

import AllPassengersContainer from './AllPassengersContainer';

import { unassignedDropOffPassengersAction } from '../../screens/HomeScreen/actions/homeScreen';

class AllPassengersDropOff extends Component {
  state = {
    refreshing: false,
  };

  componentDidMount() {
    const { unassignedDropOffPassengersActionHandler, userToken } = this.props;
    FetchDropOffPassengers(unassignedDropOffPassengersActionHandler, userToken);
  }

  componentDidUpdate(prevProps, prevState) {
    const { unassignedDropOffPassengersActionHandler, userToken } = this.props;
    if (prevProps.userToken !== userToken) {
      FetchDropOffPassengers(
        unassignedDropOffPassengersActionHandler,
        userToken,
      );
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
    const { dropOffTabColor } = this.props;
    const { refreshing } = this.state;
    return (
      <ScrollView
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
};

AllPassengersDropOff.propTypes = {
  userToken: PropTypes.oneOfType([PropTypes.string]),
  navigationStore: PropTypes.shape({}).isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  dropOffTabColor: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default compose(
  connect(
    store => ({
      userToken: store.signinScreen.userToken,
      navigationStore: store.homeScreen.navigation,
      dropOffTabColor: store.homeScreen.dropOffTabColor,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      unassignedDropOffPassengersActionHandler: data => {
        dispatch(unassignedDropOffPassengersAction(data));
      },
    }),
  ),
)(AllPassengersDropOff);
