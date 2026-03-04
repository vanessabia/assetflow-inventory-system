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

O AssetFlow simula uma solução digital simples e organizada para esse cenário, utilizando apenas tecnologias front-end.

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

O sistema será totalmente front-end, utilizando armazenamento local via LocalStorage.

---

## 🚧 Status do Projeto

📌 Fase atual: Planejamento e estruturação inicial
📌 Desenvolvimento iniciado do zero
📌 Organização via GitHub com branches por funcionalidade
📌 Metodologia baseada em divisão modular de responsabilidades

---

## 🛠 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* LocalStorage
* Chart.js
* Git & GitHub

---

## 🏗 Estrutura de Pastas

```bash
AssetFlow/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── data.js
│   ├── equipamentos.js
│   ├── funcionarios.js
│   ├── filtros.js
│   ├── dashboard.js
│   └── main.js
│
└── README.md
```

---

## 📌 Descrição dos Arquivos

* `data.js` → Funções de acesso e persistência no LocalStorage
* `equipamentos.js` → Cadastro, geração de código, edição e listagem
* `funcionarios.js` → Cadastro e atribuição de equipamentos
* `filtros.js` → Busca e filtros dinâmicos
* `dashboard.js` → Estatísticas e integração com Chart.js
* `main.js` → Inicialização e organização geral do sistema

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
* `feature-dashboard`

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
* Armazenamento local
* Dashboard estatístico
* Interface responsiva
* Organização modular do código

### Não inclui:

* Sistema de login
* Controle de permissões
* Backend externo
* Banco de dados real

---

## 👥 Organização da Equipe

* Front-end & Layout: ____________________
* Módulo de Equipamentos: ____________________
* Módulo de Funcionários: ____________________
* Busca e Filtros: **Khauê Braga**
* Dashboard & Estatísticas: ____________________

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

