"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar"; // adjust path if necessary
import WelcomeHeader from "../components/WelcomeHeader"; // Adjust path if needed

export default function SyncPage() {
  const [canvasUrl, setCanvasUrl] = useState("");
  const [canvasToken, setCanvasToken] = useState("");
  const [microsoftClientId, setMicrosoftClientId] = useState("");
  const [microsoftClientSecret, setMicrosoftClientSecret] = useState("");
  const [microsoftTenantId, setMicrosoftTenantId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCanvasSync = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/canvas/sync-tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("user_email"), // ✅ Store email on login if not already
          canvas_base_url: canvasUrl,
          canvas_access_token: canvasToken,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(`✅ Synced ${result.inserted} new and ${result.updated} updated assignments.`);
      } else {
        alert(`❌ Sync failed: ${result.detail}`);
      }
    } catch (err) {
      console.error("Canvas sync failed", err);
      alert("❌ Sync failed due to network or server error.");
    }
  };
  

  const handleOutlookSync = async () => {
    const accessToken = localStorage.getItem("outlook_access_token");
  
    if (!accessToken) {
      alert("Outlook access token not found. Please authenticate first.");
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:8000/outlook/events?access_token=${accessToken}`);
      const data = await res.json();
  
      if (!res.ok) {
        console.error("❌ Failed to fetch Outlook events:", data);
        alert("Failed to fetch events. See console for details.");
        return;
      }
  
      console.log("📅 Outlook Events:", data.events);
      alert(`✅ Synced ${data.events.length} Outlook events!`);
    } catch (error) {
      console.error("❌ Error syncing Outlook:", error);
      alert("An error occurred while syncing Outlook.");
    }
  };
  
  
  

  const handlePhoneSync = async () => {
    const email = localStorage.getItem("user_email");
    if (!email) {
      alert("Email not found. Please log in again.");
      return;
    }
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/phone-sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        phone_number: phoneNumber,
      }),
    });
  
    const data = await res.json();
    console.log("Phone Sync Response:", data);
    alert(data.message);
  };
  

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-6">
      <WelcomeHeader />
        <h1 className="text-3xl font-bold text-center mb-10">🔗 Sync Your Platforms</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Canvas Sync */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <iframe
              className="w-full h-48 mb-4 rounded"
              src="https://www.youtube.com/embed/exampleCanvas"
              title="Canvas Sync Instructions"
              allowFullScreen
            ></iframe>
            <h2 className="text-xl font-semibold mb-4">Canvas</h2>
            <input
              type="text"
              placeholder="Canvas URL"
              className="w-full border p-2 mb-2 rounded"
              value={canvasUrl}
              onChange={(e) => setCanvasUrl(e.target.value)}
            />
            <input
              type="text"
              placeholder="Canvas Access Token"
              className="w-full border p-2 mb-4 rounded"
              value={canvasToken}
              onChange={(e) => setCanvasToken(e.target.value)}
            />
            <button
              onClick={handleCanvasSync}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Sync
            </button>
          </div>

          {/* Outlook Sync */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <iframe
              className="w-full h-48 mb-4 rounded"
              src="https://www.youtube.com/embed/exampleOutlook"
              title="Outlook Sync Instructions"
              allowFullScreen
            ></iframe>
            <h2 className="text-xl font-semibold mb-4">Outlook</h2>
            <input
              type="text"
              placeholder="Microsoft Client ID"
              className="w-full border p-2 mb-2 rounded"
              value={microsoftClientId}
              onChange={(e) => setMicrosoftClientId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Microsoft Client Secret"
              className="w-full border p-2 mb-2 rounded"
              value={microsoftClientSecret}
              onChange={(e) => setMicrosoftClientSecret(e.target.value)}
            />
            <input
              type="text"
              placeholder="Microsoft Tenant ID"
              className="w-full border p-2 mb-4 rounded"
              value={microsoftTenantId}
              onChange={(e) => setMicrosoftTenantId(e.target.value)}
            />
            <button
              onClick={handleOutlookSync}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
            >
              Sync
            </button>
          </div>

          {/* Phone Sync */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <iframe
              className="w-full h-48 mb-4 rounded"
              src="https://www.youtube.com/embed/examplePhone"
              title="Phone Sync Instructions"
              allowFullScreen
            ></iframe>
            <h2 className="text-xl font-semibold mb-4">Phone</h2>
            <input
              type="text"
              placeholder="Phone Number (without dash)"
              className="w-full border p-2 mb-4 rounded"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              onClick={handlePhoneSync}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
