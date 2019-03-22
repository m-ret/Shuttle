import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import globalStyles from '../../styles/GlobalStyles';
import PassengerAdded from '../SVGs/Passengers/PassengerAdded';
import PassengersStyles from '../../styles/Passengers';
import Colors from '../../constants/Colors';

const GoToAllPassengers = ({ navigationStore, navigation }) => {
  const navigateTo = () =>
    navigation.navigate(
      navigationStore.index ? 'PickupHome' : 'DropOffAllPassengers',
    );

  return (
    <>
      <View style={globalStyles.CenterContent}>
        <PassengerAdded
          x={navigationStore.index ? 10 : 0}
          buttonText={`Passengers ${
            navigationStore.index ? 'Picked' : 'Dropped'
          }`}
        />
      </View>
      <View style={globalStyles.EmptyView} />
      <View style={PassengersStyles.CArticleTileFooter}>
        <TouchableOpacity
          onPress={() => navigateTo()}
          style={[
            globalStyles.touchableBtnDropOffItem,
            navigationStore.index
              ? { backgroundColor: Colors.pickupTabColor }
              : { backgroundColor: Colors.dropOffTabColor },
          ]}
        >
          <Text style={globalStyles.BtnTextStyle}>
            GO BACK TO ALL PASSENGERS
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

GoToAllPassengers.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  navigationStore: PropTypes.shape({}).isRequired,
};

export default GoToAllPassengers;
