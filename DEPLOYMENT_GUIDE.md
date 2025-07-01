# Deployment Guide

This guide will help you deploy your Text Tech Enterprises application to production.

## Architecture Overview

- **Frontend**: React + Vite (Deploy on Vercel)
- **Backend**: Node.js + Express (Deploy on Railway/Render/Heroku)
- **Database**: MongoDB Atlas (Already configured)

## Prerequisites

1. GitHub account
2. Vercel account
3. Railway/Render/Heroku account
4. MongoDB Atlas cluster

## Step 1: Backend Deployment

### Option A: Railway (Recommended)

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Deploy Backend**
   ```bash
   # In your backend directory
   cd backend
   
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial commit"
   
   # Push to GitHub
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

3. **Connect to Railway**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your backend repository
   - Set the root directory to `backend`

4. **Configure Environment Variables**
   In Railway dashboard, add these environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

5. **Deploy**
   - Railway will automatically deploy your backend
   - Note the generated URL (e.g., `https://your-app.railway.app`)

### Option B: Render

1. **Sign up for Render**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Set root directory: `backend`

3. **Configure Environment Variables**
   Add the same environment variables as above.

## Step 2: Frontend Deployment (Vercel)

1. **Prepare Frontend**
   ```bash
   # In your frontend directory
   cd frontend
   
   # Create .env.local file
   echo "VITE_API_URL=https://your-backend-url.railway.app" > .env.local
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Set build command: `npm run build`
   - Set output directory: `dist`

3. **Configure Environment Variables**
   In Vercel dashboard, add:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

4. **Deploy**
   - Vercel will automatically deploy your frontend
   - You'll get a URL like `https://your-app.vercel.app`

## Step 3: Update Backend CORS

After getting your frontend URL, update the backend CORS configuration:

1. **In Railway/Render dashboard**, update the `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

2. **Redeploy the backend** (should happen automatically)

## Step 4: Test Deployment

1. **Test Backend Health**
   - Visit: `https://your-backend-url.railway.app/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend**
   - Visit your Vercel URL
   - Test all functionality (login, products, etc.)

## Step 5: Custom Domain (Optional)

### Frontend (Vercel)
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS as instructed

### Backend (Railway)
1. In Railway dashboard, go to your service
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS as instructed

## Environment Variables Summary

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend (.env.local)
```env
VITE_API_URL=https://your-backend-url.railway.app
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` is correctly set in backend
   - Check that the frontend URL is in the CORS allowed origins

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check network access settings in MongoDB Atlas

3. **Build Failures**
   - Check build logs in Vercel/Railway
   - Ensure all dependencies are in package.json

4. **API Calls Failing**
   - Verify `VITE_API_URL` is correct in frontend
   - Check backend is running and accessible

### Useful Commands

```bash
# Test backend locally
cd backend
npm start

# Test frontend locally
cd frontend
npm run dev

# Build frontend locally
cd frontend
npm run build
```

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive data to git
   - Use strong JWT secrets
   - Keep MongoDB connection strings secure

2. **CORS**
   - Only allow necessary origins
   - Use HTTPS in production

3. **Database**
   - Enable MongoDB Atlas security features
   - Use strong passwords
   - Enable IP whitelist if needed

## Monitoring

1. **Vercel Analytics**
   - Enable in Vercel dashboard for frontend monitoring

2. **Railway/Render Logs**
   - Monitor backend logs for errors
   - Set up alerts for downtime

3. **MongoDB Atlas**
   - Monitor database performance
   - Set up alerts for connection issues

## Cost Optimization

1. **Vercel**
   - Free tier includes 100GB bandwidth
   - Upgrade only if needed

2. **Railway/Render**
   - Free tiers available
   - Monitor usage to avoid unexpected charges

3. **MongoDB Atlas**
   - Free tier includes 512MB storage
   - Monitor usage and upgrade as needed

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review deployment logs
3. Verify environment variables
4. Test locally first
5. Check platform-specific documentation

## Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure custom domains
3. Set up SSL certificates (usually automatic)
4. Test all functionality thoroughly
5. Set up backup strategies
6. Document deployment procedures for team 