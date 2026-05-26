

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_KEY; 

  if (!apiKey) return res.status(500).json({ error: 'API ključ nije konfiguriran na serveru.' });
  if (!prompt) return res.status(400).json({ error: 'Prompt nedostaje.' });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.error?.message || 'Greška pri pozivanju Gemini 2.5 API-ja' 
      });
    }

    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'AI nije generirao odgovor.';

    return res.status(200).json({ result: responseText });
  } catch (error) {
    console.error('Backend Error:', error);
    return res.status(500).json({ error: 'Interna greška servera: ' + error.message });
  }
}