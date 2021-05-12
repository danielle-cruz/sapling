import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FBF7F2',

  },

  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'white'
  },

  header1: {
    fontFamily: 'RubikBold',
    fontSize: 24
  },

  subtitle: {
    fontFamily: 'RubikRegular',
    fontSize: 18
  },

  textInput: {
    margin: 10,
    padding: 10,
    fontFamily: 'RubikRegular',
    backgroundColor: '#F1EEE9',
    fontSize: 16,
  },

});

export {styles}
