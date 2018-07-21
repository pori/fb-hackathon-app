import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  CameraRoll,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Upload',
  };

  state = {
    photos: [],
  };

  getVids = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Videos',
    }).then(r => {
      this.setState({ photos: r.edges });
    });
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
          onPress={this.getVids}
        >
          <Text style={[styles.btnText]}>{'Share A Video'.toUpperCase()}</Text>
          {this.props.iconRight}
        </TouchableOpacity>
        <ScrollView>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', flexGrow: 1 }}>
            {this.state.photos.map((p, i) => {
              return (
                <Image
                  key={i}
                  style={{
                    width: 124,
                    height: 124,
                    margin: 8,
                  }}
                  onPress={() => this.uploadVideo(p.node.image.uri)}
                  source={{ uri: p.node.image.uri }}
                />
              );
            })}
          </View>
        </ScrollView>
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
