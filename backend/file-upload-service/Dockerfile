FROM openjdk:17-jre-slim

WORKDIR /app

COPY target/file-upload-service-1.0.0.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "app.jar"]