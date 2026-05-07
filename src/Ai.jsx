import { useState, useRef, useEffect } from 'react';
import styles from './Ai.module.css';
import Navigation from './navigation.jsx';
import ReactMarkdown from 'react-markdown';

export default function Ai({ tasks = [] }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const isDev = import.meta.env.DEV;
  const apiKey = import.meta.env.VITE_GEMINI_KEY;

  // Funkcija za API poziv
  const streamAIResponse = async (prompt) => {
    setIsLoading(true);
    
    // 1. Dodajemo privremenu praznu AI poruku koju ćemo puniti
    const aiMessageId = Date.now() + 1;
    setMessages(prev => [...prev, {
      id: aiMessageId,
      text: '',
      sender: 'ai',
      timestamp: new Date()
    }]);

    try {
      let aiResponse;

      if (isDev && apiKey) {
        // DEV MODE: Koristi direktan API
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-2.5-flash",
          allowInsecureBrowserUsage: true 
        });

        const result = await model.generateContent(prompt);
        aiResponse = result.response.text();
      } else {
        // PRODUCTION: Koristi serverless funkciju
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const responseText = await response.text();
        if (!responseText) {
          throw new Error('API vratila je prazan odgovor');
        }
        
        const data = JSON.parse(responseText);
        aiResponse = data.result || 'No response generated';
      }

      // 2. Ažuriramo poruku s odgovorom
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, text: aiResponse } : msg
      ));
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, text: "Oprosti, došlo je do greške u komunikaciji." } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeMyTasks = async () => {
    if (!tasks || tasks.length === 0) {
      alert("Trenutno nemaš niti jedan zadatak za analizu!");
      return;
    }

    const tasksSummary = tasks.map((t, i) => (
      `${i + 1}. NASLOV: ${t.title}\n   OPIS: ${t.description}\n   ROK: ${t.dueDate}`
    )).join('\n\n');
    
    const prompt = `Ja sam korisnik aplikacije TaskMasterEdu. Ovo je moja trenutna lista zadataka:\n\n${tasksSummary}\n\nAnaliziraj ove zadatke, reci mi koji je najhitniji i daj mi kratak savjet.`;

    await streamAIResponse(prompt);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    await streamAIResponse(currentInput);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navContainer}><Navigation /></div>
      <div className={styles.mainContainer}>
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <h2>AI Assistant</h2>
            </div>
            <button 
              className={styles.analyzeButton} 
              onClick={handleAnalyzeMyTasks}
              disabled={isLoading}
            >
              Analiziraj moje zadatke (<span>{tasks.length}</span>)
            </button>
          </div>

          <div className={styles.messagesArea}>
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Klikni gumb iznad za analizu zadataka ili me pitaj bilo što!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`${styles.message} ${styles[message.sender]}`}>
                  <div className={styles.messageContent}>
                    {/* Ako je tekst prazan, a isLoading je true, možemo prikazati kursor ili ostaviti prazno */}
                    <ReactMarkdown>
                      {message.text || (message.sender === 'ai' ? "..." : "")}
                    </ReactMarkdown>
                  </div>
                  <span className={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              placeholder="Pitaj me za savjet..."
              className={styles.input}
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage} 
              className={styles.sendButton} 
              disabled={isLoading || !inputValue.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}