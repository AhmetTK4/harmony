# Harmony - Modern Mikroservis Mimarisi

Harmony, modern teknolojiler kullanarak geliştirilmiş kapsamlı bir mikroservis projesidir.

## 🏗️ Mimari

### Backend Mikroservisler
- **User Service** - Kullanıcı yönetimi ve kimlik doğrulama
- **Product Service** - Ürün katalog yönetimi
- **Order Service** - Sipariş işlemleri
- **Notification Service** - Bildirim yönetimi
- **API Gateway** - Merkezi API yönetimi

### Frontend
- **Harmony UI** - React tabanlı modern web uygulaması

### Infrastructure
- **MongoDB** - Ana veritabanı
- **RabbitMQ** - Mesaj kuyruğu
- **Elasticsearch** - Arama ve log analizi
- **Redis** - Önbellek

## 🛠️ Teknolojiler

### Backend
- Java 17
- Spring Boot 3+
- Spring Cloud
- Spring Security
- Spring Data MongoDB
- Spring AMQP (RabbitMQ)

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Query

### DevOps & Cloud
- Docker & Docker Compose
- Kubernetes
- Google Cloud Platform
- GitHub Actions (CI/CD)
- Terraform

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Java 17+
- Node.js 18+
- Docker & Docker Compose
- Maven

### Yerel Geliştirme
```bash
# Repository'yi klonlayın
git clone https://github.com/AhmetTK4/harmony.git
cd harmony

# Backend servisleri başlatın
cd backend
./start-services.sh

# Frontend'i başlatın
cd frontend/harmony-ui
npm install
npm run dev
```

## 📁 Proje Yapısı

```
harmony/
├── backend/
│   ├── user-service/          # Kullanıcı yönetimi
│   ├── product-service/       # Ürün yönetimi  
│   ├── order-service/         # Sipariş yönetimi
│   ├── notification-service/  # Bildirim servisi
│   └── api-gateway/          # API Gateway
├── frontend/
│   └── harmony-ui/           # React uygulaması
├── infrastructure/
│   ├── docker/               # Docker compose dosyaları
│   ├── kubernetes/           # K8s manifest dosyaları
│   └── terraform/            # GCP infrastructure
├── ci-cd/
│   └── .github/workflows/    # GitHub Actions
├── shared/
│   └── common-lib/           # Ortak kütüphaneler
└── docs/                     # Proje dokümantasyonu
```

## 🔧 Geliştirme

### Backend Geliştirme
Her mikroservis Spring Boot 3+ ile geliştirilmiştir ve kendi Maven projesi olarak yapılandırılmıştır.

### Frontend Geliştirme
React uygulaması modern web standartlarına uygun olarak geliştirilmiştir.

## 🚀 Deployment

### Google Cloud Platform
Proje Google Cloud Platform'da Kubernetes ile deploy edilir.

### CI/CD Pipeline
GitHub Actions ile otomatik build, test ve deployment süreçleri yapılandırılmıştır.

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Proje Sahibi: Ahmet Temel Kundupoğlu
GitHub: [@AhmetTK4](https://github.com/AhmetTK4)