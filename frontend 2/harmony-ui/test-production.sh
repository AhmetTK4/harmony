#!/bin/bash

# Production Environment Test Script
# Bu script production ortamını test eder

echo "🚀 Production Environment Test"
echo "=============================="

# Production environment dosyasını kontrol et
echo "1. Production environment dosyası:"
if [ -f "env.production" ]; then
    echo "✅ env.production dosyası mevcut"
    echo "   - API URL: $(grep REACT_APP_API_URL env.production | cut -d'=' -f2)"
    echo "   - Environment: $(grep REACT_APP_ENVIRONMENT env.production | cut -d'=' -f2)"
else
    echo "❌ env.production dosyası bulunamadı"
    exit 1
fi

# Production API'yi test et
echo "2. Production API test:"
PROD_API_URL=$(grep REACT_APP_API_URL env.production | cut -d'=' -f2)
echo "   Testing: $PROD_API_URL/health"

HEALTH_RESPONSE=$(curl -s -w "%{http_code}" "$PROD_API_URL/health" -o /dev/null)

if [ "$HEALTH_RESPONSE" = "200" ]; then
    echo "✅ Production API çalışıyor"
else
    echo "❌ Production API hatası: $HEALTH_RESPONSE"
fi

# Production build test
echo "3. Production build test:"
echo "   Production build için şu komutları çalıştırın:"
echo "   cp env.production .env"
echo "   npm run build"
echo "   npx serve -s build -l 3000"

echo ""
echo "🎯 Production test tamamlandı!"
echo "📝 Production ortamında test etmek için:"
echo "   1. env.production dosyasını .env olarak kopyalayın"
echo "   2. npm run build ile production build yapın"
echo "   3. npx serve -s build -l 3000 ile test edin" 