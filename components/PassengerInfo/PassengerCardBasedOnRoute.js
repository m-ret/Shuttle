import { View } from 'react-native';
import React from 'react';
import { filter } from 'lodash';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PassengersInfo from './PassengerInfo';
import OptionsModal from '../PopupsModals/OptionsAlertPassenger';
import AllPassengersOptionsModal from '../PopupsModals/AllPassengersOptionsModal';

import { popupsModalsAction } from '../PopupsModals/actions/popupsModals';

const PassengerCardBasedOnRoute = ({
  navigationStore,
  passengersData,
  popupsModalsActionHandler,
  searchParam,
}) => {
  const filterByPickup = data => filter(data, ['pickup', 1]);

  const filterByDropOffTimestamp = data =>
    filter(data, ['dropofftimestamp', null]);

  return (
    <>
      <OptionsModal>{<AllPassengersOptionsModal />}</OptionsModal>
      <View>
        {console.log(
          searchParam,
          filter(filterByDropOffTimestamp(passengersData), [
            'name',
            searchParam,
          ]),
        )}
        {!navigationStore.index &&
          passengersData &&
          filterByDropOffTimestamp(passengersData).map(info => (
            <PassengersInfo
              key={info.id}
              id={info.id}
              searchParam={searchParam}
              cardinalpoint={info.cardinalpoint}
              name={info.name}
              address={info.address}
              datetime={info.timestamp}
              callModal={popupsModalsActionHandler}
            />
          ))}
        {passengersData &&
          filterByPickup(passengersData).map(info => (
            <PassengersInfo
              key={info.id}
              id={info.id}
              searchParam={searchParam}
              cardinalpoint={info.cardinalpoint}
              name={info.name}
              address={info.address}
              datetime={info.timestamp}
              callModal={popupsModalsActionHandler}
            />
          ))}
      </View>
    </>
  );
};

PassengerCardBasedOnRoute.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  passengersData: PropTypes.oneOfType([PropTypes.array]).isRequired,
  popupsModalsActionHandler: PropTypes.func.isRequired,
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      passengersData: store.homeScreen.passengersData,
      searchParam: store.homeScreen.searchParam,
    }),
    dispatch => ({
      popupsModalsActionHandler: data => {
        dispatch(popupsModalsAction(data));
      },
    }),
  ),
)(PassengerCardBasedOnRoute);
