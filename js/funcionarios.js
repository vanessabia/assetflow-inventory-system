const formFuncionario = document.getElementById('form-funcionario');
const selectEquipamento = document.getElementById('equipamento');
const tabelaFuncionarios = document.getElementById('lista-funcionarios');

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

    // Criar funcionário
    const novoFuncionario = {
        id: Date.now(),
        nome,
        setor,
        equipamento: equipamento.id
    };

    funcionarios.push(novoFuncionario);

    // Atualizar equipamento
    equipamento.status = 'Em uso';
    equipamento.funcionario = nome;

    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));

    formFuncionario.reset();
    carregarEquipamentosDisponiveis();
    exibirFuncionarios();
});


function carregarEquipamentosDisponiveis() {
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    selectEquipamento.innerHTML = '';

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
                <td>${f.nome}</td>
                <td>${f.setor}</td>
                <td>${f.equipamento}</td>
            </tr>
        `;
    });
}


function contarEquipamentosEmUso() {
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    return equipamentos.filter(e => e.status === 'Em uso').length;
}


function contarEquipamentosDisponiveis() {
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    return equipamentos.filter(e => e.status === 'Disponível').length;
}


function contarTotalEquipamentos() {
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    return equipamentos.length;
}


