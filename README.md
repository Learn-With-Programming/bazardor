# Project name : Bazar Dor

# Short description:

Bazar Dor provides real-time, market-wise pricing data for everyday groceries. Users can browse products by category, view price trends (rising/falling), see market-wise minimum and maximum prices, and securely manage their profile. The app features a responsive, mobile-first design, protected product detail pages, and a smooth authentication flow with email/password and social login (Google & GitHub).

# Technologies Used :

# Next.js 16 (App Router) Full-stack React framework for routing, SSR, and API routes

# TypeScript Type-safe development across the entire codebase

# Tailwind CSS Utility-first styling with responsive design

# DaisyUI Pre-built UI components on top of Tailwind CSS

# BetterAuth Authentication library (email/password + Google + GitHub OAuth)

# MongoDB Atlas Cloud-hosted NoSQL database for user accounts and sessions

# MongoDB Adapter for BetterAuth Database adapter for seamless BetterAuth-MongoDB integration

# React Hot Toast Toast notifications for success/error feedback

# React Icons Icon system used throughout the UI

# Next.js Image Component Optimized image loading for banners and thumbnails

# Custom REST API External API for products, categories, and market-wise pricing data

# 5 Key Features :

# 1. Home with Price Trend Sections :

The homepage displays three distinct sections — and All Products each rendered as a responsive product grid with emoji thumbnails, Bangla numerals, and color-coded change badges (green for fall, red for rise, gray for flat).

# 2. Category Browsing with Sort & Loading States :

Users can browse products by category (rice, lentils, oil, vegetables, fish, meat, eggs, spices) via the navbar. The category page includes a sort dropdown Bengali numeral-aware sorting skeleton loaders during fetch, and a friendly empty state with a "back to home" CTA for invalid categories.

# 3. Protected Product Details with Market-wise Pricing :

Each product card links to a protected detail page (requires login). It shows the product name, emoji, unit, daily price, change percentage, minimum/maximum/average price summary, and a market-wise price table listing min/max prices across different bazaars and divisions (Dhaka, Chattogram, Rajshahi, Khulna, Sylhet, Mymensingh).

# 4. Secure Authentication (Email)

Full authentication flow powered by BetterAuth with MongoDB Atlas — supports email/password sign-up, sign-in, Includes toast notifications for success/error, protected route redirects, session-based navbar updates, and sign-out functionality.

# 5 . User Profile with Image Upload & Update :

Users can view their profile (name, email, join date) and update their information via the Update Info page. The update form supports name change and profile image upload (converted to Base64 and stored in MongoDB), with live preview, file size validation (max 500 KB), and instant navbar avatar refresh after saving.
