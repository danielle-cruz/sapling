import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FBF7F2',
  },

  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#FBF7F2',
    justifyContent: 'center',
    alignItems: 'center'
  },

  titleContainer: {
    backgroundColor: '#FBF7F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },

  header1: {
    fontFamily: 'RubikBold',
    fontSize: 28,
    marginBottom: 5
  },

  subtitle: {
    fontFamily: 'RubikRegular',
    fontSize: 18,
  },

  button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#A3B92B',
    borderRadius: 10,
  },

  buttonLabel: {
    color: '#FFFFFF',
    fontFamily: 'RubikBold',
    fontSize: 18,
    textAlign: 'center'

  },

  textInput: {
    margin: 10,
    padding: 15,
    fontFamily: 'RubikRegular',
    backgroundColor: '#F1EEE9',
    fontSize: 16,
  },

  inputLabel: {
    fontFamily: 'RubikRegular',
    fontSize: 14,
  },

});

export {styles}
