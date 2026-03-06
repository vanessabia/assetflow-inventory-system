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

async function exibirEquipamentos() {
    const res = await fetch('/equipamentos');
    const equipamentos = await res.json();

    atualizarBadgeCount(equipamentos.length);

    tabela.innerHTML = '';

    equipamentos.forEach(item => {
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
            <td>
                <button class="btn-delete" onclick="removerEquipamento('${item.id}')">Remover</button>
            </td>
        `;
        tabela.appendChild(linha);
    });
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