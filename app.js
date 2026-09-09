/* ========================================
   Always Play — Main Application Logic (fixed)
   ======================================== */

// Sample Video Database
const videoDB = {
  free: [
    { id: 1, title: 'Learn Web Development Basics', channel: 'Tech Academy', views: '245K', date: '2 days ago', duration: '45:20', category: 'education', thumbnail: '🎓', description: 'Master HTML, CSS & JavaScript', videoUrl: 'video/testvideo.mp4' },
    { id: 2, title: 'Best Gaming Moments 2026', channel: 'Pro Gamer', views: '1.2M', date: '1 week ago', duration: '32:15', category: 'gaming', thumbnail: '🎮', description: 'Epic gaming highlights', videoUrl: 'https://drive.google.com/file/d/1WJkFcAnmJxMy8eU6lgudxCmXzaBLPGoT/view?usp=drive_link' },
    { id: 3, title: 'Music Production Tips', channel: 'Beat Maker', views: '89K', date: '3 days ago', duration: '28:45', category: 'music', thumbnail: '🎵', description: 'Learn pro tips for better music',videoUrl: 'https://drive.google.com/file/d/1WJkFcAnmJxMy8eU6lgudxCmXzaBLPGoT/view?usp=drive_link' },
    { id: 4, title: 'Breaking Tech News', channel: 'Tech News Daily', views: '567K', date: '1 day ago', duration: '12:30', category: 'news', thumbnail: '📰', description: 'Latest updates in the tech world', videoUrl: 'https://drive.google.com/file/d/1WJkFcAnmJxMy8eU6lgudxCmXzaBLPGoT/view?usp=drive_link' },
    { id: 5, title: 'Fitness Workout Routine', channel: 'Fit Life', views: '432K', date: '4 days ago', duration: '35:00', category: 'sports', thumbnail: '⚽', description: 'Full-body workout for beginners', videoUrl: 'https://drive.google.com/file/d/1WJkFcAnmJxMy8eU6lgudxCmXzaBLPGoT/view?usp=drive_link'  },
    { id: 6, title: 'My Test Video', channel: 'Test Channel', views: '100', date: 'Today', duration: '2:15', category: 'music', thumbnail: '🎬', description: 'Test video from local file', videoUrl: 'video/testvideo.mp4' }
  ],
  premium: [
    { id: 101, title: 'Advanced JavaScript Mastery', channel: 'Code Masters', views: '890K', date: '1 week ago', duration: '120:45', category: 'tech', thumbnail: '💻', description: 'Deep dive into advanced JS topics.' },
    { id: 102, title: 'Hollywood Movie Premiere', channel: 'Entertainment Plus', views: '2.3M', date: '2 days ago', duration: '150:00', category: 'entertainment', thumbnail: '🎬', description: 'Exclusive premiere coverage.' },
    { id: 103, title: 'Professional Music Production Course', channel: 'Sound Design Pro', views: '1.1M', date: '1 week ago', duration: '180:30', category: 'music', thumbnail: '🎵', description: 'Complete production workflow.' },
    { id: 104, title: 'Stock Market Secrets', channel: 'Finance Daily', views: '756K', date: '3 days ago', duration: '95:20', category: 'news', thumbnail: '📰', description: 'Trading strategies and insights.' },
    { id: 105, title: 'Gaming Esports Championship', channel: 'Esports World', views: '3.4M', date: '1 day ago', duration: '240:00', category: 'gaming', thumbnail: '🎮', description: 'Highlights from the championship.' },
    { id: 106, title: 'AI & Machine Learning Deep Dive', channel: 'AI Academy', views: '1.8M', date: '4 days ago', duration: '160:15', category: 'education', thumbnail: '🎓', description: 'Comprehensive ML course.' }
  ]
};

let currentCategory = 'all';
let isLoggedIn = false;
let premiumUnlocked = false;
let currentUser = null;

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  loadVideos();
  checkAdminStatus();
});

// Load Videos
function loadVideos() {
  const freeGrid = document.getElementById('freeVideoGrid');
  const premiumGrid = document.getElementById('premiumVideoGrid');

  if (freeGrid) {
    freeGrid.innerHTML = videoDB.free
      .filter(v => currentCategory === 'all' || v.category === currentCategory)
      .map(v => createVideoCard(v, false))
      .join('');
  }

  if (premiumGrid) {
    premiumGrid.innerHTML = videoDB.premium
      .filter(v => currentCategory === 'all' || v.category === currentCategory)
      .map(v => createVideoCard(v, true))
      .join('');
  }
}

