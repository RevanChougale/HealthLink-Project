FROM eclipse-temurin:17-jre

WORKDIR /app

COPY doctor-booking/doctor-booking/target/doctor-booking-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
