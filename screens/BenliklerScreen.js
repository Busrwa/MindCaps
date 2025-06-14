import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = width * 0.55;

const data = [
  {
    title: 'Geçmiş Benlik',
    image: require('../assets/gecmis.png'),
    screen: 'GecmisBenlik',
  },
  {
    title: 'Şimdiki Benlik',
    image: require('../assets/simdi.png'),
    screen: 'SimdikiBenlik',
  },
  {
    title: 'Gelecek Benlik',
    image: require('../assets/gelecek.png'),
    screen: 'GelecekBenlik',
  },
];

export default function BenliklerScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // SohbetAnalizScreen’deki gibi min 12 max 28 paddingTop sınırı
  const paddingTop = Math.min(Math.max(insets.top, 12), 28);

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop }]}>
        <Text style={styles.headerTitle}>Benlikler</Text>
        <Text style={styles.headerSubtitle}>
          Hangi benliğinle konuşmak istersin?
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.cardWrapper}>
            <ImageBackground
              source={item.image}
              style={styles.card}
              imageStyle={{ borderRadius: 18 }}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handlePress(item.screen)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Sohbeti Başlat</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ))}
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
    paddingBottom: 14,
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
    marginTop: 6,
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: CARD_HEIGHT,
    justifyContent: 'center',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.42)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    padding: 18,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
    elevation: 3,
  },
  buttonText: {
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 16,
  },
});
