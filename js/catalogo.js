document.addEventListener("DOMContentLoaded", () => {
  // Simulação de dados que viriam de um banco de dados ou API
  const produtos = [
    {
      id: 1,
      nome: 'Caneca Flork "Birthday"',
      descricao:
        "Uma forma divertida de desejar feliz aniversário para alguém especial.",
      imagens: [
        "./assets/exemplo_img_caneca.jpg", // Imagem principal
        "./assets/exemplo_img_caneca.jpg", // Imagem para mostrar no hover
      ],
      alt: "Caneca Flork com tema de aniversário",
    },
    {
      id: 2,
      nome: 'Caneca Flork "Te Amo"',
      descricao:
        "Você merecia o mundo, mas eu só tinha dinheiro para uma caneca!",
      imagens: [
        "./assets/exemplo_img_caneca.jpg",
        "./assets/exemplo_img_caneca.jpg",
      ],
      alt: "Caneca Flork com tema romântico",
    },
    {
      id: 3,
      nome: "Caneca com Sua Foto",
      descricao:
        "Envie sua foto favorita e eternize momentos em uma caneca única.",
      imagens: [
        "./assets/exemplo_img_caneca.jpg",
        "./assets/imagem_principal_canecas.png",
      ],
      alt: "Exemplo de caneca com foto personalizada",
    },
    {
      id: 4,
      nome: "Caneca do Seu Time",
      descricao: "Mostre o amor pelo seu time do coração no café da manhã.",
      imagens: [
        "./assets/exemplo_img_caneca.jpg",
        "./assets/imagem_principal_canecas.png",
      ],
      alt: "Exemplo de caneca de time de futebol",
    },
    {
      id: 5,
      nome: "Caneca Motivacional",
      descricao:
        "Comece o dia com uma dose extra de inspiração e positividade.",
      imagens: [
        "./assets/exemplo_img_caneca.jpg",
        "./assets/imagem_principal_canecas.png",
      ],
      alt: "Exemplo de caneca com frase motivacional",
    },
  ];

  const catalogoGrid = document.querySelector(".catalogoGridContainer");

  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.className = "catalogoCardContainer";

    card.innerHTML = `
            <img src="${produto.imagens[0]}" alt="${produto.alt}" class="CatalogoImageContainer">
            <div class="card-content">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <button class="card-button">Selecionar</button>
            </div>
        `;

    // Adiciona evento para trocar imagem no hover
    card.addEventListener("mouseenter", () => {
      if (produto.imagens.length > 1) {
        card.querySelector("img").src = produto.imagens[1];
      }
    });

    card.addEventListener("mouseleave", () => {
      card.querySelector("img").src = produto.imagens[0];
    });

    catalogoGrid.appendChild(card);
  });
});
