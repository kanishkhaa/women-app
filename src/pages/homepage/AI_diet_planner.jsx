import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../../components/Sidebar/Sidebar";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTypingMessage({ sender: "bot", text: "" });

    try {
      const response = await axios.post("http://localhost:8080/chat", { message: input });
      const botText = response.data.reply;
      
      let index = 0;
      const typingInterval = setInterval(() => {
        setTypingMessage((prev) => {
          if (index < botText.length) {
            return { sender: "bot", text: botText.slice(0, index + 1) };
          } else {
            clearInterval(typingInterval);
            setTypingMessage(null);
            setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
            return null;
          }
        });
        index++;
      }, 30);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ Error: Could not get a response." }]);
      setTypingMessage(null);
    }

    setInput("");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-white text-gray-900 p-6">
        <h1 className="text-3xl font-bold text-center mb-4">AI Diet Planner Chatbot</h1>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 text-black rounded-lg shadow-lg max-w-2xl mx-auto w-full space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-4 max-w-xs rounded-xl shadow-md text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-white text-black rounded-bl-none"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {typingMessage && (
            <div className="flex justify-start">
              <div className="p-4 max-w-xs rounded-xl shadow-md text-sm leading-relaxed bg-white text-black rounded-bl-none">
                <ReactMarkdown>{typingMessage.text}</ReactMarkdown>
              </div>
            </div>
          )}
          <div ref={chatRef} />
        </div>

        {/* Input Field & Send Button */}
        <div className="flex mt-4 max-w-2xl mx-auto w-full bg-white p-2 rounded-xl shadow-lg border border-gray-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            placeholder="Ask about diet plans..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
