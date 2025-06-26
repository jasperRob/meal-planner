import { useState, useEffect } from 'react';
import './Chatbot.css';
import { CHAT_ENDPOINT } from '../config/api';
import ReactMarkdown from 'react-markdown';

export default function Chatbot({ initialInformation }) {
  const [threadId,] = useState((Math.random() + 1).toString(36).substring(6));
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const {
      dietaryRequirements,
      mealsPerDay,
      numberOfPeople,
      inclusions,
      exclusions,
    } = initialInformation;

    console.log(initialInformation)

    const initialPrompt = `My Dietary requirements: ${dietaryRequirements}, 
Meals I want each day: ${mealsPerDay}, 
The number of people I need to cook for each day: ${numberOfPeople}, 
Ingredients to try to include: ${inclusions.length > 0 ? inclusions : 'None in particular'}, 
Ingredients to exclude: ${exclusions.length > 0 ? exclusions : 'None in particular'}`;

    const sendInitialPrompt = async () => {
      setLoading(true)
      try {
        const res = await fetch(CHAT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: initialPrompt, thread_id: threadId }),
        });

        const data = await res.json();
        const botMessage = { sender: 'bot', text: data.response || 'No response' };
        setMessages(prev => [...prev, botMessage]);
      } catch (err) {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'Error contacting the server.' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    sendInitialPrompt();
  }, [initialInformation, threadId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const inputCopy = input;
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputCopy, thread_id: threadId }),
      });

      const data = await res.json();
      const botMessage = { sender: 'bot', text: data.response || 'No response' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Error contacting the server.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text.split('\n').map((line, i) => (
              <div key={i}>
                <ReactMarkdown>
                  {line}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        ))}
        {loading && <div className="message bot">Loading response...</div>}
      </div>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          disabled={loading}
        />
        <button className="send-button" onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
