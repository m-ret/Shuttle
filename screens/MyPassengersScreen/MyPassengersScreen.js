/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import {
  View,
  Linking,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { isEqual } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import FetchAssignedPassengers from '../../APICalls/FetchMyAssignedPassengers';
import FetchDropOffPickupConfirmation from '../../APICalls/FetchDropOffPickupConfirmation';
import {
  assignedPassengersDataAction,
  dropOffPickUpConfirmationSuccessAction,
} from './actions/myPassengersScreen';
import PassengersInfo from '../../components/PassengerInfo/PassengerInfo';
import {
  screenNameAction,
  holdPassengerInfoAction,
  myPassengerCardIdAction,
  myPassengerCardIdPickUpAction,
  isAddToMyPassengersSuccessAction,
} from '../HomeScreen/actions/homeScreen';
import {
  confirmationPopupAction,
  popupsModalsAction,
} from '../../components/PopupsModals/actions/popupsModals';
import Colors from '../../constants/Colors';
import globalStyles from '../../styles/GlobalStyles';
import PassengersAdded from '../../components/PassengerInfo/PassengersAdded';
import FetchUndoDropOffPickUpConfirmation from '../../APICalls/FetchUndoDropOffPickUpConfirmation';
import GoToAllPassengers from '../../components/MyPassengers/GoToAllPassengers';

class MyPassengersScreen extends Component {
  static navigationOptions = {
    title: 'MY PASSENGERS',
    headerStyle: { shadowColor: 'transparent', borderBottomWidth: 0 },
  };

  state = {
    refreshing: false,
    loadingState: false,
  };

  componentDidMount() {
    const { screenNameActionHandler } = this.props;
    screenNameActionHandler('MyPassengersScreen');

    return this.handleFetchAssignedPassengers();
  }

  shouldComponentUpdate(props, state) {
    const { refreshing, loadingState } = this.state;
    const {
      passengerInfo,
      myPassengerCardId,
      editPassengerModal,
      assignedPassengersData,
      myPassengerCardIdPickUp,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
      dropOffPickUpConfirmationSuccess,
    } = this.props;
    return (
      !isEqual(state.refreshing, refreshing) ||
      !isEqual(state.loadingState, loadingState) ||
      !isEqual(props.passengerInfo, passengerInfo) ||
      !isEqual(props.myPassengerCardId, myPassengerCardId) ||
      !isEqual(props.editPassengerModal, editPassengerModal) ||
      !isEqual(props.assignedPassengersData, assignedPassengersData) ||
      !isEqual(props.myPassengerCardIdPickUp, myPassengerCardIdPickUp) ||
      !isEqual(props.unassignedPickUpPassengers, unassignedPickUpPassengers) ||
      !isEqual(
        props.unassignedDropOffPassengers,
        unassignedDropOffPassengers,
      ) ||
      !isEqual(
        props.dropOffPickUpConfirmationSuccess,
        dropOffPickUpConfirmationSuccess,
      )
    );
  }

  componentDidUpdate(props, state) {
    const {
      myPassengerCardId,
      myPassengerCardIdPickUp,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;

    if (
      !isEqual(props.myPassengerCardId, myPassengerCardId) ||
      !isEqual(props.myPassengerCardIdPickUp, myPassengerCardIdPickUp) ||
      !isEqual(props.unassignedPickUpPassengers, unassignedPickUpPassengers) ||
      !isEqual(props.unassignedDropOffPassengers, unassignedDropOffPassengers)
    ) {
      this.handleFetchAssignedPassengers();
    }
  }

  componentWillUnmount() {
    const { assignedPassengersDataActionHandler } = this.props;
    return assignedPassengersDataActionHandler([]);
  }

  getOpacity = infoId => {
    const { myPassengerCardId, dropOffPickUpConfirmationSuccess } = this.props;
    if (
      !dropOffPickUpConfirmationSuccess &&
      myPassengerCardId &&
      !isEqual(myPassengerCardId, infoId)
    ) {
      return 0.5;
    }
    return 1;
  };

  handleFetchAssignedPassengers = async () => {
    const { navigationStore, assignedPassengersDataActionHandler } = this.props;

    this.setState({ loadingState: true });

    await FetchAssignedPassengers(
      navigationStore,
      assignedPassengersDataActionHandler,
    );

    this.setState({ loadingState: false });
  };

  callModalAndSetPassengerInfo = passengerInfo => {
    const {
      confirmationPopup,
      screenNameActionHandler,
      popupsModalsActionHandler,
      holdPassengerInfoActionHandler,
      confirmationPopupActionHandler,
    } = this.props;

    screenNameActionHandler('MyPassengersScreen');

    if (confirmationPopup) confirmationPopupActionHandler();

    popupsModalsActionHandler();
    holdPassengerInfoActionHandler(passengerInfo);
  };

  handleStartNavigating = async (
    latitude,
    longitude,
    passengerInfo,
    passengerInfoId,
  ) => {
    const {
      myPassengerCardIdActionHandler,
      holdPassengerInfoActionHandler,
      myPassengerCardIdPickUpActionHandler,
      isAddToMyPassengersSuccessActionHandler,
    } = this.props;

    const url = `https://www.google.com/maps/dir/?api=1&navigate&destination=${latitude},${longitude}`;

    isAddToMyPassengersSuccessActionHandler(false);
    myPassengerCardIdPickUpActionHandler(passengerInfoId);
    myPassengerCardIdActionHandler(passengerInfoId);

    await holdPassengerInfoActionHandler(passengerInfo);

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
      // In a future, native OS Maps App will be used in case there is no Google Maps installed in the device.
      // So you can set that functionality in the line below.
      return Linking.openURL(url);
    });
  };

  handleFetchDropOffPickupConfirmation = passengerId => {
    const {
      navigationStore,
      myPassengerCardIdActionHandler,
      assignedPassengersDataActionHandler,
      myPassengerCardIdPickUpActionHandler,
      dropOffPickUpConfirmationSuccessActionHandler,
    } = this.props;

    return FetchDropOffPickupConfirmation(
      passengerId,
      navigationStore,
      myPassengerCardIdActionHandler,
      assignedPassengersDataActionHandler,
      myPassengerCardIdPickUpActionHandler,
      dropOffPickUpConfirmationSuccessActionHandler,
    );
  };

  handleUndo = async id => {
    const {
      navigationStore,
      screenNameActionHandler,
      myPassengerCardIdActionHandler,
      assignedPassengersDataActionHandler,
      myPassengerCardIdPickUpActionHandler,
      dropOffPickUpConfirmationSuccessActionHandler,
    } = this.props;

    screenNameActionHandler('MyPassengersScreen');

    myPassengerCardIdActionHandler(null);
    myPassengerCardIdPickUpActionHandler(null);

    return FetchUndoDropOffPickUpConfirmation(
      id,
      navigationStore,
      assignedPassengersDataActionHandler,
      dropOffPickUpConfirmationSuccessActionHandler,
    );
  };

  showSuccessMessageBasedOnRoute = (nav, isSuccess, cardId) => {
    const { screenName, navigationStore } = this.props;

    return screenName === 'MyPassengersScreen' && nav && isSuccess && cardId ? (
      <PassengersAdded
        x={navigationStore.index ? 18 : 10}
        id={cardId}
        key={cardId}
        handleUndo={() => this.handleUndo(cardId)}
        buttonText={
          navigationStore.index ? 'Passenger Picked' : 'Passenger Dropped'
        }
      />
    ) : null;
  };

  render() {
    const { refreshing, loadingState } = this.state;
    const {
      navigation,
      navigationStore,
      myPassengerCardId,
      assignedPassengersData,
      myPassengerCardIdPickUp,
      dropOffPickUpConfirmationSuccess,
    } = this.props;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.handleFetchAssignedPassengers}
          />
        }
      >
        <View style={globalStyles.ContainerWithHorizontalPadding}>
          <View>
            {this.showSuccessMessageBasedOnRoute(
              !navigationStore.index,
              dropOffPickUpConfirmationSuccess,
              myPassengerCardId,
            )}
            {this.showSuccessMessageBasedOnRoute(
              navigationStore.index,
              dropOffPickUpConfirmationSuccess,
              myPassengerCardIdPickUp,
            )}
            <View style={{ marginTop: 38 }}>
              {loadingState ? (
                <View style={globalStyles.Loader}>
                  <ActivityIndicator size="large" />
                </View>
              ) : !loadingState && assignedPassengersData.length ? (
                assignedPassengersData.map(info => (
                  <View
                    key={info.id}
                    style={globalStyles.RegularStylesContainer}
                    opacity={this.getOpacity(info.id)}
                  >
                    <PassengersInfo
                      id={info.id}
                      name={info.name}
                      address={info.address}
                      datetime={info.timestamp}
                      cardinalpoint={info.cardinalpoint}
                      isBtnDisabled={this.getOpacity(info.id) !== 1}
                      callModal={() => this.callModalAndSetPassengerInfo(info)}
                      buttonText={
                        isEqual(myPassengerCardId, info.id)
                          ? 'CONFIRM DROPOFF'
                          : 'START NAVIGATING'
                      }
                      btnStyle={[
                        globalStyles.touchableBtnDropOffItem,
                        isEqual(myPassengerCardId, info.id)
                          ? globalStyles.ConfirmActionBg
                          : navigationStore.index
                          ? { backgroundColor: Colors.pickupTabColor }
                          : { backgroundColor: Colors.dropOffTabColor },
                      ]}
                      onPress={() =>
                        isEqual(myPassengerCardId, info.id)
                          ? this.handleFetchDropOffPickupConfirmation(info.id)
                          : this.handleStartNavigating(
                              info.latitude,
                              info.longitude,
                              info,
                              info.id,
                            )
                      }
                    />
                  </View>
                ))
              ) : (
                <GoToAllPassengers
                  navigationStore={navigationStore}
                  navigation={navigation}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

MyPassengersScreen.defaultProps = {
  screenName: '',
  myPassengerCardId: null,
  assignedPassengersData: [],
  myPassengerCardIdPickUp: '',
};

MyPassengersScreen.propTypes = {
  passengerInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  screenNameActionHandler: PropTypes.func.isRequired,
  screenName: PropTypes.oneOfType([PropTypes.string]),
  popupsModalsActionHandler: PropTypes.func.isRequired,
  myPassengerCardIdActionHandler: PropTypes.func.isRequired,
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  holdPassengerInfoActionHandler: PropTypes.func.isRequired,
  myPassengerCardId: PropTypes.oneOfType([PropTypes.number]),
  assignedPassengersData: PropTypes.oneOfType([PropTypes.array]),
  assignedPassengersDataActionHandler: PropTypes.func.isRequired,
  myPassengerCardIdPickUpActionHandler: PropTypes.func.isRequired,
  myPassengerCardIdPickUp: PropTypes.oneOfType([PropTypes.number]),
  isAddToMyPassengersSuccessActionHandler: PropTypes.func.isRequired,
  confirmationPopup: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  editPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  dropOffPickUpConfirmationSuccessActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
  dropOffPickUpConfirmationSuccess: PropTypes.oneOfType([PropTypes.bool])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      screenName: store.homeScreen.screenName,
      navigationStore: store.homeScreen.navigation,
      passengerInfo: store.homeScreen.passengerInfo,
      myPassengerCardId: store.homeScreen.myPassengerCardId,
      confirmationPopup: store.popupsModals.confirmationPopup,
      editPassengerModal: store.popupsModals.editPassengerModal,
      myPassengerCardIdPickUp: store.homeScreen.myPassengerCardIdPickUp,
      toggleCardOptionsModal: store.popupsModals.toggleCardOptionsModal,
      isAddToMyPassengersSuccess: store.homeScreen.isAddToMyPassengersSuccess,
      assignedPassengersData: store.myPassengersScreen.assignedPassengersData,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
      dropOffPickUpConfirmationSuccess:
        store.myPassengersScreen.dropOffPickUpConfirmationSuccess,
    }),
    dispatch => ({
      screenNameActionHandler: value => {
        dispatch(screenNameAction(value));
      },
      popupsModalsActionHandler: () => {
        dispatch(popupsModalsAction());
      },
      confirmationPopupActionHandler: () => {
        dispatch(confirmationPopupAction());
      },
      myPassengerCardIdActionHandler: passengerInfo => {
        dispatch(myPassengerCardIdAction(passengerInfo));
      },
      holdPassengerInfoActionHandler: passengerInfo => {
        dispatch(holdPassengerInfoAction(passengerInfo));
      },
      isAddToMyPassengersSuccessActionHandler: value => {
        dispatch(isAddToMyPassengersSuccessAction(value));
      },
      myPassengerCardIdPickUpActionHandler: passengerInfo => {
        dispatch(myPassengerCardIdPickUpAction(passengerInfo));
      },
      assignedPassengersDataActionHandler: assignedPassengersData => {
        dispatch(assignedPassengersDataAction(assignedPassengersData));
      },
      dropOffPickUpConfirmationSuccessActionHandler: dropOffPickUpConfirmationSuccess => {
        dispatch(
          dropOffPickUpConfirmationSuccessAction(
            dropOffPickUpConfirmationSuccess,
          ),
        );
      },
    }),
  ),
)(withNavigation(MyPassengersScreen));
