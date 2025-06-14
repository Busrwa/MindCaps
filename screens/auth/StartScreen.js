import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

const { width } = Dimensions.get('window');

const StartScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/startScreenBackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image source={require('../../assets/icon.png')} style={styles.logo} />
          <Text style={styles.welcome}>Hoş geldin!</Text>
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
    paddingHorizontal: 24,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 32,
    paddingVertical: 32,
    paddingHorizontal: 24,
    maxWidth: width * 0.92,
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#333',
    textAlign: 'left',
    lineHeight: 24,
  },
  button: {
    marginTop: 28,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    width: width * 0.8,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
