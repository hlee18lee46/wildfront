// app/oauth2callback/page.tsx

"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthCallback />
    </Suspense>
  );
}

function OAuthCallback() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
  
    useEffect(() => {
      const exchangeAndSync = async () => {
        if (!code) return;
  
        try {
          // Step 1: Exchange code for access_token
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2callback?code=${code}`);
          const data = await res.json();
          console.log("OAuth callback result:", data);
  
          const accessToken = data.access_token;
          if (!accessToken) return;
  
          // Step 2: Save access token
          localStorage.setItem("google_access_token", accessToken);
  
          // Step 3: Sync events with FastAPI
          const syncRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/google-sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token: accessToken }),
          });
  
          const syncData = await syncRes.json();
          console.log("Google Calendar Sync:", syncData);

          // ✅ Save email to localStorage
if (syncData.email) {
    localStorage.setItem("user_email", syncData.email);
  }
  
  // Step 4: Redirect to dashboard or calendar
  window.location.href = `/calendar?email=${syncData.email}`;
  
          // Step 4: Redirect to dashboard or calendar
          window.location.href = `/calendar?email=${syncData.email}`;
        } catch (err) {
          console.error("OAuth sync failed", err);
        }
      };
  
      exchangeAndSync();
    }, [code]);
  
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-semibold">Authenticating...</h1>
      </div>
    );
  }
  