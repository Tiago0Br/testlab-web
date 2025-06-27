# Testlab

<p align="center">
  <strong>Sistema de Gestão de Casos de Teste para Equipes de QA</strong>
</p>

## 📋 Sobre o Projeto

O **Testlab** é uma plataforma completa para gestão de casos de teste de projetos de software, desenvolvida especificamente para equipes de testes e QA. O sistema permite organizar, executar e acompanhar casos de teste de forma eficiente, proporcionando maior controle e visibilidade sobre o processo de qualidade de software.

### ✨ Principais Funcionalidades

- 📝 **Criação e Gestão de Casos de Teste**: Interface intuitiva para criar, editar e organizar casos de teste
- 🗂️ **Organização por Projetos**: Estruture seus testes por projetos e módulos
- ▶️ **Execução de Testes**: Execute casos de teste e registre resultados
- 📊 **Relatórios e Métricas**: Acompanhe o progresso e qualidade dos testes
- 👥 **Colaboração em Equipe**: Trabalhe em equipe com controle de permissões
- 🔍 **Rastreabilidade**: Mantenha histórico completo de execuções

## 🚀 Tecnologias Utilizadas

<div align="center">

| Frontend | Backend | Banco de dados |
|----------|---------|----------|
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) | |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | | |

</div>

### Stack

- **Frontend e Backend**: Next.js 14 com TypeScript para uma experiência moderna e performática
- **Estilização**: TailwindCSS para design responsivo e consistente
- **Banco de dados**: PostgreSQL para armazenamento robusto e confiável
- **ORM**: Prisma para modelagem e queries type-safe

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Configuração do Ambiente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/testlab.git
   cd testlab
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```
   
   Edite o arquivo `.env.local` com suas configurações:
   ```env
    DB_USER="usuário"
    DB_PASSWORD="senha"
    DATABASE_URL="URL de conexão com o banco"
    DIRECT_URL="URL de conexão com o banco"
    JWT_SECRET="hash secreta para geração do token JWT"
   ```

4. **Configure o banco de dados**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Execute o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
testlab/
├── prisma/              # Schema e migrações do banco
├── public/              # Arquivos estáticos
├── src/
│   ├── app/            # App Router (Next.js 13+)
│   ├── components/     # Componentes reutilizáveis
│   ├── lib/           # Utilitários e configurações
├── .env.example       # Exemplo de variáveis de ambiente
└── package.json
```

## 🚀 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linting
npm run format       # Realiza as correções de linting
```

---

Feito com ❤️ por [Tiago Lopes](https://www.tiagolopes.bio/)
