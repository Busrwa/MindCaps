import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 80 : 60;

const MessageItem = React.memo(({ item }) => {
  const isUser = item.sender === 'user';
  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.botMessage,
      ]}
    >
      {item.isLoading && (
        <ActivityIndicator size="small" color="#2E7D32" style={{ marginRight: 8 }} />
      )}
      <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
        {item.text}
      </Text>
    </View>
  );
});

export default function SohbetScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 8;

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
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardHeight(0));
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
      isLoading: true,
    };
    setMessages((prev) => [...prev, loadingMsg]);

    const botText = await askAI(userMsg.text);

    setMessages((prev) => [
      ...prev.filter((m) => m.id !== 'loading'),
      { id: (Date.now() + 1).toString(), text: botText, sender: 'bot' },
    ]);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop }]}> 
        <Text style={styles.headerTitle}>{t.chatTitle}</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={TAB_BAR_HEIGHT}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageItem item={item} />}
          contentContainerStyle={{ padding: 16, paddingBottom: 200 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        />

        <View style={[styles.footer, { bottom: keyboardHeight > 0 ? keyboardHeight : TAB_BAR_HEIGHT }]}>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2E7D32',
  },
  container: {
    flex: 1,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 6,
    padding: 14,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: '#43A047',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: '#F1F8E9',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: '#333333',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    width: '100%',
    position: 'absolute',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: '#333333',
  },
  sendButton: {
    backgroundColor: '#2E7D32',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  endChatButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D32F2F',
    marginBottom: 8,
  },
  endChatButtonText: {
    color: '#D32F2F',
    fontWeight: '700',
    fontSize: 16,
  },
});
