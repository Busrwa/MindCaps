import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LottieView from "lottie-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLanguage } from "../../LanguageContext";
import { translations } from "../../translations";
import { generateFutureMessage } from "../../services/api"; 

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const BUTTON_HEIGHT = 56;

export default function GelecekBenlik({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const paddingTop = Math.min(Math.max(insets.top, 12), 28);
  const paddingBottom = insets.bottom;

  const { language } = useLanguage();
  const t = translations[language];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const history = route.params?.history || [];

  const fetchFutureMessage = async () => {
    setLoading(true);
    try {
      const data = await generateFutureMessage(history, language);
      setMessage(data.message || t.noMessage);
    } catch (error) {
      setMessage(t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async () => {
    setShowMessage(true);
    await fetchFutureMessage();
  };

  const scrollViewHeight =
    screenHeight - paddingTop - BUTTON_HEIGHT - paddingBottom - 32;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop }]}>
        <Text style={styles.headerTitle}>{t.futureSelf}</Text>
      </View>

      {!showMessage && (
        <View style={styles.initialContainer}>
          <LottieView
            source={require("../../assets/future_message.json")}
            autoPlay
            loop
            style={styles.futureMessageAnimation}
          />
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>{t.readLetter}</Text>
          </TouchableOpacity>
        </View>
      )}

      {showMessage && loading && (
        <View style={styles.analysisContainer}>
          <LottieView
            source={require("../../assets/analiz.json")}
            autoPlay
            loop
            style={styles.analysisAnimation}
          />
          <Text style={styles.analysisText}>{t.analyzing}</Text>
        </View>
      )}

      {showMessage && !loading && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.keyboardAvoidingView, { paddingBottom }]}
          keyboardVerticalOffset={paddingTop + 44}
        >
          <View style={styles.contentContainer}>
            <ScrollView
              style={[styles.scrollView, { height: scrollViewHeight }]}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.messageContainer}>
                <Text style={styles.messageTitle}>{t.fromFutureToNow}</Text>
                <Text style={styles.messageText}>{message}</Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[styles.backButton, { marginBottom: paddingBottom + 10 }]}
              onPress={() => navigation.navigate("BenliklerMain")}
            >
              <Text style={styles.backButtonText}>{t.backToHome}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  initialContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  futureMessageAnimation: {
    width: screenWidth * 0.75,
    height: screenWidth * 0.75,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  analysisContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 120,
    paddingHorizontal: 32,
  },
  analysisAnimation: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    marginBottom: 20,
  },
  analysisText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B5E20",
    backgroundColor: "#E8F5E9",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    textAlign: "center",
  },

  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    position: "relative",
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  messageContainer: {
    backgroundColor: "rgba(46, 125, 50, 0.1)",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#1B5E20",
  },
  backButton: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 24,
    zIndex: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
