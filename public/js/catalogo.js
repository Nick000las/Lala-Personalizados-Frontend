document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // LISTA DE PRODUTOS
  // (Nesse momento ainda é estático. Depois posso conectar à Supabase)
  // ============================
  const produtos = [
    {
      id: 1,
      nome: 'Caneca Flork "Birthday"',
      descricao:
        "Uma forma divertida de desejar feliz aniversário para alguém especial.",
      imagens: [
        "./assets/exemplo_img_caneca.jpg",
        "./assets/exemplo_img_caneca.jpg",
      ],
      alt: "Caneca Flork com tema de aniversário",
    },
    {
      id: 2,
      nome: 'Caneca "Avaliação"',
      descricao:
        "Caneca perfeita para quem não perde a chance de avaliar tudo com uma pitada de sarcasmo.",
      imagens: [
        "./assets/Caneca_avaliacao.jpg",
        "./assets/Caneca_avaliacao.jpg",
      ],
      alt: "Caneca engraçada de avaliação",
    },
    {
      id: 3,
      nome: 'Caneca da "Gratidão"',
      descricao:
        "Caneca que transforma cada gole em um lembrete de gratidão e bons momentos.",
      imagens: [
        "./assets/caneca_mensagem_gratidao.jpg",
        "./assets/caneca_mensagem_gratidao.jpg",
      ],
      alt: "Caneca com mensagem de gratidão",
    },
    {
      id: 4,
      nome: "Caneca com o seu nome!",
      descricao: "Caneca personalizada com seu nome, feita para tornar cada momento único e especial.",
      imagens: [
        "./assets/caneca_pessoal_02.jpg",
        "./assets/caneca_pessoal_02.jpg",
      ],
      alt: "Caneca com o nome customizável",
    },
    {
      id: 5,
      nome: "Caneca com o seu nome e descrição!",
      descricao:
        "Comece o dia com uma dose extra de inspiração.",
      imagens: [
        "./assets/caneca_pessoal.jpg",
        "./assets/caneca_pessoal.jpg",
      ],
      alt: "Caneca com frase motivacional",
    },
    {
      id: 6,
      nome: "Caneca para presente familiar",
      descricao:
        "Caneca perfeita para presentear alguém da família, cheia de carinho e significado em cada detalhe.",
      imagens: [
        "./assets/caneca_presente_amigavel.jpg",
        "./assets/caneca_presente_amigavel.jpg",
      ],
      alt: "Caneca para presente familiar",
    },
  ];

  // ============================
  // RENDERIZAÇÃO DO CATÁLOGO
  // ============================
  const catalogoGrid = document.querySelector(".catalogoGridContainer");

  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.className = "catalogoCardContainer";

    card.innerHTML = `
      <img src="${produto.imagens[0]}" alt="${produto.alt}" class="CatalogoImageContainer">

      <div class="card-content">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <button class="card-button" data-id="${produto.id}">Selecionar</button>
      </div>
    `;

    // Hover troca imagem
    card.addEventListener("mouseenter", () => {
      if (produto.imagens[1]) {
        card.querySelector("img").src = produto.imagens[1];
      }
    });

    card.addEventListener("mouseleave", () => {
      card.querySelector("img").src = produto.imagens[0];
    });

    catalogoGrid.appendChild(card);
  });

  // ============================
  // POPUP ELEMENTOS
  // ============================
  const popup = document.getElementById("pedidoPopup");
  const overlay = document.getElementById("popupOverlay");
  const fecharBtn = document.getElementById("popupClose");
  const titulo = document.getElementById("popupProdutoNome");
  const inputTemplate = document.getElementById("template_id_input");

  // Abrir popup ao clicar no botão Selecionar
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-button")) {
      const id = e.target.getAttribute("data-id");
      const produto = produtos.find((p) => p.id == id);

      titulo.textContent = produto.nome;
      inputTemplate.value = produto.id;

      popup.style.display = "block";
      overlay.style.display = "block";
    }
  });

  // Fechar popup
  function fecharPopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
  }

  fecharBtn.addEventListener("click", fecharPopup);
  overlay.addEventListener("click", fecharPopup);

  // ============================
  // ENVIO DO PEDIDO AO BACKEND
  // ============================
  document
    .getElementById("pedidoForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.target;
      const dados = Object.fromEntries(new FormData(form));

      // Converter valores
      dados.template_id = parseInt(dados.template_id);
      dados.total_itens = parseInt(dados.quantidade);
      dados.itens = {
        quantidade: parseInt(dados.quantidade),
        cor_da_caneca: dados.cor_da_caneca,
        fala_personalizada: dados.fala_personalizada || null,
      };

      try {
        const resposta = await fetch("http://localhost:3000/pedidos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });

        if (!resposta.ok) {
          const erro = await resposta.json();
          alert("Erro ao enviar pedido: " + erro.erro);
          return;
        }

        alert("Pedido criado com sucesso!");
        form.reset();
        fecharPopup();
      } catch (error) {
        alert("Erro inesperado: " + error.message);
      }
    });
});
