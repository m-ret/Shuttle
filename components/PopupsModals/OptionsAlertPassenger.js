import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View } from 'react-native';

import styles from '../../styles/PopupsModals';

class OptionsModal extends Component {
  shouldComponentUpdate(props, state) {
    const { openBy, children, onRequestClose } = this.props;
    return (
      props.openBy !== openBy ||
      props.children !== children ||
      props.onRequestClose !== onRequestClose
    );
  }

  render() {
    const { openBy, children, onRequestClose } = this.props;
    return (
      <View style={styles.WrapperContainerParent}>
        <Modal
          transparent
          visible={openBy}
          animationType="fade"
          onRequestClose={onRequestClose}
        >
          <View style={styles.ContainerParent}>{children}</View>
        </Modal>
      </View>
    );
  }
}

OptionsModal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  openBy: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default OptionsModal;
