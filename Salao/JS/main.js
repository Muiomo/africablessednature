document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider_adds");
  if (!slider) return;

  const slides = document.querySelectorAll("#slider_adds img");
  const btnProximo = document.getElementById("proximo");
  const btnVoltar = document.getElementById("voltar");

  let indiceAtual = 0;
  let slideIntervalo;
  const duracaoIntervalo = 5000;

  function atualizarSlider() {
    slider.style.transform = `translateX(-${indiceAtual * 100}%)`;
  }

  function avancarSlide() {
    indiceAtual = (indiceAtual + 1) % slides.length;
    atualizarSlider();
  }

  function voltarSlide() {
    indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
    atualizarSlider();
  }

  function reiniciarIntervalo() {
    clearInterval(slideIntervalo);
    slideIntervalo = setInterval(avancarSlide, duracaoIntervalo);
  }

  btnProximo.addEventListener("click", () => {
    avancarSlide();
    reiniciarIntervalo();
  });

  btnVoltar.addEventListener("click", () => {
    voltarSlide();
    reiniciarIntervalo();
  });

  reiniciarIntervalo();
});

window.addEventListener("scroll", function () {
  const limite = 300;
  const ElementosLi = document.querySelectorAll("nav ul li");
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  const iconeMenu = document.querySelector("#icone_menu");
  const hr = this.document.querySelector("hr");

  if (window.scrollY > limite) {
    ElementosLi.forEach((item) => {
      item.style.display = "none";
      header.style.height = "80px";
      nav.style.height = "60px";
      iconeMenu.style.display = "block";
      hr.style.display = "none";
    });
  } else {
    ElementosLi.forEach((item) => {
      item.style.display = "block";
      header.style.height = "140px";
      nav.style.height = "auto";
      iconeMenu.style.display = "none";
      hr.style.display = "block";
    });
  }
});

const iconeMenu = document.querySelector("#icone_menu");

iconeMenu.addEventListener("click", function () {
  const listaLi = document.querySelectorAll("nav ul li");
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  listaLi.forEach((itemx) => {
    itemx.style.display = "block";
    header.style.height = "140px";
    nav.style.height = "auto";
  });
});

