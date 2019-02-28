import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { WebBrowser } from 'expo';
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from '../../styles/PopupsModals';
import { popupsModalsAction } from './actions/popupsModals';

import FetchDeletePassenger from '../../APICalls/FetchDeletePassenger';
import {
  isDeletePassengerSuccessAction,
  passengerCardIdAction,
  pickupPassengerCardIdAction,
  unassignedDropOffPassengersAction,
  unassignedPickUpPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

class AllPassengersOptionsModal extends Component {
  _handlePressSlack = () => {
    WebBrowser.openBrowserAsync('https://slack.expo.io');
  };

  _handlePressDocs = () => {
    WebBrowser.openBrowserAsync('http://docs.expo.io');
  };

  handleDeletePassenger = async () => {
    const {
      id,
      navigationStore,
      popupsModalsActionHandler,
      passengerCardIdActionHandler,
      pickupPassengerCardIdActionHandler,
      isDeletePassengerSuccessActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
    } = this.props;
    await FetchDeletePassenger(
      id,
      navigationStore,
      passengerCardIdActionHandler,
      pickupPassengerCardIdActionHandler,
      isDeletePassengerSuccessActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
    );

    popupsModalsActionHandler();
  };

  render() {
    const { popupsModalsActionHandler, handleDeleteOptionsModal } = this.props;
    return (
      <>
        <View style={styles.Container}>
          <TouchableOpacity
            style={styles.Option}
            background={TouchableOpacity.Ripple('#ccc', false)}
            onPress={this._handlePressDocs}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.OptionIconContainer}>
                <View>
                  <Ionicons name="md-call" size={24} />
                </View>
              </View>
              <View style={styles.OptionTextContainer}>
                <Text style={styles.OptionText}>Call</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            background={TouchableOpacity.Ripple('#ccc', false)}
            style={styles.Option}
            onPress={this._handlePressSlack}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.OptionIconContainer}>
                <MaterialCommunityIcons name="account-edit" size={24} />
              </View>
              <View style={styles.OptionTextContainer}>
                <Text style={styles.OptionText}>Edit</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            background={TouchableOpacity.Ripple('#ccc', false)}
            style={styles.Option}
            onPress={handleDeleteOptionsModal}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.OptionIconContainer}>
                <MaterialIcons name="delete-forever" size={24} />
              </View>
              <View style={styles.OptionTextContainer}>
                <Text style={styles.OptionText}>Delete</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            background={TouchableOpacity.Ripple('#ccc', false)}
            style={[styles.Option, styles.LastOption]}
            onPress={popupsModalsActionHandler}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.OptionIconContainer}>
                <MaterialIcons name="cancel" size={24} />
              </View>
              <View style={styles.OptionTextContainer}>
                <Text style={styles.OptionText}>Cancel</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

AllPassengersOptionsModal.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  handleDeleteOptionsModal: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number]).isRequired,
  passengerCardIdActionHandler: PropTypes.func.isRequired,
  pickupPassengerCardIdActionHandler: PropTypes.func.isRequired,
  isDeletePassengerSuccessActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  popupsModalsActionHandler: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      passengerCardId: store.homeScreen.passengerCardId,
      allPassengersDropOffOptionsPopup:
        store.popupsModals.allPassengersDropOffOptionsPopup,
      pickupPassengerCardId: store.homeScreen.pickupPassengerCardId,
      isDeletePassengerSuccess: store.homeScreen.isDeletePassengerSuccess,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      popupsModalsActionHandler: data => {
        dispatch(popupsModalsAction(data));
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
      isDeletePassengerSuccessActionHandler: isSuccess => {
        dispatch(isDeletePassengerSuccessAction(isSuccess));
      },
    }),
  ),
)(AllPassengersOptionsModal);
