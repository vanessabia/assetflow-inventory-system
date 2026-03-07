# 📦 AssetFlow

Projeto desenvolvido como parte do processo seletivo da **Loopis**, empresa júnior do curso de Análise e Desenvolvimento de Sistemas.

O AssetFlow é um sistema web para controle de inventário corporativo, criado com o objetivo de demonstrar organização de equipe, divisão de responsabilidades, aplicação prática de JavaScript e trabalho colaborativo utilizando GitHub.

O projeto está sendo construído do zero com foco em organização, boas práticas e estruturação adequada desde a fase inicial.

---

## 🌍 Problema que o Projeto Resolve

Em pequenas organizações, o controle de equipamentos frequentemente é realizado por planilhas ou registros informais, o que pode gerar:

* Perda de ativos
* Falta de rastreabilidade
* Dificuldade em auditoria interna
* Desorganização no controle de status

O AssetFlow simula uma solução digital simples e organizada para esse cenário, utilizando uma aplicação web com front-end em JavaScript e um servidor Node.js com Express para gerenciamento e persistência de dados.

---

## 🎯 Objetivo

Desenvolver uma aplicação web que permita:

* Cadastrar equipamentos
* Editar informações de equipamentos
* Gerar código automático por tipo
* Alterar status (Disponível, Em uso, Manutenção)
* Atribuir equipamentos a funcionários
* Buscar equipamentos com filtros dinâmicos
* Exibir estatísticas em dashboard

O sistema utiliza um servidor Node.js com Express para gerenciamento de dados e persistência em arquivo JSON, simulando um banco de dados simples.

---

## 🚧 Status do Projeto

📌 Fase atual: Desenvolvimento funcional dos módulos principais concluído  
📌 Sistema estruturado com front-end e servidor Node.js com Express  
📌 Persistência de dados implementada em arquivo JSON  
📌 Organização do código realizada com GitHub, branches e Pull Requests  
📌 Projeto em fase final de testes, documentação e preparação para apresentação

---

## 🛠 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* Node.js
* Express.js
* JSON (persistência de dados)
* Chart.js
* Git & GitHub

---

## ▶ Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/vanessabia/assetflow-inventory-system.git
```

### 2. Acessar a pasta do projeto

```bash
cd assetflow-inventory-system
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Iniciar o servidor

```bash
node server.js
```

### 5. Acessar no navegador

Após iniciar o servidor, abra no navegador:

http://localhost:5500

O sistema estará disponível com as seguintes funcionalidades:

- Cadastro e gerenciamento de equipamentos
- Cadastro de funcionários
- Atribuição de equipamentos a funcionários
- Atualização automática do status dos equipamentos
- Busca e filtros para localização de ativos
- Dashboard com estatísticas do inventário

---

## 🏗 Estrutura de Pastas

```bash
assetflow-inventory-system/
│
├── server.js
├── database.json
├── package.json
├── package-lock.json
├── .gitignore
│
├── public/
│   ├── html/
│   │   ├── index.html
│   │   ├── equipamentos.html
│   │   ├── funcionarios.html
│   │   └── dashboard.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── equipamentos.js
│   │   ├── funcionarios.js
│   │   ├── filtros.js
│   │   └── dashboard.js
│   │
│   └── img/
│       └── (imagens utilizadas na interface)
│
└── README.md
```

---

## 📌 Descrição dos Arquivos

* `server.js` → Servidor Node.js com Express responsável pela API e gerenciamento dos dados
* `database.json` → Arquivo utilizado para persistência dos dados da aplicação
* `equipamentos.js` → Cadastro, edição e listagem de equipamentos
* `funcionarios.js` → Cadastro de funcionários e atribuição de equipamentos
* `filtros.js` → Busca e filtros dinâmicos
* `dashboard.js` → Estatísticas e integração com Chart.js

---

## 🔄 Organização de Branches (GitHub)

Fluxo de desenvolvimento:

```
feature-* → main
```

### Branches:

* `main` → versão estável
* `feature-layout`
* `feature-equipamentos`
* `feature-funcionarios`
* `feature-filtros`
* `feature-filtros-final`

Cada integrante trabalha em sua própria branch e realiza Pull Request para `main`.

---

## 📋 Regras de Negócio

* Todo equipamento inicia com status **Disponível**
* Equipamentos em uso não podem ser atribuídos novamente
* Equipamentos em manutenção não podem ser atribuídos
* Ao atribuir um equipamento, o status muda automaticamente para **Em uso**
* Ao devolver, o status retorna para **Disponível**
* O dashboard atualiza automaticamente após alterações

---

## 📌 Escopo do Projeto

### Inclui:

* Controle de inventário
* Persistência de dados em arquivo JSON via servidor Node.js
* Cadastro e atribuição de equipamentos
* Dashboard estatístico
* Organização modular do código

### Não inclui:

* Sistema de login
* Controle de permissões
* Banco de dados relacional
* Sistema completo de autenticação

---

## 👥 Organização da Equipe

* Front-end & Layout: **Samuel Marcos**
* Módulo de Equipamentos: **Arthur Ferreira**
* Módulo de Funcionários: **Vanessa Beatriz**
* Busca e Filtros: **Khauê Braga**
* Dashboard & Estatísticas: **Francisco Guilherme**

---

## 🎓 Finalidade

Projeto acadêmico desenvolvido com objetivo de demonstrar:

* Estruturação de sistemas web
* Manipulação de DOM
* Programação em JavaScript
* Organização de código
* Trabalho colaborativo com Git
* Capacidade de planejamento e divisão estratégica de tarefas

---

