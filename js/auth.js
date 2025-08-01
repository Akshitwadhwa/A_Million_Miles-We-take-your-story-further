/**
 * Production Authentication Module
 */

class AuthManager {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.isLoading = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupAuthStateListener();
  }

  setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    const googleBtn = document.getElementById('googleBtn');
    
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }
    
    if (googleBtn) {
      googleBtn.addEventListener('click', () => this.handleGoogleSignIn());
    }
  }

  setupAuthStateListener() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.logUserActivity(user, 'login');
        this.redirectToDashboard();
      }
    });
  }

  async handleLogin(e) {
    e.preventDefault();
    if (this.isLoading) return;
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    if (!this.validateForm(email, password)) return;
    
    this.setLoading(true);
    
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      await this.logUserActivity(userCredential.user, 'login');
      this.showMessage('Login successful!', 'success');
      setTimeout(() => this.redirectToDashboard(), 1000);
    } catch (error) {
      this.handleAuthError(error);
    } finally {
      this.setLoading(false);
    }
  }

  async handleGoogleSignIn() {
    if (this.isLoading) return;
    this.setLoading(true);
    
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.auth.signInWithPopup(provider);
      await this.logUserActivity(result.user, 'google_login');
      this.showMessage('Login successful!', 'success');
      setTimeout(() => this.redirectToDashboard(), 1000);
    } catch (error) {
      this.handleAuthError(error);
    } finally {
      this.setLoading(false);
    }
  }

  validateForm(email, password) {
    if (!email || !this.isValidEmail(email)) {
      this.showMessage('Please enter a valid email', 'error');
      return false;
    }
    if (!password || password.length < 6) {
      this.showMessage('Password must be at least 6 characters', 'error');
      return false;
    }
    return true;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showMessage(message, type = 'info') {
    const container = document.getElementById('messageContainer');
    if (container) {
      container.innerHTML = `<div class="message message-${type}">${message}</div>`;
      container.style.display = 'block';
      setTimeout(() => container.style.display = 'none', 5000);
    }
  }

  setLoading(loading) {
    this.isLoading = loading;
    const submitBtn = document.getElementById('submitBtn');
    const googleBtn = document.getElementById('googleBtn');
    
    if (submitBtn) {
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      
      if (loading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
      } else {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
      }
    }
    
    if (googleBtn) googleBtn.disabled = loading;
  }

  handleAuthError(error) {
    let message = 'An error occurred. Please try again.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password.';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Try again later.';
        break;
    }
    
    this.showMessage(message, 'error');
  }

  async logUserActivity(user, action) {
    try {
      await this.db.collection('user_activity').add({
        uid: user.uid,
        email: user.email,
        action: action,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userAgent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  }

  redirectToDashboard() {
    window.location.href = 'index.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AuthManager();
}); 