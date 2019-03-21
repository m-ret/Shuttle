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

import {
  screenNameAction,
  passengerNameAction,
  passengerCardIdAction,
  holdPassengerInfoAction,
  pickupPassengerNameAction,
  pickupPassengerCardIdAction,
  isAddToMyPassengersSuccessAction,
  unassignedPickUpPassengersAction,
  unassignedDropOffPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

import FetchAddToMyPassengers from '../../APICalls/FetchAddToMyPassengers';

import { passengersByCardinalPointDataAction } from '../../screens/PassengersByCardinalPoint/actions/passengersByCardinalPoint';

import globalStyles from '../../styles/GlobalStyles';
import Colors from '../../constants/Colors';

class PassengerCardBasedOnRoute extends Component {
  componentDidMount() {
    const { screenNameActionHandler } = this.props;
    screenNameActionHandler('PassengerCardBasedOnRoute');
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      searchParam,
      passengerInfo,
      navigationStore,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;

    return (
      nextProps.searchParam !== searchParam ||
      nextProps.passengerInfo !== passengerInfo ||
      nextProps.navigationStore !== navigationStore ||
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

  callModalAndSetPassengerInfo = async passengerInfo => {
    const {
      confirmationPopup,
      screenNameActionHandler,
      popupsModalsActionHandler,
      holdPassengerInfoActionHandler,
      confirmationPopupActionHandler,
    } = this.props;

    await screenNameActionHandler('PassengerCardBasedOnRoute');

    if (confirmationPopup) confirmationPopupActionHandler();

    popupsModalsActionHandler();
    holdPassengerInfoActionHandler(passengerInfo);
  };

  handleAddToMyPassengers = async (id, name) => {
    const {
      navigationStore,
      passengersGoingTo,
      screenNameActionHandler,
      passengerNameActionHandler,
      passengerCardIdActionHandler,
      pickupPassengerNameActionHandler,
      pickupPassengerCardIdActionHandler,
      isAddToMyPassengersSuccessActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      passengersByCardinalPointDataActionHandler,
    } = this.props;

    await screenNameActionHandler('PassengerCardBasedOnRoute');

    return FetchAddToMyPassengers(
      id,
      name,
      navigationStore,
      passengersGoingTo,
      passengerNameActionHandler,
      passengerCardIdActionHandler,
      pickupPassengerNameActionHandler,
      pickupPassengerCardIdActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      isAddToMyPassengersSuccessActionHandler,
      passengersByCardinalPointDataActionHandler,
    );
  };

  componentToRenderBasedOnParams = info => {
    const { searchParam, navigationStore } = this.props;

    return (
      <View key={info.id}>
        <PassengersInfo
          id={info.id}
          name={info.name}
          address={info.address}
          datetime={info.timestamp}
          searchParam={searchParam}
          buttonText="ADD TO MY PASSENGERS"
          cardinalpoint={info.cardinalpoint}
          onPress={() => this.handleAddToMyPassengers(info.id, info.name)}
          callModal={() => this.callModalAndSetPassengerInfo(info)}
          btnStyle={[
            globalStyles.touchableBtnDropOffItem,
            {
              backgroundColor: navigationStore.index
                ? Colors.pickupTabColor
                : Colors.dropOffTabColor,
            },
          ]}
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
      </>
    );
  }
}

PassengerCardBasedOnRoute.defaultProps = {
  passengersGoingTo: '',
  searchParam: undefined,
};

PassengerCardBasedOnRoute.propTypes = {
  passengerInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  screenNameActionHandler: PropTypes.func.isRequired,
  popupsModalsActionHandler: PropTypes.func.isRequired,
  searchParam: PropTypes.oneOfType([PropTypes.string]),
  passengerNameActionHandler: PropTypes.func.isRequired,
  passengerCardIdActionHandler: PropTypes.func.isRequired,
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  holdPassengerInfoActionHandler: PropTypes.func.isRequired,
  passengersGoingTo: PropTypes.oneOfType([PropTypes.string]),
  pickupPassengerNameActionHandler: PropTypes.func.isRequired,
  pickupPassengerCardIdActionHandler: PropTypes.func.isRequired,
  isAddToMyPassengersSuccessActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  confirmationPopup: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  passengersByCardinalPointDataActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      searchParam: store.homeScreen.searchParam,
      navigationStore: store.homeScreen.navigation,
      passengerInfo: store.homeScreen.passengerInfo,
      passengerCardId: store.homeScreen.passengerCardId,
      passengersGoingTo: store.homeScreen.passengersGoingTo,
      confirmationPopup: store.popupsModals.confirmationPopup,
      pickupPassengerCardId: store.homeScreen.pickupPassengerCardId,
      isAddToMyPassengersSuccess: store.homeScreen.isAddToMyPassengersSuccess,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      screenNameActionHandler: screenName => {
        dispatch(screenNameAction(screenName));
      },
      popupsModalsActionHandler: () => {
        dispatch(popupsModalsAction());
      },
      passengerCardIdActionHandler: id => {
        dispatch(passengerCardIdAction(id));
      },
      confirmationPopupActionHandler: () => {
        dispatch(confirmationPopupAction());
      },
      passengerNameActionHandler: name => {
        dispatch(passengerNameAction(name));
      },
      pickupPassengerCardIdActionHandler: id => {
        dispatch(pickupPassengerCardIdAction(id));
      },
      pickupPassengerNameActionHandler: name => {
        dispatch(pickupPassengerNameAction(name));
      },
      holdPassengerInfoActionHandler: passengerInfo => {
        dispatch(holdPassengerInfoAction(passengerInfo));
      },
      unassignedPickUpPassengersActionHandler: data => {
        dispatch(unassignedPickUpPassengersAction(data));
      },
      unassignedDropOffPassengersActionHandler: data => {
        dispatch(unassignedDropOffPassengersAction(data));
      },
      passengersByCardinalPointDataActionHandler: data => {
        dispatch(passengersByCardinalPointDataAction(data));
      },
      isAddToMyPassengersSuccessActionHandler: isAddToMyPassengersSuccess => {
        dispatch(isAddToMyPassengersSuccessAction(isAddToMyPassengersSuccess));
      },
    }),
  ),
)(PassengerCardBasedOnRoute);
