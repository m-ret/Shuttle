import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, ScrollView, KeyboardAvoidingView } from 'react-native';

import styles from '../../styles/PopupsModals';

const OptionsModal = ({ openBy, children, onRequestClose }) => (
  <ScrollView style={styles.WrapperContainerParent}>
    <Modal
      transparent
      visible={openBy}
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.ContainerParent}>
        <KeyboardAvoidingView behavior="position" enabled>
          {children}
        </KeyboardAvoidingView>
      </View>
    </Modal>
  </ScrollView>
);

OptionsModal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  openBy: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default OptionsModal;
