import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { differenceInDays } from 'date-fns';
import getQuotesByLanguage from '../utils/quotes';

const { width } = Dimensions.get('window');

export default function AnalizScreen() {
  const insets = useSafeAreaInsets();
  const paddingTop = Math.min(Math.max(insets.top, 12), 28);

  const { language } = useLanguage();
  const t = translations[language];
  const quotes = getQuotesByLanguage(language);

  const emotions = language === 'tr'
    ? ['sevinç', 'üzüntü', 'korku', 'öfke', 'tiksinti', 'şaşkınlık']
    : ['joy', 'sadness', 'fear', 'anger', 'disgust', 'surprise'];

  const thematicLabels = language === 'tr'
    ? ['Düşük Benlik', 'Gelecek Kaygısı', 'Yalnızlık']
    : ['Low Self-Esteem', 'Future Anxiety', 'Loneliness'];

  const thematicEmotionWeights = language === 'tr'
    ? {
        'Düşük Benlik': { 'üzüntü': 0.6, 'öfke': 0.4 },
        'Gelecek Kaygısı': { 'korku': 0.7, 'şaşkınlık': 0.3 },
        'Yalnızlık': { 'üzüntü': 0.5, 'tiksinti': 0.5 },
      }
    : {
        'Low Self-Esteem': { 'sadness': 0.6, 'anger': 0.4 },
        'Future Anxiety': { 'fear': 0.7, 'surprise': 0.3 },
        'Loneliness': { 'sadness': 0.5, 'disgust': 0.5 },
      };

  const [loading, setLoading] = useState(true);
  const [emotionView, setEmotionView] = useState('daily');
  const [thematicView, setThematicView] = useState('weekly');

  const [dailyScores, setDailyScores] = useState(new Array(emotions.length).fill(0));
  const [weeklyScores, setWeeklyScores] = useState(new Array(emotions.length).fill(0));
  const [thematicWeekly, setThematicWeekly] = useState([0, 0, 0]);
  const [thematicMonthly, setThematicMonthly] = useState([0, 0, 0]);

  // Yeni: sohbet sayıları
  const [totalChats, setTotalChats] = useState(0);
  const [futureMessages, setFutureMessages] = useState(0);

  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, [language]);

  function calculateThematicScores(emotionScores, weights) {
    return Object.keys(weights).map(theme => {
      const emotionWeightMap = weights[theme];
      let score = 0;
      Object.entries(emotionWeightMap).forEach(([emotion, weight]) => {
        const emotionIndex = emotions.indexOf(emotion);
        if (emotionIndex !== -1) {
          score += emotionScores[emotionIndex] * weight;
        }
      });
      return Math.round(score);
    });
  }

  useEffect(() => {
    async function fetchEmotionData() {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const userId = auth.currentUser.uid;

        // chats ve futuremessage koleksiyonlarını çek
        const chatsSnap = await getDocs(collection(db, 'users', userId, 'chats'));
        const futureMessagesSnap = await getDocs(collection(db, 'users', userId, 'futureMessages'));

        // Toplam sohbet sayıları
        setTotalChats(chatsSnap.size + futureMessagesSnap.size);
        setFutureMessages(futureMessagesSnap.size);

        const today = new Date();
        const dailyCounts = {};
        const weeklyCounts = {};
        let dailyTotal = 0;
        let weeklyTotal = 0;

        chatsSnap.forEach((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate?.();
          const emotionsData = data.emotions || {};

          if (!createdAt) return;

          const dayDiff = differenceInDays(today, createdAt);

          if (dayDiff <= 30) {
            Object.entries(emotionsData).forEach(([emotion, value]) => {
              dailyCounts[emotion] = (dailyCounts[emotion] || 0) + value;
              dailyTotal += value;
            });
          }

          if (dayDiff <= 7) {
            Object.entries(emotionsData).forEach(([emotion, value]) => {
              weeklyCounts[emotion] = (weeklyCounts[emotion] || 0) + value;
              weeklyTotal += value;
            });
          }
        });

        const newDailyScores = emotions.map(e =>
          dailyTotal > 0 ? Math.round((dailyCounts[e] || 0) * 100 / dailyTotal) : 0
        );
        const newWeeklyScores = emotions.map(e =>
          weeklyTotal > 0 ? Math.round((weeklyCounts[e] || 0) * 100 / weeklyTotal) : 0
        );

        setDailyScores(newDailyScores);
        setWeeklyScores(newWeeklyScores);

        setThematicWeekly(calculateThematicScores(newWeeklyScores, thematicEmotionWeights));
        setThematicMonthly(calculateThematicScores(newDailyScores, thematicEmotionWeights));

      } catch (error) {
        console.error('Firestore veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmotionData();
  }, [language]);

  const emotionData = {
    labels: emotions.map(e => t.emotions?.[e] || e),
    datasets: [{
      data: emotionView === 'daily' ? dailyScores : weeklyScores,
      color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
      strokeWidth: 3,
    }],
  };

  const thematicData = {
    labels: thematicLabels,
    datasets: [{
      data: thematicView === 'weekly' ? thematicWeekly : thematicMonthly,
    }],
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.loadingContainer, { paddingTop }]}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>{t.loading || 'Yükleniyor...'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop }]}>
        <Text style={styles.headerTitle}>{t.analysis}</Text>
        <Text style={styles.headerSubtitle}>{t.analysisSubtitle}</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { flexGrow: 1, paddingBottom: 60 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.emotionMap}</Text>

          <View style={styles.toggleRow}>
            <Text
              onPress={() => setEmotionView('daily')}
              style={[styles.toggleText, emotionView === 'daily' && styles.toggleTextActive]}
            >
              {t.daily}
            </Text>
            <Text
              onPress={() => setEmotionView('weekly')}
              style={[styles.toggleText, emotionView === 'weekly' && styles.toggleTextActive]}
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
              propsForDots: { r: '6', strokeWidth: '2', stroke: '#2e7d32' },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.thematicIntensity}</Text>

          <View style={styles.toggleRow}>
            <Text
              onPress={() => setThematicView('weekly')}
              style={[styles.toggleText, thematicView === 'weekly' && styles.toggleTextActive]}
            >
              {t.weekly}
            </Text>
            <Text
              onPress={() => setThematicView('monthly')}
              style={[styles.toggleText, thematicView === 'monthly' && styles.toggleTextActive]}
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

        <View style={[styles.section, styles.commentBox]}>
          <Text style={styles.sectionTitle}>{t.assistantComment}</Text>
          {quote && (
            <>
              <Text style={styles.commentText}>"{quote.text}"</Text>
              <Text style={[styles.commentText, { fontStyle: 'italic', textAlign: 'right', marginTop: 6 }]}>
                — {quote.author}
              </Text>
            </>
          )}
        </View>

        <View style={[styles.section, styles.interactionsContainer]}>
          <Text style={styles.sectionTitle}>{t.chatStats}</Text>

          <View style={styles.interactionsRow}>
            <View style={styles.interactionItem}>
              <Text style={styles.interactionNumber}>{totalChats}</Text>
              <Text style={styles.interactionLabel}>{t.totalChats}</Text>
            </View>

            <View style={styles.interactionItem}>
              <Text style={styles.interactionNumber}>{futureMessages}</Text>
              <Text style={styles.interactionLabel}>{t.emotionCapsules}</Text>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F8F8' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#2E7D32', fontSize: 16, marginTop: 12 },
  header: {
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#2E7D32' },
  headerSubtitle: { fontSize: 15, color: '#666', marginTop: 4, textAlign: 'center' },
  scrollContent: { paddingVertical: 24, paddingHorizontal: 16 },
  section: { marginBottom: 26 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#2E7D32', marginBottom: 10 },
  toggleRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
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
  chart: { borderRadius: 14 },
  commentBox: { backgroundColor: '#dcedc8', padding: 16, borderRadius: 14 },
  commentText: { fontSize: 16, color: '#33691e', lineHeight: 22 },
  interactionsContainer: { backgroundColor: '#e8f5e9', padding: 16, borderRadius: 14 },
  interactionsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  interactionItem: { alignItems: 'center', flex: 1 },
  interactionNumber: { fontSize: 28, fontWeight: '700', color: '#2E7D32' },
  interactionLabel: { fontSize: 14, color: '#2E7D32', marginTop: 4, textAlign: 'center' },
});
