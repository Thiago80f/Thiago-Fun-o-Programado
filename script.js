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
// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Adicione funcionalidades JavaScript aqui, como carregar vídeos, imagens e textos dinamicamente
});
// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const title = form.title.value;
        const content = form.content.value;
        const file = form.file.files[0];

        const post = document.createElement('div');
        post.className = 'post';
        
        const postTitle = document.createElement('h3');
        postTitle.textContent = title;
        post.appendChild(postTitle);
        
        const postContent = document.createElement('p');
        postContent.textContent = content;
        post.appendChild(postContent);

        if (file) {
            const fileURL = URL.createObjectURL(file);
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = fileURL;
                img.style.maxWidth = '100%';
                post.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = fileURL;
                video.controls = true;
                video.style.maxWidth = '100%';
                post.appendChild(video);
            }
        }

        postsContainer.prepend(post);

        form.reset();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        product.addEventListener('mouseenter', () => {
            product.classList.add('animate__pulse');
        });

        product.addEventListener('animationend', () => {
            product.classList.remove('animate__pulse');
        });

        product.addEventListener('mouseleave', () => {
            product.classList.remove('animate__pulse');
        });
    });
});
