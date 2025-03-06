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
  const processUserDataInput = (input) => {
    const { dataStage } = userInfo;
    
    if (dataStage === 1) {
      // Process name
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
      // Process age
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
      // Process health conditions
      setUserInfo(prev => ({
        ...prev,
        healthConditions: input,
        dataStage: 4,
        collectingData: false
      }));
      
      // Generate diet plan
      generateDietPlan();
      return true;
    }
    
    return false;
  };

  // Function to process personalization input
  const processPersonalizationInput = (input) => {
    const { personalizationStage } = userInfo;
    
    if (personalizationStage) {
      // Update user preference for meat
      const eatsMeat = input.toLowerCase() === 'yes';
      setUserInfo(prev => ({
        ...prev,
        eatsMeat: eatsMeat,
        personalizationStage: false
      }));
      
      // Generate updated diet plan with meat preference
      generateDietPlan(true);
      return true;
    }
    
    // Check if user wants to personalize further
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

  // Function to generate a Tamil cuisine diet plan
  const generateDietPlan = (updateForMeat = false) => {
    const { name, age, healthConditions, eatsMeat } = userInfo;
    setIsThinking(true);
    
    // Create diet plan based on collected information
    setTimeout(() => {
      let dietPlan = `Here's a Tamil cuisine-based diet plan for you, ${name}:\n\n`;
      
      // Add health condition specific information
      if (healthConditions && healthConditions.toLowerCase() !== 'nil') {
        dietPlan += `*Tailored for your health condition: ${healthConditions}*\n\n`;
      }
      
      // Breakfast options
      dietPlan += "🌞 **Breakfast:**\n";
      dietPlan += "- Idli with thengai chutney (இட்லி + தேங்காய் சட்னி)\n";
      dietPlan += "- Ragi kanji (ராகி கஞ்சி) with karuppatti (கருப்பட்டி)\n";
      dietPlan += "- Thinai dosa (திணை தோசை) with murungai keerai chutney (முருங்கை கீரை சட்னி)\n\n";
      
      // Lunch options
      dietPlan += "🍛 **Lunch:**\n";
      dietPlan += "- Samai sadham (சாமை சாதம்) with poriyal (பொரியல்) and paruppu (பருப்பு)\n";
      dietPlan += "- Keerai kootu (கீரை கூட்டு) with red rice (சிவப்பு அரிசி)\n";
      dietPlan += "- Puli kulambu (புளிக்குழம்பு) with kootu (கூட்டு)\n\n";
      
      // Evening snack options
      dietPlan += "🍵 **Evening Snacks:**\n";
      dietPlan += "- Sundal (சுண்டல்) with lemon and grated coconut\n";
      dietPlan += "- Nendran pazham (நேந்திரம் பழம்) steamed with honey\n";
      dietPlan += "- Kambu koozh (கம்பு கூழ்) with small onions (சின்ன வெங்காயம்)\n\n";
      
      // Dinner options
      dietPlan += "🌙 **Dinner:**\n";
      dietPlan += "- Ragi dosa (ராகி தோசை) with vellam (வெல்லம்)\n";
      dietPlan += "- Thuthuvalai soup (துத்துவளை சூப்) for immunity\n";
      dietPlan += "- Kuthiraivali upma (குதிரைவாளி உப்மா) with coconut chutney\n\n";
      
      // Add non-veg options if the user eats meat
      if (updateForMeat && eatsMeat) {
        dietPlan += "🍗 **Non-Vegetarian Options:**\n";
        dietPlan += "- Nattu kozhi soup (நாட்டு கோழி சூப்) for immunity - once a week\n";
        dietPlan += "- Meen Kuzhambu (மீன் குழம்பு) with brown rice - twice a week\n";
        dietPlan += "- Kozhi Varuval (கோழி வறுவல்) with ragi roti - once a week\n\n";
      }
      
      // Special recommendations
      dietPlan += "💡 **Special Recommendations:**\n";
      dietPlan += "- Drink neer moru (நீர் மோர்) or panagam (பானகம்) for digestion.\n";
      
      // Age-specific recommendations
      if (age > 50) {
        dietPlan += "- Include more calcium-rich foods like sesame seeds (எள்ளு) and green leafy vegetables.\n";
      } else if (age < 30) {
        dietPlan += "- Include more protein sources like paruppu (பருப்பு) varieties.\n";
      }
      
      // Health condition recommendations
      if (healthConditions && healthConditions.toLowerCase().includes('diabetes')) {
        dietPlan += "- Focus on low glycemic index foods like millets (சிறுதானியங்கள்).\n";
        dietPlan += "- Reduce rice portions and increase fiber intake.\n";
      } else if (healthConditions && healthConditions.toLowerCase().includes('heart')) {
        dietPlan += "- Prefer steamed foods over fried items.\n";
        dietPlan += "- Include more garlic (பூண்டு) in your cooking.\n";
      } else if (healthConditions && healthConditions.toLowerCase().includes('thyroid')) {
        dietPlan += "- Include iodine-rich seafood if non-vegetarian.\n";
        dietPlan += "- Moderate intake of goitrogenic foods like cabbage.\n";
      } else {
        dietPlan += "- Avoid deep-fried snacks for better overall health.\n";
        dietPlan += "- Include millets (சிறுதானியங்கள்) regularly for balanced nutrition.\n";
      }
      
      // Final bot message
      const dietMessage = {
        sender: "bot",
        text: dietPlan
      };
      
      setMessages(prev => [...prev, dietMessage]);
      setIsThinking(false);
      
      // Ask for further personalization only if not already personalized
      if (!updateForMeat) {
        setTimeout(() => {
          const personalizationMessage = {
            sender: "bot",
            text: "Would you like to further personalize your diet? (Yes/No)"
          };
          setMessages(prev => [...prev, personalizationMessage]);
        }, 1000);
      }
    }, 2000); // Simulate API call delay
  };

  const sendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    
    const userInput = input.trim();
    setInput("");
    
    // Check if we need to start the data collection process
    if (messages.length === 0 || 
        (messages.length === 1 && messages[0].sender === "user")) {
      startUserDataCollection();
      return;
    }
    
    // Check if we're collecting user data
    if (userInfo.collectingData) {
      if (processUserDataInput(userInput)) {
        return;
      }
    }
    
    // Check if we're in personalization stage
    if (messages[messages.length - 1].sender === "bot" && 
        (messages[messages.length - 1].text.includes("Would you like to further personalize your diet?") ||
         messages[messages.length - 1].text.includes("Do you eat meat?"))) {
      if (processPersonalizationInput(userInput)) {
        return;
      }
    }
    
    // For any other queries, use the regular chat functionality
    setIsThinking(true);
    setIsProcessing(true);
    
    try {
      // Include South Indian preference for all queries
      const requestData = { 
        message: userInput,
        preferences: { cuisine: "South Indian" }
      };
      
      // Simulate API call (replace with actual API call if needed)
      setTimeout(() => {
        let botText = "I understand you're interested in South Indian cuisine. For specific diet plans, I recommend starting over with the diet planner by typing 'hi' or 'start'.";
        const originalText = botText;
        
        setIsThinking(false);
        
        if (botText.length > 10) {
          let index = 0;
          const typingSpeed = 10; // Faster typing
          const typingInterval = setInterval(() => {
            setTypingMessage((prev) => {
              if (index < botText.length) {
                return { sender: "bot", text: botText.slice(0, index + 1), original: originalText };
              } else {
                clearInterval(typingInterval);
                setTypingMessage(null);
                // Add final message only once typing is complete
                setMessages((prev) => [...prev, { sender: "bot", text: botText, original: originalText }]);
                setIsProcessing(false);
                return null;
              }
            });
            index += 3; // Process 3 characters at a time for faster typing
          }, typingSpeed);
        } else {
          // For short messages, don't animate
          setMessages((prev) => [...prev, { sender: "bot", text: botText, original: originalText }]);
          setIsProcessing(false);
        }
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setIsThinking(false);
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ I'm having trouble processing your request. Please try again." }]);
      setTypingMessage(null);
      setIsProcessing(false);
    }
  };

  // Function to toggle message expansion
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
          {/* Header with animated elements */}
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
          
          {/* Conversation Area */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Message history */}
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
            
            {/* Input area */}
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