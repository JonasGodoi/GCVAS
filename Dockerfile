# ---------- BUILD ----------
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copia somente o pom primeiro para cache de deps
COPY Back/pom.xml ./pom.xml
RUN mvn -B -q -DskipTests dependency:go-offline

# copia o código-fonte
COPY Back/src ./src

# Build do JAR
RUN mvn -B clean package -DskipTests

# ---------- RUNTIME ----------
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copia o JAR gerado
COPY --from=build /app/target/*.jar /app/app.jar

# Ajustes de memória para plano Free
ENV JAVA_TOOL_OPTIONS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:InitialRAMPercentage=50.0"

# Usa a porta que o Render injeta
ENTRYPOINT ["sh","-c","java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]

EXPOSE 8080
