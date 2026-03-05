const form = document.getElementById('form-equipamento');
const tabela = document.getElementById('lista-equipamentos');

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

    tabela.innerHTML = '';

    equipamentos.forEach(item => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.tipo}</td>
            <td>${item.serial}</td>
            <td>${item.status}</td>
            <td>
                <button onclick="removerEquipamento('${item.id}')">Remover</button>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

async function removerEquipamento(id) {
    if (!confirm('Deseja realmente remover este equipamento?')) return;

    await fetch(`/equipamentos/${id}`, { method: 'DELETE' });

    exibirEquipamentos();
}