import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Utensils, Salad, Info, Maximize2, Minimize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../../components/Sidebar/Sidebar";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: null,
    age: null,
    healthConditions: null,
    collectingData: false,
    dataStage: 0,
    eatsMeat: null,
    personalizationStage: false
  });
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, expandedMessage]);

  // Function to start the user data collection process
  const startUserDataCollection = () => {
    const welcomeMessage = {
      sender: "bot",
      text: "Welcome! Let's create a personalized diet plan for you. Please provide some basic details:\n\nEnter your name:"
    };
    setMessages((prev) => [...prev, welcomeMessage]);
    setUserInfo(prev => ({
      ...prev,
      collectingData: true,
      dataStage: 1
    }));
  };

  // Function to process user data input
  const processUserDataInput = async (input) => {
    const { dataStage } = userInfo;
    
    if (dataStage === 1) {
      setUserInfo(prev => ({
        ...prev,
        name: input,
        dataStage: 2
      }));
      const agePrompt = {
        sender: "bot",
        text: `Thanks, ${input}! Please enter your age:`
      };
      setMessages(prev => [...prev, agePrompt]);
      return true;
    } 
    else if (dataStage === 2) {
      const age = parseInt(input);
      if (isNaN(age)) {
        const invalidAgePrompt = {
          sender: "bot",
          text: "Please enter a valid age (e.g., 35):"
        };
        setMessages(prev => [...prev, invalidAgePrompt]);
        return true;
      }
      
      setUserInfo(prev => ({
        ...prev,
        age: age,
        dataStage: 3
      }));
      const healthPrompt = {
        sender: "bot",
        text: "Do you have any health conditions? (If none, type 'Nil')"
      };
      setMessages(prev => [...prev, healthPrompt]);
      return true;
    } 
    else if (dataStage === 3) {
      setUserInfo(prev => ({
        ...prev,
        healthConditions: input,
        dataStage: 4,
        collectingData: false
      }));
      
      await generateDietPlanFromAPI();
      return true;
    }
    
    return false;
  };

  // Function to process personalization input
  const processPersonalizationInput = async (input) => {
    const { personalizationStage } = userInfo;
    
    if (personalizationStage) {
      const eatsMeat = input.toLowerCase() === 'yes';
      setUserInfo(prev => ({
        ...prev,
        eatsMeat: eatsMeat,
        personalizationStage: false
      }));
      
      await generateDietPlanFromAPI(true);
      return true;
    }
    
    if (input.toLowerCase() === 'yes') {
      setUserInfo(prev => ({
        ...prev,
        personalizationStage: true
      }));
      
      const meatPrompt = {
        sender: "bot",
        text: "Do you eat meat? (Yes/No)"
      };
      setMessages(prev => [...prev, meatPrompt]);
      return true;
    } 
    else if (input.toLowerCase() === 'no') {
      const finalMessage = {
        sender: "bot",
        text: "Great! Let me know if you need any more help. Stay healthy and enjoy your Tamil Nadu cuisine!"
      };
      setMessages(prev => [...prev, finalMessage]);
      return true;
    }
    
    return false;
  };

  // Function to generate a Tamil cuisine diet plan using Gemini API
  const generateDietPlanFromAPI = async (updateForMeat = false) => {
    const { name, age, healthConditions, eatsMeat } = userInfo;
    setIsThinking(true);
    setIsProcessing(true);
  
    try {
      let prompt = `Generate a Tamil cuisine diet plan for ${name}, age ${age}.`;
      
      if (healthConditions && healthConditions.toLowerCase() !== 'nil') {
        prompt += ` They have the following health condition: ${healthConditions}.`;
      }
      
      if (updateForMeat) {
        prompt += ` They ${eatsMeat ? 'do' : 'do not'} eat meat.`;
      }
      
      prompt += " Include breakfast, lunch, evening snacks, and dinner options with traditional Tamil Nadu dishes. Add special recommendations based on their age and health conditions. Use Tamil terms with English translations. Format with markdown.";
      
      const response = await axios.post("http://localhost:8080/chat", { 
        message: prompt 
      });
      
      let botText = response.data.reply;
      const personalizationQuestion = "Would you like to further personalize your diet? (Yes/No)";
      
      // Check if the personalization question is already in the response
      const hasPersonalizationQuestion = botText.includes(personalizationQuestion);
      
      // Remove duplicate personalization questions if more than one exists
      const questionCount = (botText.match(new RegExp(personalizationQuestion, "g")) || []).length;
      if (questionCount > 1) {
        const lastIndex = botText.lastIndexOf(personalizationQuestion);
        botText = botText.substring(0, lastIndex) + personalizationQuestion;
      }

      setIsThinking(false);
      
      let index = 0;
      const typingSpeed = 10;
      const typingInterval = setInterval(() => {
        setTypingMessage((prev) => {
          if (index < botText.length) {
            return { sender: "bot", text: botText.slice(0, index + 1), original: botText };
          } else {
            clearInterval(typingInterval);
            setTypingMessage(null);
            setMessages((prev) => [...prev, { sender: "bot", text: botText, original: botText }]);
            setIsProcessing(false);
            
            // Only add the personalization question if it’s not already present and not an update for meat
            if (!hasPersonalizationQuestion && !updateForMeat) {
              setTimeout(() => {
                const personalizationMessage = {
                  sender: "bot",
                  text: personalizationQuestion
                };
                setMessages(prev => [...prev, personalizationMessage]);
              }, 1000);
            }
            
            return null;
          }
        });
        index += 3;
      }, typingSpeed);
      
    } catch (error) {
      console.error("Error:", error);
      setIsThinking(false);
      setMessages((prev) => [...prev, { 
        sender: "bot", 
        text: "❌ I'm having trouble generating your diet plan. Please try again." 
      }]);
      setTypingMessage(null);
      setIsProcessing(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    
    const userInput = input.trim();
    setInput("");
    
    if (messages.length === 0 || 
        (messages.length === 1 && messages[0].sender === "user")) {
      startUserDataCollection();
      return;
    }
    
    if (userInfo.collectingData) {
      if (await processUserDataInput(userInput)) {
        return;
      }
    }
    
    if (messages[messages.length - 1].sender === "bot" && 
        (messages[messages.length - 1].text.includes("Would you like to further personalize your diet?") ||
         messages[messages.length - 1].text.includes("Do you eat meat?"))) {
      if (await processPersonalizationInput(userInput)) {
        return;
      }
    }
    
    setIsThinking(true);
    setIsProcessing(true);
    
    try {
      const requestData = { 
        message: `${userInput} (Please provide information in the context of Tamil Nadu cuisine and traditional South Indian nutrition)`
      };
      
      const response = await axios.post("http://localhost:8080/chat", requestData);
      const botText = response.data.reply;
      const originalText = botText;
      
      setIsThinking(false);
      
      if (botText.length > 10) {
        let index = 0;
        const typingSpeed = 10;
        const typingInterval = setInterval(() => {
          setTypingMessage((prev) => {
            if (index < botText.length) {
              return { sender: "bot", text: botText.slice(0, index + 1), original: originalText };
            } else {
              clearInterval(typingInterval);
              setTypingMessage(null);
              setMessages((prev) => [...prev, { sender: "bot", text: botText, original: originalText }]);
              setIsProcessing(false);
              return null;
            }
          });
          index += 3;
        }, typingSpeed);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: botText, original: originalText }]);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsThinking(false);
      setMessages((prev) => [...prev, { 
        sender: "bot", 
        text: "❌ I'm having trouble processing your request. Please try again." 
      }]);
      setTypingMessage(null);
      setIsProcessing(false);
    }
  };

  const toggleMessageExpansion = (index) => {
    if (expandedMessage === index) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(index);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-indigo-50">
      <Sidebar />
      <div className="flex flex-col flex-1 p-6">
        <div className="max-w-3xl mx-auto w-full">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Salad size={32} className="text-green-600" />
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-indigo-600">
                Tamil Cuisine Diet Planner
              </h1>
              <Utensils size={28} className="text-indigo-600" />
            </div>
            <p className="text-gray-600 italic">Your personal Tamil Nadu nutrition consultant</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-96 overflow-y-auto p-6 bg-gradient-to-b from-green-50 to-white space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-gray-500">
                  <div className="animate-pulse flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-indigo-400">
                    <Utensils size={32} className="text-white" />
                  </div>
                  <p className="font-medium">Type 'hi' to start creating your personalized Tamil cuisine diet plan!</p>
                  <div className="flex flex-wrap gap-2 text-sm justify-center">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Traditional meals</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">Health-focused</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">Personalized plans</span>
                  </div>
                </div>
              )}
              
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`p-4 max-w-xs md:max-w-md rounded-2xl shadow-md text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                        : "bg-gradient-to-r from-green-100 to-green-50 border-green-200 border text-gray-800 relative"
                    }`}
                  >
                    <ReactMarkdown>
                      {msg.sender === "bot" && msg.original && expandedMessage === index 
                        ? msg.original 
                        : msg.text}
                    </ReactMarkdown>
                    
                    {msg.sender === "bot" && msg.original && msg.text !== msg.original && (
                      <button 
                        onClick={() => toggleMessageExpansion(index)}
                        className="mt-2 text-xs flex items-center text-green-700 hover:text-green-900"
                      >
                        {expandedMessage === index ? (
                          <>
                            <Minimize2 size={12} className="mr-1" />
                            Show less
                          </>
                        ) : (
                          <>
                            <Maximize2 size={12} className="mr-1" />
                            Show full response
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {typingMessage && (
                <div className="flex justify-start">
                  <div className="p-4 max-w-xs md:max-w-md rounded-2xl shadow-md text-sm leading-relaxed bg-gradient-to-r from-green-100 to-green-50 border-green-200 border text-gray-800">
                    <ReactMarkdown>{typingMessage.text}</ReactMarkdown>
                  </div>
                </div>
              )}
              
              {isThinking && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-green-100 to-green-50 border-green-200 border flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                    <span className="text-xs text-green-800">Preparing Tamil cuisine diet advice...</span>
                  </div>
                </div>
              )}
              
              <div ref={chatRef} />
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex bg-gray-50 rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 p-4 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
                  placeholder={userInfo.collectingData ? "Type your answer here..." : "Type 'hi' to start or ask about Tamil cuisine..."}
                />
                <button
                  onClick={sendMessage}
                  disabled={isProcessing}
                  className={`px-5 flex items-center justify-center ${
                    isProcessing ? "bg-gray-400" : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  } text-white transition-all duration-200`}
                >
                  <Send size={20} />
                </button>
              </div>
              
              <div className="flex justify-center mt-3">
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Info size={12} />
                  <span>Powered by nutritional AI specializing in Tamil Nadu cuisine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;