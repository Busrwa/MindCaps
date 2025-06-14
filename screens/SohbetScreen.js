import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SohbetScreen({ route }) {
  const { type } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{type ? `${type} ile Sohbet` : 'Sohbet Ekranı'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf6e3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
