import React, { useState, useEffect } from 'react';
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

import { auth } from '../../services/firebase'; 
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleRegister = () => {
    if (!username.trim() || !email.trim() || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Kullanıcı başarıyla oluşturuldu
        const user = userCredential.user;
        // Kullanıcı adı güncelle
        updateProfile(user, { displayName: username })
          .then(() => {
            Alert.alert('Başarılı', 'Kayıt işlemi tamamlandı');
            navigation.navigate('Login');
          })
          .catch((error) => {
            Alert.alert('Profil güncellenemedi', error.message);
          });
      })
      .catch((error) => {
        Alert.alert('Kayıt Hatası', error.message);
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
            style={[
              styles.backButton,
              { top: Platform.OS === 'ios' ? 30 : 60 },
            ]}
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

            <Text style={styles.title}>Kayıt Ol</Text>
            <Text style={styles.subtitle}>
              MindCaps’e katıl, içsel yolculuğuna başla.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Kullanıcı Adı"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              style={styles.input}
              placeholder="E-posta"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Şifre"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>
                Hesabın var mı?{' '}
                <Text style={styles.loginLink}>Giriş Yap</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;

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
  container: {
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
    // top stilini buradan kaldırdık, inline style ile verdik
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
  registerButton: {
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
  registerButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  loginText: {
    fontSize: 14,
    color: '#555',
  },
  loginLink: {
    color: '#2E7D32',
    fontWeight: '600',
  },
});
