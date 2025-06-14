import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Button } from 'react-native';

export default function BenlikCard({ title, image, onPress }) {
  return (
    <ImageBackground source={image} style={styles.image} imageStyle={{ borderRadius: 10 }}>
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttonWrapper}>
          <Button title="Sohbeti Başlat" onPress={onPress} color="#6200ea" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 180,
    margin: 10,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
  },
});
