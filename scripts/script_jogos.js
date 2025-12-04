// 1. INICIALIZAÇÃO
// Tenta carregar do LocalStorage. Se não tiver, cria vazio.
let carrinho = JSON.parse(localStorage.getItem("meuCarrinho")) || [];

// Se estivermos na página do carrinho, desenha a tela inicial
if (document.querySelector(".cart-items")) {
    atualizarCarrinho();
}

// =========================================================
// FUNÇÕES AUXILIARES (Para lidar com dinheiro)
// =========================================================

// Converte "R$ 129,90" para o número 129.90
function converterPreco(textoPreco) {
    return parseFloat(textoPreco.replace("R$", "").replace(".", "").replace(",", ".").trim());
}

// Converte o número 129.90 para "R$ 129,90"
function formatarPreco(valorNumerico) {
    return "R$ " + valorNumerico.toFixed(2).replace(".", ",");
}

// Calcula o total somando tudo o que está no array (Mais seguro!)
function atualizarTotal() {
    const elementoTotal = document.getElementById("preco-total");
    if (!elementoTotal) return; // Se não tiver elemento de total na página, sai.

    let soma = 0;
    for (let i = 0; i < carrinho.length; i++) {
        soma += carrinho[i].precoNumerico;
    }

    elementoTotal.innerText = formatarPreco(soma);
}

// Salva no navegador
function salvarDados() {
    localStorage.setItem("meuCarrinho", JSON.stringify(carrinho));
}


// =========================================================
// LÓGICA DE ADICIONAR (Página de Produtos)
// =========================================================
document.body.addEventListener("click", function(event) {
    // Verifica se clicou no card ou no botão dentro dele
    if (event.target.classList.contains("game-card") || event.target.closest(".game-card")) {
        
        const card = event.target.closest(".game-card");
        const textoPreco = card.querySelector(".game-price").innerText;

        const jogo = {
            titulo: card.querySelector(".game-title").innerText,
            precoTexto: textoPreco, // Guardamos o texto para exibir
            precoNumerico: converterPreco(textoPreco), // Guardamos o número para somar
            imagem: "padrao.jpg" 
        };

        carrinho.push(jogo);
        salvarDados(); // Salva
        
        if (window.confirm("Jogo adicionado! Deseja ir para o carrinho agora?")) {
            window.location.href = "carrinho.html"; // Corrigido de 'carinho' para 'carrinho'
        }
    }
});


// =========================================================
// LÓGICA DE EXIBIR E REMOVER (Página do Carrinho)
// =========================================================

function atualizarCarrinho() {
    const containerCarrinho = document.querySelector(".cart-items");
    
    // Se não existir container (ex: estamos na home), para a função
    if (!containerCarrinho) return;

    containerCarrinho.innerHTML = ""; 

    if (carrinho.length === 0) {
        containerCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
        atualizarTotal();
        return;
    }

    for (let i = 0; i < carrinho.length; i++) {
        const item = carrinho[i];
        
        const htmlItem = `
        <div class="cart-item">
          <div class="cart-item-details">
            <h3>${item.titulo}</h3>
            <p>${item.precoTexto}</p>
          </div>
          <div class="cart-item-actions">
            <button class="btn-remove" data-index="${i}">Remover</button>
          </div>
        </div>
        `;
        
        containerCarrinho.innerHTML += htmlItem;
    }

    // Sempre que desenhar a lista, recalcula o total
    atualizarTotal();
}

// Evento de Remover
const containerItems = document.querySelector(".cart-items");
if (containerItems) {
    containerItems.addEventListener("click", function(event) {
        if (event.target.classList.contains("btn-remove")) {
            // Pega o índice
            const index = event.target.dataset.index;
            
            // Remove do array
            carrinho.splice(index, 1);
            
            // Salva o novo estado
            salvarDados();

            // Redesenha a tela (o total será recalculado automaticamente aqui dentro)
            atualizarCarrinho();
            
            // Opcional: Feedback visual discreto em vez de alert
            // window.alert("Jogo removido!"); 
        }
    });
}