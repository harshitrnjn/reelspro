# 🎥 Shortify – A Short Video Sharing Platform

**Shortify** is a web application inspired by platforms like **YouTube Shorts** and **Instagram Reels**.  
It replicates the core business logic behind short-form video platforms by integrating authentication,  
secure video uploads, and content streaming — all optimized for vertical **(9:16)** video experiences.

---

## 🔐 Core Features

### 1. Authentication System
- Users must authenticate to access the home feed.
- Authentication is managed using **JSON Web Tokens (JWT)** with a **1-day expiry**.
- After expiry, users must re-login to regain access.

### 2. Home Page Access
- Authenticated users can view a feed of all uploaded videos.
- The layout resembles **Instagram's** UI for familiarity and ease of use.

### 3. Video Streaming
- All videos are displayed in a **9:16 vertical format**.

### 4. Secure Video Uploading
- Videos are uploaded and delivered via **ImageKit** for fast, optimized performance.

### 5. Log-out Functionality
- A dedicated **log-out button** allows users to securely end their session.

---

## 🛠️ Upcoming Features

### 1. User-Controlled Content Deletion
- Uploaders will be able to delete their own videos.
- They can still view content from other users.

### 2. User Profile Pages
- Every user will have a **personal profile page** to track and manage uploaded content.

---

