import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnalizScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analiz Ekranı</Text>
      <Text style={styles.subtitle}>Burada kullanıcı analizleri yer alacak.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
  },
  subtitle: {
    fontSize: 16,
    color: '#004d40',
    marginTop: 10,
  },
});
