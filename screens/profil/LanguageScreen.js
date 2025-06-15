import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from '../../LanguageContext';

const { width: screenWidth } = Dimensions.get('window');

const LANGUAGES = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
];

export default function LanguageScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const paddingTop = Math.min(Math.max(insets.top, 16), 28) + 8;

  const { language, setLanguage } = useLanguage();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.container, { paddingTop }]} showsVerticalScrollIndicator={false}>
        {/* Başlık ve Geri */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <View style={styles.backContent}>
              <Ionicons name="arrow-back" size={22} color="#2E7D32" />
              <Text style={styles.backButtonText}>{language === 'en' ? 'Back' : 'Geri'}</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{language === 'en' ? 'Language Selection' : 'Dil Seçimi'}</Text>

          <View style={styles.spacer} />
        </View>

        {/* Dil Seçimi Kartı */}
        <View style={styles.card}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.langButton,
                language === lang.code && styles.langButtonSelected,
              ]}
              onPress={() => setLanguage(lang.code)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.langButtonText,
                  language === lang.code && styles.langButtonTextSelected,
                ]}
              >
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 70,
  },
  backContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: Math.round(screenWidth * 0.04),
    color: '#2E7D32',
    marginLeft: 6,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: Math.round(screenWidth * 0.06),
    fontWeight: '700',
    color: '#2E7D32',
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    width: 70,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  langButton: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  langButtonSelected: {
    backgroundColor: '#2E7D32',
    borderRadius: 14,
  },
  langButtonText: {
    fontSize: 18,
    color: '#2E7D32',
    fontWeight: '600',
  },
  langButtonTextSelected: {
    color: '#fff',
  },
});
