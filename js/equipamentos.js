const form = document.getElementById('form-equipamento');
const tabela = document.getElementById('lista-equipamentos');

document.addEventListener('DOMContentLoaded', exibirEquipamentos);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const serial = document.getElementById('serial').value;
 
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const countTipo = equipamentos.filter(item => item.tipo === tipo).length + 1;
    const codigoAuto = `${tipo}${String(countTipo).padStart(2, '0')}`;

    const novoEquipamento = {
        id: codigoAuto,
        nome: nome,
        tipo: tipo,
        serial: serial,
        status: 'Disponível' 
    };
 
    equipamentos.push(novoEquipamento);
    localStorage.setItem('equipamentos', JSON.stringify(equipamentos));

    form.reset();
    exibirEquipamentos();
});

function exibirEquipamentos() {
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    tabela.innerHTML = '';

    equipamentos.forEach(item => {
        const linha = `
            <tr>
                <td><strong>${item.id}</strong></td>
                <td>${item.name || item.nome}</td>
                <td>${item.tipo}</td>
                <td>${item.serial}</td>
                <td><span class="status-badge">${item.status}</span></td>
            </tr>
        `;
        tabela.innerHTML += linha;
    });
}