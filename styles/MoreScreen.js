import { StyleSheet } from 'react-native';

const MoreScreenStyles = StyleSheet.create({
  WrapperContainer: {
    flex: 1,
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 30,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  optionTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  option: {
    height: 68,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#fdfdfd',
    borderBottomColor: '#EDEDED',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    flex: 1,
    marginTop: 1,
    fontSize: 19,
    color: '#474350',
    fontWeight: '900',
  },
});

export default MoreScreenStyles;
