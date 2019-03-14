import React, { Component } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import { withNavigation } from 'react-navigation';

import { compose } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import {
  confirmationPopupAction,
  popupsModalsAction,
} from '../PopupsModals/actions/popupsModals';

import PassengersInfo from '../PassengerInfo/PassengerInfo';

import FetchPassengersByCardinalPoint from '../../APICalls/FetchPassengersByCardinalPoint';
import { passengersByCardinalPointDataAction } from '../../screens/PassengersByCardinalPoint/actions/passengersByCardinalPoint';

import styles from '../../styles/HomeScreenStyles';

import {
  screenNameAction,
  holdPassengerInfoAction,
  isAddToMyPassengersSuccessAction,
  passengerCardIdAction,
  pickupPassengerCardIdAction,
  unassignedPickUpPassengersAction,
  unassignedDropOffPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

import PassengersAdded from '../PassengerInfo/PassengersAdded';

import PassengerGoingAvatar from '../SVGs/Passengers/PassengerGoingAvatar';

import FetchAddToMyPassengers from '../../APICalls/FetchAddToMyPassengers';

import FetchUndoAddToMyPassenger from '../../APICalls/FetchUndoAddToMyPassenger';
import globalStyles from '../../styles/GlobalStyles';
import Colors from '../../constants/Colors';

class PassengersByCardinalPointCard extends Component {
  state = {
    refreshing: false,
  };

  componentDidMount() {
    const {
      isAddToMyPassengersSuccessActionHandler,
      screenNameActionHandler,
    } = this.props;

    screenNameActionHandler('PassengerByCardinalPoint');
    isAddToMyPassengersSuccessActionHandler(false);

    return this.handleFetchPassengersByCardinalPoint();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { refreshing } = this.state;
    const {
      screenName,
      navigationStore,
      passengerCardId,
      confirmationPopup,
      editPassengerModal,
      isAddToMyPassengersSuccess,
      passengersByCardinalPointData,
    } = this.props;

    return (
      nextProps.screenName !== screenName ||
      nextState.refreshing !== refreshing ||
      nextProps.navigationStore !== navigationStore ||
      nextProps.passengerCardId !== passengerCardId ||
      nextProps.confirmationPopup !== confirmationPopup ||
      nextProps.editPassengerModal !== editPassengerModal ||
      nextProps.isAddToMyPassengersSuccess !== isAddToMyPassengersSuccess ||
      nextProps.passengersByCardinalPointData !== passengersByCardinalPointData
    );
  }

  componentWillUnmount() {
    const { passengersByCardinalPointDataActionHandler } = this.props;

    return passengersByCardinalPointDataActionHandler([]);
  }

  callModalAndSetPassengerInfo = passengerInfo => {
    const {
      confirmationPopup,
      screenNameActionHandler,
      popupsModalsActionHandler,
      holdPassengerInfoActionHandler,
      confirmationPopupActionHandler,
    } = this.props;

    screenNameActionHandler('PassengerByCardinalPoint');

    if (confirmationPopup) confirmationPopupActionHandler();

    popupsModalsActionHandler();
    holdPassengerInfoActionHandler(passengerInfo);
  };

  handleFetchPassengersByCardinalPoint = () => {
    const {
      navigationStore,
      passengersGoingTo,
      passengersByCardinalPointDataActionHandler,
    } = this.props;

    return FetchPassengersByCardinalPoint(
      passengersGoingTo,
      navigationStore,
      passengersByCardinalPointDataActionHandler,
    );
  };

  handleUndo = async id => {
    const {
      screenName,
      navigationStore,
      passengersGoingTo,
      screenNameActionHandler,
      isAddToMyPassengersSuccessActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      passengersByCardinalPointDataActionHandler,
    } = this.props;

    screenNameActionHandler('PassengerByCardinalPoint');

    return FetchUndoAddToMyPassenger(
      id,
      screenName,
      navigationStore,
      passengersGoingTo,
      isAddToMyPassengersSuccessActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      passengersByCardinalPointDataActionHandler,
    );
  };

  handleAddToMyPassengers = id => {
    const {
      navigationStore,
      passengersGoingTo,
      screenNameActionHandler,
      passengerCardIdActionHandler,
      pickupPassengerCardIdActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      isAddToMyPassengersSuccessActionHandler,
      passengersByCardinalPointDataActionHandler,
    } = this.props;

    screenNameActionHandler('PassengerByCardinalPoint');

    return FetchAddToMyPassengers(
      id,
      navigationStore,
      passengersGoingTo,
      passengerCardIdActionHandler,
      pickupPassengerCardIdActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      isAddToMyPassengersSuccessActionHandler,
      passengersByCardinalPointDataActionHandler,
    );
  };

  render() {
    const {
      screenName,
      passengerCardId,
      navigationStore,
      isAddToMyPassengersSuccess,
      passengersByCardinalPointData,
    } = this.props;

    const { refreshing } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.handleFetchPassengersByCardinalPoint}
          />
        }
      >
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}
            >
              <PassengerGoingAvatar />
            </View>

            {screenName === 'PassengerByCardinalPoint' &&
              passengerCardId &&
              isAddToMyPassengersSuccess && (
                <PassengersAdded
                  id={passengerCardId}
                  key={passengerCardId}
                  buttonText="Passenger Added"
                  handleUndo={() => this.handleUndo(passengerCardId)}
                />
              )}

            <View style={{ marginTop: 38 }}>
              {passengersByCardinalPointData &&
                passengersByCardinalPointData.map(info => (
                  <View key={info.id} style={styles.container}>
                    <PassengersInfo
                      id={info.id}
                      name={info.name}
                      address={info.address}
                      datetime={info.timestamp}
                      buttonText="ADD TO MY PASSENGERS"
                      cardinalpoint={info.cardinalpoint}
                      onPress={() => this.handleAddToMyPassengers(info.id)}
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
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

PassengersByCardinalPointCard.defaultProps = {
  screenName: '',
  passengerCardId: '',
  passengersGoingTo: '',
};

PassengersByCardinalPointCard.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  screenNameActionHandler: PropTypes.func.isRequired,
  screenName: PropTypes.oneOfType([PropTypes.string]),
  popupsModalsActionHandler: PropTypes.func.isRequired,
  passengerCardIdActionHandler: PropTypes.func.isRequired,
  passengerCardId: PropTypes.oneOfType([PropTypes.number]),
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  holdPassengerInfoActionHandler: PropTypes.func.isRequired,
  passengersGoingTo: PropTypes.oneOfType([PropTypes.string]),
  pickupPassengerCardIdActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  isAddToMyPassengersSuccessActionHandler: PropTypes.func.isRequired,
  confirmationPopup: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  editPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  passengersByCardinalPointDataActionHandler: PropTypes.func.isRequired,
  isAddToMyPassengersSuccess: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  passengersByCardinalPointData: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      screenName: store.homeScreen.screenName,
      navigationStore: store.homeScreen.navigation,
      passengerCardId: store.homeScreen.passengerCardId,
      passengersGoingTo: store.homeScreen.passengersGoingTo,
      confirmationPopup: store.popupsModals.confirmationPopup,
      editPassengerModal: store.popupsModals.editPassengerModal,
      pickupPassengerCardId: store.homeScreen.pickupPassengerCardId,
      toggleCardOptionsModal: store.popupsModals.toggleCardOptionsModal,
      passengersByCardinalPointData:
        store.passengersByCardinalPoint.passengersByCardinalPointData,
      isAddToMyPassengersSuccess: store.homeScreen.isAddToMyPassengersSuccess,
      passengerSuccessfullyEdited: store.homeScreen.passengerSuccessfullyEdited,
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
      isAddToMyPassengersSuccessActionHandler: value => {
        dispatch(isAddToMyPassengersSuccessAction(value));
      },
      holdPassengerInfoActionHandler: passengerInfo => {
        dispatch(holdPassengerInfoAction(passengerInfo));
      },
      passengersByCardinalPointDataActionHandler: data => {
        dispatch(passengersByCardinalPointDataAction(data));
      },
    }),
  ),
)(withNavigation(PassengersByCardinalPointCard));
