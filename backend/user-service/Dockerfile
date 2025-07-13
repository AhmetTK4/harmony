FROM openjdk:17-jdk-slim

# Install curl for health check
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY target/user-service-1.0.0.jar app.jar

EXPOSE 8080

# Health check with longer timeout
HEALTHCHECK --interval=30s --timeout=30s --start-period=180s --retries=5 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Start with optimized JVM settings for Cloud Run
ENTRYPOINT ["java", "-Xmx768m", "-Xms512m", "-XX:+UseG1GC", "-XX:MaxGCPauseMillis=200", "-Dspring.profiles.active=prod", "-jar", "app.jar"] 