import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window');

export default function PrivacyPolicyScreen({ navigation }) {
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

          <Text style={styles.headerTitle}>Gizlilik Politikası</Text>

          <View style={styles.spacer} />
        </View>

        {/* Gizlilik Politikası Metni */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Kişisel Verilerin Korunması</Text>
          <Text style={styles.text}>
            MindCaps olarak kullanıcılarımızın gizliliğine büyük önem veriyoruz. Kişisel verileriniz, sadece uygulamanın sağlıklı çalışması,
            size daha iyi hizmet sunabilmemiz ve yasal yükümlülüklerimizin yerine getirilmesi amacıyla toplanmakta ve işlenmektedir.
          </Text>

          <Text style={styles.sectionTitle}>Veri Toplama ve Kullanımı</Text>
          <Text style={styles.text}>
            Uygulamamızda toplanan veriler şunlardır:{'\n'}
            - Kullanıcı kimlik bilgileri {'\n'}
            - Uygulama kullanım verileri {'\n'}
            - Cihaz bilgileri ve teknik veriler {'\n'}
            Bu veriler yalnızca belirtilen amaçlar doğrultusunda kullanılacaktır.
          </Text>

          <Text style={styles.sectionTitle}>Veri Güvenliği</Text>
          <Text style={styles.text}>
            Tüm kişisel verileriniz, uluslararası standartlarda güvenlik önlemleriyle korunmaktadır.
            Veri sızıntılarını önlemek için teknik ve idari tedbirler uygulanmaktadır.
          </Text>

          <Text style={styles.sectionTitle}>Üçüncü Taraflarla Paylaşım</Text>
          <Text style={styles.text}>
            Kişisel verileriniz, açık rızanız olmadan üçüncü taraflarla paylaşılmaz.
            Yalnızca yasal zorunluluklar ve hizmet sağlamak için gerekli durumlarda paylaşım yapılabilir.
          </Text>

          <Text style={styles.sectionTitle}>Çerezler ve İzleme Teknolojileri</Text>
          <Text style={styles.text}>
            Uygulama içerisinde çerez veya benzeri izleme teknolojileri kullanılmamaktadır.
            Ancak dış bağlantılar üzerinden bu tür teknolojiler aktif olabilir.
          </Text>

          <Text style={styles.sectionTitle}>Kullanıcı Hakları</Text>
          <Text style={styles.text}>
            Kişisel verilerinize erişme, düzeltme, silme ve işlemeyi kısıtlama haklarınız bulunmaktadır.
            Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
          </Text>

          <Text style={styles.sectionTitle}>Gizlilik Politikası Değişiklikleri</Text>
          <Text style={styles.text}>
            Gizlilik politikamızda yapılacak değişiklikler bu sayfa üzerinden duyurulacaktır.
            Politikanın güncel halini düzenli olarak kontrol etmeniz tavsiye edilir.
          </Text>

          <Text style={[styles.text, { marginTop: 20 }]}>
            Son Güncelleme: Haziran 2025
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
    paddingBottom: 30,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#388E3C',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
