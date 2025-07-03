import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { collection, onSnapshot } from 'firebase/firestore';
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

  const emotions = ['sevinç', 'üzüntü', 'korku', 'öfke', 'tiksinti', 'şaşkınlık'];

  const emotionLabels = emotions.map(e => {
    if (language === 'tr') return e;
    const map = {
      'sevinç': 'Joy',
      'üzüntü': 'Sadness',
      'korku': 'Fear',
      'öfke': 'Anger',
      'tiksinti': 'Disgust',
      'şaşkınlık': 'Surprise',
    };
    return map[e] || e;
  });

  const thematicLabels = language === 'tr'
    ? ['Düşük Benlik', 'Gelecek Kaygısı', 'Yalnızlık']
    : ['Low Self-Esteem', 'Future Anxiety', 'Loneliness'];

  const thematicEmotionWeights = {
    'Düşük Benlik': { 'üzüntü': 0.6, 'öfke': 0.4 },
    'Gelecek Kaygısı': { 'korku': 0.7, 'şaşkınlık': 0.3 },
    'Yalnızlık': { 'üzüntü': 0.5, 'tiksinti': 0.5 },
  };

  const [loading, setLoading] = useState(true);
  const [emotionView, setEmotionView] = useState('daily');
  const [thematicView, setThematicView] = useState('weekly');
  const [dailyScores, setDailyScores] = useState(new Array(emotions.length).fill(0));
  const [weeklyScores, setWeeklyScores] = useState(new Array(emotions.length).fill(0));
  const [thematicWeekly, setThematicWeekly] = useState([0, 0, 0]);
  const [thematicMonthly, setThematicMonthly] = useState([0, 0, 0]);
  const [totalChats, setTotalChats] = useState(0);
  const [futureMessages, setFutureMessages] = useState(0);
  const [quote, setQuote] = useState(null);

  // Modal için state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  // Bölüm açıklamaları (dil destekli)
  const infoTexts = {
    emotionMap: {
      tr: 'Yapay zeka, kaydedilen sohbet konuşmalarınızdan duygularınızı analiz eder ve bunların günlük ve haftalık yüzdelik dağılımını temel duygu kategorilerine göre gösterir.',
      en: 'AI analyzes your saved chat conversations to calculate your emotions and shows their daily and weekly percentage distribution based on basic emotion categories.',
    },
    thematicIntensity: {
      tr: 'Sohbetlerinizdeki temel duygulara dayanarak "Düşük Benlik", "Gelecek Kaygısı" ve "Yalnızlık" temalarının yüzdelik yoğunluğunu hesaplar. Bu üç tema; özgüven eksikliği, geleceğe dair endişeler ve sosyal izolasyon durumlarını yansıtır. Haftalık ve aylık olarak görüntülenebilir.',
      en: 'Based on your core emotions in chats, it calculates the percentage intensity of the themes "Low Self-Esteem", "Future Anxiety", and "Loneliness". These represent lack of confidence, worries about the future, and social isolation respectively. Can be viewed weekly and monthly.',
    },
    chatStats: {
      tr: 'Toplam sohbet, kaydedilen tüm sohbetlerin sayısını belirtir. Toplam zaman kapsülü ise "Benlikler" sayfasında geleceğe yönelik kaydettiğiniz mektupların sayısını ifade eder.',
      en: 'Total chats represent the count of all saved conversations. Total time capsules indicate how many future-directed letters you have saved on the "Selves" page.',
    },
  };

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
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const userId = auth.currentUser.uid;

    // chats için gerçek zamanlı dinleme
    const unsubscribeChats = onSnapshot(collection(db, 'users', userId, 'chats'), (chatsSnap) => {
      // futureMessages koleksiyonuna da aynı şekilde dinleyici ekleyeceğiz, ama önce chats verisini işle
      const today = new Date();

      let dailyCounts = {};
      let weeklyCounts = {};
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

      setLoading(false);
    });

    // futureMessages için gerçek zamanlı dinleme
    const unsubscribeFutureMessages = onSnapshot(collection(db, 'users', userId, 'futureMessages'), (futureMessagesSnap) => {
      setFutureMessages(futureMessagesSnap.size);
    });

    // totalChats sayısı = chats + futureMessages
    // TotalChats state'ini bu iki snapshot'ın birleşiminden güncellemek için ayrı useEffect veya state yönetimi gerekebilir,
    // burada pratik olarak en güncel toplamı göstermek için ayrı state veya logic eklenebilir.
    // Ancak basitçe: 
    // chatsSnap.size ve futureMessagesSnap.size toplamını anlık birleştirmek için en kolay yol
    // her iki snapshot callback'inde setTotalChats'ı güncellemek.

    // Güncelleme: Bunu yapmak için aşağıdaki şekilde:

    let chatsCount = 0;
    let futuresCount = 0;

    const updateTotalChats = () => {
      setTotalChats(chatsCount + futuresCount);
    };

    const unsubscribeChatsWithCount = onSnapshot(collection(db, 'users', userId, 'chats'), (chatsSnap) => {
      chatsCount = chatsSnap.size;
      updateTotalChats();
      // ...aynı zamanda emotion verilerini işlemek için yukarıdaki kodu tekrar yazmak yerine buraya taşıyabilirsin
      // Ama şimdilik sadece sayıyı güncelleyelim
    });

    const unsubscribeFuturesWithCount = onSnapshot(collection(db, 'users', userId, 'futureMessages'), (futureMessagesSnap) => {
      futuresCount = futureMessagesSnap.size;
      setFutureMessages(futuresCount);
      updateTotalChats();
    });

    // Bu iki yeni aboneliği iptal et
    return () => {
      unsubscribeChats();
      unsubscribeFutureMessages();
      unsubscribeChatsWithCount();
      unsubscribeFuturesWithCount();
    };
  }, [language]);

  // Modal açma fonksiyonu
  function openInfo(sectionKey) {
    const text = infoTexts[sectionKey]?.[language] || '';
    setModalText(text);
    setModalVisible(true);
  }

  const emotionData = {
    labels: emotionLabels,
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

        {/* Duygu Haritası Bölümü */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>{t.emotionMap}</Text>
            <TouchableOpacity
              style={styles.infoIconContainer}
              onPress={() => openInfo('emotionMap')}
              activeOpacity={0.6}
            >
              <Text style={styles.infoIcon}>i</Text>
            </TouchableOpacity>
          </View>

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

        {/* Tematik Yoğunluk Bölümü */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>{t.thematicIntensity}</Text>
            <TouchableOpacity
              style={styles.infoIconContainer}
              onPress={() => openInfo('thematicIntensity')}
              activeOpacity={0.6}
            >
              <Text style={styles.infoIcon}>i</Text>
            </TouchableOpacity>
          </View>

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

        {/* Asistan Yorumu */}
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

        {/* Sohbet Etkileşimleri */}
        <View style={[styles.section, styles.interactionsContainer]}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>{t.chatStats}</Text>
            <TouchableOpacity
              style={styles.infoIconContainer}
              onPress={() => openInfo('chatStats')}
              activeOpacity={0.6}
            >
              <Text style={styles.infoIcon}>i</Text>
            </TouchableOpacity>
          </View>

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

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalText}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
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
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#2E7D32' },
  infoIconContainer: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  infoIcon: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },

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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 14,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});
