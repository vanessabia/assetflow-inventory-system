const formFuncionario = document.getElementById("form-funcionario");
const selectEquipamento = document.getElementById("equipamento");
const tabelaFuncionarios = document.getElementById("lista-funcionarios");
const editIdInput = document.getElementById("edit-id");

const buscaFuncionario = document.getElementById("search-input-funcionario");
const filtroSetor = document.getElementById("filter-setor");
const badgeCountFuncionarios = document.getElementById("badge-count-funcionarios");

let listaFuncionarios = [];

document.addEventListener("DOMContentLoaded", async () => {
  await carregarEquipamentosDisponiveis();
  await exibirFuncionarios();

  buscaFuncionario.addEventListener("input", aplicarFiltrosFuncionarios);
  filtroSetor.addEventListener("change", aplicarFiltrosFuncionarios);
});

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Erro na requisição");
  return data;
}

async function carregarEquipamentosDisponiveis(permitirEquipamentoId = null) {
  const equipamentos = await fetchJSON("/equipamentos");

  selectEquipamento.innerHTML = `<option value="">Selecione um equipamento</option>`;

  equipamentos
    .filter((e) => e.status === "Disponível" || e.id === permitirEquipamentoId)
    .forEach((e) => {
      const label = `${e.id} - ${e.nome} (${e.status})`;
      selectEquipamento.innerHTML += `<option value="${e.id}">${label}</option>`;
    });
}

async function exibirFuncionarios() {
  listaFuncionarios = await fetchJSON("/usuarios");

  atualizarBadgeFuncionarios(listaFuncionarios.length);
  renderizarFuncionarios(listaFuncionarios);
}

function atualizarBadgeFuncionarios(total) {
  if (!badgeCountFuncionarios) return;
  badgeCountFuncionarios.textContent = `${total} funcionário${total !== 1 ? "s" : ""} cadastrado${total !== 1 ? "s" : ""}`;
}

function aplicarFiltrosFuncionarios() {
  const termo = buscaFuncionario.value.toLowerCase().trim();
  const setorSelecionado = filtroSetor.value;

  const filtrados = listaFuncionarios.filter((f) => {
    const nomeMatch =
      f.nome.toLowerCase().includes(termo) ||
      f.id.toLowerCase().includes(termo);

    const setorMatch = setorSelecionado === "" || f.setor === setorSelecionado;

    return nomeMatch && setorMatch;
  });

  renderizarFuncionarios(filtrados);
}

function renderizarFuncionarios(funcionarios) {
  tabelaFuncionarios.innerHTML = "";

  funcionarios.forEach((f) => {
    tabelaFuncionarios.innerHTML += `
      <tr>
        <td>${f.id}</td>
        <td>${f.nome}</td>
        <td>${f.setor}</td>
        <td>${f.equipamentoId || "-"}</td>
        <td>
          <button class="btn-edit" data-edit="${f.id}">Editar</button>
          <button class="btn-delete" data-del="${f.id}">Remover</button>
        </td>
      </tr>
    `;
  });

  tabelaFuncionarios.querySelectorAll("button[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () => editarFuncionario(btn.dataset.edit));
  });

  tabelaFuncionarios.querySelectorAll("button[data-del]").forEach((btn) => {
    btn.addEventListener("click", () => removerFuncionario(btn.dataset.del));
  });
}

formFuncionario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome-funcionario").value.trim();
  const setor = document.getElementById("setor").value;
  const equipamentoId = selectEquipamento.value;
  const editId = editIdInput.value;

  const funcionarios = await fetchJSON("/usuarios");
  const nomeNormalizado = nome.toLowerCase();

  const funcionarioExiste = funcionarios.some(f =>
    f.nome.trim().toLowerCase() === nomeNormalizado &&
    f.setor === setor &&
    f.id !== editId
  );

  if (funcionarioExiste) {
    alert("Já existe um funcionário com esse nome neste setor.");
    return;
  }

  if (!nome) return alert("Informe o nome!");
  if (!setor) return alert("Selecione o setor!");
  if (!equipamentoId) return alert("Selecione um equipamento!");

  try {
    if (editId) {
      await fetchJSON(`/usuarios/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, setor, equipamentoId }),
      });
    } else {
      await fetchJSON("/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, setor, equipamentoId }),
      });
    }

    formFuncionario.reset();
    editIdInput.value = "";

    await carregarEquipamentosDisponiveis();
    await exibirFuncionarios();
  } catch (err) {
    alert(err.message);
  }
});

async function editarFuncionario(id) {
  try {
    const funcionarios = await fetchJSON("/usuarios");
    const f = funcionarios.find((x) => x.id === id);
    if (!f) return;

    document.getElementById("nome-funcionario").value = f.nome;
    document.getElementById("setor").value = f.setor;
    editIdInput.value = f.id;

    await carregarEquipamentosDisponiveis(f.equipamentoId);
    selectEquipamento.value = f.equipamentoId || "";
  } catch (err) {
    alert(err.message);
  }
}

async function removerFuncionario(id) {
  if (!confirm("Tem certeza que deseja remover este funcionário?")) return;

  try {
    await fetchJSON(`/usuarios/${id}`, { method: "DELETE" });

    await carregarEquipamentosDisponiveis();
    await exibirFuncionarios();
  } catch (err) {
    alert(err.message);
  }
}