🎥 Shortify – A Short Video Sharing Platform
Shortify is a web application inspired by platforms like YouTube Shorts and Instagram Reels. It replicates key business logic behind short-form video platforms, integrating authentication, secure video uploads, and content streaming — all optimized for vertical (9:16) video experiences.

🔐 Core Features
Authentication System:
Users must authenticate to access the home feed. Authentication is managed using JSON Web Tokens (JWT) with a 1-day expiry for secure session control. After the token expires, re-login is required.

Home Page Access:
Authenticated users can view a feed of all uploaded videos in a format and layout similar to Instagram.

Video Streaming:
All videos are displayed in a 9:16 vertical format, consistent with the short video content style.

Secure Video Uploading:
Videos are uploaded and served via ImageKit, ensuring fast delivery and optimized media handling.

Log-out Functionality:
A dedicated log-out button allows users to securely end their session.

🛠️ Upcoming Features
User-Controlled Content Deletion:
Video uploaders will be able to delete their own content while retaining the ability to view other users’ videos.

User Profile Pages:
Each user will have a personal profile page to track and manage their uploaded content.
