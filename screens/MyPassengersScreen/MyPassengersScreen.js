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
import { assignedPassengersDataAction } from './actions/myPassengersScreen';
import PassengersInfo from '../../components/PassengerInfo/PassengerInfo';
import {
  holdPassengerInfoAction,
  screenNameAction,
} from '../HomeScreen/actions/homeScreen';
import {
  confirmationPopupAction,
  popupsModalsAction,
} from '../../components/PopupsModals/actions/popupsModals';
import globalStyles from '../../styles/GlobalStyles';

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
      assignedPassengersData,
      editPassengerModal,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;
    return (
      state.refreshing !== refreshing ||
      props.editPassengerModal !== editPassengerModal ||
      props.assignedPassengersData !== assignedPassengersData ||
      props.unassignedPickUpPassengers !== unassignedPickUpPassengers ||
      props.unassignedDropOffPassengers !== unassignedDropOffPassengers
    );
  }

  componentDidUpdate(props, state) {
    const {
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;

    if (
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

  handleStartNavigating = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&navigate&destination=${latitude},${longitude}`;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }

      return Linking.openURL(url);
    });
  };

  render() {
    const { refreshing } = this.state;
    const { assignedPassengersData } = this.props;
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
            <View style={{ marginTop: 38 }}>
              {assignedPassengersData && assignedPassengersData.length ? (
                assignedPassengersData.map(info => (
                  <View key={info.id} style={styles.container}>
                    <PassengersInfo
                      id={info.id}
                      name={info.name}
                      address={info.address}
                      datetime={info.timestamp}
                      buttonText="START NAVIGATING"
                      cardinalpoint={info.cardinalpoint}
                      onPress={() =>
                        this.handleStartNavigating(
                          info.latitude,
                          info.longitude,
                        )
                      }
                      callModal={() => this.callModalAndSetPassengerInfo(info)}
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
  assignedPassengersData: [],
};

MyPassengersScreen.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  screenNameActionHandler: PropTypes.func.isRequired,
  popupsModalsActionHandler: PropTypes.func.isRequired,
  confirmationPopupActionHandler: PropTypes.func.isRequired,
  holdPassengerInfoActionHandler: PropTypes.func.isRequired,
  assignedPassengersData: PropTypes.oneOfType([PropTypes.array]),
  assignedPassengersDataActionHandler: PropTypes.func.isRequired,
  confirmationPopup: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  editPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      confirmationPopup: store.popupsModals.confirmationPopup,
      editPassengerModal: store.popupsModals.editPassengerModal,
      toggleCardOptionsModal: store.popupsModals.toggleCardOptionsModal,
      assignedPassengersData: store.myPassengersScreen.assignedPassengersData,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
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
      holdPassengerInfoActionHandler: passengerInfo => {
        dispatch(holdPassengerInfoAction(passengerInfo));
      },
      assignedPassengersDataActionHandler: assignedPassengersData => {
        dispatch(assignedPassengersDataAction(assignedPassengersData));
      },
    }),
  ),
)(MyPassengersScreen);
