import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import PassengersStyles from '../../styles/Passengers';
import Colors from '../../constants/Colors';
import globalStyles from '../../styles/GlobalStyles';

import FetchAddToMyPassengers from '../../APICalls/FetchAddToMyPassengers';

import AllPassengersOptionsModal from '../PopupsModals/AllPassengersOptionsModal';
import OptionsModal from '../PopupsModals/OptionsAlertPassenger';

import {
  passengerCardIdAction,
  pickupPassengerCardIdAction,
  isAddToMyPassengersSuccessAction,
  unassignedPickUpPassengersAction,
  unassignedDropOffPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

const PassengersInfo = ({
  id,
  name,
  address,
  datetime,
  callModal,
  cardinalpoint,
  navigationStore,
  handleDeleteOptionsModal,
  passengerCardIdActionHandler,
  pickupPassengerCardIdActionHandler,
  isAddToMyPassengersSuccessActionHandler,
  unassignedPickUpPassengersActionHandler,
  unassignedDropOffPassengersActionHandler,
}) => {
  const handleAddToMyPassengers = () => {
    FetchAddToMyPassengers(
      id,
      navigationStore,
      passengerCardIdActionHandler,
      pickupPassengerCardIdActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      isAddToMyPassengersSuccessActionHandler,
    );
  };

  return (
    <View>
      <OptionsModal>
        {
          <AllPassengersOptionsModal
            id={id}
            handleDeleteOptionsModal={handleDeleteOptionsModal}
          />
        }
      </OptionsModal>
      <View style={{ height: 30 }} />
      <View>
        <View style={PassengersStyles.CTileList}>
          <View style={PassengersStyles.CTileListItem}>
            <View>
              <View style={PassengersStyles.CArticleTileHeader}>
                <View style={PassengersStyles.CardinalPointWrapper}>
                  <Text style={PassengersStyles.CArticleTileCategory}>
                    {cardinalpoint}
                  </Text>
                </View>

                <View>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 10 }}
                    onPress={callModal}
                  >
                    <View>
                      <Ionicons name="md-more" color="#979797" size={24} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={PassengersStyles.CArticleTileBody}>
                <Text
                  style={[
                    PassengersStyles.NameOfClient,
                    {
                      color: navigationStore.index
                        ? Colors.pickupTabColor
                        : Colors.dropOffTabColor,
                    },
                  ]}
                >
                  {name}
                </Text>
                <Text style={PassengersStyles.Address}>{address}</Text>
                <Text style={PassengersStyles.RequestedTimeText}>
                  Requested at{' '}
                  <Text style={PassengersStyles.RequestedTime}>{datetime}</Text>
                </Text>
              </View>

              <View style={PassengersStyles.CArticleTileFooter}>
                <TouchableOpacity
                  onPress={handleAddToMyPassengers}
                  style={[
                    globalStyles.touchableBtnDropOffItem,
                    {
                      backgroundColor: navigationStore.index
                        ? Colors.pickupTabColor
                        : Colors.dropOffTabColor,
                    },
                  ]}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    ADD TO MY PASSENGERS
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

PassengersInfo.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  handleDeleteOptionsModal: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number]).isRequired,
  passengerCardIdActionHandler: PropTypes.func.isRequired,
  name: PropTypes.oneOfType([PropTypes.string]).isRequired,
  address: PropTypes.oneOfType([PropTypes.string]).isRequired,
  callModal: PropTypes.oneOfType([PropTypes.func]).isRequired,
  datetime: PropTypes.oneOfType([PropTypes.string]).isRequired,
  pickupPassengerCardIdActionHandler: PropTypes.func.isRequired,
  cardinalpoint: PropTypes.oneOfType([PropTypes.string]).isRequired,
  isAddToMyPassengersSuccessActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      passengerCardId: store.homeScreen.passengerCardId,
      pickupPassengerCardId: store.homeScreen.pickupPassengerCardId,
      isAddToMyPassengersSuccess: store.homeScreen.isAddToMyPassengersSuccess,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
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
      isAddToMyPassengersSuccessActionHandler: isAddToMyPassengersSuccess => {
        dispatch(isAddToMyPassengersSuccessAction(isAddToMyPassengersSuccess));
      },
    }),
  ),
)(PassengersInfo);
