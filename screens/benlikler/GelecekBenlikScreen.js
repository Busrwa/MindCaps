import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GelecekBenlikScreen() {
  const insets = useSafeAreaInsets();

  const cevaplar = [
    'Bir gün kendi işimi kurmak.',
    'Dünyayı gezmek istiyorum.',
    'Mutlu bir aileye sahip olmak.',
    'Yüksek lisans yaparak akademik kariyer hedefliyorum.',
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 30,
        },
      ]}
    >
      <Text style={styles.title}>Gelecek Benlik</Text>

      <View style={styles.questionBubble}>
        <Text style={styles.questionText}>“Gelecekte en çok neyi başarmak istiyorsun?”</Text>
      </View>

      <View style={styles.answersContainer}>
        {cevaplar.map((cevap, index) => (
          <View key={index} style={styles.answerBubble}>
            <Text style={styles.answerText}>{cevap}</Text>
          </View>
        ))}
      </View>

      <View style={styles.inputRow}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Geleceğini hayal et"
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Sohbeti Kaydet ve Bitir</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Yalnızca Bitir</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // aynı stiller kullanılabilir
  ...require('./GecmisBenlikScreen').default.styles
});