// Create Video Card HTML
function createVideoCard(video, isPremium) {
  const badge = isPremium ? '<div class="badge-premium">⭐ Premium</div>' : '';
  return `
    <div class="video-card" onclick="playVideo(${video.id}, ${isPremium})">
      <div class="thumbnail">
        <div style="width:100%; height:100%; background: linear-gradient(135deg, #1a1a2e, #16213e); display:flex; align-items:center; justify-content:center; font-size:60px;">
          ${video.thumbnail}
        </div>
        ${badge}
        <div class="duration">${video.duration}</div>
        <div class="play-overlay">
          <div class="play-btn">▶</div>
        </div>
      </div>
      <div class="card-body">
        <h3>${video.title}</h3>
        <div class="card-meta">
          <div class="channel-avatar">${video.channel.charAt(0).toUpperCase()}</div>
          <div class="meta-text">
            <span class="channel-name">${video.channel}</span>
            <span class="views-date">${video.views} • ${video.date}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Filter Videos by Category
function filterCategory(category, element) {
  currentCategory = category;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  if (element) element.classList.add('active');
  loadVideos();
}

// Search Videos
function searchVideos(query) {
  const freeGrid = document.getElementById('freeVideoGrid');
  const premiumGrid = document.getElementById('premiumVideoGrid');

  const filtered = (db) => db.filter(v =>
    v.title.toLowerCase().includes(query.toLowerCase()) ||
    v.channel.toLowerCase().includes(query.toLowerCase())
  );

  if (freeGrid) {
    freeGrid.innerHTML = filtered(videoDB.free)
      .map(v => createVideoCard(v, false))
      .join('');
  }
  if (premiumGrid) {
    premiumGrid.innerHTML = filtered(videoDB.premium)
      .map(v => createVideoCard(v, true))
      .join('');
  }
}

// Play Video
function playVideo(videoId, isPremium) {
  const db = isPremium ? videoDB.premium : videoDB.free;
  const video = db.find(v => v.id === videoId);

  if (!video) {
    showToast('Video not found');
    return;
  }

  if (isPremium && !premiumUnlocked && !isLoggedIn) {
    showToast('🔒 Sign in to unlock premium content');
    toggleAuthModal();
    return;
  }

  // Store current video in session
  sessionStorage.setItem('currentVideo', JSON.stringify({...video, isPremium}));
  window.location.href = 'player.html';
}

// Payment Modal Functions
function openPaymentModal() {
  if (premiumUnlocked) {
    showToast('✅ You already have premium access!');
    return;
  }
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.add('active');
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.remove('active');
}

// selectPayment now expects the clicked element as second arg
function selectPayment(method, el) {
  document.querySelectorAll('.payment-option').forEach(p => p.classList.remove('selected'));
  if (!el) return;
  el.classList.add('selected');

  const walletAddr = document.getElementById('walletAddr');
  if (walletAddr) {
    if (method === 'usdt') {
      walletAddr.textContent = 'TCbER7317adzPxTPic5FQjwiVUjMmwtLbQ';
    } else {
      walletAddr.textContent = '13CbEKY8rCg6qTLFWyePKV85G3otYjUNdm';
    }
  }
}

function copyAddress() {
  const addrEl = document.getElementById('walletAddr');
  const addr = addrEl ? addrEl.textContent : '';
  if (!addr) return;
  navigator.clipboard.writeText(addr);
  showToast('📋 Address copied to clipboard!');
}

function submitPayment() {
  const txid = document.getElementById('txidInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();

  if (!txid || !email) {
    showToast('❌ Please fill in all required fields');
    return;
  }

  // Simulate payment processing
  showToast('⏳ Verifying payment...');

  setTimeout(() => {
    premiumUnlocked = true;
    localStorage.setItem('premiumUnlocked', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('lastTxid', txid);

    closePaymentModal();
    showToast('✅ Payment confirmed! Premium unlocked!');
    loadVideos();
  }, 2000);
}

// Auth Modal Functions
function toggleAuthModal() {
  if (isLoggedIn) {
    logout();
  } else {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('active');
  }
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('active');
}

function login() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  if (!user || !pass) {
    showToast('❌ Please enter username and password');
    return;
  }

  if (user === 'admin' && pass === 'admin123') {
    isLoggedIn = true;
    currentUser = user;
    localStorage.setItem('currentUser', user);
    localStorage.setItem('isLoggedIn', 'true');
    const userBtn = document.getElementById('userBtn');
    if (userBtn) userBtn.textContent = '👤 ' + user;
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) adminBtn.style.display = 'flex';
    closeAuthModal();
    showToast('✅ Logged in as admin!');
    loadVideos();
  } else {
    showToast('❌ Invalid credentials. Try admin/admin123');
  }
}

function signUp() {
  showToast('📝 Sign up feature coming soon!');
}

function logout() {
  isLoggedIn = false;
  currentUser = null;
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
  const userBtn = document.getElementById('userBtn');
  if (userBtn) userBtn.textContent = '👤';
  const adminBtn = document.getElementById('adminBtn');
  if (adminBtn) adminBtn.style.display = 'none';
  closeAuthModal();
  showToast('👋 Logged out');
  loadVideos();
}

// Check Admin Status
function checkAdminStatus() {
  const savedUser = localStorage.getItem('currentUser');
  const savedLogin = localStorage.getItem('isLoggedIn');
  const savedPremium = localStorage.getItem('premiumUnlocked');

  if (savedUser && savedLogin === 'true') {
    isLoggedIn = true;
    currentUser = savedUser;
    const userBtn = document.getElementById('userBtn');
    if (userBtn) userBtn.textContent = '👤 ' + savedUser;
    if (savedUser === 'admin') {
      const adminBtn = document.getElementById('adminBtn');
      if (adminBtn) adminBtn.style.display = 'flex';
    }
  }

  if (savedPremium === 'true') {
    premiumUnlocked = true;
  }
}

// Toast Notification
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
