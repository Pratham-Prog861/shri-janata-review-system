# Backend API - Review & Discount System

Express.js REST API with MongoDB, JWT authentication, and Google Reviews integration.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create `.env` file in the backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/review-system
JWT_SECRET=your_secure_jwt_secret_min_32_characters
GOOGLE_API_KEY=your_google_api_key_optional
GOOGLE_PLACE_ID=your_google_place_id_optional
NODE_ENV=development
```

**Generate secure JWT secret:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Running the Server

**Development (with auto-reload):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Server will run on: `http://localhost:5000`

---

## 📡 API Endpoints

### Base URL

```bash
http://localhost:5000/api
```

### Authentication

#### Register Admin User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin"
}
```

### Reviews

#### Create Review (Public)

```http
POST /api/reviews
Content-Type: application/json

{
  "name": "John Doe",
  "rating": 5,
  "comment": "Great service!"
}
```

**Response:**

```json
{
  "message": "Review submitted successfully",
  "review": { ... },
  "couponCode": "DISCOUNT10-ABC123",
  "discount": 10
}
```

#### Get Visible Reviews (Public)

```http
GET /api/reviews
```

#### Get All Reviews (Admin)

```http
GET /api/reviews/all
Authorization: Bearer {token}
```

#### Toggle Review Visibility (Admin)

```http
PATCH /api/reviews/:id/toggle
Authorization: Bearer {token}
```

#### Delete Review (Admin)

```http
DELETE /api/reviews/:id
Authorization: Bearer {token}
```

### Offers

#### Get Active Offer (Public)

```http
GET /api/offers/active
```

**Response:**

```json
{
  "discountPercentage": 10,
  "description": "Limited time offer",
  "isActive": true
}
```

#### Create Offer (Admin)

```http
POST /api/offers
Authorization: Bearer {token}
Content-Type: application/json

{
  "discountPercentage": 15,
  "description": "Holiday special"
}
```

#### Get All Offers (Admin)

```http
GET /api/offers
Authorization: Bearer {token}
```

#### Update Offer (Admin)

```http
PUT /api/offers/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "discountPercentage": 20,
  "isActive": true
}
```

#### Delete Offer (Admin)

```http
DELETE /api/offers/:id
Authorization: Bearer {token}
```

### Google Reviews

#### Get Google Reviews (Public)

```http
GET /api/google-reviews
```

**Response:**

```json
{
  "reviews": [
    {
      "author_name": "Jane Smith",
      "rating": 5,
      "text": "Excellent!",
      "relative_time_description": "2 weeks ago"
    }
  ],
  "rating": 4.5
}
```

---

## 🗄️ Database Models

### User Schema

```javascript
{
  username: String (unique, required),
  password: String (hashed, required),
  role: String (default: 'admin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Review Schema

```javascript
{
  name: String (required),
  rating: Number (1-5, required),
  comment: String (required),
  isVisible: Boolean (default: true),
  couponCode: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Offer Schema

```javascript
{
  discountPercentage: Number (0-100, required),
  isActive: Boolean (default: true),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📁 Project Structure

```bash
backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   ├── authController.js        # Authentication logic
│   ├── reviewController.js      # Review CRUD
│   ├── offerController.js       # Offer management
│   └── googleReviewController.js # Google API
├── middleware/
│   └── auth.js                  # JWT verification
├── models/
│   ├── User.js                  # User schema
│   ├── Review.js                # Review schema
│   └── Offer.js                 # Offer schema
├── routes/
│   ├── auth.js                  # Auth routes
│   ├── reviews.js               # Review routes
│   ├── offers.js                # Offer routes
│   └── googleReviews.js         # Google routes
├── .env.example                 # Environment template
├── package.json                 # Dependencies
└── server.js                    # Entry point
```

---

## 🧪 Testing

### Using curl

```bash
# Test review submission
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","rating":5,"comment":"Great!"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Using Postman/Thunder Client

Import the API endpoints and test with sample data.

---

## 🔒 Security

- **Password Hashing**: Bcrypt with 10 rounds
- **JWT Tokens**: 24-hour expiration
- **Input Validation**: express-validator on all endpoints
- **CORS**: Configured for cross-origin requests
- **Environment Variables**: Sensitive data in .env

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```bash
# Ensure MongoDB is running
mongod

# Or use MongoDB Atlas connection string
```

### Port Already in Use

```bash
# Change PORT in .env file
PORT=5001
```

### JWT Token Invalid

- Verify JWT_SECRET is set in .env
- Re-login to get new token
- Check token expiration (24 hours)

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)

---

**For full project documentation, see the main README.md in the root folder.**
