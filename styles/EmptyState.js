import { StyleSheet } from 'react-native';

const EmptyStateStyles = StyleSheet.create({
  Container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 50,
    paddingVertical: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.23)',
  },

  Text: {
    fontSize: 50,
    color: '#000000',
  },
});

export default EmptyStateStyles;
