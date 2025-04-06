Sync-a-Life Frontend

This is the frontend of the Sync-a-Life application, built using Next.js (App Router) with TypeScript, Tailwind CSS, and React. It provides a user-friendly interface to interact with tasks, calendars, reminders, and AI chatbot features.

🧰 Tech Stack

Framework: Next.js 14

Styling: Tailwind CSS

Auth/OAuth: Google, Microsoft, Canvas LMS

Chatbot: GPT-3.5 via FastAPI backend

State Management: React Hooks + Local Storage

🧰 Frontend Libraries and Tools
	•	Next.js – React-based framework for server-side rendering and routing
	•	React – UI library for building interactive user interfaces
	•	Tailwind CSS – Utility-first CSS framework for styling
	•	TypeScript – Static typing for JavaScript
	•	ESLint – Linting tool to maintain code quality
	•	Prettier – Code formatter for consistency
	•	Next Auth (or custom OAuth) – Handles user authentication (OAuth2 callback)
	•	localStorage – Used for storing access_token and user_email on client
	•	fetch API – For calling backend endpoints like /chat, /tasks, /sms-alert, etc.

 Do npm install to install libraries

🚀 Features

📆 View synced tasks/events from Google Calendar, Outlook, and Canvas

🧠 Chatbot interface powered by OpenAI (via FastAPI)

📸 Upload event flyers or handwritten notes to auto-generate tasks

🔔 Update emergency/general alert times for each task

📱 Trigger SMS alerts via backend (email-to-SMS)

Setup
npm install
npm run dev


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
