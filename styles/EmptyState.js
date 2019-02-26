import { StyleSheet } from 'react-native';

const EmptyStateStyles = StyleSheet.create({
  Container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: 2,
    marginBottom: 50,
    paddingVertical: 20,
  },

  Text: {
    color: '#ff5252',
    fontSize: 50,
  },
});

export default EmptyStateStyles;
