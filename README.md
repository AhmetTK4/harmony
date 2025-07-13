# Harmony Microservices Platform

A modern microservices platform built with Spring Boot, React, and MongoDB, deployed on Google Cloud Platform.

## 🏗️ Architecture

- **Backend**: Spring Boot 3.2.0 + Java 17
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Google Cloud Run
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Java 17+
- Node.js 18+
- Docker
- Google Cloud CLI
- MongoDB (local or Atlas)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/harmony.git
   cd harmony
   ```

2. **Start MongoDB**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

3. **Start Backend**
   ```bash
   cd backend/user-service
   mvn spring-boot:run
   ```

4. **Start Frontend**
   ```bash
   cd frontend/harmony-ui
   npm install
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8081

## ☁️ Google Cloud Deployment

### 1. Setup Google Cloud Project

```bash
# Create new project
gcloud projects create harmony-microservices

# Set project
gcloud config set project harmony-microservices

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 2. Create Service Account

```bash
# Create service account
gcloud iam service-accounts create harmony-deployer \
  --display-name="Harmony Deployer"

# Grant necessary permissions
gcloud projects add-iam-policy-binding harmony-microservices \
  --member="serviceAccount:harmony-deployer@harmony-microservices.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding harmony-microservices \
  --member="serviceAccount:harmony-deployer@harmony-microservices.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

# Create and download key
gcloud iam service-accounts keys create ~/harmony-key.json \
  --iam-account=harmony-deployer@harmony-microservices.iam.gserviceaccount.com
```

### 3. Setup GitHub Secrets

Add these secrets to your GitHub repository:

- `GCP_SA_KEY`: Content of `~/harmony-key.json`
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `REACT_APP_API_URL`: Will be set automatically by CI/CD

### 4. Deploy

#### Option A: Manual Deployment
```bash
./deploy.sh
```

#### Option B: Automated CI/CD
Push to `main` branch and GitHub Actions will automatically deploy.

## 📁 Project Structure

```
harmony/
├── backend/
│   ├── user-service/          # User management microservice
│   └── product-service/       # Product management microservice
├── frontend/
│   └── harmony-ui/           # React frontend application
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # GitHub Actions CI/CD pipeline
├── deploy.sh                 # Manual deployment script
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Backend (User Service)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `SPRING_PROFILES_ACTIVE`: Active profile (dev/prod)

#### Frontend
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_ENVIRONMENT`: Environment (development/production)

### Production Settings

The application uses different configurations for production:

- **Backend**: `application-prod.yml`
- **Frontend**: `env.production`
- **Docker**: Multi-stage builds for optimization

## 🔐 Security

- JWT-based authentication
- CORS configured for production
- Environment variables for sensitive data
- HTTPS enforced in production

## 📊 Monitoring

- Health check endpoints: `/actuator/health`
- Metrics: `/actuator/metrics`
- Application info: `/actuator/info`

## 🧪 Testing

```bash
# Backend tests
cd backend/user-service
mvn test

# Frontend tests
cd frontend/harmony-ui
npm test
```

## 🔄 CI/CD Pipeline

The GitHub Actions pipeline includes:

1. **Test**: Run unit tests for backend and frontend
2. **Build**: Create production builds
3. **Deploy**: Deploy to Google Cloud Run
4. **Notify**: Report deployment status

## 📈 Scaling

- **Google Cloud Run**: Auto-scales based on traffic
- **MongoDB Atlas**: Managed database with auto-scaling
- **Load Balancing**: Cloud Run handles traffic distribution

## 🛠️ Development

### Adding New Services

1. Create new Spring Boot service in `backend/`
2. Add to CI/CD pipeline
3. Update deployment script
4. Add service discovery configuration

### Frontend Development

```bash
cd frontend/harmony-ui
npm install
npm start
```

### Backend Development

```bash
cd backend/user-service
mvn spring-boot:run
```

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review the logs in Google Cloud Console

## 📄 License

This project is licensed under the MIT License.