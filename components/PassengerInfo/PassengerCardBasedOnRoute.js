import { View } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { size } from 'lodash';

import PassengersInfo from './PassengerInfo';

import EmptyState from '../EmptyState/EmptyState';

import {
  popupsModalsAction,
  confirmationPopupAction,
} from '../PopupsModals/actions/popupsModals';

import { holdPassengerInfoAction } from '../../screens/HomeScreen/actions/homeScreen';

import CardOptionsModalParent from '../PopupsModals/CardOptionsModalParent';
import ConfirmationPopupParent from '../PopupsModals/ConfirmationPopupParent';
import PassengerFormModalParent from '../PopupsModals/PassengerFormModalParent';

class PassengerCardBasedOnRoute extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const {
      searchParam,
      passengerInfo,
      navigationStore,
      confirmationPopup,
      toggleCardOptionsModal,
      popupsModalsActionHandler,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
      confirmationPopupActionHandler,
      holdPassengerInfoActionHandler,
    } = this.props;

    return (
      nextProps.confirmationPopupActionHandler !==
        confirmationPopupActionHandler ||
      nextProps.holdPassengerInfoActionHandler !==
        holdPassengerInfoActionHandler ||
      nextProps.searchParam !== searchParam ||
      nextProps.passengerInfo !== passengerInfo ||
      nextProps.navigationStore !== navigationStore ||
      nextProps.confirmationPopup !== confirmationPopup ||
      nextProps.toggleCardOptionsModal !== toggleCardOptionsModal ||
      nextProps.popupsModalsActionHandler !== popupsModalsActionHandler ||
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

  callModalAndSetPassengerInfo = passengerInfo => {
    const {
      confirmationPopup,
      popupsModalsActionHandler,
      holdPassengerInfoActionHandler,
      confirmationPopupActionHandler,
    } = this.props;

    if (confirmationPopup) confirmationPopupActionHandler();

    popupsModalsActionHandler();
    holdPassengerInfoActionHandler(passengerInfo);
  };

  componentToRenderBasedOnParams = info => {
    const { searchParam } = this.props;
    return (
      <View key={info.id}>
        <PassengersInfo
          id={info.id}
          name={info.name}
          address={info.address}
          datetime={info.timestamp}
          searchParam={searchParam}
          cardinalpoint={info.cardinalpoint}
          callModal={() => this.callModalAndSetPassengerInfo(info)}
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
        <View style={{ marginTop: 38 }}>
          {!navigationStore.index && unassignedDropOffPassengers
            ? this.showFeedbackIfNoLength(unassignedDropOffPassengers)
            : null}

          {navigationStore.index && unassignedPickUpPassengers
            ? this.showFeedbackIfNoLength(unassignedPickUpPassengers)
            : null}
        </View>
        <CardOptionsModalParent />
        <ConfirmationPopupParent />
        <PassengerFormModalParent />
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
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  holdPassengerInfoActionHandler: PropTypes.func.isRequired,
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
  confirmationPopup: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
  toggleCardOptionsModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default compose(
  connect(
    store => ({
      searchParam: store.homeScreen.searchParam,
      navigationStore: store.homeScreen.navigation,
      passengerInfo: store.homeScreen.passengerInfo,
      confirmationPopup: store.popupsModals.confirmationPopup,
      toggleCardOptionsModal: store.popupsModals.toggleCardOptionsModal,
      isDeletePassengerSuccess: store.homeScreen.isDeletePassengerSuccess,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      holdPassengerInfoActionHandler: passengerInfo => {
        dispatch(holdPassengerInfoAction(passengerInfo));
      },
      popupsModalsActionHandler: () => {
        dispatch(popupsModalsAction());
      },
      confirmationPopupActionHandler: () => {
        dispatch(confirmationPopupAction());
      },
    }),
  ),
)(PassengerCardBasedOnRoute);
