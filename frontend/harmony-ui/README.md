# Harmony Frontend - Kullanım Kılavuzu

## 🚀 Ortam Yapılandırması

Bu proje development ve production ortamları için farklı API URL'leri kullanır:

### Development Ortamı (Local)
- **API URL**: `http://localhost:8080/api`
- **Frontend URL**: `http://localhost:3000`
- **Kullanım**: Local microservices ile test

### Production Ortamı (Google Cloud)
- **API URL**: `https://user-service-71511467925.europe-west1.run.app/api`
- **Frontend URL**: `http://localhost:3000`
- **Kullanım**: Google Cloud Run'daki servislerle

## 🛠️ Kurulum ve Çalıştırma

### Development Ortamı (Önerilen)
```bash
# Docker ile tüm servisleri başlat
cd infrastructure/docker
docker compose up -d

# Frontend otomatik olarak http://localhost:3000'de açılır
# API Gateway http://localhost:8080'de çalışır
```

### Manuel Development
```bash
# Local development için
cd frontend/harmony-ui
cp env.development .env
npm install
npm start
```

### Production Ortamı Test
```bash
# Production build test
cd frontend/harmony-ui
cp env.production .env
npm install
npm run build
npx serve -s build -l 3000
```

## 🔧 Test ve Debug

### Development Ortamı Test
```bash
cd frontend/harmony-ui
./debug-api.sh
```

### Production Ortamı Test
```bash
cd frontend/harmony-ui
./test-production.sh
```

## ✅ Sorun Çözümü

**Problem**: Frontend production API URL'sine istek gönderiyordu
**Çözüm**: 
1. Frontend container'ı yeniden build edildi
2. Environment variable'lar doğru şekilde set edildi
3. Development ortamında localhost:8080/api kullanılıyor
4. Production ortamında Google Cloud API kullanılıyor

**Problem**: Mikroservislerin port mapping'leri yanlıştı
**Çözüm**:
1. Product Service: `8082:8080` (8082 dış port, 8080 iç port)
2. User Service: `8081:8080` (8081 dış port, 8080 iç port)
3. Order Service: `8083:8080` (8083 dış port, 8080 iç port)
4. Notification Service: `8084:8080` (8084 dış port, 8080 iç port)

## 📁 Environment Dosyaları

- `env.development`: Development ortamı için (localhost:8080/api)
- `env.production`: Production ortamı için (Google Cloud API)

## 🎯 Kullanım

1. **Development**: `docker compose up -d` ile tüm servisleri başlat
2. **Frontend**: http://localhost:3000 adresine git
3. **API**: http://localhost:8080/api üzerinden erişim
4. **Eureka**: http://localhost:8761 ile servis durumunu kontrol et

## 🔍 Monitoring

- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8080
- **Eureka Server**: http://localhost:8761
- **MongoDB**: localhost:27017
- **RabbitMQ**: http://localhost:15672 (admin/harmony123)
- **Elasticsearch**: http://localhost:9200
- **Kibana**: http://localhost:5601

## 🚨 Önemli Notlar

- Development ortamında frontend **sadece** local API'yi kullanır
- Production ortamında frontend **sadece** Google Cloud API'yi kullanır
- Environment dosyaları otomatik olarak doğru ortamı seçer
- Kodda hardcoded URL yoktur, her şey environment variable'larla yönetilir
- Tüm mikroservisler container içinde 8080 portunda çalışır
- Dış portlar farklıdır (8081, 8082, 8083, 8084) ama API Gateway üzerinden erişim yapılır

## 🎉 Son Durum

✅ **Tüm servisler çalışıyor:**
- Frontend (3000) ✅
- API Gateway (8080) ✅
- Eureka Server (8761) ✅
- User Service (8081:8080) ✅
- Product Service (8082:8080) ✅
- Order Service (8083:8080) ✅
- Notification Service (8084:8080) ✅
- MongoDB, RabbitMQ, Redis, Elasticsearch, Kibana ✅

✅ **API çağrıları doğru çalışıyor:**
- Frontend → API Gateway → Mikroservisler
- CORS ayarları doğru
- Port mapping'ler düzeltildi