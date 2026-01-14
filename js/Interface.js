const stacks = document.querySelectorAll(".stack"); // cada conjunto de cards

stacks.forEach(stack => {
    let autoRotate = true; // animação automática ligada
    let interval;

    const updatePositions = () => {
        const cards = stack.querySelectorAll(".card-projeto"); // atualiza NodeList sempre
        cards.forEach((card, index) => {
            if (index === 0) {
                card.style.transform = "translateX(-50px) scale(0.9)";
                card.style.zIndex = 2;
                card.style.opacity = 0.85;
            } else if (index === 1) {
                card.style.transform = "translateX(0) scale(1.05)";
                card.style.zIndex = 3;
                card.style.opacity = 1;
            } else if (index === 2) {
                card.style.transform = "translateX(50px) scale(0.9)";
                card.style.zIndex = 2;
                card.style.opacity = 0.85;
            }
        });
    };

    const nextBtn = stack.querySelector(".next");
    const prevBtn = stack.querySelector(".prev");

    nextBtn.addEventListener("click", () => {
        autoRotate = false;
        clearInterval(interval);

        const cards = stack.querySelectorAll(".card-projeto");
        const first = cards[0];
        stack.appendChild(first); // move o primeiro para o final
        updatePositions();
    });

    prevBtn.addEventListener("click", () => {
        autoRotate = false;
        clearInterval(interval);

        const cards = stack.querySelectorAll(".card-projeto");
        const last = cards[cards.length - 1];
        stack.insertBefore(last, cards[0]); // move o último para o início
        updatePositions();
    });

    // animação automática
    interval = setInterval(() => {
        if (autoRotate) {
            const cards = stack.querySelectorAll(".card-projeto");
            const first = cards[0];
            stack.appendChild(first);
            updatePositions();
        }
    }, 3000);

    updatePositions(); // define posição inicial
});

// ⭐ Função para atualizar as estrelas da média
function atualizarMedia(media) {
  const mediaContainer = document.getElementById("media-estrela");
  mediaContainer.innerHTML = ""; // limpa estrelas antigas

  for (let i = 1; i <= 5; i++) {
    const estrela = document.createElement("span");
    estrela.innerHTML = "&#9733;"; // símbolo da estrela

    if (i <= Math.round(media)) { // preenche até a média arredondada
      estrela.classList.add("preenchida");
    }

    mediaContainer.appendChild(estrela);
  }
}

// ⭐ Inicializa média fictícia
let mediaAtual = 4.2;
atualizarMedia(mediaAtual);

// ⭐ Controle da subaba (igual antes)
const abrirBtn = document.getElementById("abrir-avaliacao");
const fecharBtn = document.getElementById("fechar-avaliacao");
const subaba = document.getElementById("subaba-avaliacao");

abrirBtn.addEventListener("click", () => {
  subaba.style.display = "flex";
});

fecharBtn.addEventListener("click", () => {
  subaba.style.display = "none";
});

// ⭐ Estrelas interativas da subaba
const estrelas = document.querySelectorAll(".estrelas span");
let notaSelecionada = 0;

estrelas.forEach(estrela => {
  estrela.addEventListener("mouseover", () => {
    const valor = Number(estrela.dataset.value);
    estrelas.forEach(s => s.classList.toggle("hover", Number(s.dataset.value) <= valor));
  });

  estrela.addEventListener("mouseout", () => {
    estrelas.forEach(s => s.classList.remove("hover"));
  });

  estrela.addEventListener("click", () => {
    notaSelecionada = Number(estrela.dataset.value);
    estrelas.forEach(s => s.classList.toggle("selecionada", Number(s.dataset.value) <= notaSelecionada));
  });
});

// ⭐ Envio do feedback
document.getElementById("enviar-feedback").addEventListener("click", () => {
  const feedback = document.getElementById("feedback-text").value;

  if (!notaSelecionada && !feedback) {
    alert("Por favor, selecione uma nota ou escreva um feedback!");
    return;
  }

  // Atualiza média fictícia
  if (notaSelecionada) {
    mediaAtual = ((mediaAtual + notaSelecionada) / 2).toFixed(1);
    atualizarMedia(mediaAtual); // atualiza estrelas acima do botão
  }

  alert(`Obrigado pelo feedback! Nota: ${notaSelecionada}, Comentário: ${feedback}`);

  // Reset e fechar
  notaSelecionada = 0;
  estrelas.forEach(s => s.classList.remove("selecionada"));
  document.getElementById("feedback-text").value = "";
  subaba.style.display = "none";
});
