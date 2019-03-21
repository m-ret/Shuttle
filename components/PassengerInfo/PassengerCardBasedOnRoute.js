import { View } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { size, findLastIndex } from 'lodash';

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
  state = { opacity: 1, lastIndexOpacity: 1 };

  componentDidMount() {
    const { screenNameActionHandler } = this.props;
    screenNameActionHandler('PassengerCardBasedOnRoute');
  }

  shouldComponentUpdate(nextProps, state) {
    const {
      searchParam,
      passengerInfo,
      navigationStore,
      pushNotificationData,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;

    const { opacity, lastIndexOpacity } = this.state;

    return (
      state.opacity !== opacity ||
      nextProps.searchParam !== searchParam ||
      nextProps.passengerInfo !== passengerInfo ||
      state.lastIndexOpacity !== lastIndexOpacity ||
      nextProps.navigationStore !== navigationStore ||
      nextProps.pushNotificationData !== pushNotificationData ||
      nextProps.unassignedPickUpPassengers !== unassignedPickUpPassengers ||
      nextProps.unassignedDropOffPassengers !== unassignedDropOffPassengers
    );
  }

  componentDidUpdate(props, state) {
    const {
      pushNotificationData,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;
    if (props.pushNotificationData !== pushNotificationData) {
      this.applyOpacityForSomeSeconds(0.5);
    }
    if (
      props.unassignedPickUpPassengers !== unassignedPickUpPassengers ||
      props.unassignedDropOffPassengers !== unassignedDropOffPassengers
    ) {
      setTimeout(() => {
        this.applyOpacityForSomeSeconds(1);
      }, 1500);
    }
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

  applyOpacityForSomeSeconds = setOpacity =>
    this.setState({ lastIndexOpacity: setOpacity });

  componentToRenderBasedOnParams = (info, lastIndex, index) => {
    const { opacity, lastIndexOpacity } = this.state;
    const { searchParam, navigationStore } = this.props;

    return (
      <View
        key={info.id}
        opacity={lastIndex === index ? lastIndexOpacity : opacity}
      >
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
    const lastIndex = findLastIndex(data);
    console.log({ lastIndex });
    if (size(this.filteredData(data))) {
      this.filteredData(data).map(info =>
        this.componentToRenderBasedOnParams(info),
      );
    } else {
      return <EmptyState>No records found</EmptyState>;
    }

    return this.filteredData(data).map((info, index) => {
      console.log({ lastIndex, index });
      return this.componentToRenderBasedOnParams(info, lastIndex, index);
    });
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
  pushNotificationData: {},
};

PassengerCardBasedOnRoute.propTypes = {
  passengerInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  pushNotificationData: PropTypes.shape({}),
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
      pushNotificationData: store.globalStore.pushNotificationData,
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
