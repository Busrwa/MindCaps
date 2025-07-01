const API_BASE_URL = 'http://192.168.91.216:5000';

export async function askAI(prompt, language) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: prompt, language }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

export async function getNextQuestion(index, language) {
  const res = await fetch(`${API_BASE_URL}/get-next-question?index=${index}&language=${language}`);
  if (!res.ok) throw new Error('Failed to fetch next question');
  return res.json();
}

export async function getNowQuestion(index, language) {
  const res = await fetch(`${API_BASE_URL}/get-now-question?index=${index}&language=${language}`);
  if (!res.ok) throw new Error('Failed to fetch now question');
  return res.json();
}

export async function generateResponse({ text, question, language }) {
  const res = await fetch(`${API_BASE_URL}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, question, language }),
  });
  if (!res.ok) throw new Error('Failed to generate response');
  return res.json();
}
export async function generateFutureMessage(history, language) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-future-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, language }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
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
    const json = await response.json();
    if (json.error) throw new Error(json.error);
    return json;
  } catch (error) {
    throw error;
  }
}
