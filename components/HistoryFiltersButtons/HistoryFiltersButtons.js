import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PassengersStyles from '../../styles/Passengers';
import globalStyles from '../../styles/GlobalStyles';

const HistoryFiltersButtons = () => (
  <View style={globalStyles.stretchContent}>
    <TouchableOpacity
      onPress={() => console.log('Date picker should open here')}
      style={[
        globalStyles.touchableBtnDropOffItem,
        globalStyles.ButtonWithBorderOnly,
        { marginTop: 20 },
      ]}
    >
      <Text style={[PassengersStyles.ButtonTextIconMargin]}>SELECT DATE</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => console.log('Date picker should open here')}
      style={[
        globalStyles.touchableBtnDropOffItem,
        globalStyles.ButtonDarkBg,
        { marginTop: 20 },
      ]}
    >
      <Text
        style={[globalStyles.fontWhite, PassengersStyles.ButtonTextIconMargin]}
      >
        SEE LATEST
      </Text>
    </TouchableOpacity>
  </View>
);

export default HistoryFiltersButtons;
