import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Benliklerle Büyüleyici Bir Yolculuk Başlıyor',
    subtitle: 'Bu uygulamada geçmişini keşfedecek, şu anki duygularını anlayacak ve gelecekteki kendinden sana özel bir mesaj alacaksın.',
    animation: require('../assets/letter_borading.json'),
  },
  {
    title: 'Geçmiş ve Şimdiki Sen ile Sohbet Et',
    subtitle: 'Sana özel sorularla geçmişte seni etkileyen anıları ve şu anki düşüncelerini anlamaya çalışacağız.',
    animation: require('../assets/question.json'),
  },
  {
    title: 'Gelecekteki Sen Sana Bir Mektup Gönderdi',
    subtitle: 'Verdiğin yanıtlar doğrultusunda, gelecekteki senin sana yazdığı anlamlı bir mesaj kutusunu birlikte açacağız.',
    animation: require('../assets/future_letter.json'),
  },
];

export default function BenliklerOnboardingScreen({ navigation }) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (index) => {
    if (index < onboardingData.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (index + 1), animated: true });
    } else {
      navigation.replace('GecmisBenlik');
    }
  };

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {onboardingData.map((item, index) => (
          <View key={index} style={styles.page}>
            {/* Atla Butonu */}
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => navigation.replace('GecmisBenlik')}
            >
              <Text style={styles.skipButtonText}>Atla</Text>
            </TouchableOpacity>

            <View style={styles.contentWrapper}>
              <LottieView
                source={item.animation}
                autoPlay
                loop
                style={styles.lottie}
              />

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>

              {/* Dot'lar */}
              <View style={styles.dotsContainer}>
                {onboardingData.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      currentIndex === i ? styles.activeDot : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>

              {/* İleri / Başla Butonu */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleNext(index)}
              >
                <Text style={styles.buttonText}>
                  {index === onboardingData.length - 1 ? 'Başla' : 'İleri'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  page: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: -40,
  },
  skipButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#2E7D32',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    zIndex: 10,
  },
  skipButtonText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
  lottie: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#2E7D32',
  },
  inactiveDot: {
    backgroundColor: '#C8E6C9',
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
