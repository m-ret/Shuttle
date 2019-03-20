/* eslint-disable no-nested-ternary */
import { Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from '../../styles/PopupsModals';

import ConfirmationPopupBtn from './ConfirmationPopupBtn';

const dropOffTabColor = '#ff5252';
const pickupTabColor = '#3DA7DC';

const PassengerFormWrapper = ({
  children,
  isDisabled,
  modalTitle,
  onPressSave,
  onPressCancel,
  navigationStore,
  onPressToToggleModal,
}) => (
  <>
    <View style={styles.AddEditWrapper}>
      <View style={styles.AddEditContainer}>
        <View style={styles.AddEditModalTitle}>
          <View style={styles.AddEditIconContainer}>
            <MaterialCommunityIcons name="account-edit" size={24} />
          </View>
          <View style={styles.AddEditOptionTextContainer}>
            <Text style={styles.OptionText}>{modalTitle} passenger info</Text>
          </View>
        </View>
        <View>
          <Ionicons name="ios-close" size={24} onPress={onPressToToggleModal} />
        </View>
      </View>

      {children}

      <View style={[styles.ButtonsWrapper, styles.AddEditButtonsWrapper]}>
        <ConfirmationPopupBtn
          isDisabled={false}
          text="Cancel"
          onPress={onPressCancel}
          cancelButtonStyle={styles.CancelButtonStyle}
          cancelButtonTextStyle={styles.CancelButtonTextStyle}
        />
        <ConfirmationPopupBtn
          text="Save"
          onPress={onPressSave}
          isDisabled={isDisabled}
          saveButtonStyle={[
            styles.SaveButtonStyle,
            {
              backgroundColor: isDisabled
                ? 'grey'
                : navigationStore.index
                ? pickupTabColor
                : dropOffTabColor,
            },
          ]}
          buttonTextStyle={styles.ButtonTextStyle}
        />
      </View>
    </View>
  </>
);

PassengerFormWrapper.defaultProps = {
  isDisabled: true,
};

PassengerFormWrapper.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  isDisabled: PropTypes.oneOfType([PropTypes.bool]),
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onPressSave: PropTypes.oneOfType([PropTypes.func]).isRequired,
  modalTitle: PropTypes.oneOfType([PropTypes.string]).isRequired,
  onPressCancel: PropTypes.oneOfType([PropTypes.func]).isRequired,
  onPressToToggleModal: PropTypes.oneOfType([PropTypes.func]).isRequired,
};

export default compose(
  connect(store => ({
    navigationStore: store.homeScreen.navigation,
  })),
)(PassengerFormWrapper);
