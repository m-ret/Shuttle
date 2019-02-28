import { View } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { size } from 'lodash';

import PassengersInfo from './PassengerInfo';

import EmptyState from '../EmptyState/EmptyState';

import { popupsModalsAction } from '../PopupsModals/actions/popupsModals';
import FetchDeletePassenger from "../../APICalls/FetchDeletePassenger";

class PassengerCardBasedOnRoute extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const {
      searchParam,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;

    return (
      nextProps.searchParam !== searchParam ||
      nextProps.unassignedPickUpPassengers !== unassignedPickUpPassengers ||
      nextProps.unassignedDropOffPassengers !== unassignedDropOffPassengers
    );
  }

  filteredData = filterByParam => {
    const { searchParam } = this.props;
    return filterByParam.filter(obj =>
      Object.keys(obj).some(key =>
        String(obj[key])
          .toLowerCase()
          .includes(searchParam.toLowerCase()),
      ),
    );
  };

  handleDeletePassenger = async () => {
    const {
      id,
      navigationStore,
      popupsModalsActionHandler,
      passengerCardIdActionHandler,
      pickupPassengerCardIdActionHandler,
      isDeletePassengerSuccessActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
    } = this.props;
    await FetchDeletePassenger(
      id,
      navigationStore,
      passengerCardIdActionHandler,
      pickupPassengerCardIdActionHandler,
      isDeletePassengerSuccessActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
    );

    popupsModalsActionHandler();
  };

  componentToRenderBasedOnParams = info => {
    const { popupsModalsActionHandler, searchParam } = this.props;
    return (
      <View key={info.id}>
        <PassengersInfo
          id={info.id}
          name={info.name}
          address={info.address}
          datetime={info.timestamp}
          searchParam={searchParam}
          cardinalpoint={info.cardinalpoint}
          callModal={popupsModalsActionHandler}
          handleDeleteOptionsModal={this.handleDeletePassenger}
        />
      </View>
    );
  };

  showFeedbackIfNoLength = data => {
    if (size(this.filteredData(data))) {
      this.filteredData(data).map(info =>
        this.componentToRenderBasedOnParams(info),
      );
    } else {
      return <EmptyState>No records found</EmptyState>;
    }

    return this.filteredData(data).map(info =>
      this.componentToRenderBasedOnParams(info),
    );
  };

  render() {
    const {
      navigationStore,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;
    return (
      <>
        <View>
          {!navigationStore.index && unassignedDropOffPassengers
            ? this.showFeedbackIfNoLength(unassignedDropOffPassengers)
            : null}

          {navigationStore.index && unassignedPickUpPassengers
            ? this.showFeedbackIfNoLength(unassignedPickUpPassengers)
            : null}
        </View>
      </>
    );
  }
}

PassengerCardBasedOnRoute.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  popupsModalsActionHandler: PropTypes.func.isRequired,
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      searchParam: store.homeScreen.searchParam,
      navigationStore: store.homeScreen.navigation,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      popupsModalsActionHandler: data => {
        dispatch(popupsModalsAction(data));
      },
    }),
  ),
)(PassengerCardBasedOnRoute);
