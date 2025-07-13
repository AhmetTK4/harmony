#!/bin/bash

# Frontend API Debug Script
# Bu script frontend'den API Gateway'e bağlantıyı test eder

echo "🔍 Frontend API Debug Test"
echo "=========================="

# Frontend container'ının çalışıp çalışmadığını kontrol et
echo "1. Frontend container durumu:"
if docker ps | grep -q harmony-ui; then
    echo "✅ Frontend container çalışıyor"
else
    echo "❌ Frontend container çalışmıyor"
    exit 1
fi

# API Gateway'in çalışıp çalışmadığını kontrol et
echo "2. API Gateway durumu:"
if curl -s http://localhost:8080/actuator/health > /dev/null; then
    echo "✅ API Gateway çalışıyor"
else
    echo "❌ API Gateway çalışmıyor"
    exit 1
fi

# CORS test
echo "3. CORS test:"
CORS_RESPONSE=$(curl -s -X OPTIONS http://localhost:8080/api/users/register \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -w "%{http_code}")

if [[ $CORS_RESPONSE == *"200"* ]]; then
    echo "✅ CORS çalışıyor"
else
    echo "❌ CORS hatası: $CORS_RESPONSE"
fi

# API test
echo "4. API test:"
API_RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"username":"debugtest","email":"debug@test.com","password":"password123","firstName":"Debug","lastName":"Test"}' \
  -w "%{http_code}")

if [[ $API_RESPONSE == *"200"* ]] || [[ $API_RESPONSE == *"409"* ]]; then
    echo "✅ API çağrısı başarılı"
    echo "📄 Response: $API_RESPONSE"
else
    echo "❌ API çağrısı başarısız: $API_RESPONSE"
fi

# Authentication test
echo "5. Authentication test:"
echo "   Test kullanıcısı oluşturuluyor..."
TEST_USER_RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"authtest","email":"authtest@example.com","password":"password123","firstName":"Auth","lastName":"Test"}')

if [[ $TEST_USER_RESPONSE == *"id"* ]]; then
    echo "✅ Test kullanıcısı oluşturuldu"
    
    echo "   Login yapılıyor..."
    LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/login \
      -H "Content-Type: application/json" \
      -d '{"email":"authtest@example.com","password":"password123"}')
    
    if [[ $LOGIN_RESPONSE == *"token"* ]]; then
        echo "✅ Login başarılı"
        
        # Token'ı çıkar
        TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
        
        echo "   Authenticated API test:"
        AUTH_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/users | wc -c)
        
        if [ $AUTH_RESPONSE -gt 10 ]; then
            echo "✅ Authenticated API çağrısı başarılı"
        else
            echo "❌ Authenticated API çağrısı başarısız"
        fi
    else
        echo "❌ Login başarısız: $LOGIN_RESPONSE"
    fi
else
    echo "❌ Test kullanıcısı oluşturulamadı: $TEST_USER_RESPONSE"
fi

# Frontend build bilgileri
echo "6. Frontend build bilgileri:"
echo "   - Container: $(docker ps | grep harmony-ui | awk '{print $1}')"
echo "   - Port: $(docker ps | grep harmony-ui | awk '{print $12}')"
echo "   - API URL: $(docker exec harmony-ui grep -o 'http://localhost:8080/api' /usr/share/nginx/html/static/js/main.*.js | head -1 2>/dev/null || echo "API URL bulunamadı")"

echo ""
echo "🎯 Test tamamlandı!"
echo "📝 Tarayıcıda http://localhost:3000 adresine gidip login olun."
echo "🔧 Sorun devam ederse tarayıcının Developer Tools > Network sekmesini kontrol edin."
echo "💡 Test kullanıcısı: authtest@example.com / password123" 