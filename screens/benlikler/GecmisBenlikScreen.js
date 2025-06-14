import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';

const OPENAI_API_KEY = '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';

export default function OpenAITestScreen() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testOpenAI = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', 
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Merhaba, bu bir test mesajıdır.' },
          ],
          max_tokens: 50,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.choices[0].message.content);
      } else {
        setError(data.error.message || 'Bilinmeyen hata');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="OpenAI API Test Et" onPress={testOpenAI} />
      {loading && <ActivityIndicator size="large" color="#5f2c82" style={{ marginTop: 20 }} />}
      {result && (
        <Text style={styles.resultText}>API Cevabı: {result}</Text>
      )}
      {error && (
        <Text style={styles.errorText}>Hata: {error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  resultText: { marginTop: 20, fontSize: 16, color: 'green' },
  errorText: { marginTop: 20, fontSize: 16, color: 'red' },
});
