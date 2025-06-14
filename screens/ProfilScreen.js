import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.subtitle}>Kullanıcı bilgileri burada yer alacak.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ef6c00',
  },
  subtitle: {
    fontSize: 16,
    color: '#bf360c',
    marginTop: 10,
  },
});
