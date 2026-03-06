const menuItems = document.querySelectorAll(".menu-item")
const title = document.getElementById("page-title")
const content = document.getElementById("content")

menuItems.forEach(item => {

  item.addEventListener("click", () => {

    menuItems.forEach(i => i.classList.remove("active"))
    item.classList.add("active")

    const page = item.dataset.page

    if(page === "equipamentos"){
      title.textContent = "Equipamentos"

      content.innerHTML = `
        <h2>Lista de Equipamentos</h2>
        <p>Aqui ficará a tabela de equipamentos.</p>
      `
    }

    if(page === "funcionarios"){
      title.textContent = "Funcionários"

      content.innerHTML = `
        <h2>Lista de Funcionários</h2>
        <p>Aqui ficará a tabela de funcionários.</p>
      `
    }

    if(page === "dashboard"){
      title.textContent = "Dashboard"

      content.innerHTML = `
        <div class="cards">
          <div class="card">
            <h3>Equipamentos</h3>
            <p>Total cadastrados</p>
          </div>

          <div class="card">
            <h3>Funcionários</h3>
            <p>Total cadastrados</p>
          </div>

          <div class="card">
            <h3>Em uso</h3>
            <p>Equipamentos ativos</p>
          </div>
        </div>
      `
    }

  })

})