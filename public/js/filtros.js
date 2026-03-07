const campoBusca = document.getElementById("busca");
const filtroStatus = document.getElementById("filtro-status");

campoBusca.addEventListener("input", aplicarFiltros);
filtroStatus.addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
    const textoBusca = campoBusca.value.toLowerCase().trim();
    const statusSelecionado = filtroStatus.value;

    const filtrados = window.listaEquipamentos.filter(eq => {
        const idEquipamento = String(eq.id).toLowerCase();
        
        const usuario = window.listaUsuarios.find(u => u.equipamentoId === eq.id);
        const nomeFuncionario = usuario ? usuario.nome.toLowerCase() : "";

        const buscaMatch = idEquipamento.includes(textoBusca) || nomeFuncionario.includes(textoBusca);
        const statusMatch = statusSelecionado === "" || eq.status === statusSelecionado;

        return buscaMatch && statusMatch;
    });

    window.atualizarTabela(filtrados);
}