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
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { translations } from '../../translations';
import { useLanguage } from '../../LanguageContext';

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

const SimdikiBenlik = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef();

  const { language } = useLanguage(); // 🌐 Global dil bilgisi
  const t = translations[language];

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const previousAnswers = route.params?.history || [];

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

  useEffect(() => {
    fetchNextQuestion(0);
  }, []);

  const fetchNextQuestion = async (index) => {
    try {
      const res = await fetch(`http://192.168.0.12:5000/get-now-question?index=${index}&language=${language}`);
      const data = await res.json();
      if (data.question) {
        setMessages((prev) => [
          ...prev,
          { id: `q-${Date.now()}`, text: data.question, sender: 'bot' },
        ]);
      } else {
        showEndAnimation();
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: `err-${Date.now()}`, text: t.errorGettingQuestion, sender: 'bot' },
      ]);
    }
  };

  const sendMessage = async () => {
    const userInput = inputText.trim();
    if (!userInput || isWaiting) return;

    const userMsg = { id: Date.now().toString(), text: userInput, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setUserAnswers((prev) => [...prev, userInput]);
    setInputText('');
    setIsWaiting(true);

    const loadingId = `loading-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: loadingId, text: t.typing, sender: 'bot', isLoading: true },
    ]);

    try {
      const res = await fetch('http://192.168.0.12:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: userInput,
          question: messages[messages.length - 2]?.text || '',
          language,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isLoading),
        { id: `ai-${Date.now()}`, text: data.response, sender: 'bot' },
      ]);

      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      if (nextIndex > 1) setShowContinue(true);
      fetchNextQuestion(nextIndex);
    } catch {
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isLoading),
        { id: `err-${Date.now()}`, text: t.errorGettingResponse, sender: 'bot' },
      ]);
    } finally {
      setIsWaiting(false);
    }
  };

  const showEndAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => {
      navigation.navigate('GelecekBenlik', {
        history: [...previousAnswers, ...userAnswers],
      });
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>{t.currentSelf}</Text>
      </View>

      {showAnimation ? (
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../../assets/message_received.json')}
            autoPlay
            loop={false}
            style={{ width: 200, height: 200 }}
          />
          <Text style={styles.animationText}>
            {t.sendingAnswers}
          </Text>
        </View>
      ) : (
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

          <View
            style={[
              styles.footer,
              { bottom: keyboardHeight > 0 ? keyboardHeight : TAB_BAR_HEIGHT },
            ]}
          >
            {showContinue && (
              <TouchableOpacity style={styles.continueButton} onPress={showEndAnimation}>
                <Text style={styles.continueButtonText}>{t.continue}</Text>
              </TouchableOpacity>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={t.placeholder}
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
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
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2E7D32',
    marginBottom: 8,
  },
  continueButtonText: {
    color: '#2E7D32',
    fontWeight: '700',
    fontSize: 16,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  animationText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
  },
});

export default SimdikiBenlik;