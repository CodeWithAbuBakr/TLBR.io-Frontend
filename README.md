# TLBR.io Dashboard

The **TLBR.io Dashboard** is a modern, responsive admin interface built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**.  
It serves as the control center for TLBR.io users, providing easy access to account management, billing, downloads, and customization options—all in one streamlined experience.

---

## 🚀 Overview

TLBR.io Dashboard helps users manage their TLBR add-ins, preferences, and subscriptions efficiently.  
Designed with clarity and performance in mind, it offers fast navigation, real-time responsiveness, and seamless integration with TLBR.io’s productivity tools.

### 🔑 Core Features

- **Responsive Dashboard Layout** – Optimized for all screen sizes (mobile → desktop)
- **Account Settings** – Manage personal information, preferences, and theme mode
- **Billing Management** – View plan details, manage subscriptions, and payment history
- **Download Center** – Access the latest TLBR add-ins for PowerPoint and other tools
- **Dark Mode Support** – Fully integrated light/dark theme
- **Reusable Components** – Modular React components for easy scaling
- **Optimized for Performance** – Built using Next.js App Router and modern TypeScript features

---

## 🧱 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI Library:** React 19 + Tailwind CSS v4
- **Icons:** React Icons
- **Design System:** Custom TLBR.io UI Components

---

## 🛠️ Getting Started

### 1. Prerequisites
Make sure you have the following installed:
- **Node.js** 18.x or later (20.x recommended)
- **npm** or **yarn**

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/tlbr-dashboard.git
cd tlbr-dashboard
npm install

Run Development Server: npm run dev

Then open your browser and visit: http://localhost:3000

📂 Project Structure

src/
 ├─ app/
 │   ├─ dashboard/        # Main dashboard overview
 │   ├─ billing/          # Billing and subscription management
 │   ├─ setting/          # User preferences and profile
 │   ├─ download/         # Add-in download page
 │   └─ layout.tsx        # Global layout and theming
 ├─ components/           # UI components and reusable layouts
 ├─ styles/               # Tailwind and global styles
 └─ utils/                # Helper functions and constants

🎨 UI Highlights

Dashboard Cards: Dynamic, responsive metric displays
“Getting Started” Section: Quick-access shortcuts to key features
Light/Dark Mode: Seamlessly toggled across all pages
Consistent Typography: Using Cal Sans and system fonts
Modern Layouts: Built with Tailwind’s grid and flex utilities

📦 Deployment

Deploy instantly with Vercel (recommended): vercel

Alternatively, you can build and serve locally:
npm run build
npm run start

🧩 License

This project is licensed under the MIT License.
You’re free to use, modify, and distribute it under the same license.

💬 Support

For issues, feature requests, or contributions:
Create an issue or pull request on the repository
Or reach out via tlbr.io
If you find this project helpful, please ⭐ the repo — it helps support continued development!

© 2025 TLBR.io — Elevate Every Productivity