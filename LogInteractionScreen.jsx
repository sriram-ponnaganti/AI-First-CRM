import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, addChatMessage, populateFromAI } from './store';
import './App.css'; // Add Google Inter font family here

export default function LogInteractionScreen() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.interaction);
  const [chatInput, setChatInput] = useState('');

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    dispatch(addChatMessage({ role: 'user', text: chatInput }));

    // Send to FastAPI Backend
    const response = await fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: chatInput }),
    });
    
    const data = await response.json();
    dispatch(addChatMessage({ role: 'ai', text: data.reply }));
    
    // LangGraph magically updates the structured form!
    if (data.structured_data) {
        dispatch(populateFromAI(data.structured_data));
    }
    setChatInput('');
  };

  return (
    <div style={{ display: 'flex', fontFamily: "'Inter', sans-serif", padding: '20px' }}>
      {/* LEFT: Structured Form */}
      <div style={{ flex: 2, marginRight: '20px' }}>
        <h2>Log HCP Interaction</h2>
        <div>
            <label>HCP Name:</label>
            <input 
                type="text" 
                value={formData.hcpName} 
                onChange={(e) => dispatch(updateField({field: 'hcpName', value: e.target.value}))} 
            />
        </div>
        <div>
            <label>Sentiment:</label>
            <select 
                value={formData.sentiment} 
                onChange={(e) => dispatch(updateField({field: 'sentiment', value: e.target.value}))}>
                <option>Positive</option>
                <option>Neutral</option>
                <option>Negative</option>
            </select>
        </div>
      </div>

      {/* RIGHT: Conversational Chat Interface */}
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        <h3>AI Assistant</h3>
        <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
            {formData.chatHistory.map((msg, idx) => (
                <div key={idx} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                    <p style={{ background: msg.role === 'user' ? '#e3f2fd' : '#f5f5f5', padding: '5px', borderRadius: '5px' }}>
                        {msg.text}
                    </p>
                </div>
            ))}
        </div>
        <form onSubmit={handleChatSubmit}>
            <input 
                type="text" 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                placeholder="Log interaction details here..." 
                style={{ width: '80%' }}
            />
            <button type="submit">Log</button>
        </form>
      </div>
    </div>
  );
}