import { API_BASE_URL } from '@env';

async function handleResponse(response, errorMessage) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${errorMessage}: ${errorText}`);
  }
  return response.json();
}

export async function askAI(prompt, language) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: prompt, language }),
    });
    const data = await handleResponse(response, 'Failed to ask AI');
    try {
      return JSON.parse(data.response);
    } catch {
      return data.response;
    }
  } catch (error) {
    console.error('askAI API error:', error);
    throw error;
  }
}

export async function getNextQuestion(index, language) {
  try {
    const response = await fetch(`${API_BASE_URL}/get-next-question?index=${index}&language=${language}`);
    return await handleResponse(response, 'Failed to fetch next question');
  } catch (error) {
    console.error('getNextQuestion API error:', error);
    throw error;
  }
}

export async function getNowQuestion(index, language) {
  try {
    const response = await fetch(`${API_BASE_URL}/get-now-question?index=${index}&language=${language}`);
    return await handleResponse(response, 'Failed to fetch now question');
  } catch (error) {
    console.error('getNowQuestion API error:', error);
    throw error;
  }
}

export async function generateResponse({ text, question, language }) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, question, language }),
    });
    return await handleResponse(response, 'Failed to generate response');
  } catch (error) {
    console.error('generateResponse API error:', error);
    throw error;
  }
}

export async function generateFutureMessage(history, language) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-future-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, language }),
    });
    return await handleResponse(response, 'Failed to generate future message');
  } catch (error) {
    console.error('generateFutureMessage API error:', error);
    throw error;
  }
}

export async function analyzeEmotions(texts, language) {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-emotions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts, language }),
    });
    const json = await handleResponse(response, 'Failed to analyze emotions');
    if (json.error) throw new Error(json.error);
    return json;
  } catch (error) {
    console.error('analyzeEmotions API error:', error);
    throw error;
  }
}
