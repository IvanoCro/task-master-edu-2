import { useState, useRef, useEffect } from 'react';
import styles from './Ai.module.css';
import Navigation from './navigation.jsx';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

export default function Ai({ tasks = [] }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    allowInsecureBrowserUsage: true 
  });

  const handleAnalyzeMyTasks = async () => {
    if (!tasks || tasks.length === 0) {
      alert("Trenutno nemaš niti jedan zadatak za analizu!");
      return;
    }

    setIsLoading(true);
    
    // Priprema podataka za AI
    const tasksSummary = tasks.map((t, i) => (
      `${i + 1}. NASLOV: ${t.title}\n   OPIS: ${t.description}\n   ROK: ${t.dueDate}`
    )).join('\n\n');
    
    const prompt = `Ja sam korisnik aplikacije TaskMasterEdu. Ovo je moja trenutna lista zadataka:\n\n${tasksSummary}\n\nKao moj osobni asistent za produktivnost, analiziraj ove zadatke. Reci mi koji je najhitniji, procijeni težinu mojih obaveza i daj mi motivacijski savjet kako da sve završim na vrijeme.`;

    // UKLONJENO: setMessages s "Analiziram tvoju listu..." - AI direktno odgovara

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: response.text(),
        sender: 'ai',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoading(false);
    }
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
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await model.generateContent(inputValue);
      const response = await result.response;
      
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: response.text(),
        sender: 'ai',
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navContainer}><Navigation /></div>
      <div className={styles.mainContainer}>
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <h2>AI Assistant</h2>
              <span className={styles.statusBadge}>Gemini 2.5 Active</span>
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
                {/* SLIKA UKLONJENA */}
                <p>Klikni gumb iznad za analizu tvojih to-do zadataka ili me pitaj bilo što!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`${styles.message} ${styles[message.sender]}`}>
                  <div className={styles.messageContent}>
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                  <span className={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
            {isLoading && (
              <div className={`${styles.message} ${styles.ai}`}>
                <div className={styles.loadingDots}><span></span><span></span><span></span></div>
              </div>
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
            <button onClick={handleSendMessage} className={styles.sendButton} disabled={isLoading || !inputValue.trim()}>
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}