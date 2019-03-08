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
} from '../../screens/HomeScreen/actions/homeScreen';

import PassengersAdded from '../PassengerInfo/PassengersAdded';

import FetchUndoAddToMyPassenger from '../../APICalls/FetchUndoAddToMyPassenger';
import PassengerGoingAvatar from '../SVGs/Passengers/PassengerGoingAvatar';

class PassengersByCardinalPointCard extends Component {
  state = {
    refreshing: false,
  };

  componentDidMount() {
    this.handleFetchPassengersByCardinalPoint();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { refreshing } = this.state;
    const {
      navigationStore,
      passengerCardId,
      confirmationPopup,
      editPassengerModal,
      isAddToMyPassengersSuccess,
      passengersByCardinalPointData,
    } = this.props;
    return (
      nextState.refreshing !== refreshing ||
      nextProps.navigationStore !== navigationStore ||
      nextProps.passengerCardId !== passengerCardId ||
      nextProps.confirmationPopup !== confirmationPopup ||
      nextProps.editPassengerModal !== editPassengerModal ||
      nextProps.isAddToMyPassengersSuccess !== isAddToMyPassengersSuccess ||
      nextProps.passengersByCardinalPointData !== passengersByCardinalPointData
    );
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
      navigationStore,
      passengersGoingTo,
      isAddToMyPassengersSuccessActionHandler,
      passengersByCardinalPointDataActionHandler,
    } = this.props;

    await FetchUndoAddToMyPassenger(
      id,
      navigationStore,
      isAddToMyPassengersSuccessActionHandler,
    );

    FetchPassengersByCardinalPoint(
      passengersGoingTo,
      navigationStore,
      passengersByCardinalPointDataActionHandler,
    );
  };

  render() {
    const {
      passengerCardId,
      isAddToMyPassengersSuccess,
      passengersByCardinalPointData,
    } = this.props;
    console.log('IS RENDERING?');

    // this.handleFetchPassengersByCardinalPoint();

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

            {passengerCardId && isAddToMyPassengersSuccess && (
              <PassengersAdded
                id={passengerCardId}
                key={passengerCardId}
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
                      cardinalpoint={info.cardinalpoint}
                      callModal={() => this.callModalAndSetPassengerInfo(info)}
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

PassengersByCardinalPointCard.propTypes = {
  editPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
  screenNameActionHandler: PropTypes.func.isRequired,
  popupsModalsActionHandler: PropTypes.func.isRequired,
  passengerCardId: PropTypes.oneOfType([PropTypes.number]),
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  holdPassengerInfoActionHandler: PropTypes.func.isRequired,
  passengersGoingTo: PropTypes.oneOfType([PropTypes.string]),
  isAddToMyPassengersSuccessActionHandler: PropTypes.func.isRequired,
  confirmationPopup: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  passengersByCardinalPointDataActionHandler: PropTypes.func.isRequired,
  isAddToMyPassengersSuccess: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  passengersByCardinalPointData: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

PassengersByCardinalPointCard.defaultProps = {
  passengerCardId: '',
  passengersGoingTo: '',
};

export default compose(
  connect(
    store => ({
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
