import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const { width } = Dimensions.get('window');
const ICON_SIZE = 26;

export default function ProfilScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const paddingTop = Math.min(Math.max(insets.top, 12), 28);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { language } = useLanguage();
  const t = translations[language];

  const handleLogout = () => {
    navigation.navigate('Start');
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop }]}>
        <Text style={styles.headerTitle}>{t.profile}</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconWrapper}>
          <Image source={require('../assets/icon.png')} style={styles.profileIcon} />
        </View>

        <Text style={styles.sectionTitle}>{t.generalSettings}</Text>

        <View style={styles.row}>
          <Ionicons name="moon" size={ICON_SIZE} color="#2E7D32" style={styles.icon} />
          <View style={styles.labelColumn}>
            <Text style={styles.label}>{t.mode}</Text>
            <Text style={styles.subLabel}>{t.darkLight}</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: '#ccc', true: '#2E7D32' }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity style={styles.row} onPress={() => handleNavigate('LanguageScreen')}>
          <Ionicons name="language" size={ICON_SIZE} color="#2E7D32" style={styles.icon} />
          <View style={styles.labelColumn}>
            <Text style={styles.label}>{t.language}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleNavigate('AboutScreen')}>
          <Ionicons name="information-circle" size={ICON_SIZE} color="#2E7D32" style={styles.icon} />
          <View style={styles.labelColumn}>
            <Text style={styles.label}>{t.about}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleNavigate('TermsScreen')}>
          <Ionicons name="document-text" size={ICON_SIZE} color="#2E7D32" style={styles.icon} />
          <View style={styles.labelColumn}>
            <Text style={styles.label}>{t.terms}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleNavigate('PrivacyScreen')}>
          <Ionicons name="lock-closed" size={ICON_SIZE} color="#2E7D32" style={styles.icon} />
          <View style={styles.labelColumn}>
            <Text style={styles.label}>{t.privacy}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>{t.logout}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    paddingBottom: 14,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  scrollContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileIcon: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'contain',
    borderRadius: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    elevation: 2,
  },
  icon: {
    marginRight: 14,
    width: ICON_SIZE,
  },
  labelColumn: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  subLabel: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 30,
    marginBottom: 40, // Eklendi: Alt boşluk
    borderWidth: 1.5,
    borderColor: '#D32F2F',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoutText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: '600',
  },
});
