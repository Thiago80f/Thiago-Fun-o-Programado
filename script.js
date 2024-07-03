let carrinho = []; // Array para armazenar os itens do carrinho

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome: nome, preco: preco });
    atualizarCarrinho();
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = ''; // Limpa o conteúdo atual do carrinho

    let total = 0;
    carrinho.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        listaCarrinho.appendChild(listItem);
        total += item.preco;
    });

    // Atualiza o total do carrinho
    document.getElementById('total-carrinho').textContent = total.toFixed(2);
}

// Função para simular o checkout
function realizarCheckout() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de finalizar a compra.');
        return;
    }

    // Simulação de processo de checkout
    alert('Compra realizada com sucesso! Total: R$ ' + document.getElementById('total-carrinho').textContent);
    carrinho = []; // Limpa o carrinho após a compra
    atualizarCarrinho();
}
