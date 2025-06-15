import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from '../../LanguageContext'; 
import { translations } from '../../translations';

const { width: screenWidth } = Dimensions.get('window');

const EMOTIONS_DATA = [
  { nameKey: 'joy', population: 20, color: '#f39c12' },
  { nameKey: 'sadness', population: 20, color: '#2980b9' },
  { nameKey: 'fear', population: 20, color: '#8e44ad' },
  { nameKey: 'anger', population: 20, color: '#c0392b' },
  { nameKey: 'surprise', population: 20, color: '#27ae60' },
];

const chartConfig = {
  backgroundGradientFrom: '#2E7D32',
  backgroundGradientTo: '#2E7D32',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};

export default function SohbetAnalizScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const paddingTop = Math.min(Math.max(insets.top, 16), 28) + 8;
  const { language } = useLanguage();
  const t = translations[language];

  const handleSaveAndFinish = () => {
    Alert.alert(t.info, t.chatSavedEnded);
    navigation.goBack();
  };

  const handleFinishOnly = () => {
    Alert.alert(t.info, t.chatEnded, [
      {
        text: t.ok,
        onPress: () => navigation.navigate('SohbetMain'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.container, { paddingTop }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <View style={styles.backContent}>
              <Ionicons name="arrow-back" size={22} color="#2E7D32" />
              <Text style={styles.backButtonText}>{t.back}</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{t.chatAnalysis}</Text>
          <View style={styles.spacer} />
        </View>

        <View style={styles.body}>
          <View style={styles.aiContainer}>
            <Text style={styles.subtitle}>{t.aiEvaluation}</Text>
            <Text style={styles.aiText}>{t.aiEvaluationText}</Text>
          </View>

          <Text style={[styles.subtitle, styles.marginTopLarge]}>
            {t.detectedEmotions}
          </Text>

          <PieChart
            data={EMOTIONS_DATA.map(({ nameKey, population, color }) => ({
              name: t[nameKey],
              population,
              color,
              legendFontColor: '#444',
              legendFontSize: Math.round(screenWidth * 0.035),
            }))}
            width={screenWidth * 0.9}
            height={screenWidth * 0.6}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft={12}
            absolute
            hasLegend
            style={styles.chart}
          />

          <Text style={[styles.paragraph, styles.archivePrompt]}>
            {t.archivePrompt}
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSaveAndFinish}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>{t.saveAndFinish}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.endButton]}
              onPress={handleFinishOnly}
              activeOpacity={0.8}
            >
              <Text style={styles.endButtonText}>{t.finishOnly}</Text>
            </TouchableOpacity>
          </View>
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
  },
  spacer: {
    width: 70,
  },
  body: {
    alignItems: 'center',
  },
  aiContainer: {
    backgroundColor: 'rgba(46, 125, 50, 0.15)',
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    marginTop: 20,
    width: '100%',
  },
  subtitle: {
    fontSize: Math.round(screenWidth * 0.045),
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
    width: '100%',
  },
  aiText: {
    fontSize: Math.round(screenWidth * 0.04),
    color: '#2E7D32',
    marginTop: 6,
    lineHeight: Math.round(screenWidth * 0.06),
    textAlign: 'center',
  },
  marginTopLarge: {
    marginTop: 18,
  },
  chart: {
    marginTop: 16,
    borderRadius: 14,
  },
  paragraph: {
    fontSize: Math.round(screenWidth * 0.04),
    marginTop: 12,
    color: '#555',
    lineHeight: Math.round(screenWidth * 0.06),
    textAlign: 'center',
    width: '100%',
  },
  archivePrompt: {
    marginTop: 18,
    fontWeight: '700',
    color: '#2E7D32',
  },
  buttonRow: {
    marginTop: 22,
    width: '100%',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 26,
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#388E3C',
  },
  saveButtonText: {
    color: '#e8f5e9',
    fontWeight: '700',
    fontSize: Math.round(screenWidth * 0.045),
  },
  endButton: {
    backgroundColor: '#A5D6A7',
  },
  endButtonText: {
    color: '#2E7D32',
    fontWeight: '700',
    fontSize: Math.round(screenWidth * 0.045),
  },
});
