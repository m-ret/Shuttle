import { Image, Text, View } from 'react-native';
import React from 'react';
import styles from '../../styles/SigningScreenStyles';

const jsonCopy = require('../../copy-text/copy');

const TopComponent = () => (
  <View style={styles.welcomeContainer}>
    <Image
      source={
        __DEV__
          ? require('../../assets/images/robot-dev.png')
          : require('../../assets/images/robot-prod.png')
      }
      style={styles.welcomeImage}
    />

    <View style={styles.getStartedContainer}>
      <Text style={styles.welcomeShuttleTitle}>
        {jsonCopy.loginScreen.shuttle}
      </Text>
      <Text style={styles.welcomeServiceTitle}>
        {jsonCopy.loginScreen.service}
      </Text>
      <Text>{jsonCopy.loginScreen.hint}</Text>
    </View>
  </View>
);

export default TopComponent;
