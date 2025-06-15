import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useLanguage } from '../LanguageContext'; // Dil context'i
import { translations } from '../translations';   // Dil verileri

const { width } = Dimensions.get('window');

export default function AnalizScreen() {
  const insets = useSafeAreaInsets();
  const paddingTop = Math.min(Math.max(insets.top, 12), 28);

  const [emotionView, setEmotionView] = useState('daily');
  const [thematicView, setThematicView] = useState('weekly');

  const { language } = useLanguage();
  const t = translations[language];

  const emotions = ['Joy', 'Sadness', 'Fear', 'Anger', 'Surprise'];
  const dailyScores = [20, 20, 20, 20, 20];
  const weeklyScores = [50, 50, 50, 50, 50];

  const thematicLabels = ['Low Self-Esteem', 'Future Anxiety', 'Loneliness'];
  const thematicWeekly = [20, 20, 20];
  const thematicMonthly = [20, 20, 20];

  const benlikData = [
    { name: t.futureSelf, population: 20, color: '#6a1b9a' },
    { name: t.pastSelf, population: 20, color: '#00838f' },
    { name: t.presentSelf, population: 20, color: '#ef6c00' },
  ];

  const emotionData = {
    labels: emotions,
    datasets: [
      {
        data: emotionView === 'daily' ? dailyScores : weeklyScores,
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const thematicData = {
    labels: thematicLabels,
    datasets: [
      {
        data: thematicView === 'weekly' ? thematicWeekly : thematicMonthly,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop }]}>
        <Text style={styles.headerTitle}>{t.analysis}</Text>
        <Text style={styles.headerSubtitle}>{t.analysisSubtitle}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Duygu Haritası */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.emotionMap}</Text>

          <View style={styles.toggleRow}>
            <Text
              onPress={() => setEmotionView('daily')}
              style={[
                styles.toggleText,
                emotionView === 'daily' && styles.toggleTextActive,
              ]}
            >
              {t.daily}
            </Text>
            <Text
              onPress={() => setEmotionView('weekly')}
              style={[
                styles.toggleText,
                emotionView === 'weekly' && styles.toggleTextActive,
              ]}
            >
              {t.weekly}
            </Text>
          </View>

          <LineChart
            data={emotionData}
            width={width * 0.9}
            height={220}
            yAxisSuffix="%"
            fromZero
            chartConfig={{
              backgroundGradientFrom: '#e8f5e9',
              backgroundGradientTo: '#e8f5e9',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
              labelColor: () => '#2E7D32',
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#2e7d32',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Tematik Yoğunluk */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.thematicIntensity}</Text>

          <View style={styles.toggleRow}>
            <Text
              onPress={() => setThematicView('weekly')}
              style={[
                styles.toggleText,
                thematicView === 'weekly' && styles.toggleTextActive,
              ]}
            >
              {t.weekly}
            </Text>
            <Text
              onPress={() => setThematicView('monthly')}
              style={[
                styles.toggleText,
                thematicView === 'monthly' && styles.toggleTextActive,
              ]}
            >
              {t.monthly}
            </Text>
          </View>

          <BarChart
            data={thematicData}
            width={width * 0.9}
            height={180}
            fromZero
            yAxisSuffix="%"
            chartConfig={{
              backgroundGradientFrom: '#e8f5e9',
              backgroundGradientTo: '#e8f5e9',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
              labelColor: () => '#2E7D32',
            }}
            style={styles.chart}
          />
        </View>

        {/* Terapi Asistanı Yorumu */}
        <View style={[styles.section, styles.commentBox]}>
          <Text style={styles.sectionTitle}>{t.assistantComment}</Text>
          <Text style={styles.commentText}>{t.assistantText}</Text>
        </View>

        {/* Benliklerle Etkileşim */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.selvesInteraction}</Text>

          <PieChart
            data={benlikData.map(({ name, population, color }) => ({
              name,
              population,
              color,
              legendFontColor: '#444',
              legendFontSize: 14,
            }))}
            width={width * 0.9}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft={12}
            center={[0, 0]}
            hasLegend
            style={{ marginVertical: 10 }}
          />
        </View>

        {/* Sohbet Etkileşimleri */}
        <View style={[styles.section, styles.interactionsContainer]}>
          <Text style={styles.sectionTitle}>{t.chatStats}</Text>

          <View style={styles.interactionsRow}>
            <View style={styles.interactionItem}>
              <Text style={styles.interactionNumber}>14</Text>
              <Text style={styles.interactionLabel}>{t.totalChats}</Text>
            </View>

            <View style={styles.interactionItem}>
              <Text style={styles.interactionNumber}>8</Text>
              <Text style={styles.interactionLabel}>{t.emotionCapsules}</Text>
            </View>

            <View style={styles.interactionItem}>
              <Text style={styles.interactionNumber}>21</Text>
              <Text style={styles.interactionLabel}>{t.freeExpression}</Text>
            </View>
          </View>
        </View>
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
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 26,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  toggleText: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 24,
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  toggleTextActive: {
    color: '#2E7D32',
    fontWeight: '700',
    borderBottomColor: '#2E7D32',
  },
  chart: {
    borderRadius: 14,
  },
  commentBox: {
    backgroundColor: '#dcedc8',
    padding: 16,
    borderRadius: 14,
  },
  commentText: {
    fontSize: 16,
    color: '#33691e',
    lineHeight: 22,
  },
  interactionsContainer: {
    backgroundColor: '#e8f5e9',
    padding: 16,
    borderRadius: 14,
  },
  interactionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  interactionItem: {
    alignItems: 'center',
    flex: 1,
  },
  interactionNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E7D32',
  },
  interactionLabel: {
    fontSize: 14,
    color: '#2E7D32',
    marginTop: 4,
    textAlign: 'center',
  },
});
