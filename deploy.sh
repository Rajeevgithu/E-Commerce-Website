#!/bin/bash

echo "🚀 Text Tech Enterprises Deployment Script"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if backend .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found. Please create it with:"
    echo "   NODE_ENV=production"
    echo "   PORT=5000"
    echo "   MONGO_URI=your_mongodb_atlas_connection_string"
    echo "   JWT_SECRET=your_jwt_secret_key"
    echo "   FRONTEND_URL=https://your-frontend-domain.vercel.app"
fi

# Check if frontend .env.local exists
if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️  Frontend .env.local file not found. Please create it with:"
    echo "   VITE_API_URL=https://your-backend-url.railway.app"
fi

echo ""
echo "📋 Deployment Checklist:"
echo "1. ✅ Git repository initialized"
echo "2. ⚠️  Backend .env configured"
echo "3. ⚠️  Frontend .env.local configured"
echo "4. ⏳ MongoDB Atlas cluster ready"
echo "5. ⏳ Railway/Render account ready"
echo "6. ⏳ Vercel account ready"
echo ""

echo "🔧 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git remote add origin https://github.com/yourusername/your-repo-name.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy Backend on Railway:"
echo "   - Go to railway.app"
echo "   - Create new project from GitHub"
echo "   - Set root directory to 'backend'"
echo "   - Configure environment variables"
echo ""
echo "3. Deploy Frontend on Vercel:"
echo "   - Go to vercel.com"
echo "   - Import GitHub repository"
echo "   - Set root directory to 'frontend'"
echo "   - Configure environment variables"
echo ""
echo "4. Update CORS settings after getting URLs"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "🎉 Good luck with your deployment!" 