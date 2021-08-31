import React, {useRef} from 'react';
import {Text} from 'react-native';

// Camera
import {RNCamera as Camera} from 'react-native-camera';

const CameraModal = ({setImage, close}) => {
  var camera = useRef();

  const takePicture = async () => {
    const options = {quality: 1, base64: true};

    const pic = await camera.takePictureAsync(options);

    close(false);
    setImage(pic.uri);
  };

  return (
    <Camera
      ref={(cam) => {
        camera = cam;
      }}
      captureAudio={false}
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
      <Text
        style={{
          flex: 0,
          backgroundColor: '#fff',
          borderRadius: 5,
          color: '#000',
          padding: 10,
          margin: 40,
        }}
        onPress={takePicture}>
        CAPTURE
      </Text>
    </Camera>
  );
};

export default CameraModal;
