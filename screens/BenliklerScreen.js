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
import { useLanguage } from '../LanguageContext'; // Dil seçimi için context
import { translations } from '../translations';

const { width, height } = Dimensions.get('window');

export default function BenliklerOnboardingScreen({ navigation }) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { language } = useLanguage();
  const t = translations[language];
  const onboardingData = t.onboarding;

  const handleNext = (index) => {
    if (index < onboardingData.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (index + 1), animated: true });
    } else {
      navigation.navigate('GecmisBenlik'); // Son slaytta yönlendirme
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
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => navigation.navigate('GecmisBenlik')}
            >
              <Text style={styles.skipButtonText}>{t.skip}</Text>
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

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleNext(index)}
              >
                <Text style={styles.buttonText}>
                  {index === onboardingData.length - 1 ? t.start : t.next}
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
    marginTop: -80,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
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
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
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
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
