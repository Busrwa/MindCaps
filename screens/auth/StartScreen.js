import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  ScrollView
} from 'react-native';

const { width, height } = Dimensions.get('window');

const StartScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/startScreenBackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.card}>
          <Image source={require('../../assets/mindcaps.png')} style={styles.logo} />
          <Text style={styles.description}>
             MindCaps, kendini anlamana, geçmiş deneyimlerini şefkatle keşfetmene ve geleceğe dair bir yön oluşturabilmene destek olmak için tasarlandı.{"\n\n"}
          🧠 Yapay zekâ ile seni yargılamayan, empatik bir diyalog kurarsın.{"\n"}
          ⏳ Geçmiş, şimdi ve gelecekteki benliğinle adım adım bağlantı kurarsın.{"\n"}
          💬 Duygularını ifade eder, AI ile içgörü kazanırsın.{"\n"}
          🔐 Tüm seansların yalnızca sana özeldir ve gizli tutulur.{"\n\n"}
          Gizlilik bizim için çok önemlidir. Verilerin sadece sana özel olarak analiz edilir, asla paylaşılmaz.{"\n\n"}
          🫶 Seni anlamaya hazır bir alan seni bekliyor.{"\n"}
          Kaydolduğunda içsel yolculuğun başlayacak.{"\n"}
          Ve unutma: burada güvendesin.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Text style={styles.buttonText}>Başla</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    padding: 20,
    width: width * 0.9,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 90,
    marginBottom: 16,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
