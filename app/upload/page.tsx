"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import WelcomeHeader from "../components/WelcomeHeader";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    source: "manual",
    start_datetime: "",
    end_datetime: "",
    emergency: 24,
    general: 24,
    location: "",
  });

  const handleImageUpload = async () => {
    if (!selectedFile) return alert("Please select an image.");
  
    const email = localStorage.getItem("user_email");
    if (!email) return alert("Please login again. Email not found.");
  
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("email", email);
  
    const res = await fetch("http://localhost:8000/analyze_image", {
      method: "POST",
      body: data,
    });
  
    const text = await res.text();
  
    try {
      const json = JSON.parse(text);
  
      if (json.task) {
        console.log("✅ Task generated:", json.task);
        alert(`✅ Task created: ${json.task.name}`);
      } else {
        alert("❌ Image analyzed, but no task returned.");
      }
    } catch (err) {
      console.error("❌ JSON parse error:", text);
      alert("❌ Something went wrong during upload.");
    }
  };
  
  

  const handleManualSubmit = async () => {
    const user_email = localStorage.getItem("user_email");
    if (!user_email) {
      alert("❗ Email not found. Please log in.");
      return;
    }
  
    if (!formData.name || !formData.type || !formData.end_datetime) {
      alert("❗ Please fill in required fields: Event Name, Type, and End DateTime.");
      return;
    }
  
    const task = {
      task_id: `${user_email}_${formData.name.replace(/\s+/g, "")}`,
      user_email,
      source: "manual",
      type: formData.type,
      name: formData.name,
      location: formData.location || "",
      start_datetime: null, // or use a field if you add it
      end_datetime: formData.end_datetime,
      emergency: formData.emergency || 72,
      general: formData.general || 24,
    };
  
    try {
      const res = await fetch("http://localhost:8000/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
  
      const result = await res.json();
  
      if (res.ok) {
        alert(`✅ Task added: ${task.name}`);
        setFormData({
            name: "",
            type: "",
            source: "manual", // ✅ Required
            location: "",
            start_datetime: "",
            end_datetime: "",
            emergency: 72,
            general: 24,
          });
      } else {
        alert(`❌ Failed: ${result.detail}`);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-100 to-red-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <WelcomeHeader />
        <h1 className="text-3xl font-bold text-center mb-10">📤 Upload Content</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 📸 Image Upload */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Upload Event (Gemini-Powered)</h2>
            <input
              type="file"
              accept="image/*"
              className="mb-4"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            <button
              onClick={handleImageUpload}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Upload Event
            </button>
          </div>

          {/* 📝 Manual Event Entry */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Manual Event Input</h2>
            <input
              type="text"
              placeholder="Event Name"
              className="w-full border p-2 mb-2 rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Event Type (e.g., assignment)"
              className="w-full border p-2 mb-2 rounded"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location (optional)"
              className="w-full border p-2 mb-2 rounded"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <input
            type="datetime-local"
            className="w-full border p-2 mb-2 rounded"
            value={formData.start_datetime}
            onChange={(e) => setFormData({ ...formData, start_datetime: e.target.value })}
            />
            <input
              type="datetime-local"
              className="w-full border p-2 mb-2 rounded"
              value={formData.end_datetime}
              onChange={(e) => setFormData({ ...formData, end_datetime: e.target.value })}
            />
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                min="0"
                placeholder="Emergency (hrs)"
                className="flex-1 border p-2 rounded"
                value={formData.emergency}
                onChange={(e) => setFormData({ ...formData, emergency: Number(e.target.value) })}
              />
              <input
                type="number"
                min="0"
                placeholder="General (hrs)"
                className="flex-1 border p-2 rounded"
                value={formData.general}
                onChange={(e) => setFormData({ ...formData, general: Number(e.target.value) })}
              />
            </div>

            <button
              onClick={handleManualSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
