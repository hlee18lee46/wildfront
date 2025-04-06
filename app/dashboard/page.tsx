"use client"; // ✅ Must be here to make this a Client Component

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4 text-indigo-700">Welcome to Your Calendar</h1>
      {email && (
        <p className="text-xl text-gray-700">
          Logged in as: <span className="font-semibold">{email}</span>
        </p>
      )}
    </div>
  );
}
