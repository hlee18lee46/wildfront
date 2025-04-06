"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function OutlookCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OutlookCallback />
    </Suspense>
  );
}

function OutlookCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const syncOutlook = async () => {
      if (!code) {
        alert("No auth code found in the URL. Please authenticate via Microsoft login.");
        return;
      }

      try {
        // Step 1: Exchange code for access_token
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/outlook/callback?code=${code}`
        );
        const data = await res.json();
        console.log("Outlook Token Exchange Result:", data);

        const accessToken = data.access_token;
        if (!accessToken) throw new Error("No access token returned.");

        // Step 2: Save access token
        localStorage.setItem("outlook_access_token", accessToken);

        // Step 3 (optional): Call sync endpoint
        const syncRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/outlook-sync`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token: accessToken }),
          }
        );

        const syncResult = await syncRes.json();
        console.log("Outlook Sync Result:", syncResult);

        // Step 4: Redirect to calendar or dashboard
        window.location.href = `/calendar?email=${syncResult.email}`;
      } catch (err) {
        console.error("Outlook sync failed", err);
        alert("Outlook sync failed. Check console for details.");
      }
    };

    syncOutlook();
  }, [code]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-semibold">Authenticating Outlook...</h1>
    </div>
  );
}
