# Harmony UI - Frontend Application

Harmony mikroservis mimarisinin frontend uygulaması.

## 🚀 Hızlı Başlangıç

### Development Ortamı

```bash
# Development için frontend'i başlat
./deploy.sh dev

# Frontend http://localhost:3000 adresinde erişilebilir
```

### Production Ortamı

```bash
# Production için frontend'i başlat
./deploy.sh prod

# Frontend http://localhost adresinde erişilebilir
```

## 🔧 Environment Konfigürasyonu

### Development
- **API URL**: `http://localhost:8080/api`
- **Port**: 3000
- **Environment**: development

### Production
- **API URL**: `https://user-service-71511467925.europe-west1.run.app/api`
- **Port**: 80
- **Environment**: production

## 📁 Dosya Yapısı

```
harmony-ui/
├── src/
│   ├── services/
│   │   └── api.js          # API servis konfigürasyonu
│   ├── components/         # React bileşenleri
│   ├── pages/             # Sayfa bileşenleri
│   └── contexts/          # React context'leri
├── env.development        # Development environment variables
├── env.production         # Production environment variables
├── deploy.sh              # Deployment script
└── Dockerfile             # Docker konfigürasyonu
```

## 🔄 API Konfigürasyonu

API servisi otomatik olarak environment'a göre doğru URL'i seçer:

```javascript
// Environment'a göre API URL'ini belirle
const getApiBaseUrl = () => {
  // Production'da environment variable kullan
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Development'ta localhost kullan
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8080/api';
  }
  
  // Fallback olarak production URL'i kullan
  return 'https://user-service-71511467925.europe-west1.run.app/api';
};
```

## 🐳 Docker Kullanımı

### Build

```bash
# Development build
docker build --build-arg REACT_APP_API_URL=http://localhost:8080/api --build-arg REACT_APP_ENVIRONMENT=development -t harmony-ui .

# Production build
docker build --build-arg REACT_APP_API_URL=https://user-service-71511467925.europe-west1.run.app/api --build-arg REACT_APP_ENVIRONMENT=production -t harmony-ui .
```

### Run

```bash
# Development
docker run -d --name harmony-ui -p 3000:8080 harmony-ui

# Production
docker run -d --name harmony-ui -p 80:8080 harmony-ui
```

## 🧪 Test

Frontend'den register işlemini test etmek için:

1. http://localhost:3000 (development) veya http://localhost (production) adresine git
2. Register sayfasına git
3. Formu doldur ve kayıt ol

## 🔍 Troubleshooting

### "Registration failed" Hatası

1. Backend servislerinin çalıştığından emin ol:
   ```bash
   curl http://localhost:8080/actuator/health
   ```

2. API Gateway'in çalıştığını kontrol et:
   ```bash
   curl http://localhost:8080/api/users/register -X POST -H "Content-Type: application/json" -d '{"username":"test","email":"test@test.com","password":"password","firstName":"Test","lastName":"User"}'
   ```

3. Frontend'in doğru environment'da build edildiğini kontrol et:
   ```bash
   docker logs harmony-ui
   ```

### CORS Hatası

Frontend ve backend farklı portlarda çalışıyorsa CORS hatası alabilirsiniz. Bu durumda API Gateway'de CORS konfigürasyonu yapılması gerekebilir.

## 📝 Notlar

- Frontend React ile geliştirilmiştir
- Tailwind CSS kullanılmaktadır
- API Gateway üzerinden backend servislerine bağlanır
- Environment variable'lar build sırasında inject edilir 