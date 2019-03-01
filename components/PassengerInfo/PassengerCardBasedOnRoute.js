import { View, Linking } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { size } from 'lodash';

import PassengersInfo from './PassengerInfo';

import EmptyState from '../EmptyState/EmptyState';

import { popupsModalsAction } from '../PopupsModals/actions/popupsModals';
import FetchDeletePassenger from '../../APICalls/FetchDeletePassenger';

import {
  passengerCardIdAction,
  pickupPassengerCardIdAction,
  isDeletePassengerSuccessAction,
  unassignedPickUpPassengersAction,
  unassignedDropOffPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

import AllPassengersOptionsModal from '../PopupsModals/AllPassengersOptionsModal';
import OptionsModal from '../PopupsModals/OptionsAlertPassenger';

class PassengerCardBasedOnRoute extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const {
      searchParam,
      passengerInfo,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;

    return (
      nextProps.searchParam !== searchParam ||
      nextProps.passengerInfo !== passengerInfo ||
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

  handleDeletePassenger = async id => {
    const {
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

    popupsModalsActionHandler(id);
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
          callModal={() => popupsModalsActionHandler(info)}
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
      passengerInfo,
      navigationStore,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;
    return (
      <>
        <View>
          {passengerInfo && (
            <OptionsModal>
              {
                <AllPassengersOptionsModal
                  id={passengerInfo.id}
                  handleDeleteOptionsModal={() =>
                    this.handleDeletePassenger(passengerInfo.id)
                  }
                  handleCallOptionsModal={() =>
                    Linking.openURL(`tel:${passengerInfo.phone}`)
                  }
                />
              }
            </OptionsModal>
          )}
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
  passengerInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  popupsModalsActionHandler: PropTypes.func.isRequired,
  passengerCardIdActionHandler: PropTypes.func.isRequired,
  pickupPassengerCardIdActionHandler: PropTypes.func.isRequired,
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
  isDeletePassengerSuccessActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default compose(
  connect(
    store => ({
      searchParam: store.homeScreen.searchParam,
      navigationStore: store.homeScreen.navigation,
      passengerInfo: store.popupsModals.passengerInfo,
      passengerCardId: store.homeScreen.passengerCardId,
      pickupPassengerCardId: store.homeScreen.pickupPassengerCardId,
      toggleCardOptionsModal: store.popupsModals.toggleCardOptionsModal,
      isDeletePassengerSuccess: store.homeScreen.isDeletePassengerSuccess,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      popupsModalsActionHandler: data => {
        dispatch(popupsModalsAction(data));
      },
      passengerCardIdActionHandler: id => {
        dispatch(passengerCardIdAction(id));
      },
      pickupPassengerCardIdActionHandler: id => {
        dispatch(pickupPassengerCardIdAction(id));
      },
      unassignedPickUpPassengersActionHandler: data => {
        dispatch(unassignedPickUpPassengersAction(data));
      },
      unassignedDropOffPassengersActionHandler: data => {
        dispatch(unassignedDropOffPassengersAction(data));
      },
      isDeletePassengerSuccessActionHandler: isSuccess => {
        dispatch(isDeletePassengerSuccessAction(isSuccess));
      },
    }),
  ),
)(PassengerCardBasedOnRoute);
