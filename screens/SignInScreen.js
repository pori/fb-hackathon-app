import React from 'react';
import firebase from 'firebase';
import { Facebook } from 'expo';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Text,
  TouchableHighlight,
} from 'react-native';

// Enter your Facebook app ID here.
const FACEBOOK_APP_ID = '2058400037732935';

const firebaseConfig = {
  apiKey: 'AIzaSyAmyznkC4SN_nmbdhyJueWOZPXGMBqpMOU',
  authDomain: 'fb-hackathon-b00ec.firebaseapp.com',
  databaseURL: 'https://fb-hackathon-b00ec.firebaseio.com',
  projectId: 'fb-hackathon-b00ec',
  storageBucket: 'fb-hackathon-b00ec.appspot.com'
  // messagingSenderId: "<SENDER_ID>",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign In!',
  };

  state = {
    errorMessage: '',
  };

  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user != null) {
        this.setState({ logInStatus: 'We are authenticated now!!!' });
      } else {
        this.setState({ logInStatus: 'You are currently logged out.' });
      }
    });
  }

  async handleFacebookButton() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
      permissions: ['public_profile', 'email']
    });
    if (type === 'success') {
      //Firebase credential is created with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await AsyncStorage.setItem('userToken', token);

      auth.signInAndRetrieveDataWithCredential(credential)
        .then(() => {
          this.props.navigation.navigate('Main');
        })
        .catch(error => {
        this.setState({ errorMessage: error.message });
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          name="Facebook"
          onPress={() => this.handleFacebookButton()}
        >
          <Text style={styles.btnText}>Log in with Facebook</Text>
        </TouchableHighlight>
        <Text>{this.state.errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 15,
    backgroundColor: 'lavender',
    padding: 16,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#9370DB',
    borderRadius: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: 'center',

  },
  btnText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 4,
  },
});
