import React, { Component } from 'react';
import {
  View,
  Linking,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import FetchAssignedPassengers from '../../APICalls/FetchMyAssignedPassengers';
import FetchDropOffPickupConfirmation from '../../APICalls/FetchDropOffPickupConfirmation';

import {
  assignedPassengersDataAction,
  dropOffPickUpConfirmationSuccessAction,
} from './actions/myPassengersScreen';

import PassengersInfo from '../../components/PassengerInfo/PassengerInfo';

import {
  holdPassengerInfoAction,
  passengerCardIdAction,
  screenNameAction,
} from '../HomeScreen/actions/homeScreen';

import {
  confirmationPopupAction,
  popupsModalsAction,
} from '../../components/PopupsModals/actions/popupsModals';

import globalStyles from '../../styles/GlobalStyles';
import Colors from '../../constants/Colors';
import PassengersAdded from '../../components/PassengerInfo/PassengersAdded';
import FetchUndoDropOffPickUpConfirmation from '../../APICalls/FetchUndoDropOffPickUpConfirmation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class MyPassengersScreen extends Component {
  static navigationOptions = {
    title: 'MY PASSENGERS',
    headerStyle: { shadowColor: 'transparent', borderBottomWidth: 0 },
  };

  state = {
    refreshing: false,
  };

  componentDidMount() {
    const { screenNameActionHandler } = this.props;
    screenNameActionHandler('MyPassengersScreen');
    return this.handleFetchAssignedPassengers();
  }

  shouldComponentUpdate(props, state) {
    const { refreshing } = this.state;
    const {
      passengerInfo,
      passengerCardId,
      editPassengerModal,
      assignedPassengersData,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;
    return (
      state.refreshing !== refreshing ||
      props.passengerInfo !== passengerInfo ||
      props.passengerCardId !== passengerCardId ||
      props.editPassengerModal !== editPassengerModal ||
      props.assignedPassengersData !== assignedPassengersData ||
      props.unassignedPickUpPassengers !== unassignedPickUpPassengers ||
      props.unassignedDropOffPassengers !== unassignedDropOffPassengers
    );
  }

  componentDidUpdate(props, state) {
    const {
      passengerCardId,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;

    if (
      props.passengerCardId !== passengerCardId ||
      props.unassignedPickUpPassengers !== unassignedPickUpPassengers ||
      props.unassignedDropOffPassengers !== unassignedDropOffPassengers
    ) {
      this.handleFetchAssignedPassengers();
    }
  }

  componentWillUnmount() {
    const { assignedPassengersDataActionHandler } = this.props;

    return assignedPassengersDataActionHandler([]);
  }

  handleFetchAssignedPassengers = () => {
    const { navigationStore, assignedPassengersDataActionHandler } = this.props;

    return FetchAssignedPassengers(
      navigationStore,
      assignedPassengersDataActionHandler,
    );
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
      passengerCardIdActionHandler,
      holdPassengerInfoActionHandler,
    } = this.props;

    const url = `https://www.google.com/maps/dir/?api=1&navigate&destination=${latitude},${longitude}`;

    await passengerCardIdActionHandler(passengerInfoId);
    await holdPassengerInfoActionHandler(passengerInfo);

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }

      return Linking.openURL(url);
    });
  };

  handleFetchDropOffPickupConfirmation = passengerId => {
    const {
      navigationStore,
      assignedPassengersDataActionHandler,
      dropOffPickUpConfirmationSuccessActionHandler,
    } = this.props;

    return FetchDropOffPickupConfirmation(
      passengerId,
      navigationStore,
      assignedPassengersDataActionHandler,
      dropOffPickUpConfirmationSuccessActionHandler,
    );
  };

  handleUndo = async id => {
    const {
      navigationStore,
      screenNameActionHandler,
      passengerCardIdActionHandler,
      assignedPassengersDataActionHandler,
      dropOffPickUpConfirmationSuccessActionHandler,
    } = this.props;

    screenNameActionHandler('MyPassengersScreen');

    passengerCardIdActionHandler(null);

    return FetchUndoDropOffPickUpConfirmation(
      id,
      navigationStore,
      assignedPassengersDataActionHandler,
      dropOffPickUpConfirmationSuccessActionHandler,
    );
  };

  getOpacity = infoId => {
    const { passengerCardId, dropOffPickUpConfirmationSuccess } = this.props;

    if (
      !dropOffPickUpConfirmationSuccess &&
      passengerCardId &&
      infoId !== passengerCardId
    ) {
      return 0.5;
    }

    return 1;
  };

  render() {
    const { refreshing } = this.state;
    const {
      screenName,
      passengerCardId,
      navigationStore,
      assignedPassengersData,
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
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <View>
            {screenName === 'MyPassengersScreen' &&
              passengerCardId &&
              dropOffPickUpConfirmationSuccess && (
                <PassengersAdded
                  id={passengerCardId}
                  key={passengerCardId}
                  handleUndo={() => this.handleUndo(passengerCardId)}
                />
              )}
            <View style={{ marginTop: 38 }}>
              {assignedPassengersData && assignedPassengersData.length ? (
                assignedPassengersData.map(info => (
                  <View
                    key={info.id}
                    style={styles.container}
                    opacity={this.getOpacity(info.id)}
                  >
                    <PassengersInfo
                      id={info.id}
                      name={info.name}
                      address={info.address}
                      datetime={info.timestamp}
                      cardinalpoint={info.cardinalpoint}
                      callModal={() => this.callModalAndSetPassengerInfo(info)}
                      buttonText={
                        passengerCardId === info.id
                          ? 'CONFIRM DROPOFF'
                          : 'START NAVIGATING'
                      }
                      btnStyle={[
                        globalStyles.touchableBtnDropOffItem,
                        passengerCardId === info.id
                          ? { backgroundColor: '#263238' }
                          : navigationStore.index
                          ? { backgroundColor: Colors.pickupTabColor }
                          : { backgroundColor: Colors.dropOffTabColor },
                      ]}
                      onPress={() =>
                        passengerCardId === info.id
                          ? this.handleFetchDropOffPickupConfirmation(info.id)
                          : this.handleStartNavigating(
                              info.latitude,
                              info.longitude,
                              info,
                              info.id,
                            )
                      }
                      isBtnDisabled={this.getOpacity(info.id) !== 1}
                    />
                  </View>
                ))
              ) : (
                <View style={globalStyles.Loader}>
                  <ActivityIndicator size="large" />
                </View>
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
  passengerCardId: '',
  assignedPassengersData: [],
};

MyPassengersScreen.propTypes = {
  passengerInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  screenNameActionHandler: PropTypes.func.isRequired,
  screenName: PropTypes.oneOfType([PropTypes.string]),
  popupsModalsActionHandler: PropTypes.func.isRequired,
  passengerCardIdActionHandler: PropTypes.func.isRequired,
  passengerCardId: PropTypes.oneOfType([PropTypes.number]),
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  holdPassengerInfoActionHandler: PropTypes.func.isRequired,
  assignedPassengersData: PropTypes.oneOfType([PropTypes.array]),
  assignedPassengersDataActionHandler: PropTypes.func.isRequired,
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
      passengerCardId: store.homeScreen.passengerCardId,
      confirmationPopup: store.popupsModals.confirmationPopup,
      editPassengerModal: store.popupsModals.editPassengerModal,
      toggleCardOptionsModal: store.popupsModals.toggleCardOptionsModal,
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
      passengerCardIdActionHandler: passengerInfo => {
        dispatch(passengerCardIdAction(passengerInfo));
      },
      holdPassengerInfoActionHandler: passengerInfo => {
        dispatch(holdPassengerInfoAction(passengerInfo));
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
)(MyPassengersScreen);
