/* ========================================
   Always Play — Video Player Logic (fixed)
   ======================================== */

let currentVideo = null;
let isLiked = false;
let isSubscribed = false;

document.addEventListener('DOMContentLoaded', function() {
  loadVideoFromSession();
  checkUserStatus();
});

function loadVideoFromSession() {
  const videoData = sessionStorage.getItem('currentVideo');
  if (videoData) {
    currentVideo = JSON.parse(videoData);
    displayVideo();
  } else {
    showToast('No video selected');
  }
}

function displayVideo() {
  if (!currentVideo) return;

  // Set video source if provided
  if (currentVideo.videoUrl) {
    const videoSource = document.getElementById('videoSource');
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoSource) videoSource.src = currentVideo.videoUrl;
    if (videoPlayer) videoPlayer.load();
  }

  const elPlayerTitle = document.getElementById('playerTitle');
  const elPlayerViews = document.getElementById('playerViews');
  const elChannelName = document.getElementById('channelName');
  const elVideoDescription = document.getElementById('videoDescription');
  const elVideoEmoji = document.getElementById('videoEmoji'); // optional
  const elChannelAvatar = document.getElementById('channelAvatar');

  if (elPlayerTitle) elPlayerTitle.textContent = currentVideo.title || '';
  if (elPlayerViews) elPlayerViews.textContent = (currentVideo.views ? currentVideo.views + ' views • ' : '') + (currentVideo.date || '');
  if (elChannelName) elChannelName.textContent = currentVideo.channel || '';
  if (elVideoDescription) elVideoDescription.textContent = currentVideo.description || '';
  if (elVideoEmoji) elVideoEmoji.textContent = currentVideo.thumbnail || '';
  if (elChannelAvatar && currentVideo.channel) elChannelAvatar.textContent = currentVideo.channel.charAt(0).toUpperCase();
}

function toggleLike(btn) {
  isLiked = !isLiked;
  if (isLiked) {
    btn.classList.add('liked');
    showToast('👍 Added to liked videos');
  } else {
    btn.classList.remove('liked');
  }
}

function toggleSubscribe(btn) {
  isSubscribed = !isSubscribed;
  if (isSubscribed) {
    btn.classList.add('subscribed');
    btn.textContent = '✅ Subscribed';
    showToast('🔔 Subscribed to ' + (currentVideo ? currentVideo.channel : ''));
  } else {
    btn.classList.remove('subscribed');
    btn.textContent = '🔔 Subscribe';
  }
}

function shareVideo() {
  const url = window.location.href;
  if (navigator.share && currentVideo) {
    navigator.share({
      title: currentVideo.title,
      text: 'Check out this video on Always Play',
      url: url
    }).catch(() => {
      navigator.clipboard.writeText(url);
      showToast('📤 Link copied to clipboard');
    });
  } else {
    navigator.clipboard.writeText(url);
    showToast('📤 Link copied to clipboard');
  }
}

function addToPlaylist() {
  showToast('➕ Added to My Playlist');
}

function reportVideo() {
  showToast('🚩 Video reported. Thank you!');
}

function handleCommentSubmit(e) {
  if (e.key === 'Enter' && e.target.value.trim()) {
    const comment = e.target.value;
    addComment(comment);
    e.target.value = '';
  }
}

function addComment(text) {
  const commentsList = document.getElementById('commentsList');
  if (!commentsList) return;
  const newComment = document.createElement('div');
  newComment.className = 'comment';
  newComment.innerHTML = `
    <div class="avatar-small">👤</div>
    <div class="comment-body">
      <div class="comment-author">You</div>
      <div class="comment-time">just now</div>
      <div class="comment-text">${text}</div>
    </div>
  `;
  commentsList.insertBefore(newComment, commentsList.firstChild);
  showToast('💬 Comment posted!');
}

function playRandomVideo() {
  showToast('▶ Playing next video...');
  setTimeout(() => {
    window.location.href = 'player.html';
  }, 800);
}

function checkUserStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const currentUser = localStorage.getItem('currentUser');
  if (isLoggedIn && currentUser) {
    const userBtn = document.getElementById('userBtn2');
    if (userBtn) userBtn.textContent = '👤 ' + currentUser;
    if (currentUser === 'admin') {
      const adminBtn = document.getElementById('adminBtn2');
      if (adminBtn) adminBtn.style.display = 'flex';
    }
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
