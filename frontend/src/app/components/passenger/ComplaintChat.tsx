import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function ComplaintChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm here to help you report an issue. What happened during your trip?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'Driver Issue',
    'Overcharging',
    'Bus Condition',
    'Route Problem',
    'Other'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      
      if (content.toLowerCase().includes('driver')) {
        aiResponse = "I understand you had an issue with the driver. Can you provide more details about what happened? This will help us investigate the matter.";
      } else if (content.toLowerCase().includes('overcharg')) {
        aiResponse = "I'm sorry to hear about overcharging. Could you tell me the amount you were charged and the route you traveled?";
      } else if (content.toLowerCase().includes('condition')) {
        aiResponse = "Thank you for reporting the bus condition issue. What specific problems did you notice?";
      } else if (content.toLowerCase().includes('route')) {
        aiResponse = "I see you had a route-related issue. Could you describe what went wrong?";
      } else {
        aiResponse = "Thank you for sharing that. To help you better, could you provide more details about your experience? You can also attach your ticket for reference.";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    // After a few messages, show completion
    if (messages.length >= 4) {
      setTimeout(() => {
        const completionMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: 'ai',
          content: "Thank you for providing the details. I've created a complaint ticket (ID: #CMP-2026-001) and our team will review it within 24 hours. You'll receive updates via SMS and in-app notifications.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, completionMessage]);
      }, 2500);
    }
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const handleSend = () => {
    sendMessage(input);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D47A1] to-[#00897B] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate('/passenger')} className="p-2 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold">AI Support Assistant</h1>
            <p className="text-white/80 text-xs">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'ai' && (
              <div className="w-8 h-8 bg-[#0D47A1] rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-[#0D47A1] text-white'
                  : 'bg-white shadow-sm'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-white/70' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <Badge
                key={reply}
                variant="secondary"
                className="cursor-pointer hover:bg-[#0D47A1] hover:text-white transition-colors"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t px-4 py-3 pb-24">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button
            size="icon"
            style={{ backgroundColor: '#0D47A1' }}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
