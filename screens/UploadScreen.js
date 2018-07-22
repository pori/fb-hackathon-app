import React from 'react';
import firebase from 'firebase';
import '@firebase/firestore';
import {
  ImagePicker,
  Permissions,
  Video,
} from 'expo';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import uuid from 'uuid';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Upload',
  };

  state = {
    video: null,
    mute: false,
    shouldPlay: true,
  };

  pickVid = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: 'Videos'
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ video: result });
      }
    } else {
      throw new Error('Location permission not granted');
    }
  };

  handlePlayAndPause = () => {
    this.setState((prevState) => ({
      shouldPlay: !prevState.shouldPlay
    }));
  };

  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,
    }));
  };

  uploadVid = async () =>  {
    const response = await fetch(this.state.video.uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref('videos')
      .child(uuid.v4());
    await ref.put(blob);
    return ref.getDownloadURL();
  };

  saveVid = (downloadURL) => {
    console.log('downloadURL', downloadURL); // eslint-disable-line no-console
    firestore.collection('videos').add({
      uri: downloadURL,
      type: this.state.video.type, // or photo.type
      // name: this.state.video.timestamp,
    });
  };

  handleUploadVid = async () => {
    const downloadURL = await this.uploadVid();
    this.saveVid(downloadURL);
    // this.setState({ image: uploadUrl });
  };
  // uploadVid = (vid) => {
  //
  //   // firebase.firestore().collection('videos')
  //   //   .add({
  //   //   uri: vid.uri,
  //   //   type: vid.type, // or photo.type
  //   //   name: vid.timestamp,
  //   // });
  // };

  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={this.pickVid}
        >
          <Text style={[styles.btnText]}>{!this.state.video ? 'Share A Video'.toUpperCase() : 'Choose A Different Video'.toUpperCase()}</Text>
          {this.props.iconRight}
        </TouchableOpacity>
        {this.state.video &&
          <View>
            <View>
              <Video
                source={{ uri: this.state.video.uri }}
                shouldPlay={this.state.shouldPlay}
                resizeMode="cover"
                style={{ width, height: 300 }}
                isMuted={this.state.mute}
              />
              <View style={styles.controlBar}>
                <MaterialIcons
                  name={this.state.mute ? "volume-mute" : "volume-up"}
                  size={45}
                  color="white"
                  onPress={this.handleVolume}
                />
                <MaterialIcons
                  name={this.state.shouldPlay ? "pause" : "play-arrow"}
                  size={45}
                  color="white"
                  onPress={this.handlePlayAndPause}
                />
              </View>
            </View>
            <TouchableOpacity
              style={[styles.button]}
              onPress={this.handleUploadVid}
            >
              <Text style={[styles.btnText]}>{'Upload This Video'.toUpperCase()}</Text>
              {this.props.iconRight}
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lavender',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    margin: 16,
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
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
});
