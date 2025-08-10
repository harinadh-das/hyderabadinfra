FROM openjdk:17-jre-slim

WORKDIR /app

COPY target/search-service-1.0.0.jar app.jar

EXPOSE 8083

ENTRYPOINT ["java", "-jar", "app.jar"]