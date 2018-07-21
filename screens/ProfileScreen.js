import React from 'react';
import firebase from 'firebase';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate('Auth');
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          name="Facebook"
          onPress={() => this.handleLogout()}
        >
          <Text style={styles.btnText}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
