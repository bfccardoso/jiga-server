# Projeto de Servidor Web com Node.js, Express, EJS, Tailwind CSS e SQLite

Este projeto é um servidor web simples, desenvolvido com Node.js e Express para o backend, EJS para as views, Tailwind CSS para o design e SQLite como banco de dados. Ele inclui uma tabela de usuários com as colunas `id`, `nome` e `email`.

## Pré-requisitos

- **Node.js** (v14 ou superior)
- **NPM** (geralmente vem junto com o Node.js)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio

2. **Instale as dependências do projeto:**
   ```bash
   npm install

3. **Configuração do Banco de Dados:**

  - O projeto utiliza um banco SQLite. Após a instalação das dependências, você pode criar o banco executando um script ou o servidor diretamente (ele verificará a existência do banco e criará se necessário).
  - Configuração do caminho do banco de dados: verifique o arquivo config/config.js e ajuste o caminho do banco, se necessário.

## Executando o projeto

1. **Inicie o servidor**
   ```bash
   npm start

   Por padrão, o servidor rodará em http://localhost:3000.

2. **Acesse a aplicação**

  - Abra seu navegador e acesse http://localhost:3000 para ver a aplicação em funcionamento.

## Estrutura do projeto

  - app.js – Ponto de entrada da aplicação, configura o servidor Express.
  - views/ – Diretório contendo as views EJS para renderização do front-end.
  - public/ – Diretório para arquivos estáticos (CSS, JS, imagens).
  - db/ – Contém o arquivo SQLite.
  - config/ – Contém a configuração do banco de dados e variáveis de ambiente.

## Observações

  - Tailwind CSS está configurado de forma básica para otimizar o projeto, com purga de classes não utilizadas.
