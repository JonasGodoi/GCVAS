# Etapa de construção
FROM maven:3.8.4-openjdk-17 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o pom.xml e baixa as dependências
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o código-fonte para o container
COPY src ./src

# Compila o projeto e gera o JAR
RUN mvn clean package -DskipTests

# Etapa de execução
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia o JAR gerado na etapa de build
COPY --from=build /app/target/*.jar /app/app.jar

# Expõe a porta do aplicativo
EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
