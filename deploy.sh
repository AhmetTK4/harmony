#!/bin/bash

# Harmony Microservices Deployment Script
# This script deploys the application to Google Cloud

set -e

# Configuration
PROJECT_ID="harmony-microservices"
REGION="us-central1"
USER_SERVICE_NAME="user-service"
FRONTEND_SERVICE_NAME="harmony-ui"

echo "🚀 Starting Harmony deployment to Google Cloud..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first."
    exit 1
fi

# Set project
echo "📋 Setting Google Cloud project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build and deploy User Service
echo "🏗️ Building and deploying User Service..."
cd backend/user-service

# Build Docker image
docker build -t gcr.io/$PROJECT_ID/$USER_SERVICE_NAME:latest .

# Push to Container Registry
docker push gcr.io/$PROJECT_ID/$USER_SERVICE_NAME:latest

# Deploy to Cloud Run
gcloud run deploy $USER_SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$USER_SERVICE_NAME:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars="SPRING_PROFILES_ACTIVE=prod" \
  --memory 512Mi \
  --cpu 1

# Get User Service URL
USER_SERVICE_URL=$(gcloud run services describe $USER_SERVICE_NAME --region=$REGION --format='value(status.url)')
echo "✅ User Service deployed at: $USER_SERVICE_URL"

# Build and deploy Frontend
echo "🏗️ Building and deploying Frontend..."
cd ../../frontend/harmony-ui

# Build Docker image
docker build -t gcr.io/$PROJECT_ID/$FRONTEND_SERVICE_NAME:latest .

# Push to Container Registry
docker push gcr.io/$PROJECT_ID/$FRONTEND_SERVICE_NAME:latest

# Deploy to Cloud Run
gcloud run deploy $FRONTEND_SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$FRONTEND_SERVICE_NAME:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars="REACT_APP_API_URL=$USER_SERVICE_URL" \
  --memory 256Mi \
  --cpu 1

# Get Frontend URL
FRONTEND_URL=$(gcloud run services describe $FRONTEND_SERVICE_NAME --region=$REGION --format='value(status.url)')
echo "✅ Frontend deployed at: $FRONTEND_URL"

echo ""
echo "🎉 Deployment completed successfully!"
echo "📱 Frontend: $FRONTEND_URL"
echo "🔧 Backend API: $USER_SERVICE_URL"
echo ""
echo "🔐 Don't forget to set up your secrets in GitHub:"
echo "   - GCP_SA_KEY: Google Cloud Service Account key"
echo "   - MONGODB_URI: MongoDB connection string"
echo "   - JWT_SECRET: JWT signing secret"
echo "   - REACT_APP_API_URL: Backend API URL" 