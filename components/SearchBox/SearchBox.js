import { KeyboardAvoidingView, TextInput } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import PassengersStyles from '../../styles/Passengers';

const SearchBox = ({ onChangeText, searchParam }) => (
  <KeyboardAvoidingView behavior="position" enabled>
    <TextInput
      value={searchParam}
      autoCapitalize="none"
      placeholder="Search Passenger"
      clearButtonMode="always"
      onChangeText={onChangeText}
      style={PassengersStyles.SearchBox}
    />
  </KeyboardAvoidingView>
);

SearchBox.propTypes = {
  onChangeText: PropTypes.oneOfType([PropTypes.func]).isRequired,
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default SearchBox;
