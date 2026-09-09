/* ========================================
   Always Play — Admin Panel Logic
   ======================================== */

function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });

  // Remove active class from all tabs
  document.querySelectorAll('.admin-tab').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  const tabId = tabName + 'Tab';
  if (document.getElementById(tabId)) {
    document.getElementById(tabId).style.display = 'block';
  }

  // Add active class to clicked button
  event.target.classList.add('active');
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    showToast('📹 File selected: ' + file.name);
    console.log('File uploaded:', file);
  }
}

function submitVideo() {
  const title = document.getElementById('videoTitle').value.trim();
  const desc = document.getElementById('videoDesc').value.trim();
  const category = document.getElementById('videoCategory').value;
  const contentType = document.getElementById('contentType').value;

  if (!title || category === 'Select a category' || contentType === 'Select visibility') {
    showToast('❌ Please fill in all required fields');
    return;
  }

  showToast('⏳ Uploading video...');

  setTimeout(() => {
    showToast('✅ Video uploaded successfully!');
    document.getElementById('videoTitle').value = '';
    document.getElementById('videoDesc').value = '';
    document.getElementById('videoCategory').value = 'Select a category';
    document.getElementById('contentType').value = 'Select visibility';
  }, 2000);
}

function editVideo(btn) {
  const videoItem = btn.closest('.admin-video-item');
  const title = videoItem.querySelector('h4').textContent;
  showToast('✏️ Editing: ' + title);
}

function deleteVideo(btn) {
  const videoItem = btn.closest('.admin-video-item');
  const title = videoItem.querySelector('h4').textContent;

  if (confirm('Are you sure you want to delete: ' + title + '?')) {
    videoItem.style.opacity = '0.5';
    showToast('🗑️ Deleting video...');

    setTimeout(() => {
      videoItem.remove();
      showToast('✅ Video deleted');
    }, 1000);
  }
}

function saveSettings() {
  showToast('💾 Saving settings...');

  setTimeout(() => {
    showToast('✅ Settings saved successfully!');
  }, 1000);
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    showToast('👋 Logged out. Redirecting...');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const currentUser = localStorage.getItem('currentUser');

  if (!isLoggedIn || currentUser !== 'admin') {
    showToast('🔒 Admin access required');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }
});
