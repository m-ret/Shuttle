import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import AllPassengersContainer from './AllPassengersContainer';

import FetchPickupPassengers from '../../APICalls/FetchPickupPassengers';

import { unassignedPickUpPassengersAction } from '../../screens/HomeScreen/actions/homeScreen';

class AllPassengersPickup extends Component {
  componentDidMount() {
    const { unassignedPickUpPassengersActionHandler, userToken } = this.props;
    FetchPickupPassengers(unassignedPickUpPassengersActionHandler, userToken);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  componentDidUpdate(prevProps, prevState) {
    const { unassignedPickUpPassengersActionHandler, userToken } = this.props;
    if (prevProps.userToken !== this.props.userToken) {
      FetchPickupPassengers(unassignedPickUpPassengersActionHandler, userToken);
    }
  }

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
