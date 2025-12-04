document.querySelector(".btn-add-funds").addEventListener("click", function() {
    
    // 1. Pega o elemento do saldo
    let elementoSaldo = document.querySelector(".balance-amount");

    // 2. Limpa o texto "R$" e troca vírgula por ponto para o JS entender
    // Ex: "R$ 50,00" vira "50.00"
    let textoLimpo = elementoSaldo.innerText.replace("R$", "").replace(",", ".").trim();
    let dinheiroAtual = parseFloat(textoLimpo);

    // 3. Pede o valor ao usuário
    let inputUsuario = window.prompt("Insira o valor para adicionar:");

    // 4. Converte o input (trocando vírgula por ponto se o usuário digitar 10,50)
    let valorAdicionar = parseFloat(inputUsuario.replace(",", "."));

    // 5. Verifica se é um número válido antes de somar
    if (!isNaN(valorAdicionar)) {
        let total = dinheiroAtual + valorAdicionar;

        // 6. Formata de volta para o padrão brasileiro (R$ X,XX)
        elementoSaldo.innerText = "R$ " + total.toFixed(2).replace(".", ",");
    } else {
        alert("Por favor, digite um número válido.");
    }
});