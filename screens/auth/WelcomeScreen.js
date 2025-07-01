import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/startScreenBackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Geri Butonu */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Start')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#2E7D32" />
        </TouchableOpacity>

        <View style={styles.card}>
          <Image source={require('../../assets/mindcaps.png')} style={styles.logo} />

          <Text style={styles.title}>Hoş Geldin!</Text>

          <Text style={styles.infoText}>
            MindCaps terapi yerine geçmez. Psikolojik farkındalık ve destek amacıyla geliştirilmiş, seni anlamaya hazır bir araçtır.
          </Text>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.85}
          >
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.85}
          >
            <Text style={styles.registerButtonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WelcomeScreen;

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
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 70,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    width: width * 0.88,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
logo: {
  width: 250,
  height: 200,
  marginBottom: 1,
},

  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 13,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 13,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#A5D6A7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  registerButtonText: {
    color: '#2E7D32',
    fontSize: 17,
    fontWeight: '600',
  },
});
