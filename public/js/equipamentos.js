window.listaEquipamentos = [];
window.listaUsuarios = [];
let idEquipamentoEmEdicao = null; // Guarda o ID de quem estamos editando

const form = document.getElementById('form-equipamento');
const tabela = document.getElementById('lista-equipamentos');
const badgeCount = document.getElementById('badge-count');

document.addEventListener('DOMContentLoaded', exibirEquipamentos);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const serial = document.getElementById('serial').value;

    await fetch('/equipamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, tipo, serial })
    });

    form.reset();
    exibirEquipamentos();
});

window.atualizarTabela = function(equipamentos) {
    if (badgeCount) {
        atualizarBadgeCount(equipamentos.length);
    }
    tabela.innerHTML = '';

    equipamentos.forEach(item => {
        const usuario = window.listaUsuarios.find(u => u.equipamentoId === item.id);
        const nomeFuncionario = usuario ? usuario.nome : '-';

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.tipo}</td>
            <td>${item.serial}</td>
            <td>
                <span class="status ${item.status === 'Disponível' ? 'disponivel' : item.status === 'Em uso' ? 'emuso' : 'manutencao'}">
                    ${item.status}
                </span>
            </td>
            <td>${nomeFuncionario}</td>
            <td>
                <button class="btn-edit" onclick="abrirModalStatus('${item.id}')">Status</button>
                <button class="btn-delete" onclick="removerEquipamento('${item.id}')">Remover</button>
            </td>
        `;
        tabela.appendChild(linha);
    });
};

async function exibirEquipamentos() {
    try {
        const resEq = await fetch('/equipamentos');
        window.listaEquipamentos = await resEq.json();
        const resUs = await fetch('/usuarios');
        window.listaUsuarios = resUs.ok ? await resUs.json() : [];
        window.atualizarTabela(window.listaEquipamentos);
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}

// --- LÓGICA DO MODAL (Khauê) ---

function abrirModalStatus(id) {
    idEquipamentoEmEdicao = id;
    document.getElementById('modal-status').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-status').style.display = 'none';
    idEquipamentoEmEdicao = null;
}

async function confirmarTrocaStatus(novoStatus) {
    if (!idEquipamentoEmEdicao) return;

    try {
        const response = await fetch(`/equipamentos/${idEquipamentoEmEdicao}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: novoStatus })
        });

        if (response.ok) {
            fecharModal();
            exibirEquipamentos();
        }
    } catch (erro) {
        console.error("Erro ao atualizar status:", erro);
    }
}

function atualizarBadgeCount(total) {
    if (!badgeCount) return;
    badgeCount.textContent = `${total} ativo${total !== 1 ? 's' : ''} cadastrado${total !== 1 ? 's' : ''}`;
}

async function removerEquipamento(id) {
    if (!confirm('Deseja realmente remover este equipamento?')) return;
    await fetch(`/equipamentos/${id}`, { method: 'DELETE' });
    exibirEquipamentos();
}