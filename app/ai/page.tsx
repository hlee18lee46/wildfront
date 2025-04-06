"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import WelcomeHeader from "../components/WelcomeHeader";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    setToken(savedToken);
    if (!savedToken) {
      console.warn("⚠️ No access_token found in localStorage.");
    }
  }, []);

  const handleAsk = async () => {
    const user_email = localStorage.getItem("user_email");
    if (!input.trim() || !user_email) return;
  
    setLoading(true);
    setReply("");
    setError("");
  
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          user_email, // ✅ Send user email if you're not using token
        }),
      });
  
      const text = await res.text();
  
      try {
        const data = JSON.parse(text);
  
        if (!res.ok) {
          setError(data?.detail || "Unknown server error.");
        } else {
          setReply(data?.reply || "No reply.");
        }
      } catch (err) {
        console.error("❌ Failed to parse JSON:", text);
        setError("❌ Server sent invalid response.");
      }
  
    } catch (err) {
      console.error("❌ Network error:", err);
      setError("❌ Failed to fetch AI response.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <WelcomeHeader />
        <h1 className="text-3xl font-bold text-center mb-6">🤖 AI Assistant</h1>

        <div className="mx-auto w-full max-w-3xl bg-white p-6 rounded-xl shadow space-y-4">
          <textarea
            placeholder="Ask about your upcoming tasks or schedule..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded-lg p-3 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={handleAsk}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-sm border border-red-300">
              {error}
            </div>
          )}
{reply && (
  <div
    className="bg-gray-100 p-4 rounded-lg border border-gray-300 text-sm"
    dangerouslySetInnerHTML={{
      __html: reply.replace(/\n/g, "<br />"), // Convert newlines to <br>
    }}
  />
)}

        </div>
      </div>
    </div>
  );
}