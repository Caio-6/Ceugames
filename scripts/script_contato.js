    function enviar(event) {
    // 1. Usamos .value para pegar o TEXTO digitado
    // 2. Usamos const ou let para declarar variáveis (boas práticas)
    const input = document.querySelector("input").value;
    const mensagem = document.querySelector("textarea").value;

    // 3. Usamos === para comparar e .trim() para ignorar espaços em branco
    if (input.trim() === "" || mensagem.trim() === "") {
        window.alert("Preencha os campos corretamente");
        
        // Impede o envio do formulário se houver erro
        event.preventDefault(); 
    } else {
        window.alert("Obrigado por falar conosco! Te responderemos assim que pudermos");
        // Aqui o formulário será enviado normalmente
    }
}