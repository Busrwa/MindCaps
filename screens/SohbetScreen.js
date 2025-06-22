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
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const TAB_BAR_HEIGHT_IOS = 80;
const TAB_BAR_HEIGHT_ANDROID = 60;

export default function SohbetScreen({ navigation, route }) {
  const { language } = useLanguage();
  const t = translations[language];

  const flatListRef = useRef();

  const [messages, setMessages] = useState([{ id: '1', text: t.initialMessage, sender: 'bot' }]);
  const [inputText, setInputText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    setMessages([{ id: '1', text: t.initialMessage, sender: 'bot' }]);
  }, [language]);

  useEffect(() => {
    if (route?.params?.resetChat) {
      setMessages([{ id: '1', text: t.initialMessage, sender: 'bot' }]);
      setInputText('');
    }
  }, [route?.params]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    const loadingMsg = {
      id: 'loading',
      text: 'Yazıyor...',
      sender: 'bot',
    };
    setMessages((prev) => [...prev, loadingMsg]);

    const botText = await askAI(userMsg.text);

    setMessages((prev) => {
      const filtered = prev.filter((m) => m.id !== 'loading');
      return [...filtered, { id: (Date.now() + 1).toString(), text: botText, sender: 'bot' }];
    });
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item }) => {
    const isUser = item.sender === 'user';
    const isLoading = item.id === 'loading';

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.botMessage,
          isLoading && { flexDirection: 'row', alignItems: 'center' },
        ]}
      >
        {isLoading && <ActivityIndicator size="small" color="#2E7D32" style={{ marginRight: 8 }} />}
        <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>{item.text}</Text>
      </View>
    );
  };

  const endChat = () => {
    if (messages.filter((m) => m.sender === 'user').length === 0) {
      Alert.alert(t.warning, t.noChatWarning);
      return;
    }

    const formattedMessages = messages.filter((m) => m.sender === 'user').map((msg) => msg.text);

    navigation.navigate('SohbetAnaliz', { messages: formattedMessages, language });

    setMessages([{ id: '1', text: t.initialMessage, sender: 'bot' }]);
    setInputText('');
  };

  const tabBarHeight = Platform.OS === 'ios' ? TAB_BAR_HEIGHT_IOS : TAB_BAR_HEIGHT_ANDROID;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.chatTitle}</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={tabBarHeight}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: tabBarHeight,
          }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        />

        {/* Yazma alanı */}
        <View style={[styles.inputWrapper, { bottom: 40 }]}>
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
    paddingTop: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E7D32',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
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

  inputWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  endChatButton: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d32f2f',
    marginBottom: 8,
  },
  endChatButtonText: {
    color: '#d32f2f',
    fontWeight: '700',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  sendButton: {
    backgroundColor: '#2E7D32',
    padding: 12,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
