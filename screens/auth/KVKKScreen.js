import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const KVKKScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Geri Butonu */}
      <TouchableOpacity
        style={[styles.backButton, { top: Platform.OS === 'ios' ? 30 : 60 }]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={22} color="#2E7D32" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>MindCaps KVKK ve Aydınlatma Metni</Text>

        <Text style={styles.sectionTitle}>Kişisel Verilerin Korunması Hakkında Bilgilendirme</Text>
        <Text style={styles.paragraph}>
          MindCaps uygulamasını geliştiren <Text style={styles.bold}>Technova Takımı</Text> olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında kişisel verilerinizin korunmasına büyük önem vermekteyiz.
        </Text>

        <Text style={styles.sectionTitle}>1. Kişisel Verilerin Toplanması</Text>
        <Text style={styles.paragraph}>
          Uygulama içerisinde;
        </Text>
        <Text style={styles.listItem}>• Kullanıcı adı, e-posta gibi kayıt bilgileri,</Text>
        <Text style={styles.listItem}>• Sohbetlerde paylaştığınız veriler,</Text>
        <Text style={styles.listItem}>• Uygulama kullanımı ile ilgili teknik bilgiler,</Text>
        <Text style={styles.paragraph}>
          gibi kişisel verileriniz, sadece sizin açık onayınızla ve yasal gerekliliklere uygun şekilde toplanmaktadır.
        </Text>

        <Text style={styles.sectionTitle}>2. Kişisel Verilerin İşlenme Amaçları</Text>
        <Text style={styles.paragraph}>
          Toplanan verileriniz;
        </Text>
        <Text style={styles.listItem}>• Uygulamanın çalışması ve size kişiselleştirilmiş deneyim sunmak,</Text>
        <Text style={styles.listItem}>• Terapi sohbetlerinizin kayıt ve indirme işlemlerinin sağlanması,</Text>
        <Text style={styles.listItem}>• Hizmet kalitesinin artırılması,</Text>
        <Text style={styles.paragraph}>
          amaçlarıyla kullanılmaktadır.
        </Text>

        <Text style={styles.sectionTitle}>3. Kişisel Verilerin Paylaşılması</Text>
        <Text style={styles.paragraph}>
          Toplanan kişisel verileriniz, üçüncü kişilerle paylaşılmamaktadır. Yalnızca yasal zorunluluk halinde yetkili merciler ile paylaşılabilir.
        </Text>

        <Text style={styles.sectionTitle}>4. Verilerin Güvenliği</Text>
        <Text style={styles.paragraph}>
          Verileriniz, uygun teknik ve idari tedbirlerle korunmaktadır. İzinsiz erişim, paylaşım ve değişikliklere karşı güvence altındadır.
        </Text>

        <Text style={styles.sectionTitle}>5. Haklarınız</Text>
        <Text style={styles.paragraph}>
          KVKK kapsamında kişisel verilerinizle ilgili;
        </Text>
        <Text style={styles.listItem}>• Verilerinize erişme,</Text>
        <Text style={styles.listItem}>• Verilerinizin düzeltilmesini veya silinmesini talep etme,</Text>
        <Text style={styles.listItem}>• İşlemeye itiraz etme,</Text>
        <Text style={styles.paragraph}>
          haklarınız bulunmaktadır. Bu haklarınızı kullanmak için uygulama içindeki iletişim kanalı veya destek bölümü üzerinden bize ulaşabilirsiniz.
        </Text>

        <Text style={styles.sectionTitle}>6. Onay</Text>
        <Text style={styles.paragraph}>
          MindCaps uygulamasını kullanarak, bu KVKK aydınlatma metnini okuduğunuzu, anladığınızı ve kişisel verilerinizin belirtilen şekilde işlenmesine onay verdiğinizi kabul etmiş sayılırsınız.
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default KVKKScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    zIndex: 10,
  },
  container: {
    padding: 20,
    paddingTop: 90, // Butonun üstü boşluk kalsın diye
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginLeft: 12,
    marginBottom: 6,
  },
  bold: {
    fontWeight: '700',
  },
});