/*FUNCOES DO CARRINHO AQUI*/
document.addEventListener("DOMContentLoaded", () => {
  const botoesCompra = document.querySelectorAll(".add_carrinho");
  const cardlista = document.querySelector(".cardlista");
  const contadorCarrinho = document.getElementById("contador_carrinho");
  const totalValorEl = document.querySelector(".valorx");
  const botaoFinalizar = document.getElementById("finalizarcompra");

  let carrinho = [];

  function atualizarCarrinho() {
    cardlista.innerHTML = ""; // limpa o carrinho visual
    let total = 0;

    carrinho.forEach((item) => {
      total += item.preco;

      const produto = document.createElement("div");
      produto.id = "produtolistado";
      produto.innerHTML = `
        <p id="preco">${item.preco.toFixed(2)} MT</p>
        <p>${item.nome}</p>
      `;

      cardlista.appendChild(produto);
    });

    contadorCarrinho.textContent = carrinho.length;
    totalValorEl.textContent = total.toFixed(2) + " MT";
  }

  botoesCompra.forEach((botao) => {
    botao.addEventListener("click", () => {
      const nome = botao.getAttribute("data-nome");
      const preco = parseFloat(botao.getAttribute("data-preco"));

      carrinho.push({ nome, preco });
      atualizarCarrinho();
    });
  });

  botaoFinalizar.addEventListener("click", () => {
    if (carrinho.length === 0) {
      alert("Carrinho esta vazio!");
      return;
    }

    let mensagem = "*Pedido Blessed Perfume:*\n\n";
    let total = 0;

    carrinho.forEach((item) => {
      mensagem += `🧴 ${item.nome} - ${item.preco.toFixed(2)} MT\n`;
      total += item.preco;
    });

    mensagem += `\n💰 *Total: ${total.toFixed(2)} MT*`;

    const url = `https://wa.me/25884XXXXXXXX?text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(url, "_blank");
  });

  const iconeCarrinho = document.getElementById("icone_carrinho");
  const modalCarrinho = document.querySelector(".modal_carrinho");

  iconeCarrinho.addEventListener("click", () => {
    modalCarrinho.style.display = "block";
  });

  modalCarrinho.addEventListener("click", (e) => {
    if (e.target === modalCarrinho) {
      modalCarrinho.style.display = "none";
    }
  });
});

//ABRIR MODAL

document.addEventListener("DOMContentLoaded", () => {
  const iconeCarrinho = document.getElementById("icone_carrinho");
  const modalCarrinho = document.querySelector(".modal_carrinho");

  iconeCarrinho.addEventListener("click", () => {
    modalCarrinho.style.display = "block";
  });

  modalCarrinho.addEventListener("click", (e) => {
    if (e.target === modalCarrinho) {
      modalCarrinho.style.display = "none";
    }
  });
});

//FAVORITAR
document.addEventListener("DOMContentLoaded", () => {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  // Atualiza cor do coração no load
  document.querySelectorAll(".btn_favoritarc").forEach((btn) => {
    const id = btn.dataset.id;
    const icone = btn.querySelector(".icone_favoritoc");

    if (favoritos.some((prod) => prod.id === id)) {
      icone.classList.add("favoritado");
    }

    btn.addEventListener("click", () => {
      const index = favoritos.findIndex((prod) => prod.id === id);

      if (index !== -1) {
        favoritos.splice(index, 1);
        icone.classList.remove("favoritado");
      } else {
        favoritos.push({
          id: id,
          nome: btn.dataset.nome,
          preco: btn.dataset.preco,
          img: btn.dataset.img || "https://via.placeholder.com/70",
        });
        icone.classList.add("favoritado");
      }

      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    });
  });

  // Modal Favoritos
  const iconeFav = document.getElementById("icone_listaDesejo");
  const modalFav = document.getElementById("modal_favoritos");
  const listaFav = document.getElementById("lista_favoritos");
  const btnFechar = document.getElementById("fechar_fav");

  function renderFavoritos() {
    listaFav.innerHTML = "";
    if (favoritos.length === 0) {
      listaFav.innerHTML = `<p style="text-align:center; font-size:18px; color:#555;">Nenhum item favorito ainda </p>`;
      return;
    }

    favoritos.forEach((item, i) => {
      const div = document.createElement("div");
      div.classList.add("item_favorito");
      div.innerHTML = `
        <img src="${item.img}" alt="${item.nome}" class="img_fav" />
        <div class="info_fav">
          <p class="nome_fav">${item.nome}</p>
          <p class="preco_fav">${item.preco} MT</p>
        </div>
        <div class="btns_fav">
          <button class="btn_fav_comprar" data-index="${i}">Comprar</button>
          <button class="btn_fav_remover" data-index="${i}">Remover</button>
        </div>
      `;
      listaFav.appendChild(div);
    });

    // Botão remover
    listaFav.querySelectorAll(".btn_fav_remover").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.dataset.index;
        favoritos.splice(idx, 1);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        renderFavoritos();
        atualizaCorações();
      });
    });

    listaFav.querySelectorAll(".btn_fav_comprar").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.dataset.index;
        const item = favoritos[idx];

        // Cria a mensagem para o WhatsApp
        const phoneNumber = "258869122800"; // Substitua pelo número correto
        let mensagem = "*Pedido - Blessed Perfume*\n\n";
        mensagem += `• ${item.nome} - ${parseFloat(item.preco).toFixed(
          2
        )} MT\n`;
        mensagem += `\n*Total:* ${parseFloat(item.preco).toFixed(2)} MT`;
        mensagem += `\n\nAguardo as instruções para pagamento.`;

        // Gera o link do WhatsApp
        const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          mensagem
        )}`;

        // Abre o WhatsApp
        window.open(link, "_blank");
      });
    });
  }

  function atualizaCorações() {
    document.querySelectorAll(".btn_favoritarc").forEach((btn) => {
      const id = btn.dataset.id;
      const icone = btn.querySelector(".icone_favoritoc");
      if (favoritos.some((prod) => prod.id === id)) {
        icone.classList.add("favoritado");
      } else {
        icone.classList.remove("favoritado");
      }
    });
  }

  iconeFav.addEventListener("click", () => {
    renderFavoritos();
    modalFav.style.display = "flex";
  });

  btnFechar.addEventListener("click", () => {
    modalFav.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalFav) {
      modalFav.style.display = "none";
    }
  });
});

/*finalizar compra*/
function EnviarMensagemWha() {
  const phoneNumber = "258869122800";

  const produtos = document.querySelectorAll(".cardlista #produtolistado");
  let mensagem = "*Pedido - Blessed Perfume*\n\n";

  let total = 0;

  produtos.forEach((item, index) => {
    const nome = item.querySelector("p:nth-child(2)")?.textContent.trim();
    const precoTexto = item.querySelector("p:nth-child(1)")?.textContent.trim();
    const preco = parseFloat(precoTexto?.replace("MT", "").trim());

    if (nome && !isNaN(preco)) {
      mensagem += `• ${index + 1}. ${nome} - ${preco.toFixed(2)} MT\n`;
      total += preco;
    }
  });

  const agora = new Date();
  const dataFormatada = agora.toLocaleDateString("pt-BR");
  const horaFormatada = agora.toLocaleTimeString("pt-BR");

  mensagem += `\n*Data:* ${dataFormatada} às ${horaFormatada}`;
  mensagem += `\n*Total:* ${total.toFixed(2)} MT`;
  mensagem += `\n\nAguardo as instruções para pagamento.`;

  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    mensagem
  )}`;
  window.open(link, "_blank");
}

//BOTAO LER MAIS, PARA INFORMACOES DO PRODUTO
document.addEventListener("DOMContentLoaded", () => {
  const botoesLerMais = document.querySelectorAll(".btn_lermais");
  const modal = document.getElementById("modal_lermais");
  const fecharModal = document.getElementById("fechar_modal");
  const tituloProduto = document.getElementById("titulo_produto");
  const descricaoProduto = document.getElementById("descricao_produto");
  const precoProduto = document.getElementById("preco_produto");

  botoesLerMais.forEach((botao) => {
    botao.addEventListener("click", () => {
      const nome = botao.getAttribute("data-nome");
      const descricao = botao.getAttribute("data-descricao");
      const preco = botao.getAttribute("data-preco");

      tituloProduto.textContent = nome;
      descricaoProduto.textContent = descricao;
      precoProduto.textContent = `Preço: ${preco} MT`;

      modal.style.display = "flex";
    });
  });

  fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
