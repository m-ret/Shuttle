import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  NativeModules,
  TouchableOpacity,
} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { compose } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  newAddressFromGoogleAction,
  toggleGooglePlacesInputAction,
} from './actions/popupsModals';

import OptionsModal from './OptionsAlertPassenger';

const { StatusBarManager } = NativeModules;

let barHeight;

class EditAddressInput extends Component {
  componentDidMount() {
    this.getPlatform();
  }

  componentDidUpdate() {
    this.getPlatform();
  }

  getPlatform = () => {
    if (Platform.OS === 'ios') {
      this.getBarHeight();
    }
  };

  getBarHeight = () => {
    barHeight = StatusBarManager.getHeight(statusBarHeight => {
      barHeight = statusBarHeight;
    });
  };

  onCloseEditAddressModal = () => {
    const { toggleGooglePlacesInputActionHandler } = this.props;
    toggleGooglePlacesInputActionHandler();
  };

  render() {
    const {
      toggleGooglePlacesInput,
      newAddressFromGoogleActionHandler,
      toggleGooglePlacesInputActionHandler,
    } = this.props;

    return (
      <View>
        {toggleGooglePlacesInput && (
          <OptionsModal
            openBy={toggleGooglePlacesInput}
            onRequestClose={toggleGooglePlacesInputActionHandler}
          >
            <GooglePlacesAutocomplete
              autoFocus
              fetchDetails
              minLength={1} // minimum length of text to search
              placeholder="Search"
              returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed="auto" // true/false/undefined
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                newAddressFromGoogleActionHandler({
                  description: data.description,
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                });
              }}
              getDefaultValue={() => ''}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyCkxmIVqod03kckg1ormoZgKsje1JCc0hE',
                language: 'en', // language of the results
                // types: 'geocode', // default: 'geocode'
              }}
              styles={{
                container: {
                  paddingTop:
                    Platform.OS === 'ios'
                      ? barHeight
                        ? barHeight.height
                        : null
                      : 0,
                },
                textInputContainer: {
                  width: '100%',
                },
                description: {
                  fontWeight: 'bold',
                },
                listView: {
                  backgroundColor: '#FFFFFF',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
                poweredContainer: {
                  display: 'none',
                },
              }}
              currentLocation // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              // nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              // renderLeftButton={() => <Text>Custom text before the input</Text>}
              renderRightButton={() => (
                <View
                  style={{
                    marginRight: 10,
                    flexBasis: '15%',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity onPress={this.onCloseEditAddressModal}>
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </OptionsModal>
        )}
      </View>
    );
  }
}

EditAddressInput.propTypes = {
  newAddressFromGoogleActionHandler: PropTypes.func.isRequired,
  toggleGooglePlacesInputActionHandler: PropTypes.func.isRequired,
  toggleGooglePlacesInput: PropTypes.oneOfType([PropTypes.bool]).isRequired,
};

export default compose(
  connect(
    store => ({
      editPassengerModal: store.popupsModals.newAddressFromGoogle,
      newAddressFromGoogle: store.popupsModals.newAddressFromGoogle,
      toggleGooglePlacesInput: store.popupsModals.toggleGooglePlacesInput,
    }),
    dispatch => ({
      toggleGooglePlacesInputActionHandler: () => {
        dispatch(toggleGooglePlacesInputAction());
      },
      newAddressFromGoogleActionHandler: address => {
        dispatch(newAddressFromGoogleAction(address));
      },
    }),
  ),
)(EditAddressInput);
