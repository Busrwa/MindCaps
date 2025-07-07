import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  SafeAreaView,
  Keyboard,
  Animated,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import TabNavigator from '../../navigation/TabNavigator';

// Firebase importları
import { auth } from '../../services/firebase'; // Kendi firebase servis dosyan
import { signInWithEmailAndPassword } from 'firebase/auth';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();

  const cardPosition = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      const keyboardHeight = e.endCoordinates.height;
      const moveUpValue = keyboardHeight * 0.7;

      Animated.timing(cardPosition, {
        toValue: -moveUpValue,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(cardPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [cardPosition]);

  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifre alanlarını doldurun.');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    Alert.alert('Başarılı', 'Giriş başarılı!');
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabNavigator' }],
    });
  })
      .catch((error) => {
        Alert.alert('Giriş Hatası', error.message);
      });
  };

  return (
    <ImageBackground
      source={require('../../assets/startScreenBackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          <TouchableOpacity
            style={[styles.backButton, { top: Platform.OS === 'ios' ? 30 : 60 }]}
            onPress={() => navigation.navigate('Welcome')}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="#2E7D32" />
          </TouchableOpacity>

          <Animated.View
            style={[styles.card, { transform: [{ translateY: cardPosition }] }]}
          >
            <Image
              source={require('../../assets/mindcaps.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.title}>Giriş Yap</Text>
            <Text style={styles.subtitle}>
              Kendinle yeniden tanışmak için giriş yap.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="E-posta"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              blurOnSubmit={false}
            />

            <TextInput
              style={styles.input}
              placeholder="Şifre"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              ref={passwordRef}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Giriş Yap</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}>
                Hesabın yok mu?{' '}
                <Text style={styles.registerLink}>Kayıt Ol</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
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
    zIndex: 10,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: width * 0.9,
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
    width: 330,
    height: 150,
    marginBottom: 4,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#A5D6A7',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
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
  registerText: {
    fontSize: 14,
    color: '#555',
  },
  registerLink: {
    color: '#2E7D32',
    fontWeight: '600',
  },
});
