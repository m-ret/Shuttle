import { Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

import PropTypes from 'prop-types';

import styles from '../../styles/PopupsModals';

import ConfirmationPopupBtn from './ConfirmationPopupBtn';

const PassengerFormWrapper = ({
  children,
  onPressSave,
  onPressCancel,
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
            <Text style={styles.OptionText}>Edit passenger info</Text>
          </View>
        </View>
        <View>
          <Ionicons name="ios-close" size={24} onPress={onPressToToggleModal} />
        </View>
      </View>

      {children}

      <View style={[styles.ButtonsWrapper, styles.AddEditButtonsWrapper]}>
        <ConfirmationPopupBtn
          text="Cancel"
          onPress={onPressCancel}
          cancelButtonStyle={styles.CancelButtonStyle}
          cancelButtonTextStyle={styles.CancelButtonTextStyle}
        />
        <ConfirmationPopupBtn
          text="Save"
          onPress={onPressSave}
          saveButtonStyle={styles.SaveButtonStyle}
          buttonTextStyle={styles.ButtonTextStyle}
        />
      </View>
    </View>
  </>
);

PassengerFormWrapper.propTypes = {
  onPressCancel: PropTypes.oneOfType([PropTypes.func]).isRequired,
  onPressSave: PropTypes.oneOfType([PropTypes.func]).isRequired,
  onPressToToggleModal: PropTypes.oneOfType([PropTypes.func]).isRequired,
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PassengerFormWrapper;
