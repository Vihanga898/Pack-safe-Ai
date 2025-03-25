import React, { useState, useEffect } from 'react';

const initialChatMessages = [
  "Welcome to PACK SAFE AI System.",
  "This system provides advanced video processing capabilities.",
  "You can upload videos, paste video links, or use the webcam for processing.",
  "Processed videos can be downloaded for further analysis.",
  "If you have any questions, feel free to ask!",
  "this system has the ability to detect object through video or camera",
  "if you facing any issues contact SUPPORT",
  "keep your environment safe & Secured"
];

const ChatBox = () => {
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % initialChatMessages.length);
    }, 5000); // Change message every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleReadMessage = () => {
    setSpeaking(true);
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(initialChatMessages[currentIndex]);
    utterance.onend = () => {
      setSpeaking(false);
    };
    synth.speak(utterance);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', maxWidth: '300px', zIndex: '999' }}>
      <div className="chat-box" style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', }}>
        <p>{chatMessages[currentIndex]}</p>
        <button onClick={handleReadMessage} disabled={speaking} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '150px', height: '35px', fontSize: '15px' }}>Read Message</button>
      </div>
    </div>
  );
};

export default ChatBox;
