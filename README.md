# Ladies-of-Wisdom

## 🚀 Tecnologias Utilizadas
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)  
**Frontend** - React.js  
**Backend** - Node.js  
**Banco de dados** - MongoDB  
**Hospedagem** - Vercel (frontend) Railway (backend)

## 📌 Funcionalidades
### Para administradoras
- Cadastro de usuárias 
- Login
- Publicação de conteúdos para estudo
- Publicação de propostas de redação
- Correção das redações enviadas pelas usuárias

### Para usuárias
- Login
- Visualização dos conteúdos
- Envio de redações sobre os temas propostos

## 📌 Deploy
Acesse a aplicação online:  
- Frontend: [Ladies of Wisdom - Vercel](https://ladies-of-wisdom.vercel.app/)
- Backend : [API - Railway](https://ladies-of-wisdom-production.up.railway.app/)

## 🛠 Como Rodar o Projeto Localmente

### ✅ Pré-requisitos  
Antes de começar, você precisará ter instalado em sua máquina:  
- [Node.js](https://nodejs.org/)  
- [Git](https://git-scm.com/)  
- Gerenciador de pacotes: [npm](https://www.npmjs.com/) 

### 📥 1. Clone o Repositório  
Abra o terminal e execute:  
```sh
git clone https://github.com/llamari/Ladies-of-Wisdom.git
cd Ladies-of-Wisdom
```

### 📦 2. Instale as Dependências
#### Frontend
```sh
cd frontend
npm install
```
#### Backend
```sh
cd ../backend
npm install
```

### 🔧 3. Configure as Variáveis de Ambiente
Crie um arquivo .env na pasta backend e preencha os valores corretos para conectar ao MongoDB e definir a porta:
```sh
MONGO_URI=seu_mongodb_uri
PORT=5000
```

### ▶️ 4. Rodando o Projeto
#### Inicie o backend:
```sh
cd backend
npm start
```
#### Inicie o frontend:
Abra outro terminal e execute:
```sh
cd frontend
npm start
```
O frontend estará disponível em http://localhost:3000 e o backend em http://localhost:5000 (ou a porta configurada).

## 🛠 Contribuição
Este repositório é público apenas para fins de portfólio, e não aceita contribuições externas.  
Caso tenha alguma sugestão ou encontre um problema, sinta-se à vontade para abrir uma issue.
