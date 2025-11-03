# Google Reviews Integration Setup

This guide will help you set up the Google Reviews integration for your Review & Discount System.

## Features

1. **Google Review Redirect** - Customers with 4-5 star ratings are encouraged to share their review on Google
2. **Display Google Reviews** (Optional) - Fetch and display existing Google reviews on your website

## Required: Google Place ID

The Place ID is **required** for the review redirect feature to work.

### How to Get Your Google Place ID

**Method 1: Place ID Finder Tool**

1. Go to: https://developers.google.com/maps/documentation/places/web-service/place-id
2. Search for your business name
3. Copy the Place ID (looks like: `ChIJN1t_tDeuEmsRUsoyG83frY4`)

**Method 2: Google Maps URL**

1. Find your business on Google Maps
2. Look at the URL - the Place ID is in the URL parameters

### Add to Your Environment Variables

```env
GOOGLE_PLACE_ID=ChIJN1t_tDeuEmsRUsoyG83frY4
```

That's it! The redirect feature will now work.

## Optional: Google API Key (For Fetching Reviews)

Only needed if you want to display existing Google reviews on your website.

### Steps to Get API Key

1. Go to **Google Cloud Console**: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable **Places API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Places API"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key
5. (Recommended) Restrict the key:
   - Click on the key you just created
   - Under "API restrictions", select "Restrict key"
   - Choose "Places API"
   - Save

### Add to Your Environment Variables

```env
GOOGLE_API_KEY=AIzaSyD1234567890abcdefghijklmnop
```

## How It Works

### User Flow

1. Customer submits a review in your app
2. Review is saved to your database
3. Customer receives discount coupon (if active offer exists)
4. **If rating is 4-5 stars**: A "Share on Google Reviews" button appears
5. Clicking the button opens Google's review page in a new tab
6. Customer can easily leave a Google review

### What Gets Tracked

- ✅ Reviews submitted in your app (saved to database)
- ✅ Whether customer clicked "Share on Google" button
- ❌ Whether customer actually posted on Google (not possible to track)

## Deployment Notes

### For Render (Backend)

Add these environment variables in Render dashboard:

- `GOOGLE_PLACE_ID` - Required for redirect feature
- `GOOGLE_API_KEY` - Optional, only for fetching reviews

### For Vercel (Frontend)

No additional configuration needed. The frontend will automatically receive the Google review link from the backend.

## Testing Locally

1. Add your `GOOGLE_PLACE_ID` to `backend/.env`
2. Start your backend: `npm run dev`
3. Submit a 4-5 star review
4. You should see the "Share on Google Reviews" button
5. Click it to test the redirect

## Cost

- **Place ID**: Free, no API key needed
- **Places API** (for fetching reviews): Free tier includes generous limits
  - First request: Free
  - Subsequent requests: Check current pricing at https://cloud.google.com/maps-platform/pricing

## Troubleshooting

**Button doesn't appear:**

- Check that rating is 4 or 5 stars
- Verify `GOOGLE_PLACE_ID` is set in backend environment variables
- Check browser console for errors

**Wrong business opens:**

- Verify your Place ID is correct
- Test the link manually: `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`

**Can't fetch existing reviews:**

- Verify `GOOGLE_API_KEY` is set
- Check that Places API is enabled in Google Cloud Console
- Verify API key restrictions allow Places API
