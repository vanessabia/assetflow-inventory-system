const formFuncionario = document.getElementById('form-funcionario');
const selectEquipamento = document.getElementById('equipamento');
const tabelaFuncionarios = document.getElementById('lista-funcionarios');
const editIdInput = document.getElementById('edit-id');

document.addEventListener('DOMContentLoaded', () => {
    carregarEquipamentosDisponiveis();
    exibirFuncionarios();
});

formFuncionario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome-funcionario').value;
    const setor = document.getElementById('setor').value;
    const equipamentoId = selectEquipamento.value;

    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];

    const equipamento = equipamentos.find(e => e.id === equipamentoId);

    if (!equipamento || equipamento.status !== 'Disponível') {
        alert('Equipamento indisponível!');
        return;
    }

    const editId = editIdInput.value;

    if (editId) {
        // MODO EDIÇÃO
        const funcionario = funcionarios.find(f => f.id === editId);

        if (funcionario.equipamentoId) {
            const antigoEquip = equipamentos.find(e => e.id === funcionario.equipamentoId);
            if (antigoEquip) {
                antigoEquip.status = 'Disponível';
                delete antigoEquip.funcionario;
            }
        }

        funcionario.nome = nome;
        funcionario.setor = setor;
        funcionario.equipamentoId = equipamentoId;

    } else {
        // NOVO FUNCIONÁRIO
        const idAuto = gerarIdFuncionario(funcionarios);

        const novoFuncionario = {
            id: idAuto,
            nome,
            setor,
            equipamentoId
        };

        funcionarios.push(novoFuncionario);
    }

    equipamento.status = 'Em uso';
    equipamento.funcionario = nome;

    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));

    formFuncionario.reset();
    editIdInput.value = '';

    carregarEquipamentosDisponiveis();
    exibirFuncionarios();
});

function gerarIdFuncionario(funcionarios) {
    const count = funcionarios.length + 1;
    return `FUNC${String(count).padStart(2, '0')}`;
}

function carregarEquipamentosDisponiveis() {
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    selectEquipamento.innerHTML = '<option value="">Selecione um equipamento</option>';

    equipamentos
        .filter(e => e.status === 'Disponível')
        .forEach(e => {
            selectEquipamento.innerHTML += `
                <option value="${e.id}">
                    ${e.id} - ${e.nome}
                </option>
            `;
        });
}

function exibirFuncionarios() {
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    tabelaFuncionarios.innerHTML = '';

    funcionarios.forEach(f => {
        tabelaFuncionarios.innerHTML += `
            <tr>
                <td>${f.id}</td>
                <td>${f.nome}</td>
                <td>${f.setor}</td>
                <td>${f.equipamentoId || f.equipamento || '-'}</td>
                <td>
                    <button onclick="editarFuncionario('${f.id}')">Editar</button>
                    <button onclick="removerFuncionario('${f.id}')">Remover</button>
                </td>
            </tr>
        `;
    });
}

function editarFuncionario(id) {
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const funcionario = funcionarios.find(f => f.id === id);

    document.getElementById('nome-funcionario').value = funcionario.nome;
    document.getElementById('setor').value = funcionario.setor;

    editIdInput.value = funcionario.id;

    carregarEquipamentosDisponiveis();
}


function removerFuncionario(id) {
    let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    let equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];

    const funcionarioRemovido = funcionarios.find(f => f.id === id);

    // Libera equipamentos desse funcionário
    equipamentos.forEach(eq => {
        if (eq.funcionario === funcionarioRemovido.nome) {
            eq.status = "Disponível";
            delete eq.funcionario;
        }
    });

    // Remove funcionário
    funcionarios = funcionarios.filter(f => f.id !== id);

    // Salva novamente
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    localStorage.setItem("equipamentos", JSON.stringify(equipamentos));

    renderizarFuncionarios();
    renderizarEquipamentos();
}

function sincronizarEquipamentos() {
    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];

    equipamentos.forEach(eq => {
        const estaEmUso = funcionarios.some(f =>
            (f.equipamentoId || f.equipamento) === eq.id
        );

        if (!estaEmUso) {
            eq.status = 'Disponível';
            delete eq.funcionario;
        }
    });

    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
}
