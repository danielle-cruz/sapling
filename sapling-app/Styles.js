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

  tileContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FBF7F2',
    justifyContent: 'space-around',
    alignContent: 'flex-start'
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

  commentTextInput: {
    paddingTop:18,
    marginLeft:10,
  },

  commentPostButton: {
    height: 32, 
    width: 60,
    marginTop: 18,
    padding: 5,
    paddingTop:9,
    backgroundColor: '#A3B92B',
    borderRadius: 10,
    textAlign:'center',
    textAlignVertical:'center'
  },

  commentPostButtonLabel: {
    color: '#FFFFFF',
    fontFamily: 'RubikBold',
    fontSize: 12,
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

  /* Header Bar */
  headerBar: {
    padding: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#F1EEE9'
  },

  /* Icons */
  barIcons: {
    flexDirection: 'row'
  },

  icons: {
    height: 30,
    width: 30,
    margin: 5
  },

  /* Pods Homepage */
  podTile: {
    margin: 10,
    borderColor:'#A3B92B',
    borderWidth: 4,
    borderRadius: 10, 
  }

});

export {styles}
