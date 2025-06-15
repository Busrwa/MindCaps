import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../LanguageContext';  // Yolunu kendi yapına göre ayarla
import { translations } from '../translations';    // Yolunu kendi yapına göre ayarla

export default function SohbetScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();
  const t = translations[language];

  const flatListRef = useRef();

  const [messages, setMessages] = useState([
    { id: '1', text: t.initialMessage, sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');

  // Dil değiştiğinde başlangıç mesajını güncelle
  useEffect(() => {
    setMessages([{ id: '1', text: t.initialMessage, sender: 'bot' }]);
  }, [language]);

  const askAI = async (prompt) => {
    try {
      const response = await fetch('http://192.168.0.12:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: prompt, language }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('AI error:', error);
      return t.aiError;
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    const botText = await askAI(userMsg.text);

    const botReply = {
      id: (Date.now() + 1).toString(),
      text: botText,
      sender: 'bot',
    };

    setMessages(prev => [...prev, botReply]);
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.botMessage,
        ]}
      >
        <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
          {item.text}
        </Text>
      </View>
    );
  };

  const endChat = () => {
    if (messages.length <= 1) {
      Alert.alert(t.warning, t.noChatWarning);
      return;
    }
    navigation.navigate('SohbetAnaliz', { messages });
  };

  const paddingTop = Math.min(Math.max(insets.top, 12), 28);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop }]}>
        <Text style={styles.headerTitle}>{t.chatTitle}</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={paddingTop + 50}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 10,
          }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity style={styles.endChatButton} onPress={endChat}>
          <Text style={styles.endChatButtonText}>{t.endChat}</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={t.inputPlaceholder}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && { opacity: 0.5 }]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E7D32',
  },
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  messageContainer: {
    maxWidth: '75%',
    marginVertical: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  userMessage: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: { color: '#fff' },
  botText: { color: '#222' },
  endChatButton: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d32f2f',
  },
  endChatButtonText: {
    color: '#d32f2f',
    fontWeight: '700',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    maxHeight: 120,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  sendButton: {
    backgroundColor: '#2E7D32',
    marginLeft: 10,
    borderRadius: 24,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
