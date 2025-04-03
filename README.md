# GCVAS - Sistema de Gestão para a Secretaria de Assistência Social de Quatiguá

## 📌 Sobre o Projeto
O **GCVAS** é um sistema completo para a Secretaria de Assistência Social de Quatiguá, abrangendo tanto o **backend** quanto o **frontend**. O sistema facilita a gestão dos atendimentos realizados na secretaria, organizando agendamentos, encaminhamentos e cadastros de beneficiários.

## 🎯 Funcionalidades
### 📂 Secretaria
- **Agendamento** de atendimentos.
- **Encaminhamento** de cidadãos para diferentes setores.
- **Histórico de atendimentos** para melhor acompanhamento.
- **CRUDs completos** para gerenciamento de dados.
- **Gestão de filiados** e requisições.

### 👩‍⚕️ Assistente Social
- **Cadastro de benefícios e beneficiários**.
- **Gestão de filiados** e requisições.
- **Geração de relatórios mensais** no formato do **Registro Mensal de Atendimentos (RMA)**.
    - O relatório contabiliza os beneficiários atendidos e a quantidade total de beneficios recebidos pelos mesmos.

- **Organização por tipo de benefício**, incluindo Bolsa Família e outros auxílios sociais.
- **CRUDs completos** para gerenciamento de dados.
### 👥 Outros Usuários da Secretaria
- Acesso a **agendamentos e encaminhamentos** para acompanhamento das demandas.

## 🛠 Tecnologias Utilizadas
O projeto utiliza as seguintes tecnologias principais:

### 🚀 Backend
- **Spring Boot 3.3.3**
- **Java 21**
- **JWT (JSON Web Token)** para autenticação
- **Spring Security**
- **Spring Data JPA** para persistência
- **PostgreSQL** como banco de dados
- **Hibernate Validator** para validação
- **Docker** para containerização

### 🎨 Frontend
- **React** para a interface de usuário
- **Tailwind CSS** para estilização

## 📦 Como Rodar o Projeto
### 🔧 Pré-requisitos
- Docker instalado
- Java 21
- Maven
- Node.js e npm (para o frontend)

### 🚀 Executando o Backend
```sh
# Clone o repositório
git clone https://github.com/ErickGCA/GCVAS.git
cd GCVAS

# Configure o banco de dados no application.properties ou application.yml

# Build do backend
mvn clean install

# Rodar com Docker
docker-compose up -d
```

### 🌐 Executando o Frontend
```sh
cd figmareact
npm install
npm start
```

## 📜 Licença
Este projeto é de uso interno da Secretaria de Assistência Social de Quatiguá.



