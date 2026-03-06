let graficoEquipamentos;

document.addEventListener("DOMContentLoaded", carregarDashboard);

async function carregarDashboard() {
  try {
    const [equipamentos, funcionarios] = await Promise.all([
      fetch("/equipamentos").then(res => res.json()),
      fetch("/usuarios").then(res => res.json())
    ]);

    const totalEquipamentos = equipamentos.length;
    const totalFuncionarios = funcionarios.length;

    const totalDisponiveis = equipamentos.filter(e => e.status === "Disponível").length;
    const totalEmUso = equipamentos.filter(e => e.status === "Em uso").length;
    const totalManutencao = equipamentos.filter(e => e.status === "Manutenção").length;

    const funcionariosComEquipamento = funcionarios.filter(f => f.equipamentoId).length;

    document.getElementById("total-equipamentos").textContent = totalEquipamentos;
    document.getElementById("total-disponiveis").textContent = totalDisponiveis;
    document.getElementById("total-emuso").textContent = totalEmUso;
    document.getElementById("total-funcionarios").textContent = totalFuncionarios;
    document.getElementById("total-manutencao").textContent = totalManutencao;
    document.getElementById("total-ativos-resumo").textContent = totalEquipamentos;
    document.getElementById("funcionarios-com-equipamento").textContent = funcionariosComEquipamento;

    renderizarGrafico(totalDisponiveis, totalEmUso, totalManutencao);
  } catch (error) {
    console.error("Erro ao carregar dashboard:", error);
  }
}

function renderizarGrafico(disponiveis, emUso, manutencao) {
  const ctx = document.getElementById("grafico-equipamentos");

  if (graficoEquipamentos) {
    graficoEquipamentos.destroy();
  }

  graficoEquipamentos = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Disponíveis", "Em uso", "Manutenção"],
      datasets: [{
        data: [disponiveis, emUso, manutencao],
        backgroundColor: [
          "#ddf661",
          "#A1937E",
          "#D8D0C4"
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}