FROM openjdk:17-jdk-slim

# Install curl for health check
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY target/user-service-1.0.0.jar app.jar

EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Start with increased memory and timeout
ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-Dspring.profiles.active=prod", "-jar", "app.jar"] 