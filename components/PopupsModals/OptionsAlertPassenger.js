import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View } from 'react-native';

import styles from '../../styles/PopupsModals';

const OptionsModal = ({ openBy, children, onRequestClose }) => (
  <View style={styles.WrapperContainerParent}>
    <Modal
      transparent
      visible={openBy}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View style={styles.ContainerParent}>{children}</View>
    </Modal>
  </View>
);

OptionsModal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  openBy: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default OptionsModal;
