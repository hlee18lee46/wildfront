"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import WelcomeHeader from "../components/WelcomeHeader";

function convertToDaysHours(hours: number) {
  const d = Math.floor(hours / 24);
  const h = hours % 24;
  return `${d}d ${h}h`;
}

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [smsData, setSmsData] = useState<{ [taskId: string]: { phone: string; carrier: string } }>({}); // ✅ Add here

  useEffect(() => {
    const fetchEvents = async () => {
      const email = localStorage.getItem("user_email");
      if (!email) return;

      const res = await fetch(`http://localhost:8000/tasks?email=${email}`);
      const data = await res.json();
      setEvents(data.tasks || []);
    };

    fetchEvents();
  }, []);

  const updateTiming = async (taskId: string, type: "emergency" | "general") => {
    const newHours = prompt(`Enter new ${type} time in hours:`);

    if (!newHours || isNaN(Number(newHours))) {
      alert("❌ Please enter a valid number.");
      return;
    }

    const res = await fetch(`http://localhost:8000/tasks/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_id: taskId, type, value: Number(newHours) }),
    });

    const result = await res.json();
    if (res.ok) {
      alert("✅ Updated successfully!");
      location.reload();
    } else {
      alert(`❌ Failed: ${result.detail}`);
    }
  };

  const handleSendSMS = async (event: any) => {
    const taskId = event.task_id;
    const data = smsData[taskId];
  
    if (!data?.phone || !data?.carrier) {
      alert("❗ Please enter phone number and select a carrier.");
      return;
    }
  
    const res = await fetch("http://localhost:8000/sms-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: data.phone,
        carrier: data.carrier,
        event,
      }),
    });
  
    const result = await res.json();
    if (res.ok) {
      alert("✅ SMS alert sent!");
    } else {
      alert(`❌ Failed: ${result.detail}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <WelcomeHeader />
        <h1 className="text-3xl font-bold mb-6 text-center">🔄 Your Upcoming Events</h1>

        {events.length === 0 ? (
          <p className="text-center text-gray-600 mt-8">No events found. Try syncing from the Sync page!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, idx) => (
                
              <div
                key={idx}
                className="bg-white p-5 rounded-xl shadow hover:shadow-2xl transition duration-300 ease-in-out"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">
                    {event.name || "Untitled Event"}{" "}
                    <span className="text-sm font-medium text-purple-500">({event.source})</span>
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mb-1">📍 {event.location || "No location"}</p>
                <p className="text-sm text-gray-600 mb-2">
                  📅 {event.end_datetime ? new Date(event.end_datetime).toLocaleString() : "No end time"}
                </p>

                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-blue-700 font-medium">
                    ⚠️ Emergency: {convertToDaysHours(event.emergency)}
                  </p>
                  <button
                    onClick={() => updateTiming(event.task_id, "emergency")}
                    className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200"
                  >
                    Update
                  </button>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-green-700 font-medium">
                    🕒 General: {convertToDaysHours(event.general)}
                  </p>
                  <button
                    onClick={() => updateTiming(event.task_id, "general")}
                    className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200"
                  >
                    Update
                  </button>
                </div>

                <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {event.type}
                </span>
                <div className="mt-3">
                <input
  type="text"
  placeholder="Phone Number"
  className="w-full border p-2 mb-2 rounded"
  value={smsData[event.task_id]?.phone || ""}
  onChange={(e) =>
    setSmsData((prev) => ({
      ...prev,
      [event.task_id]: {
        ...prev[event.task_id],
        phone: e.target.value,
      },
    }))
  }
/>

<select
  className="w-full border p-2 mb-2 rounded"
  value={smsData[event.task_id]?.carrier || ""}
  onChange={(e) =>
    setSmsData((prev) => ({
      ...prev,
      [event.task_id]: {
        ...prev[event.task_id],
        carrier: e.target.value,
      },
    }))
  }
>
  <option value="">Select Carrier</option>
  <option value="vtext.com">Verizon</option>
  <option value="tmomail.net">T-Mobile</option>
  <option value="txt.att.net">AT&T</option>
  <option value="messaging.sprintpcs.com">Sprint</option>
  <option value="vmobl.com">Virgin Mobile</option>
  <option value="sms.myboostmobile.com">Boost</option>
</select>
  <button
    onClick={() => handleSendSMS(event)}
    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 w-full"
  >
    Send SMS Alert
  </button>
</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
