const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5500;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbPath = path.join(__dirname, 'database.json');

// Funções para ler e escrever o "mini banco"
function readDB() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ equipamentos: [], usuarios: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// ================== EQUIPAMENTOS ==================
// Listar equipamentos
app.get('/equipamentos', (req, res) => {
    const db = readDB();
    res.json(db.equipamentos);
});

// Adicionar equipamento
app.post('/equipamentos', (req, res) => {
    const { nome, tipo, serial } = req.body;
    const db = readDB();

    const countTipo = db.equipamentos.filter(e => e.tipo === tipo).length + 1;
    const id = `${tipo}${String(countTipo).padStart(2, '0')}`;

    const novoEquipamento = { id, nome, tipo, serial, status: 'Disponível' };
    db.equipamentos.push(novoEquipamento);
    writeDB(db);

    res.json(novoEquipamento);
});

// Editar equipamento
app.put('/equipamentos/:id', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const equipamento = db.equipamentos.find(e => e.id === id);
    if (!equipamento) return res.status(404).json({ error: 'Equipamento não encontrado' });

    Object.assign(equipamento, req.body);
    writeDB(db);
    res.json(equipamento);
});

// Deletar equipamento
app.delete('/equipamentos/:id', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const equipamento = db.equipamentos.find(e => e.id === id);
    if (!equipamento) return res.status(404).json({ error: 'Equipamento não encontrado' });

    // Se equipamento estiver em uso, libera do funcionário
    const usuario = db.usuarios.find(u => u.equipamentoId === id);
    if (usuario) usuario.equipamentoId = null;

    db.equipamentos = db.equipamentos.filter(e => e.id !== id);
    writeDB(db);
    res.json({ success: true });
});

// ================== USUÁRIOS ==================
// Listar usuários
app.get('/usuarios', (req, res) => {
    const db = readDB();
    res.json(db.usuarios);
});

// Adicionar usuário
app.post('/usuarios', (req, res) => {
    const { nome, setor, equipamentoId } = req.body;
    const db = readDB();

    const idAuto = nextFuncId(db.usuarios);
    const novoUsuario = { id: idAuto, nome, setor, equipamentoId };

    db.usuarios.push(novoUsuario);

    const equip = db.equipamentos.find(e => e.id === equipamentoId);
       if (!equip) return res.status(400).json({ error: "Equipamento não existe" });
       if (equip.status !== "Disponível") {
     return res.status(400).json({ error: "Equipamento indisponível" });
}

equip.status = "Em uso";
equip.funcionario = nome;

    writeDB(db);
    res.json(novoUsuario);
});

function nextFuncId(usuarios) {
  let max = 0;
  for (const u of usuarios) {
    const n = parseInt(String(u.id).replace("FUNC", ""), 10);
    if (!isNaN(n) && n > max) max = n;
  }
  return `FUNC${String(max + 1).padStart(2, "0")}`;
}

// Editar usuário
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const usuario = db.usuarios.find(u => u.id === id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    // Liberar antigo equipamento
    if (usuario.equipamentoId) {
        const antigoEquip = db.equipamentos.find(e => e.id === usuario.equipamentoId);
        if (antigoEquip) {
            antigoEquip.status = 'Disponível';
            delete antigoEquip.funcionario;
        }
    }

    Object.assign(usuario, req.body);

    // Atualizar novo equipamento
    const novoEquip = db.equipamentos.find(e => e.id === usuario.equipamentoId);
    if (novoEquip) {
        novoEquip.status = 'Em uso';
        novoEquip.funcionario = usuario.nome;
    }

    writeDB(db);
    res.json(usuario);
});

// Deletar usuário
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const usuario = db.usuarios.find(u => u.id === id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    // Liberar equipamento
    const equip = db.equipamentos.find(e => e.id === usuario.equipamentoId);
    if (equip) {
        equip.status = 'Disponível';
        delete equip.funcionario;
    }

    db.usuarios = db.usuarios.filter(u => u.id !== id);
    writeDB(db);
    res.json({ success: true });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));