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
import { translations } from '../../translations';

const { width: screenWidth } = Dimensions.get('window');

export default function TermsScreen({ navigation }) {
  const { language } = useLanguage();
  const t = translations[language];
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 20) + 12;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <View style={styles.backContent}>
            <Ionicons name="arrow-back" size={22} color="#2E7D32" />
            <Text style={styles.backButtonText}>{t.back}</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t.termsTitle}</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{t.termsHeader}</Text>
          <Text style={styles.text}>{t.termsIntro}</Text>

          {t.termsSections.map((section, index) => (
            <View key={index}>
              <Text style={styles.subtitle}>{section.title}</Text>
              <Text style={styles.text}>{section.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  backButton: { width: 70 },
  backContent: { flexDirection: 'row', alignItems: 'center' },
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
  },
  spacer: { width: 70 },
  scrollArea: { flex: 1, backgroundColor: '#fff' },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#388E3C',
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
