import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import { has } from 'lodash';

import { compose } from 'redux';
import { connect } from 'react-redux';

import AllPassengersContainer from './AllPassengersContainer';
import { unassignedPickUpPassengersAction } from '../../screens/HomeScreen/actions/homeScreen';

class AllPassengersPickup extends Component {
  componentDidMount() {
    this.fetchPickupPassengers();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userToken !== this.props.userToken) {
      this.fetchPickupPassengers();
    }
  }

  fetchPickupPassengers = async () => {
    const { unassignedPickUpPassengersActionHandler, userToken } = this.props;
    if (userToken) {
      try {
        const response = await fetch(
          'http://34.235.222.72/public/api/getUnassignedPickUpPassengers',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const responseJson = await response.json();
        if (has(responseJson, 'error')) {
          Alert.alert(
            'Error',
            'There was an error trying to fetch Unassigned Pickup Passengers data. Please try again later.',
          );
        } else {
          unassignedPickUpPassengersActionHandler(responseJson.success.data);
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'There was an error while attempting to load Unassigned Pickup Passengers data. Please try again later.',
        );
      }
    }
  };

  render() {
    const { pickupTabColor } = this.props;
    return <AllPassengersContainer fill={pickupTabColor} />;
  }
}

AllPassengersPickup.defaultProps = {
  userToken: '',
};

AllPassengersPickup.propTypes = {
  userToken: PropTypes.oneOfType([PropTypes.string]),
  navigationStore: PropTypes.shape({}).isRequired,
  pickupTabColor: PropTypes.oneOfType([PropTypes.string]).isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.oneOfType([PropTypes.func])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      userToken: store.signinScreen.userToken,
      navigationStore: store.homeScreen.navigation,
      pickupTabColor: store.homeScreen.pickupTabColor,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
    }),
    dispatch => ({
      unassignedPickUpPassengersActionHandler: data => {
        dispatch(unassignedPickUpPassengersAction(data));
      },
    }),
  ),
)(AllPassengersPickup);
