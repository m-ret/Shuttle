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

import {
  isAddToMyPassengersSuccessAction,
  searchParamAction,
  toggleSearchAction,
  unassignedDropOffPassengersAction,
  unassignedPickUpPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

import SearchBox from '../SearchBox/SearchBox';
import FetchUndoAddToMyPassenger from '../../APICalls/FetchUndoAddToMyPassenger';
import { toggleAddPassengerModalAction } from '../PopupsModals/actions/popupsModals';

class AllPassengersList extends Component {
  componentDidMount() {
    const { toggleSearch, toggleSearchActionHandler } = this.props;
    this.toggleSearchBarVisibility();
    if (!toggleSearch) toggleSearchActionHandler();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      searchParam,
      toggleSearch,
      navigationStore,
      passengerCardId,
      pickupPassengerCardId,
      toggleAddPassengerModal,
      searchParamActionHandler,
      unassignedPickUpPassengers,
      isAddToMyPassengersSuccess,
      unassignedDropOffPassengers,
      toggleAddPassengerModalActionHandler,
    } = this.props;

    return (
      nextProps.searchParam !== searchParam ||
      nextProps.toggleSearch !== toggleSearch ||
      nextProps.navigationStore !== navigationStore ||
      nextProps.passengerCardId !== passengerCardId ||
      nextProps.pickupPassengerCardId !== pickupPassengerCardId ||
      nextProps.toggleAddPassengerModal !== toggleAddPassengerModal ||
      nextProps.searchParamActionHandler !== searchParamActionHandler ||
      nextProps.unassignedPickUpPassengers !== unassignedPickUpPassengers ||
      nextProps.isAddToMyPassengersSuccess !== isAddToMyPassengersSuccess ||
      nextProps.unassignedDropOffPassengers !== unassignedDropOffPassengers ||
      nextProps.toggleAddPassengerModalActionHandler !== toggleAddPassengerModalActionHandler
    );
  }

  handleUndo = id => {
    const {
      navigationStore,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      isAddToMyPassengersSuccessActionHandler,
    } = this.props;
    return FetchUndoAddToMyPassenger(
      id,
      navigationStore,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      isAddToMyPassengersSuccessActionHandler,
    );
  };

  toggleSearchBarVisibility = () => {
    const {
      toggleSearch,
      searchParamActionHandler,
      toggleSearchActionHandler,
    } = this.props;

    toggleSearchActionHandler();

    if (toggleSearch) searchParamActionHandler('');
  };

  showSuccessMessageBasedOnRoute = (nav, isSuccess, cardId) =>
    nav && isSuccess && cardId ? (
      <PassengersAdded
        id={cardId}
        key={cardId}
        handleUndo={() => this.handleUndo(cardId)}
      />
    ) : null;

  render() {
    const {
      searchParam,
      toggleSearch,
      navigationStore,
      passengerCardId,
      pickupPassengerCardId,
      searchParamActionHandler,
      unassignedPickUpPassengers,
      isAddToMyPassengersSuccess,
      unassignedDropOffPassengers,
      toggleAddPassengerModalActionHandler,
    } = this.props;
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
            onPress={toggleAddPassengerModalActionHandler}
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
        {toggleSearch && (
          <SearchBox
            onChangeText={text => searchParamActionHandler(text)}
            searchParam={searchParam}
          />
        )}

        {this.showSuccessMessageBasedOnRoute(
          !navigationStore.index,
          isAddToMyPassengersSuccess,
          passengerCardId,
        )}

        {this.showSuccessMessageBasedOnRoute(
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
  toggleSearch: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
  toggleAddPassengerModalActionHandler: PropTypes.func.isRequired,
  isAddToMyPassengersSuccessActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  toggleAddPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  searchParamActionHandler: PropTypes.oneOfType([PropTypes.func]).isRequired,
  toggleSearchActionHandler: PropTypes.oneOfType([PropTypes.func]).isRequired,
  isAddToMyPassengersSuccess: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      searchParam: store.homeScreen.searchParam,
      toggleSearch: store.homeScreen.toggleSearch,
      navigationStore: store.homeScreen.navigation,
      passengerCardId: store.homeScreen.passengerCardId,
      pickupPassengerCardId: store.homeScreen.pickupPassengerCardId,
      toggleAddPassengerModal: store.popupsModals.toggleAddPassengerModal,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      isAddToMyPassengersSuccess: store.homeScreen.isAddToMyPassengersSuccess,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      toggleSearchActionHandler: () => {
        dispatch(toggleSearchAction());
      },
      searchParamActionHandler: value => {
        dispatch(searchParamAction(value));
      },
      toggleAddPassengerModalActionHandler: () => {
        dispatch(toggleAddPassengerModalAction());
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
)(AllPassengersList);
