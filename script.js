// Elementos DOM
const form = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa");
const contador = document.querySelector("#contador");
const listaTarefas = document.querySelector("#lista-tarefas");

// Resgate das tarefas no localStorage
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Ouvir o evento clique
form.addEventListener("submit", adicionarTarefa);

// Funções
function adicionarTarefa(event) {
    event.preventDefault();
    let texto = inputTarefa.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluido: false
    };

    tarefas.push(novaTarefa);
    salvarTarefa();
    renderizarTarefas();

    inputTarefa.value = "";
    inputTarefa.focus();
}

function salvarTarefa() {
    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}

function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach(function (tarefa, indice) {
        const linha = document.createElement("tr");

        const colunaNumero = document.createElement("td");
        colunaNumero.textContent = indice + 1;

        const colunaTexto = document.createElement("td");
        colunaTexto.textContent = tarefa.texto;

        if (tarefa.concluido) {
            colunaTexto.classList.add(
                "text-decoration-line-through",
                "text-muted"
            );
        }

        const colunaStatus = document.createElement("td");
        if (tarefa.concluido) {
            colunaStatus.innerHTML =
                '<span class="badge text-bg-success">Concluída</span>';
        } else {
            colunaStatus.innerHTML =
                '<span class="badge text-bg-warning">Pendente</span>';
        }

        const colunaAcoes = document.createElement("td");
        colunaAcoes.classList.add(
            "text-center"
        );

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input", "me-3", "mt-0", "flex-shrink-0");
        checkbox.style.width = "1.5rem";
        checkbox.style.height = "1.5rem";
        checkbox.style.cursor = "pointer";
        checkbox.style.borderRadius = "50%";
        checkbox.checked = tarefa.concluido;

        checkbox.addEventListener("change", () => {
            tarefa.concluido = checkbox.checked;
            renderizarTarefas();
        })

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.classList.add("btn", "btn-primary", "btn-sm", "me-2")

        botaoEditar.addEventListener("click", () => {
            const novoTexto = prompt("Editar Tarefa:", tarefa.texto);
            if (novoTexto && novoTexto.trim()) {
                tarefa.texto = novoTexto.trim();
                renderizarTarefas();
            }
        })
        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("btn", "btn-danger", "btn-sm");

        botaoExcluir.addEventListener("click", () => {
            if (confirm("Excluir esta tarefa?")) {
                const posicao = tarefas.indexOf(tarefa);
                if (posicao !== -1) {
                    tarefas.splice(posicao, 1);
                }
                renderizarTarefas();
            }
        })

        const botaoPerigoso = document.createElement("button");
        botaoPerigoso.textContent = "Perigoso";
        botaoPerigoso.classList.add("btn", "btn-warning", "btn-sm", "me-2")

        botaoPerigoso.addEventListener("click", () => {
            alert("peRIGOsoOOOO")

            renderizarTarefas();
        })
        ;

        linha.appendChild(colunaNumero);
        linha.appendChild(colunaTexto);
        linha.appendChild(colunaStatus);
        linha.appendChild(colunaAcoes);
        listaTarefas.appendChild(linha);
        colunaAcoes.appendChild(checkbox);
        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoExcluir);
        colunaAcoes.appendChild(botaoPerigoso);
    });
}

renderizarTarefas();