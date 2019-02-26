import { View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { size } from 'lodash';

import PassengersInfo from './PassengerInfo';
import OptionsModal from '../PopupsModals/OptionsAlertPassenger';
import AllPassengersOptionsModal from '../PopupsModals/AllPassengersOptionsModal';
import EmptyState from '../EmptyState/EmptyState';

import { popupsModalsAction } from '../PopupsModals/actions/popupsModals';
import PassengersAdded from './PassengersAdded';

const PassengerCardBasedOnRoute = ({
  searchParam,
  passengerCardId,
  navigationStore,
  popupsModalsActionHandler,
  unassignedPickUpPassengers,
  isAddToMyPassengersSuccess,
  unassignedDropOffPassengers,
}) => {
  const filteredData = filterByParam =>
    filterByParam.filter(obj =>
      Object.keys(obj).some(key =>
        String(obj[key])
          .toLowerCase()
          .includes(searchParam.toLowerCase()),
      ),
    );

  const componentToRenderBasedOnParams = info => (
    <View key={info.id}>
      {isAddToMyPassengersSuccess && passengerCardId === info.id && (
        <PassengersAdded />
      )}
      <PassengersInfo
        id={info.id}
        name={info.name}
        address={info.address}
        datetime={info.timestamp}
        searchParam={searchParam}
        cardinalpoint={info.cardinalpoint}
        callModal={popupsModalsActionHandler}
      />
    </View>
  );

  const showFeedbackIfNoLength = data => {
    if (size(filteredData(data))) {
      filteredData(data).map(info => (
        <>{componentToRenderBasedOnParams(info)}</>
      ));
    } else {
      return <EmptyState>No records found</EmptyState>;
    }

    return filteredData(data).map(info => componentToRenderBasedOnParams(info));
  };

  return (
    <>
      <OptionsModal>{<AllPassengersOptionsModal />}</OptionsModal>
      <View>
        {!navigationStore.index && unassignedDropOffPassengers
          ? showFeedbackIfNoLength(unassignedDropOffPassengers)
          : null}

        {navigationStore.index && unassignedPickUpPassengers
          ? showFeedbackIfNoLength(unassignedPickUpPassengers)
          : null}
      </View>
    </>
  );
};

PassengerCardBasedOnRoute.defaultProps = {
  passengerCardId: '',
};

PassengerCardBasedOnRoute.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  popupsModalsActionHandler: PropTypes.func.isRequired,
  passengerCardId: PropTypes.oneOfType([PropTypes.number]),
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
  isAddToMyPassengersSuccess: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      searchParam: store.homeScreen.searchParam,
      navigationStore: store.homeScreen.navigation,
      passengersData: store.homeScreen.passengersData,
      passengerCardId: store.homeScreen.passengerCardId,
      isAddToMyPassengersSuccess: store.homeScreen.isAddToMyPassengersSuccess,
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
