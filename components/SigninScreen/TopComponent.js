import { Text, View } from 'react-native';
import React from 'react';
import signingStyles from '../../styles/SigningScreenStyles';
import ShuttleLogoSVG from '../SVGs/SigningScreen/ShuttleLogo';

const jsonCopy = require('../../copy-text/copy');

const TopComponent = () => (
  <View style={signingStyles.welcomeContainer}>
    <View style={signingStyles.welcomeImage}>
      <ShuttleLogoSVG />
    </View>
    <View style={signingStyles.getStartedContainer}>
      <Text style={signingStyles.companyName}>COMPANY NAME’S</Text>
      <Text style={signingStyles.welcomeShuttleTitle}>
        {jsonCopy.loginScreen.shuttle}
      </Text>
      <Text style={signingStyles.welcomeServiceTitle}>
        {jsonCopy.loginScreen.service}
      </Text>
      <Text style={signingStyles.hint}>{jsonCopy.loginScreen.hint}</Text>
    </View>
  </View>
);

export default TopComponent;
