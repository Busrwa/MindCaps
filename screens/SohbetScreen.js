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
  Keyboard,
  ActivityIndicator,
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
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
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
    } catch (err) {
      console.error('AI Error:', err);
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

    const loadingMsg = { id: 'loading', text: '...', sender: 'bot' };
    setMessages(prev => [...prev, loadingMsg]);

    const botText = await askAI(userMsg.text);

    setMessages(prev => {
      const filtered = prev.filter(m => m.id !== 'loading');
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
          styles.messageBubble,
          isUser ? styles.userBubble : styles.botBubble,
          isLoading && { flexDirection: 'row', alignItems: 'center' },
        ]}
      >
        {isLoading && <ActivityIndicator size="small" color="#4CAF50" style={{ marginRight: 6 }} />}
        <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>{item.text}</Text>
      </View>
    );
  };

  const endChat = () => {
    const userMessages = messages.filter(m => m.sender === 'user');
    if (userMessages.length === 0) {
      alert(t.noChatWarning);
      return;
    }
    const formatted = userMessages.map(m => m.text);
    navigation.navigate('SohbetAnaliz', { messages: formatted, language });
    setMessages([{ id: '1', text: t.initialMessage, sender: 'bot' }]);
    setInputText('');
  };

  const tabBarHeight = Platform.OS === 'ios' ? TAB_BAR_HEIGHT_IOS : TAB_BAR_HEIGHT_ANDROID;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={tabBarHeight}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={[styles.inputArea, { bottom: keyboardHeight || tabBarHeight }]}>
          <TouchableOpacity style={styles.endButton} onPress={endChat}>
            <Text style={styles.endButtonText}>{t.endChat}</Text>
          </TouchableOpacity>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              placeholder={t.inputPlaceholder}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              style={[styles.sendBtn, !inputText.trim() && { opacity: 0.5 }]}
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
  safeArea: { flex: 1, backgroundColor: '#F9F9F9' },
  wrapper: { flex: 1 },
  messageBubble: {
    maxWidth: '75%',
    marginVertical: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: { color: '#fff' },
  botText: { color: '#222' },
  inputArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  endButton: {
    backgroundColor: '#fff',
    borderColor: '#d32f2f',
    borderWidth: 1.5,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
    alignItems: 'center',
  },
  endButtonText: {
    color: '#d32f2f',
    fontSize: 15,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  sendBtn: {
    backgroundColor: '#2E7D32',
    padding: 12,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
});
