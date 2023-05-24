import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ImageView from 'react-native-image-viewing';

const MyComponent = () => {
  const images = [
    { uri: 'https://uploads.mangadex.org/data/89d59570129b15c48d6d501e6f15b6ea/1-d4edbab3a48219778e752a20713b4b16ce51319649f99d541858c129029b709f.png' },
    { uri: 'https://uploads.mangadex.org/data/89d59570129b15c48d6d501e6f15b6ea/2-56e31e51246955a9b502a84cc146720fbe04af80e439d6f751a5aa10f9e8b369.png' },
    { uri: 'https://uploads.mangadex.org/data/89d59570129b15c48d6d501e6f15b6ea/3-ec5965e4f1daf60a1e6236a0412ee6521be0e222ad64b21b6b18f7b0d228201a.png' },
    
  ];
  React.useEffect(() => {
    setVisible(true);
    openImageViewer(0)
  }, []);

  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  const openImageViewer = (index) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  const closeImageViewer = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageView
        images={images}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={closeImageViewer}
        swipeToCloseEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    margin: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default MyComponent;
