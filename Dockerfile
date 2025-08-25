# ---------- BUILD ----------
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# cache de deps
COPY Back/pom.xml ./pom.xml
RUN mvn -B -q -DskipTests dependency:go-offline

# código
COPY Back/src ./src

# build
RUN mvn -B clean package -DskipTests

# ---------- RUNTIME ----------
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

COPY --from=build /app/target/*.jar /app/app.jar

# memória p/ tier Free
ENV JAVA_TOOL_OPTIONS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:InitialRAMPercentage=50.0"

# porta do Render
ENTRYPOINT ["sh","-c","java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]

EXPOSE 8080
