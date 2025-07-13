#!/bin/bash

# Harmony UI Deployment Script
# Usage: ./deploy.sh [dev|prod]

set -e

ENVIRONMENT=${1:-dev}
IMAGE_NAME="harmony-ui"
CONTAINER_NAME="harmony-ui"

echo "🚀 Deploying Harmony UI for environment: $ENVIRONMENT"

# Environment'a göre build argümanlarını belirle
if [ "$ENVIRONMENT" = "prod" ]; then
    echo "📦 Building for PRODUCTION..."
    BUILD_ARGS="--build-arg REACT_APP_API_URL=https://user-service-71511467925.europe-west1.run.app/api --build-arg REACT_APP_ENVIRONMENT=production"
    BUILD_SCRIPT="build:prod"
else
    echo "🔧 Building for DEVELOPMENT..."
    BUILD_ARGS="--build-arg REACT_APP_API_URL=http://localhost:8080/api --build-arg REACT_APP_ENVIRONMENT=development"
    BUILD_SCRIPT="build:dev"
fi

# Eski container'ı durdur ve sil
echo "🛑 Stopping old container..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Eski image'ı sil
echo "🗑️ Removing old image..."
docker rmi $IMAGE_NAME 2>/dev/null || true

# Yeni image build et
echo "🔨 Building new Docker image..."
docker build $BUILD_ARGS -t $IMAGE_NAME .

# Container'ı başlat
echo "🚀 Starting new container..."
if [ "$ENVIRONMENT" = "prod" ]; then
    docker run -d --name $CONTAINER_NAME -p 80:8080 $IMAGE_NAME
else
    docker run -d --name $CONTAINER_NAME -p 3000:8080 $IMAGE_NAME
fi

# Health check
echo "🏥 Checking container health..."
sleep 5
if docker ps | grep -q $CONTAINER_NAME; then
    echo "✅ Container is running successfully!"
    if [ "$ENVIRONMENT" = "prod" ]; then
        echo "🌐 Frontend is available at: http://localhost"
    else
        echo "🌐 Frontend is available at: http://localhost:3000"
    fi
else
    echo "❌ Container failed to start!"
    docker logs $CONTAINER_NAME
    exit 1
fi

echo "🎉 Deployment completed successfully!" 