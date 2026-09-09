# Always Play — Video Streaming Platform
## Project Summary

### 📁 Project Structure
```
always-play/
├── index.html          # Home page with video grid
├── player.html           # Video player page
├── css/
│   └── style.css       # Complete styling (Netflix-style dark theme)
├── js/
│   ├── app.js            # Main app logic
│   ├── player.js         # Player page logic
│   └── admin.js          # Admin panel logic
└── admin/
    └── indexnew.html     # Admin dashboard
```

### 🎯 Features Implemented

#### 1. **Home Page (index11.html)**
- Navigation bar with search, notifications, and user menu
- Hero banner with CTA buttons
- Category filter chips (All, Music, Gaming, Education, Tech, Entertainment, Sports, News)
- Free & Premium video grids with dynamic loading
- Footer with links
- Payment modal with crypto payment (USDT + Bitcoin)
- Auth modal for login/signup

#### 2. **Video Player (player.html)**
- Full-screen video player simulation
- Video info with title, views, date
- Like, Share, Playlist, Report buttons
- Channel info with Subscribe button
- Comments section with add comment functionality
- Recommended videos sidebar
- Responsive design

#### 3. **Admin Panel (admin/indexnew.html)**
- 4 main tabs: My Videos, Upload, Analytics, Settings
- **My Videos**: Manage uploaded videos with edit/delete
- **Upload**: Upload new videos with title, description, category, content type
- **Analytics**: View channel stats (views, subscribers, watch time, revenue)
- **Settings**: Configure channel info and crypto wallet addresses

#### 4. **Styling (css/style11.css)**
- Netflix-inspired dark theme
- CSS variables for easy customization
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Dark mode optimized

### 🔐 Authentication System
- **Username**: `*******`
- **Password**: `*********`
- Admin status unlocks the admin panel
- Premium access system with crypto payments

### 💰 Crypto Payment System
- **USDT (TRC20)**: `TCbER7317adzPxTPic5FQjwiVUjMmwtLbQ`
- **Bitcoin**: `13CbEKY8rCg6qTLFWyePKV85G3otYjUNdm`
- Payment amount: $9.99
- TXID verification form for payment confirmation

### 🎥 Sample Videos Database
- **Free Videos**: 6 sample videos across different categories
- **Premium Videos**: 6 exclusive premium videos
- Easy to expand with more videos

### 🚀 How to Use

1. **Open the website**
   - Open `index.html` in your browser

2. **Browse Videos**
   - Filter by category using chips
   - Search for videos using the search bar
   - Free videos are available to everyone

3. **Watch a Video**
   - Click on any video card to go to player
   - Use like, share, subscribe buttons

4. **Access Premium Content**
   - Click "Go Premium" or "⭐ Premium" button
   - Choose payment method (USDT or Bitcoin)
   - Copy wallet address and send payment
   - Enter TXID to confirm payment

5. **Admin Access**
   - Click profile icon (👤)
   - Login with *************
   - Access admin panel via ⚙️ button
   - Upload videos, view analytics, manage settings

### 📱 Responsive Features
- Mobile-friendly design
- Touch-optimized buttons
- Collapsible menu on mobile
- Adaptive grid layout

### 💾 Data Storage
- Uses localStorage for:
  - User login status
  - Premium unlock status
  - User preferences
  - Payment confirmations (TXID)

### 🎨 Customization Tips
- Change colors in `css/style.css` `:root` variables
- Modify video database in `js/app.js` `videoDB` object
- Update wallet addresses in payment modal
- Adjust prices and features as needed

### 📝 Files to Run
1. `index.html` - Main home page
2. `player.html` - Video player (auto-navigated from home)
3. `admin/index.html` - Admin panel (auto-navigated after login)

---

**Created for**: Yash Pal  
**Project**: Always Play - Video Streaming Platform  
**Date**: September 2, 2026  
**Version**: 1.0
