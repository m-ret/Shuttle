import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Animated } from 'react-native';
import signingStyles from '../../styles/SigningScreenStyles';

export default class SigningInputs extends Component {
  componentWillMount() {
    this.animatedIsFocused = new Animated.Value(0);
  }

  handleAnimateLabel = (toValue, duration) => {
    Animated.timing(this.animatedIsFocused, { toValue, duration }).start();
  };

  handleOnFocus = () => {
    const { inputLength } = this.props;
    if (!inputLength) {
      this.handleAnimateLabel(1, 200);
    }
  };

  handleOnBlur = () => {
    const { inputLength } = this.props;
    if (!inputLength) {
      this.handleAnimateLabel(0, 200);
    }
  };

  render() {
    const { secureTextEntry, onChangeText, labelText } = this.props;

    const labelAnimationStyle = {
      position: 'absolute',
      left: 0,
      top: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [10, -10],
      }),
      fontSize: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [25, 14],
      }),
      color: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['black', 'gray'],
      }),
    };

    return (
      <>
        <View style={signingStyles.inputContainer}>
          <Animated.Text
            style={[labelAnimationStyle, signingStyles.labelFontSemibold]}
          >
            {labelText}
          </Animated.Text>
          <TextInput
            style={signingStyles.inputs}
            onChangeText={onChangeText}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            blurOnSubmit
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
          />
        </View>
      </>
    );
  }
}

SigningInputs.defaultProps = {
  secureTextEntry: false,
};

SigningInputs.propTypes = {
  secureTextEntry: PropTypes.oneOfType([PropTypes.bool]),
  onChangeText: PropTypes.func.isRequired,
  labelText: PropTypes.oneOfType([PropTypes.string]).isRequired,
  inputLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
