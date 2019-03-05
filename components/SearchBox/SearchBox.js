import { KeyboardAvoidingView, TextInput, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import PassengersStyles from '../../styles/Passengers';

const SearchBox = ({ onChangeText, searchParam }) => (
  <KeyboardAvoidingView behavior="padding" enabled>
    <TextInput
      autoFocus
      style={PassengersStyles.SearchBox}
      onChangeText={onChangeText}
      value={searchParam}
      placeholder="Search..."
      autoCapitalize="none"
    />
  </KeyboardAvoidingView>
);

SearchBox.propTypes = {
  onChangeText: PropTypes.oneOfType([PropTypes.func]).isRequired,
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
};

export default SearchBox;
