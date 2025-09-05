const inputBusca = document.getElementById("text_search");
const botaoBusca = document.getElementById("btn_search");
const cards = document.querySelectorAll("#container-perfumes .card");
const resultadosContainer = document.getElementById("resultados_container");
const secaoResultados = document.getElementById("resultados_busca");

function buscarProdutos() {
  const termo = inputBusca.value.toLowerCase();
  resultadosContainer.innerHTML = "";
  let encontrou = false;

  cards.forEach((card) => {
    const nome = card.querySelector(".nome_produto").textContent.toLowerCase();
    const descricao = card
      .querySelector(".info_produto")
      .textContent.toLowerCase();

    if (termo && (nome.includes(termo) || descricao.includes(termo))) {
      const clone = card.cloneNode(true);
      clone.classList.add("resultado_card");
      resultadosContainer.appendChild(clone);
      encontrou = true;
    }
  });

  if (!encontrou) {
    resultadosContainer.innerHTML = `
      <div style="width:100%;text-align:center;padding:20px;font-size:18px;color:white">
        Nada encontrado para "<b>${inputBusca.value}</b>".
      </div>
    `;
  }

  secaoResultados.style.display = "block";
}

inputBusca.addEventListener("keypress", (e) => {
  if (e.key === "Enter") buscarProdutos();
});

botaoBusca.addEventListener("click", buscarProdutos);
