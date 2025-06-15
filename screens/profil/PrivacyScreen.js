import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from '../../LanguageContext'; // Dil context'ini kendi yapına göre ayarla
import { translations } from '../../translations';

const { width: screenWidth } = Dimensions.get('window');

export default function PrivacyPolicyScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const paddingTop = Math.min(Math.max(insets.top, 16), 28) + 8;

  const { language } = useLanguage();
  const t = translations[language].sections;
  const backText = translations[language].back;
  const title = translations[language].privacyTitle;

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
              <Text style={styles.backButtonText}>{backText}</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{title}</Text>

          <View style={styles.spacer} />
        </View>

        {/* Gizlilik Politikası Metni */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t.personalData}</Text>
          <Text style={styles.text}>{t.personalDataText}</Text>

          <Text style={styles.sectionTitle}>{t.dataCollection}</Text>
          <Text style={styles.text}>{t.dataCollectionText}</Text>

          <Text style={styles.sectionTitle}>{t.dataSecurity}</Text>
          <Text style={styles.text}>{t.dataSecurityText}</Text>

          <Text style={styles.sectionTitle}>{t.thirdParties}</Text>
          <Text style={styles.text}>{t.thirdPartiesText}</Text>

          <Text style={styles.sectionTitle}>{t.cookies}</Text>
          <Text style={styles.text}>{t.cookiesText}</Text>

          <Text style={styles.sectionTitle}>{t.userRights}</Text>
          <Text style={styles.text}>{t.userRightsText}</Text>

          <Text style={styles.sectionTitle}>{t.policyChanges}</Text>
          <Text style={styles.text}>{t.policyChangesText}</Text>

          <Text style={[styles.text, { marginTop: 20 }]}>{t.lastUpdate}</Text>
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
    paddingBottom: 30,
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
  },
  spacer: {
    width: 70,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#388E3C',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
