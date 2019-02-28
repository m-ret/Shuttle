import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { compose } from 'redux';
import { connect } from 'react-redux';

import globalStyles from '../../styles/GlobalStyles';
import PassengersStyles from '../../styles/Passengers';
import Colors from '../../constants/Colors';

import PassengerCardBasedOnRoute from '../PassengerInfo/PassengerCardBasedOnRoute';
import PassengersAdded from '../PassengerInfo/PassengersAdded';

import { searchParamAction } from '../../screens/HomeScreen/actions/homeScreen';
import SearchBox from '../SearchBox/SearchBox';

class AllPassengersList extends Component {
  state = { isVisible: false };

  toggleSearchBarVisibility = async () => {
    const { isVisible } = this.state;
    const { searchParamActionHandler } = this.props;

    await this.setState({ isVisible: !isVisible });

    if (isVisible) searchParamActionHandler('');
  };

  showProperSuccessMessageBasedOnRoute = (nav, isSuccess, cardId) => {
    return nav && isSuccess && cardId ? (
      <PassengersAdded id={cardId} key={cardId} />
    ) : null;
  };

  render() {
    const {
      searchParam,
      navigationStore,
      passengerCardId,
      pickupPassengerCardId,
      searchParamActionHandler,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
      isAddToMyPassengersSuccess,
    } = this.props;
    const { isVisible } = this.state;
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ height: 50 }} />
        <View style={{ textAlign: 'left', alignSelf: 'stretch' }}>
          <Text style={{ fontWeight: 'bold', color: '#000000' }}>
            All Passengers List (
            {navigationStore.index
              ? unassignedPickUpPassengers.length
              : unassignedDropOffPassengers.length}
            )
          </Text>
        </View>
        <View style={globalStyles.stretchContent}>
          <TouchableOpacity
            onPress={this.toggleSearchBarVisibility}
            style={[
              globalStyles.touchableBtnDropOffItem,
              {
                backgroundColor: navigationStore.index
                  ? Colors.pickupTabColor
                  : Colors.dropOffTabColor,
                marginTop: 20,
              },
            ]}
          >
            <Ionicons name="md-search" color="#fff" size={14} />
            <Text
              style={[
                globalStyles.fontWhite,
                PassengersStyles.ButtonTextIconMargin,
              ]}
            >
              Search
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.touchableBtnDropOffItem,
              {
                backgroundColor: navigationStore.index
                  ? Colors.pickupTabColor
                  : Colors.dropOffTabColor,
                marginTop: 20,
              },
            ]}
          >
            <Ionicons name="md-add" color="#fff" size={14} />
            <Text
              style={[
                globalStyles.fontWhite,
                PassengersStyles.ButtonTextIconMargin,
              ]}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
        {isVisible && (
          <SearchBox
            onChangeText={text => searchParamActionHandler(text)}
            searchParam={searchParam}
          />
        )}

        {this.showProperSuccessMessageBasedOnRoute(
          !navigationStore.index,
          isAddToMyPassengersSuccess,
          passengerCardId,
        )}

        {this.showProperSuccessMessageBasedOnRoute(
          navigationStore.index,
          isAddToMyPassengersSuccess,
          pickupPassengerCardId,
        )}

        <PassengerCardBasedOnRoute searchParam={searchParam} />
      </View>
    );
  }
}

AllPassengersList.defaultProps = {
  passengerCardId: '',
  pickupPassengerCardId: '',
};

AllPassengersList.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  passengerCardId: PropTypes.oneOfType([PropTypes.number]),
  pickupPassengerCardId: PropTypes.oneOfType([PropTypes.number]),
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
  searchParamActionHandler: PropTypes.oneOfType([PropTypes.func]).isRequired,
  isAddToMyPassengersSuccess: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      searchParam: store.homeScreen.searchParam,
      navigationStore: store.homeScreen.navigation,
      passengerCardId: store.homeScreen.passengerCardId,
      pickupPassengerCardId: store.homeScreen.pickupPassengerCardId,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      isAddToMyPassengersSuccess: store.homeScreen.isAddToMyPassengersSuccess,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      searchParamActionHandler: value => {
        dispatch(searchParamAction(value));
      },
    }),
  ),
)(AllPassengersList);
