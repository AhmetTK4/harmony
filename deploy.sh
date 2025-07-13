#!/bin/bash

# Harmony Microservices Deployment Script
# Deploys all backend services + frontend to Google Cloud Run

set -e

PROJECT_ID="harmony-microservices"
REGION="us-central1"
FRONTEND_SERVICE_NAME="harmony-ui"

echo "🚀 Starting Harmony deployment to Google Cloud..."

if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first."
    exit 1
fi

gcloud config set project $PROJECT_ID

gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

SERVICES=("user-service" "order-service" "product-service" "notification-service" "api-gateway")

for SERVICE in "${SERVICES[@]}"; do
  echo "🚀 Deploying $SERVICE..."
  gcloud builds submit ./backend/$SERVICE --tag gcr.io/$PROJECT_ID/$SERVICE
  gcloud run deploy $SERVICE --image gcr.io/$PROJECT_ID/$SERVICE --platform=managed --region=$REGION --allow-unauthenticated
done

echo "🚀 Deploying Frontend: $FRONTEND_SERVICE_NAME..."
gcloud builds submit ./frontend/harmony-ui --tag gcr.io/$PROJECT_ID/$FRONTEND_SERVICE_NAME
gcloud run deploy $FRONTEND_SERVICE_NAME --image gcr.io/$PROJECT_ID/$FRONTEND_SERVICE_NAME --platform=managed --region=$REGION --allow-unauthenticated

echo "✅ Deployment completed."
