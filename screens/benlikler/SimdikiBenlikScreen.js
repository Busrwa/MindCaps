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
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { translations } from '../../translations';
import { useLanguage } from '../../LanguageContext';

import { getNowQuestion, generateResponse } from '../../services/api';

import { sanitizeText } from '../../utils/sanitizeText';

const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 80 : 60;
const MAX_PROMPT_LENGTH = 500;

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
        {sanitizeText(item.text)}
      </Text>
    </View>
  );
});

const SimdikiBenlik = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef();

  const { language } = useLanguage();
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
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    fetchNextQuestion(0);
  }, []);

  const handleChangeText = (text) => {
    if (text.length <= MAX_PROMPT_LENGTH) {
      setInputText(text);
    } else {
      Alert.alert(t.warning, t.tooLongError);
    }
  };

  const fetchNextQuestion = async (index) => {
    try {
      const data = await getNowQuestion(index, language);
      if (data.question) {
        setMessages((prev) => [
          ...prev,
          { id: `q-${Date.now()}`, text: sanitizeText(data.question), sender: 'bot' },
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
    const rawInput = inputText.trim();
    if (!rawInput || isWaiting) return;
    const userInput = sanitizeText(rawInput.slice(0, MAX_PROMPT_LENGTH));

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
      const data = await generateResponse({
        text: userInput,
        question: messages[messages.length - 2]?.text || '',
        language,
      });

      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isLoading),
        { id: `ai-${Date.now()}`, text: sanitizeText(data.response), sender: 'bot' },
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
          <Text style={styles.animationText}>{t.sendingAnswers}</Text>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={TAB_BAR_HEIGHT}
        >
          <Text style={styles.disclaimerText}>{t.aiDisclaimer}</Text>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageItem item={item} />}
            contentContainerStyle={{ padding: 16, paddingBottom: keyboardHeight > 180 ? keyboardHeight + 120 : 200 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}
            initialNumToRender={8}
            maxToRenderPerBatch={5}
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
                placeholder={t.placeholderAnswer}
                value={inputText}
                onChangeText={handleChangeText}
                multiline
                returnKeyType="send"
                onSubmitEditing={sendMessage}
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
  disclaimerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingBottom: 4,
    fontStyle: 'italic',
  },
});

export default SimdikiBenlik;
