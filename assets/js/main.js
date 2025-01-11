function adicionarTarefa() {
  const entradaTexto = document.getElementById("entrada-texto");
  const tarefa = entradaTexto.value.trim();

  if (tarefa !== "") {
    const tarefaContainer = document.createElement("div");
    tarefaContainer.classList.add("tarefa-container");

    const novaTarefa = document.createElement("div");
    novaTarefa.textContent = tarefa;
    novaTarefa.classList.add("tarefa-item");

    const deletarTarefa = document.createElement("button");
    deletarTarefa.textContent = "Deletar";
    deletarTarefa.classList.add("btn-del");

    novaTarefa.addEventListener("click", function () {
      mudarBackgroundColor(novaTarefa);
    });

    deletarTarefa.addEventListener("click", function () {
      novaTarefa.remove();
      deletarTarefa.remove();
      tarefaContainer.remove();
    });

    tarefaContainer.appendChild(novaTarefa);
    tarefaContainer.appendChild(deletarTarefa);

    const list = document.getElementById("list");
    list.appendChild(tarefaContainer);

    salvarTarefas();

    entradaTexto.value = "";
  } else {
    alert("Por favor escreva um texto!");
  }
}

function mudarBackgroundColor(tarefaElemento) {
  tarefaElemento.style.backgroundColor = "green";
  tarefaElemento.style.color = "white";
}

function salvarTarefas() {
  const tarefas = [];
  const tarefaContainers = document.querySelectorAll(".tarefa-container");

  tarefaContainers.forEach((container) => {
    const texto = container.querySelector(".tarefa-item").textContent;
    tarefas.push(texto);
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach((tarefa) => {
    const tarefaContainer = document.createElement("div");
    tarefaContainer.classList.add("tarefa-container");

    const novaTarefa = document.createElement("span");
    novaTarefa.textContent = tarefa;
    novaTarefa.classList.add("tarefa-item");

    const deletarTarefa = document.createElement("button");
    deletarTarefa.textContent = "Deletar";
    deletarTarefa.classList.add("btn-del");

    deletarTarefa.addEventListener("click", function () {
      tarefaContainer.remove();
      salvarTarefas();
    });

    tarefaContainer.appendChild(novaTarefa);
    tarefaContainer.appendChild(deletarTarefa);

    const list = document.getElementById("list");
    list.appendChild(tarefaContainer);
  });
}

document.addEventListener("DOMContentLoaded", carregarTarefas);
