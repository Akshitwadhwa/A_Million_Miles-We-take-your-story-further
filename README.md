# 🚀 ShortForm Growth - Content Strategy Platform

A modern, responsive web platform designed to help creators and businesses master short-form content growth strategies across multiple social media platforms.

## ✨ Features

### 🎯 Core Functionality
- **Multi-Platform Growth Strategies**: YouTube, Instagram, and Twitter optimization
- **Interactive Platform Selection**: Choose your primary platform for customized strategies
- **Comprehensive Roadmaps**: Step-by-step growth strategies for each platform
- **Content Calendars**: Weekly posting schedules and content planning
- **User Authentication**: Secure Firebase-based login and registration system

### 🎨 Design & UX
- **Modern UI/UX**: Clean, professional design with gradient backgrounds
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Accessibility**: WCAG compliant with proper focus management and screen reader support

### 🔒 Security & Performance
- **Firebase Authentication**: Secure user management with email/password and Google sign-in
- **Activity Logging**: Track user interactions and login events
- **Session Management**: Proper logout functionality with memory clearing
- **Performance Optimized**: Fast loading times with optimized assets

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Styling**: Custom CSS with modern animations
- **Icons**: Font Awesome 6.0
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

```
shortform-growth/
├── index.html              # Main landing page
├── login.html              # Authentication page (gitignored)
├── signup.html             # User registration page
├── growth.html             # Platform selection page
├── youtube.html            # YouTube strategy page
├── shortform.html          # Short-form content mastery page
├── asset.css               # Main stylesheet
├── yt.css                  # YouTube page specific styles
├── main.js                 # JavaScript functionality
├── js/
│   └── auth.js            # Authentication module
├── views/                  # EJS templates (for Express.js)
│   ├── index.ejs
│   └── partials/
│       └── navbar.ejs
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase project setup (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shortform-growth
   ```

2. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Copy your Firebase config

3. **Configure Authentication**
   - Create `login.html` with your Firebase configuration
   - Add your Firebase API keys and project settings

4. **Run the project**
   - Open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
