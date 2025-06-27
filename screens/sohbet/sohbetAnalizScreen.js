import React, { useEffect, useState } from 'react';
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
import LottieView from 'lottie-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { translations } from '../../translations';

const { width: screenWidth } = Dimensions.get('window');

const emotionColors = {
  tr: {
    sevinç: '#F7DC6F',
    üzüntü: '#85C1E9',
    korku: '#A569BD',
    öfke: '#EC7063',
    tiksinti: '#58D68D',
    şaşkınlık: '#F8C471',
  },
  en: {
    joy: '#F7DC6F',
    sadness: '#85C1E9',
    fear: '#A569BD',
    anger: '#EC7063',
    disgust: '#58D68D',
    surprise: '#F8C471',
  },
};

function createAIEvaluationText(emotions, language) {
  const t = translations[language].aiEvaluationMessages;
  const entries = Object.entries(emotions);
  if (entries.length === 0) return t.notEnoughData;

  let maxEmotion = entries[0][0];
  let maxValue = entries[0][1];
  for (const [emotion, value] of entries) {
    if (value > maxValue) {
      maxValue = value;
      maxEmotion = emotion;
    }
  }

  switch (maxEmotion) {
    case 'sevinç':
    case 'joy':
      if (maxValue > 40) return t.joy;
      break;
    case 'üzüntü':
    case 'sadness':
      if (maxValue > 30) return t.sadness;
      break;
    case 'korku':
    case 'fear':
      if (maxValue > 30) return t.fear;
      break;
    case 'öfke':
    case 'anger':
      if (maxValue > 30) return t.anger;
      break;
    case 'tiksinti':
    case 'disgust':
      if (maxValue > 30) return t.disgust;
      break;
    case 'şaşkınlık':
    case 'surprise':
      if (maxValue > 30) return t.surprise;
      break;
    default:
      return t.default;
  }
  return t.balanced;
}

export default function SohbetAnalizScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const paddingTop = Math.min(Math.max(insets.top, 16), 28) + 8;

  const messages = route.params?.messages || [];
  const language = route.params?.language || 'tr';

  const t = translations[language].chatAnalysisScreen;
  const emotionNames = translations[language].emotions;
  const common = translations[language].common;
  const aiMessages = translations[language].aiEvaluationMessages;

  const [loading, setLoading] = useState(false);
  const [emotionsData, setEmotionsData] = useState([]);
  const [aiEvaluationText, setAiEvaluationText] = useState(t.loading);

  useEffect(() => {
    if (messages.length === 0) {
      setAiEvaluationText(t.noData);
      setEmotionsData([]);
      return;
    }

    setLoading(true);

    fetch("http://192.168.3.216:5000/analyze-emotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: messages, language }),
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        if (json.error) {
          setAiEvaluationText(aiMessages.errorPrefix + json.error);
          setEmotionsData([]);
          return;
        }

        const emotions = json.emotions || {};
        const colorsForLanguage = emotionColors[language] || emotionColors['en'];

        const allowedEmotions = language === 'tr'
          ? ['sevinç', 'üzüntü', 'korku', 'öfke', 'tiksinti', 'şaşkınlık']
          : ['joy', 'sadness', 'fear', 'anger', 'disgust', 'surprise'];

        const filteredEmotions = Object.entries(emotions)
          .filter(([key]) => allowedEmotions.includes(key))
          .reduce((obj, [key, val]) => {
            obj[key] = val;
            return obj;
          }, {});

        const data = Object.entries(filteredEmotions)
          .map(([key, value]) => ({
            name: emotionNames[key] || key,
            population: value,
            color: colorsForLanguage[key] || '#999',
            legendFontColor: '#444',
            legendFontSize: Math.round(screenWidth * 0.035),
          }))
          .filter(item => item.population > 0);

        setEmotionsData(data);
        setAiEvaluationText(createAIEvaluationText(filteredEmotions, language));
      })
      .catch(() => {
        setLoading(false);
        setAiEvaluationText(aiMessages.serverError);
        setEmotionsData([]);
      });
  }, [messages, language]);

  const handleSaveAndFinish = () => {
    Alert.alert(common.info, t.chatSavedEnded);
    navigation.goBack();
  };

  const handleFinishOnly = () => {
    Alert.alert(common.info, t.chatEnded, [
      {
        text: common.ok,
        onPress: () => navigation.navigate('SohbetMain', { resetChat: true }),
      },
    ]);
  };
if (loading) {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <LottieView
        source={require('../../assets/analiz.json')}
        autoPlay
        loop
        style={styles.lottieBigger}
      />
      <View style={styles.loadingTextContainer}>
        <MaterialCommunityIcons name="brain" size={30} color="#2E7D32" style={{ marginRight: 10 }} />
        <Text style={styles.loadingTextBig}>{t.loading}</Text>
      </View>
    </SafeAreaView>
  );
}


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop, flexGrow: 1 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t.headerTitle}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.aiContainer}>
            <Text style={styles.subtitle}>{t.aiEvaluation}</Text>
            <Text style={styles.aiText}>{aiEvaluationText}</Text>
          </View>

          <Text style={[styles.subtitle, styles.marginTopLarge]}>{t.detectedEmotions}</Text>

          {emotionsData.length > 0 ? (
            <>
              <PieChart
                data={emotionsData}
                width={screenWidth * 0.9}
                height={screenWidth * 0.6}
                chartConfig={{
                  backgroundGradientFrom: '#2E7D32',
                  backgroundGradientTo: '#2E7D32',
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  strokeWidth: 2,
                  useShadowColorFromDataset: false,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft={12}
                absolute
                hasLegend
                style={styles.chart}
              />
              <Text style={styles.aiDisclaimer}>{aiMessages.disclaimer}</Text>
            </>
          ) : (
            <Text style={styles.noDataText}>{t.chartNoData}</Text>
          )}

          <Text style={[styles.paragraph, styles.archivePrompt]}>{t.archivePrompt}</Text>

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
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2E7D32',
  },
  body: {
    marginTop: 4,
  },
  aiContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 14,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
  },
  aiText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1B5E20',
  },
  aiDisclaimer: {
    marginTop: 12,
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  marginTopLarge: {
    marginTop: 28,
  },
  chart: {
    marginTop: 12,
  },
  noDataText: {
    marginTop: 18,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  paragraph: {
    fontSize: 14,
    color: '#444',
    marginTop: 12,
    textAlign: 'center',
  },
  archivePrompt: {
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#2E7D32',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  endButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#d32f2f',
  },
  endButtonText: {
    color: '#d32f2f',
    fontWeight: '700',
    fontSize: 16,
  },
  loadingContainer: {
  flex: 1,
  justifyContent: 'flex-start',  // Yukarı hizalama
  alignItems: 'center',
  backgroundColor: '#ffffff',
  paddingHorizontal: 32,
  paddingTop: 150,  // Animasyonun ekranın üstüne yaklaşmasını sağlar
},
lottieBigger: {
  width: screenWidth * 0.85,
  height: screenWidth * 0.85,
  marginBottom: 20,
},
loadingTextContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#E8F5E9',
  paddingHorizontal: 18,
  paddingVertical: 12,
  borderRadius: 14,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 5,
},
loadingTextBig: {
  fontSize: 20,
  fontWeight: '700',
  color: '#2E7D32',
},


});
