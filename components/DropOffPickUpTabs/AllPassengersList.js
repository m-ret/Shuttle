import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { filter } from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import globalStyles from '../../styles/GlobalStyles';
import PassengersStyles from '../../styles/Passengers';
import Colors from '../../constants/Colors';
import PassengerCardBasedOnRoute from '../PassengerInfo/PassengerCardBasedOnRoute';
import { searchParamAction } from '../../screens/HomeScreen/actions/homeScreen';

class AllPassengersList extends Component {
  state = { isVisible: false };

  toggleSearchBarVisibility = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };

  getPassengersLength = filteredBy => {
    const { passengersData } = this.props;
    return filter(passengersData, ['pickup', filteredBy]);
  };

  render() {
    const {
      navigationStore,
      passengersData,
      searchParamActionHandler,
      searchParam,
    } = this.props;
    const { isVisible } = this.state;
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ height: 50 }} />
        <View style={{ textAlign: 'left', alignSelf: 'stretch' }}>
          <Text style={{ fontWeight: 'bold', color: '#000000' }}>
            All Passengers List (
            {navigationStore.index
              ? `${this.getPassengersLength(1).length}`
              : `${passengersData.length}`}
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
          <View>
            <TextInput
              autoFocus
              style={PassengersStyles.SearchBox}
              onChangeText={text => searchParamActionHandler(text)}
              value={searchParam}
              placeholder="Search..."
              autoCapitalize="none"
            />
          </View>
        )}
        <Text>{searchParam}</Text>
        <PassengerCardBasedOnRoute searchParam={searchParam} />
      </View>
    );
  }
}

AllPassengersList.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  passengersData: PropTypes.oneOfType([PropTypes.array]).isRequired,
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
  searchParamActionHandler: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      searchParam: store.homeScreen.searchParam,
      passengersData: store.homeScreen.passengersData,
    }),
    dispatch => ({
      searchParamActionHandler: token => {
        dispatch(searchParamAction(token));
      },
    }),
  ),
)(AllPassengersList);
