const form = document.querySelector("#form");
const lista = document.querySelector("#lista");
const totalSpan = document.querySelector("#total");
const filtro = document.querySelector("#filtro");

let gastos = [];


function loadDados(){
    const dados = localStorage.getItem("gastos")

    if (dados) {
        gastos = JSON.parse(dados);
    }
}

function salvar(){
    localStorage.setItem("gastos", JSON.stringify(gastos));
}

function adicionar(descricao, valor, categoria){
    if (descricao === "" || valor === "" || valor <= 0 || categoria === ""){
        alert ("Há campos não preenchidos corretamente!");
        return;
    }

    const gasto = {
        descricao: descricao,
        valor: Number(valor),
        categoria: categoria
    };

    gastos.push(gasto)

    salvar();
    renderizarLista();
}

function filtroGastos(){
    const categoria = filtro.value;

    switch(categoria){
        case "Alimentação":
            return gastos.filter(g => g.categoria === "Alimentação");
        
        case "Lazer":
            return gastos.filter(g => g.categoria === "Lazer");

        case "Transporte":
            return gastos.filter(g => g.categoria === "Transporte");

        default:
            return gastos;
    }
}

function renderizarLista(){
    lista.innerHTML = "";

    let gastosFiltrados = filtroGastos();

    gastosFiltrados.forEach((gasto, index) => {
        
        const li = document.createElement("li");

        li.innerHTML = `
            ${gasto.descricao} - R$${gasto.valor} - (${gasto.categoria})
            <button onclick="removeGasto(${index})">X</button>
        `;

        lista.appendChild(li);
    });

    calcularTotal(gastosFiltrados);
}

function removeGasto(index){
    gastos.splice(index, 1);

    salvar();

    renderizarLista();
}

function calcularTotal(listaFiltrada){
    let total = 0;

    listaFiltrada.forEach(g => {
        total += g.valor;
    });

    totalSpan.innerText = total.toFixed(2);
}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const descricao = document.querySelector("#descricao").value;
    const valor = document.querySelector("#valor").value;
    const categoria = document.querySelector("#categoria").value;

    adicionar(descricao, valor, categoria);

    form.reset();
});

document.addEventListener("DOMContentLoaded", () => {
    loadDados();
    renderizarLista();
});

filtro.addEventListener("change", renderizarLista);