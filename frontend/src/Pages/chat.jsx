import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Chat() {

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [history, setHistory] = useState([]);

  const [selectedChat, setSelectedChat] = useState(null);

  const [loading, setLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(true);

  const messagesEndRef = useRef(null);

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  };

  // Fetch History
  const fetchHistory = async () => {

    try {

      const response = await API.get("/history");

      setHistory(response.data.reverse());

    } catch (error) {

      console.log(error);

    }

  };

  // Load History
  useEffect(() => {

    fetchHistory();

  }, []);

  // Auto Scroll
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  // Send Message
  const sendMessage = async () => {

    if (!message.trim()) return;

    setSelectedChat(null);

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const response = await API.post("/chat", {
        message: message,
      });

      const botMessage = {
        sender: "bot",
        text: response.data.bot_response,
      };

      setMessages((prev) => [...prev, botMessage]);

      fetchHistory();

    } catch (error) {

      console.log(error);

      const errorMessage = {
        sender: "bot",
        text: "Backend connection failed",
      };

      setMessages((prev) => [...prev, errorMessage]);

    }

    setLoading(false);

    setMessage("");

  };

  // Delete Chat
  const deleteChat = async (id) => {

    try {

      await API.delete(`/history/${id}`);

      fetchHistory();

      setSelectedChat(null);

    } catch (error) {

      console.log(error);

    }

  };

  // Enter Key
  const handleKeyPress = (e) => {

    if (e.key === "Enter") {

      sendMessage();

    }

  };

  // New Chat
  const handleNewChat = () => {

    setMessages([]);

    setSelectedChat(null);

  };

  return (

    <div className={`h-screen flex ${
      darkMode
        ? "bg-[#343541]"
        : "bg-gray-100"
    }`}>

      {/* Sidebar */}
      <div className={`w-[260px] flex flex-col ${
        darkMode
          ? "bg-[#202123] text-white"
          : "bg-white text-black border-r"
      }`}>

        {/* Top Section */}
        <div className={`p-3 border-b ${
          darkMode
            ? "border-gray-700"
            : "border-gray-300"
        }`}>

          {/* New Chat */}
          <button
            onClick={handleNewChat}
            className={`w-full rounded-lg py-3 transition ${
              darkMode
                ? "border border-gray-600 hover:bg-gray-700"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
          >
            + New Chat
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full mt-3 rounded-lg py-3 transition ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">

          {history.map((chat) => (

            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                selectedChat?.id === chat.id
                  ? darkMode
                    ? "bg-gray-700"
                    : "bg-gray-300"
                  : darkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-200"
              }`}
            >

              <p className="truncate text-sm flex-1">
                {chat.user_message}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className="hidden group-hover:block text-red-400 hover:text-red-500 ml-2"
              >
                ✕
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className={`text-center py-4 border-b text-xl font-semibold ${
          darkMode
            ? "bg-[#343541] text-white border-gray-700"
            : "bg-white text-black border-gray-300"
        }`}>
          AI FAQ Assistant
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto px-4 py-6 space-y-6 ${
          darkMode
            ? "bg-[#343541]"
            : "bg-gray-100"
        }`}>

          {/* Welcome */}
          {messages.length === 0 && !selectedChat && !loading && (

            <div className="h-full flex flex-col items-center justify-center text-center">

              <h1 className={`text-5xl font-bold mb-6 ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }`}>
                AI FAQ Assistant
              </h1>

              <p className={`text-lg ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}>
                Ask anything to start chatting...
              </p>

            </div>

          )}

          {/* Selected Chat */}
          {selectedChat && (

            <div className="space-y-6">

              <div className="flex justify-end">

                <div className="bg-[#10A37F] text-white p-4 rounded-2xl max-w-2xl">
                  {selectedChat.user_message}
                </div>

              </div>

              <div className="flex justify-start">

                <div className={`p-4 rounded-2xl max-w-2xl ${
                  darkMode
                    ? "bg-[#444654] text-white"
                    : "bg-white text-black border"
                }`}>
                  {selectedChat.bot_response}
                </div>

              </div>

            </div>

          )}

          {/* Current Messages */}
          {!selectedChat && messages.length > 0 && (

            <>
              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`p-4 rounded-2xl max-w-2xl ${
                      msg.sender === "user"
                        ? "bg-[#10A37F] text-white"
                        : darkMode
                          ? "bg-[#444654] text-white"
                          : "bg-white text-black border"
                    }`}
                  >
                    {msg.text}
                  </div>

                </div>

              ))}
            </>

          )}

          {/* Loading */}
          {loading && (

            <div className="flex justify-start">

              <div className={`px-5 py-3 rounded-2xl flex gap-1 ${
                darkMode
                  ? "bg-[#444654] text-white"
                  : "bg-white text-black border"
              }`}>

                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>

              </div>

            </div>

          )}

          <div ref={messagesEndRef}></div>

        </div>

        {/* Input */}
        <div className={`p-4 ${
          darkMode
            ? "bg-[#40414F]"
            : "bg-white border-t"
        }`}>

          <div className={`max-w-4xl mx-auto flex items-center rounded-xl px-4 ${
            darkMode
              ? "bg-[#40414F] border border-gray-600"
              : "bg-white border border-gray-300"
          }`}>

            <input
              type="text"
              placeholder="Message AI FAQ Assistant..."
              className={`flex-1 outline-none py-4 bg-transparent ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <button
              onClick={sendMessage}
              className={`transition ${
                darkMode
                  ? "text-white hover:text-gray-300"
                  : "text-black hover:text-gray-600"
              }`}
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Chat;