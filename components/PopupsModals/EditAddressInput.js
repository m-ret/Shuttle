import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';

import {
  editPassengerModalAction,
  newAddressFromGoogleAction,
  toggleGooglePlacesInputAction,
} from './actions/popupsModals';

import OptionsModal from './OptionsAlertPassenger';

const EditAddressInput = ({
  toggleGooglePlacesInput,
  editPassengerModalActionHandler,
  newAddressFromGoogleActionHandler,
  toggleGooglePlacesInputActionHandler,
}) => {
  const onCloseEditAddressModal = async () => {
    await toggleGooglePlacesInputActionHandler();
    setTimeout(() => {
      editPassengerModalActionHandler();
    }, 500);
  };

  return (
    <View style={{ marginTop: 22 }}>
      {toggleGooglePlacesInput && (
        <OptionsModal
          openBy={toggleGooglePlacesInput}
          onRequestClose={toggleGooglePlacesInputActionHandler}
        >
          <GooglePlacesAutocomplete
            autoFocus
            fetchDetails
            minLength={2} // minimum length of text to search
            placeholder="Search"
            returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
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
              types: '(cities)', // default: 'geocode'
            }}
            styles={{
              container: {
                marginTop: 22,
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
            }}
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            // currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search

              rankby: 'distance',
              // types: 'food',
            }}
            filterReverseGeocodingByTypes={[
              'country',
              'locality',
              'sublocality',
              'postal_code',
              'administrative_area_level_1',
              'administrative_area_level_2',
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            // predefinedPlaces={[homePlace, workPlace]}
            debounce={100} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            // renderLeftButton={() => <Text>Custom text before the input</Text>}
            renderRightButton={() => (
              <View
                style={{
                  flexBasis: '5%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  marginRight: 10,
                }}
              >
                <TouchableOpacity onPress={onCloseEditAddressModal}>
                  <Ionicons name="ios-close" size={24} />
                </TouchableOpacity>
              </View>
            )}
          />
        </OptionsModal>
      )}
    </View>
  );
};

EditAddressInput.propTypes = {
  editPassengerModalActionHandler: PropTypes.func.isRequired,
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
      editPassengerModalActionHandler: () => {
        dispatch(editPassengerModalAction());
      },
      toggleGooglePlacesInputActionHandler: () => {
        dispatch(toggleGooglePlacesInputAction());
      },
      newAddressFromGoogleActionHandler: address => {
        dispatch(newAddressFromGoogleAction(address));
      },
    }),
  ),
)(EditAddressInput);
