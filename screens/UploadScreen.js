import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Upload',
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button]}
          // onPress={this.props.onPress}
        >
          <Text style={[styles.btnText]}>{'Share A Video'.toUpperCase()}</Text>
          {this.props.iconRight}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});
