import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
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
      {/* Geri Butonu */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Start')}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        <Text style={styles.backButtonText}>Geri</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />

        <Text style={styles.subtitle}>
          MindCaps, terapi yerine geçmez. Ancak psikolojik farkındalık ve destek amacıyla geliştirilmiş bir araçtır.
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.8}
        >
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
  },
  backButton: {
  position: 'absolute',
  top: Platform.OS === 'ios' ? 80 : 60,  // iOS için 80, Android için 60 yaptım
  left: 20,
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 20,
  backgroundColor: 'rgba(255,255,255,0.85)',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 25,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.15,
  shadowRadius: 3,
  elevation: 5,
},
  backButtonText: {
    fontSize: 16,
    color: '#2E7D32',
    marginLeft: 6,
    fontWeight: '600',
  },
  contentContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 17,
    color: '#2E7D32',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 50,
    fontWeight: '500',
  },
  button: {
    width: width * 0.75,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,

    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 7,
  },
  loginButton: {
    backgroundColor: '#388E3C',
  },
  registerButton: {
    backgroundColor: '#A5D6A7',
  },
  buttonText: {
    color: '#e8f5e9',
    fontSize: 18,
    fontWeight: '700',
  },
  registerButtonText: {
    color: '#2E7D32',
    fontSize: 18,
    fontWeight: '700',
  },
});
