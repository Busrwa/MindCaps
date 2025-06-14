import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = width * 0.6;

const data = [
  {
    title: 'Geçmiş Benlik',
    image: require('../assets/gecmis.png'),
    type: 'Geçmiş',
  },
  {
    title: 'Şimdiki Benlik',
    image: require('../assets/simdi.png'),
    type: 'Şimdi',
  },
  {
    title: 'Gelecek Benlik',
    image: require('../assets/gelecek.png'),
    type: 'Gelecek',
  },
];

export default function BenliklerScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const handlePress = (type) => {
    navigation.navigate('Sohbet', { type });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop: insets.top || 20 }]}>
        <Text style={styles.headerTitle}>Benlikler</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {data.map((item, index) => (
          <View key={index} style={styles.cardWrapper}>
            <ImageBackground source={item.image} style={styles.card} imageStyle={{ borderRadius: 12 }}>
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity style={styles.button} onPress={() => handlePress(item.type)}>
                  <Text style={styles.buttonText}>Sohbeti Başlat</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#5f2c82',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  cardWrapper: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    height: CARD_HEIGHT,
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
  },
});
