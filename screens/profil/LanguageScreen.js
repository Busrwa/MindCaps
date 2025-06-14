import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window');
const ICON_SIZE = 24;

export default function AboutScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const paddingTop = Math.min(Math.max(insets.top, 16), 28) + 8;

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
              <Text style={styles.backButtonText}>Geri</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Hakkında</Text>

          <View style={styles.spacer} />
        </View>

        {/* İçerik Kartı */}
        <View style={styles.card}>
          <Text style={styles.title}>MindCaps Nedir?</Text>
          <Text style={styles.text}>
            MindCaps, yapay zeka destekli bir rehberlik uygulamasıdır. Kullanıcıların geçmiş, şimdiki ve gelecekteki benlikleriyle
            etkileşim kurarak içsel keşiflerini destekler. Sesli, yazılı veya görsel olarak ifade edilen duygular, yapay zeka tarafından
            analiz edilir ve yansıtıcı, empatik sorularla kişisel farkındalık süreçlerine rehberlik edilir.
          </Text>

          <Text style={styles.subtitle}>Temel Özellikler</Text>
          <Text style={styles.text}>
            • Geçmiş benlik ile kişilik simülasyonu ve içsel çocuk diyaloğu {'\n'}
            • Şimdiki benliğe özel duygu haritası çıkarımı {'\n'}
            • Gelecek benlikten motive edici senaryolar ve yönlendirmeler {'\n'}
            • Psikologlar tarafından denetlenebilir esnek yapay zeka sistemi {'\n'}
            • Mahremiyet ve etik değerlere tam uyum
          </Text>

          <Text style={styles.subtitle}>Kimler İçin Uygun?</Text>
          <Text style={styles.text}>
            • Geçmiş travmalarıyla yüzleşmek isteyenler {'\n'}
            • Duygusal farkındalık kazanmak isteyen bireyler {'\n'}
            • Geleceğe yönelik yön bulmak isteyenler {'\n'}
            • Geleneksel terapiye erişimi kısıtlı kullanıcılar
          </Text>

          <Text style={styles.subtitle}>Güvenlik ve Etik</Text>
          <Text style={styles.text}>
            MindCaps, terapi amacıyla değil, rehberlik amacıyla geliştirilmiştir. Yapay zeka yalnızca yansıtıcı ve destekleyici
            bir rol üstlenir. Tüm kullanıcı verileri anonimleştirilerek saklanır.
          </Text>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#388E3C',
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
