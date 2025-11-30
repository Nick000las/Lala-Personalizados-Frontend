
function mostrarAba(aba) {
    const abaTemplates = document.getElementById("abaTemplates");
    const abaPedidos = document.getElementById("abaPedidos");

    const btnTemplates = document.getElementById("btnTemplates");
    const btnPedidos = document.getElementById("btnPedidos");

    const mostrarTemplates = aba === "templates";

    abaTemplates.style.display = mostrarTemplates ? "block" : "none";
    abaPedidos.style.display   = mostrarTemplates ? "none" : "block";

    btnTemplates.classList.toggle("active", mostrarTemplates);
    btnPedidos.classList.toggle("active", !mostrarTemplates);
}


async function carregarTemplates() {
    const key = localStorage.getItem("adminKey");

    const resposta = await fetch("/admin/templates", {
        headers: { "x-api-key": key }
    });

    if (!resposta.ok) {
        alert("Erro ao carregar templates");
        return;
    }

    const templates = await resposta.json();
    const container = document.getElementById("listaTemplates");

    container.innerHTML = "";

    templates.forEach(t => {
        container.innerHTML += `
            <div class="catalogoCardContainer">
                <img src="${t.imagem}" class="CatalogoImageContainer">
                
                <div class="card-content">
                    <h3>${t.nome}</h3>
                    
                    <p><strong>Descrição:</strong> ${t.descricao}</p>
                    <p><strong>Tipo de Caneca:</strong> ${t.tipoCaneca}</p>
                </div>
            </div>
        `;
    });
}


async function carregarPedidos() {
    const key = localStorage.getItem("adminKey");

    const resposta = await fetch("/admin/pedidos", {
        headers: { "x-api-key": key }
    });

    if (!resposta.ok) {
        alert("Erro ao carregar pedidos");
        return;
    }

    const pedidos = await resposta.json();
    const container = document.getElementById("listaPedidos");

    container.innerHTML = "";

    pedidos.forEach(p => {
        container.innerHTML += `
            <div class="pedidoCard">
                <h3>Pedido #${p.id}</h3>

                <p><strong>Email:</strong> ${p.email}</p>
                <p><strong>Contato:</strong> ${p.numero}</p>
                <p><strong>Tipo de Caneca:</strong> ${p.tipoCaneca}</p>

                <p><strong>Template:</strong> ${p.template || "Customizado"}</p>

                <p><strong>Falas:</strong> ${p.falas || "—"}</p>
                <p><strong>Quantidade:</strong> ${p.quantidade}</p>

                ${
                    p.imagem 
                    ? `<p><strong>Imagem enviada:</strong><br><img src="${p.imagem}" class="imagemPedido"></p>`
                    : ""
                }
            </div>
        `;
    });
}


window.onload = () => {
    mostrarAba("templates");
    carregarTemplates();
    carregarPedidos(); // carrega uma vez, só aparece quando trocar para abaPedidos
};
