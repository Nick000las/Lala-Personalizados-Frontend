const BACKEND_URL = "https://lala-personalizados-backend-905v2o5fx-nick000las-projects.vercel.app";

function verificarAcesso(resposta) {
  if (resposta.status === 401) {
    alert("Senha inválida! Faça login novamente.");
    localStorage.removeItem("adminKey");
    window.location.href = "login.html";
    throw new Error("Acesso não autorizado");
  }
}

function mostrarAba(aba) {
  const abaTemplates = document.getElementById("abaTemplates");
  const abaPedidos = document.getElementById("abaPedidos");
  const abaCriarPedido = document.getElementById("abaCriarPedido");

  const btnTemplates = document.getElementById("btnTemplates");
  const btnPedidos = document.getElementById("btnPedidos");
  const btnCriarPedido = document.getElementById("btnCriarPedido");

  abaTemplates.style.display = aba === "templates" ? "block" : "none";
  abaPedidos.style.display = aba === "pedidos" ? "block" : "none";
  abaCriarPedido.style.display = aba === "criar" ? "block" : "none";

  btnTemplates.classList.toggle("active", aba === "templates");
  btnPedidos.classList.toggle("active", aba === "pedidos");
  btnCriarPedido.classList.toggle("active", aba === "criar");
}

async function carregarPedidos() {
  const key = localStorage.getItem("adminKey");

  const resposta = await fetch(`${BACKEND_URL}/pedidos`, {
    method: "GET",
    credentials: "include",
    headers: { "x-api-key": key },
  });

  verificarAcesso(resposta);

  if (!resposta.ok) {
    alert("Erro ao carregar pedidos");
    return;
  }

  const dados = await resposta.json();
  const pedidos = dados.pedidos;
  const container = document.getElementById("listaPedidos");

  container.innerHTML = "";

  pedidos.forEach((p) => {
    const pedidoIdCurto = String(p.id).substring(0, 8);

    let itens = p.itens;
    if (Array.isArray(itens)) {
      itens = itens[0] || {};
    }

    const quantidade = itens.quantidade || p.total_itens || "—";
    const cor = itens.cor_da_caneca || "—";
    const fala = itens.fala_personalizada || "—";
    const template_id = itens.template_id || "—";

    container.innerHTML += `
      <div class="pedidoCard">
        <h3>Pedido #${pedidoIdCurto}</h3>
        <p><strong>Cliente:</strong> ${p.nome_cliente || "—"}</p>
        <p><strong>Status:</strong> ${p.status || "—"}</p>
        <p><strong>Email:</strong> ${p.email}</p>
        <p><strong>Telefone:</strong> ${p.telefone || "—"}</p>
        <p><strong>Endereço:</strong> ${p.endereco || "Não informado"}</p>
        <hr>
        <p><strong>Template_id:</strong> ${template_id}</p>
        <p><strong>Quantidade:</strong> ${quantidade}</p>
        <p><strong>Cor da caneca:</strong> ${cor}</p>
        <p><strong>Fala personalizada:</strong> ${fala}</p>
        <div class="botoes-acao">
          <button class="btn-atualizar" onclick="atualizarPedido('${p.id}')">Atualizar</button>
          <button class="btn-deletar" onclick="deletarPedido('${p.id}')">Deletar</button>
        </div>
      </div>
    `;
  });
}

async function criarPedido(event) {
  event.preventDefault();
  const key = localStorage.getItem("adminKey");
  const form = event.target;
  const formData = new FormData(form);

  const dados = {
    nome_cliente: formData.get("nome_cliente"),
    status: "pendente",
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    endereco: formData.get("endereco"),
    template_id: formData.get("template_id") || null,
    itens: {
      quantidade: parseInt(formData.get("quantidade"), 10),
      cor_da_caneca: formData.get("cor_da_caneca"),
      fala_personalizada: formData.get("fala_personalizada") || null,
    },
    total_itens: parseInt(formData.get("quantidade"), 10),
  };

  const resposta = await fetch(`${BACKEND_URL}/pedidos`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
    },
    body: JSON.stringify(dados),
  });

  verificarAcesso(resposta);

  if (resposta.ok) {
    alert("Pedido criado com sucesso!");
    form.reset();
    mostrarAba("pedidos");
    carregarPedidos();
  } else {
    const erro = await resposta.json();
    alert(`Erro ao criar pedido: ${erro.message || resposta.statusText}`);
  }
}

async function atualizarPedido(id) {
  const key = localStorage.getItem("adminKey");
  const novoStatus = prompt("Digite o novo status do pedido:");

  if (!novoStatus) return;

  const resposta = await fetch(`${BACKEND_URL}/pedidos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
    },
    body: JSON.stringify({ status: novoStatus }),
  });

  verificarAcesso(resposta);

  if (resposta.ok) {
    alert("Pedido atualizado com sucesso!");
    carregarPedidos();
  } else {
    alert("Erro ao atualizar pedido.");
  }
}

async function deletarPedido(id) {
  const key = localStorage.getItem("adminKey");

  if (!confirm("Tem certeza que deseja deletar este pedido?")) return;

  const resposta = await fetch(`${BACKEND_URL}/pedidos/${id}`, {
    method: "DELETE",
    headers: { "x-api-key": key },
  });

  verificarAcesso(resposta);

  if (resposta.ok) {
    alert("Pedido deletado com sucesso!");
    carregarPedidos();
  } else {
    alert("Erro ao deletar pedido.");
  }
}

function logout() {
  fetch(`${BACKEND_URL}/logout`, {
    method: "GET",
    credentials: "include"
  })
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      window.location.href = "index.html"; 
    } else {
      alert('Erro ao fazer logout.');
    }
  })
  .catch(err => {
    console.error(err);
    alert('Erro ao conectar com o servidor.');
  });
}

window.onload = () => {
  const key = localStorage.getItem("adminKey");

  if (!key) {
    window.location.href = "login.html";
    return;
  }

  mostrarAba("pedidos");
  carregarPedidos();

  document
    .getElementById("formCriarPedido")
    .addEventListener("submit", criarPedido);
};
