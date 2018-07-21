import React from 'react';
import {
  ImagePicker,
  Permissions
} from 'expo';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Upload',
  };

  state = {
    photos: [],
    image: null,
  };

  pickVid = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: 'All'
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } else {
      throw new Error('Location permission not granted');
    }
  };

  uploadVideo = (vid) => {
    const ref = firebase.firestore().collection('videos');
    this.ref.add({
      uri: vid.uri,
      type: vid.type, // or photo.type
      name: vid.timestamp,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={this.pickVid}
        >
          <Text style={[styles.btnText]}>{'Share A Video'.toUpperCase()}</Text>
          {this.props.iconRight}
        </TouchableOpacity>
        {this.state.image &&
        <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
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
