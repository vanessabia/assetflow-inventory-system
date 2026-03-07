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


    const ctxStatus = document.getElementById("grafico-equipamentos");

    if (graficoEquipamentos) {
      graficoEquipamentos.destroy();
    }

    graficoEquipamentos = new Chart(ctxStatus, {
      type: "doughnut",
      data: {
        labels: ["Disponíveis", "Em uso", "Manutenção"],
        datasets: [{
          data: [totalDisponiveis, totalEmUso, totalManutencao],
          backgroundColor: [
            "#cab390",
            "#94846d",
            "#D8D0C4"
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });


    const tipos = {};

    equipamentos.forEach(eq => {
      if (tipos[eq.tipo]) {
        tipos[eq.tipo]++;
      } else {
        tipos[eq.tipo] = 1;
      }
    });

    const nomesTipos = {
      NOT: "Notebook",
      MON: "Monitor",
      TEC: "Teclado",
      MOU: "Mouse"
    };

    const labelsTipos = Object.keys(tipos).map(tipo => nomesTipos[tipo] || tipo);
    const valoresTipos = Object.values(tipos);

    const ctxTipos = document.getElementById("graficoTipos");

    new Chart(ctxTipos, {
      type: "bar",
      data: {
        labels: labelsTipos,
        datasets: [{
          label: "Quantidade",
          data: valoresTipos,
          backgroundColor: "#cab390",
          borderWidth: 1,
          barThickness: 40
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });


    const setores = {};

    funcionarios
      .filter(f => f.equipamentoId)
      .forEach(f => {

        const setor = f.setor || "Não definido";

        if (setores[setor]) {
          setores[setor]++;
        } else {
          setores[setor] = 1;
        }

      });

    const labelsSetores = Object.keys(setores);
    const valoresSetores = Object.values(setores);

    const ctxSetores = document.getElementById("graficoSetores");

    new Chart(ctxSetores, {
      type: "pie",
      data: {
        labels: labelsSetores,
        datasets: [{
          data: valoresSetores,
          backgroundColor: [
            "#cab390",
            "#94846d",
            "#D8D0C4",
            "#a6907c",
            "#9f8d73"
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

  } catch (error) {
    console.error("Erro ao carregar dashboard:", error);
  }
}