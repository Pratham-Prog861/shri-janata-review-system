# Frontend - Review & Discount System

Modern React application with Tailwind CSS for collecting customer reviews and displaying discount offers.

---

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create `.env` file in the frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

**For production:**

```env
VITE_API_URL=https://your-backend-url.com/api
```

### Running the Application

**Development:**

```bash
npm run dev
```

Application will run on: `http://localhost:5173`

**Build for Production:**

```bash
npm run build
```

**Preview Production Build:**

```bash
npm run preview
```

---

## 🛠 Tech Stack

- **React 19.1** - UI library with hooks
- **React Router 6** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **Axios** - HTTP client
- **QRCode.js** - QR code generation
- **Vite 7** - Build tool and dev server

---

## 📁 Project Structure

```bash
frontend/
├── src/
│   ├── components/              # Reusable components
│   │   ├── ProtectedRoute.jsx  # Auth guard for admin routes
│   │   ├── ReviewForm.jsx      # Review submission form
│   │   ├── ReviewPopup.jsx     # Modal for review submission
│   │   ├── ReviewsList.jsx     # Display list of reviews
│   │   └── StarRating.jsx      # Interactive star rating
│   │
│   ├── pages/                   # Page components
│   │   ├── Home.jsx            # Landing page with QR code
│   │   ├── ReviewsDisplay.jsx  # Public reviews page
│   │   ├── AdminLogin.jsx      # Admin authentication
│   │   └── AdminDashboard.jsx  # Admin panel
│   │
│   ├── config/
│   │   └── api.js              # Axios configuration
│   │
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
│
├── public/                      # Static assets
├── .env.example                 # Environment template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
└── tailwind.config.js          # Tailwind configuration
```

---

## 🎨 Pages Overview

### Home Page (`/`)

- QR code display for easy scanning
- Current discount offer showcase
- "Write a Review" button
- Navigation to reviews and admin panel

### Reviews Display (`/reviews`)

- Public reviews list
- Google reviews integration
- Average rating display
- Real-time updates (30-second polling)

### Admin Login (`/admin/login`)

- JWT-based authentication
- Secure login form
- Redirect to dashboard on success

### Admin Dashboard (`/admin/dashboard`)

- Review management (hide/show/delete)
- Discount offer management
- Tab-based interface
- Protected route (requires authentication)

---

## 🧩 Components

### StarRating

Interactive 5-star rating component with hover effects.

**Props:**

- `rating` - Current rating value (1-5)
- `setRating` - Function to update rating
- `readOnly` - Boolean for display-only mode

### ReviewForm

Form for submitting reviews with validation.

**Features:**

- Name input
- Star rating selector
- Comment textarea
- Form validation
- Loading states

### ReviewPopup

Modal component for review submission.

**Props:**

- `isOpen` - Boolean to control visibility
- `onClose` - Function to close modal

**Features:**

- Auto-opens when `?review=true` in URL
- Success screen with coupon display
- Responsive design

### ReviewsList

Display component for review cards.

**Props:**

- `reviews` - Array of review objects
- `showGoogleBadge` - Boolean to show Google badge

### ProtectedRoute

Authentication guard for admin routes.

**Features:**

- Checks for JWT token in localStorage
- Redirects to login if not authenticated
- Wraps protected components

---

## 🔧 Configuration

### Vite Configuration (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Allow network access
    port: 5173,
  },
});
```

### API Configuration (`src/config/api.js`)

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Auto-attach JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 🎯 Features

### QR Code System

- Automatically generated on home page
- Contains review submission URL with `?review=true`
- Scannable by any QR code reader
- Opens review popup automatically

### Review Submission

- User-friendly form
- Real-time validation
- Star rating (1-5)
- Success confirmation with coupon code

### Admin Panel

- Secure JWT authentication
- Review management dashboard
- Discount offer configuration
- Responsive design

### Real-time Updates

- Reviews auto-refresh every 30 seconds
- No page reload needed
- Efficient polling mechanism

---

## 🧪 Testing

### Test QR Code Functionality

```bash
# Open in browser
http://localhost:5173/?review=true

# Review popup should open automatically
```

### Test on Mobile (Same Network)

1. Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update `.env`: `VITE_API_URL=http://YOUR_IP:5000/api`
3. Restart dev server
4. On mobile: Open `http://YOUR_IP:5173`
5. Scan QR code

### Test Admin Features

1. Navigate to `/admin/login`
2. Login with admin credentials
3. Test review management
4. Test offer creation

---

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS 4 for styling.

**Key Classes Used:**

- `bg-gradient-to-br` - Gradient backgrounds
- `shadow-lg` - Card shadows
- `rounded-lg` - Rounded corners
- `hover:` - Hover effects
- `transition-colors` - Smooth transitions

**Customization:**
Modify `tailwind.config.js` to customize colors, fonts, and spacing.

---

## 📱 Responsive Design

The application is fully responsive:

- **Mobile** (320px+) - Touch-optimized interface
- **Tablet** (768px+) - Optimized layout
- **Desktop** (1024px+) - Full-featured interface

---

## 🔐 Authentication Flow

1. User navigates to `/admin/login`
2. Submits username and password
3. Backend returns JWT token
4. Token stored in localStorage
5. Token auto-attached to API requests
6. Protected routes check for token
7. Logout removes token

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Environment Variables:**
Add `VITE_API_URL` in Vercel dashboard pointing to your backend URL.

### Netlify

```bash
# Build
npm run build

# Deploy dist folder
netlify deploy --prod --dir=dist
```

### Manual Deployment

```bash
# Build
npm run build

# Upload dist/ folder to your hosting provider
```

---

## 🐛 Troubleshooting

### API Connection Error

```bash
Network Error / CORS Error
```

**Solution:**

- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Ensure CORS is enabled in backend

### QR Code Not Working on Mobile

```bash
Cannot access localhost
```

**Solution:**

- Use computer's IP address for local testing
- Or deploy the application for production use

### Build Errors

```bash
Module not found
```

**Solution:**

```bash
rm -rf node_modules
npm install
npm run build
```

### Port Already in Use

```bash
Port 5173 is already in use
```

**Solution:**

- Vite will automatically use next available port (5174, etc.)
- Or specify port in `vite.config.js`

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)

---

## 🎯 Development Tips

1. **Hot Module Replacement (HMR)** - Changes reflect instantly
2. **React DevTools** - Install browser extension for debugging
3. **Tailwind IntelliSense** - VS Code extension for class suggestions
4. **ESLint** - Configured for code quality

---

**For full project documentation, see the main README.md in the root folder.**
