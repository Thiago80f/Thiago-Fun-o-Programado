// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const produtos = [
        { id: 1, nome: 'Processador Intel i7', categoria: 'processadores', preco: 1200, imagem: 'processador.jpg' },
        { id: 2, nome: 'Placa-Mãe ASUS', categoria: 'placas-mae', preco: 800, imagem: 'placa-mae.jpg' },
        { id: 3, nome: 'Memória RAM 16GB', categoria: 'memorias', preco: 400, imagem: 'memoria.jpg' },
        // Adicione mais produtos conforme necessário
    ];

    const listaProdutos = document.querySelector('.lista-produtos');

    function renderProdutos(produtos) {
        listaProdutos.innerHTML = '';
        produtos.forEach(produto => {
            const produtoElement = document.createElement('div');
            produtoElement.classList.add('produto');
            produtoElement.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$${produto.preco}</p>
                <button data-id="${produto.id}">Adicionar ao Carrinho</button>
            `;
            listaProdutos.appendChild(produtoElement);
        });
    }

    renderProdutos(produtos);

    // Filtros de Pesquisa
    const categoriaSelect = document.getElementById('categoria');
    const precoSelect = document.getElementById('preco');
    const filtroButton = document.getElementById('filtrar-btn');
    const pesquisaInput = document.getElementById('pesquisa');
    const buscarButton = document.getElementById('buscar-btn');

    filtroButton.addEventListener('click', () => {
        const categoria = categoriaSelect.value;
        const preco = precoSelect.value;

        let produtosFiltrados = produtos;

        if (categoria) {
            produtosFiltrados = produtosFiltrados.filter(produto => produto.categoria === categoria);
        }

        if (preco) {
            const [min, max] = preco.split('-').map(Number);
            produtosFiltrados = produtosFiltrados.filter(produto => produto.preco >= min && produto.preco <= max);
        }

        renderProdutos(produtosFiltrados);
    });

    buscarButton.addEventListener('click', () => {
        const pesquisa = pesquisaInput.value.toLowerCase();
        const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(pesquisa));
        renderProdutos(produtosFiltrados);
    });

    // Carrinho de Compras
    const carrinhoItens = document.querySelector('.carrinho-itens');
    const totalElement = document.querySelector('.total p');
    let carrinho = [];

    listaProdutos.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const produtoId = Number(event.target.dataset.id);
            const produto = produtos.find(p => p.id === produtoId);
            carrinho.push(produto);
            atualizarCarrinho();
        }
    });

    function atualizarCarrinho() {
        carrinhoItens.innerHTML = '';
        let total = 0;
        carrinho.forEach(produto => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <p>${produto.nome}</p>
                <p>R$${produto.preco}</p>
            `;
            carrinhoItens.appendChild(itemElement);
            total += produto.preco;
        });
        totalElement.textContent = `Total: R$${total.toFixed(2)}`;
    }
});
// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');

    const promotionForm = document.getElementById('promotion-form');
    const promotionsContainer = document.getElementById('promotions-container');
    const adminLoginButton = document.getElementById('admin-login-button');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminPasswordInput = document.getElementById('admin-password');

    const adminPassword = 'admin123'; // Altere esta senha conforme necessário

    // Postagem de conteúdo
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

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => {
            post.remove();
        });
        post.appendChild(deleteButton);

        postsContainer.prepend(post);

        form.reset();
    });

    // Postagem de promoções
    promotionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = promotionForm['promotion-title'].value;
        const content = promotionForm['promotion-content'].value;

        const promotion = document.createElement('div');
        promotion.className = 'promotion';

        const promotionTitle = document.createElement('h3');
        promotionTitle.textContent = title;
        promotion.appendChild(promotionTitle);

        const promotionContent = document.createElement('p');
        promotionContent.textContent = content;
        promotion.appendChild(promotionContent);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => {
            promotion.remove();
        });
        promotion.appendChild(deleteButton);

        promotionsContainer.prepend(promotion);

        promotionForm.reset();
    });

    // Login de admin
    adminLoginButton.addEventListener('click', () => {
        adminLoginForm.style.display = 'block';
    });

    document.getElementById('admin-login-submit').addEventListener('click', () => {
        const password = adminPasswordInput.value;
        if (password === adminPassword) {
            adminLoginForm.style.display = 'none';
            adminLoginButton.style.display = 'none';
            promotionForm.style.display = 'block';
        } else {
            alert('Senha incorreta!');
        }
    });
});
 document.getElementById('postForm').addEventListener('submit', function (e) {
                e.preventDefault();
                const content = document.getElementById('content').value;

                fetch('/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: content }),
                })
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('message').innerText = data.message;
                        document.getElementById('content').value = ''; // Limpa o formulário
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
 });
  // scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');

    const promotionForm = document.getElementById('promotion-form');
    const promotionsContainer = document.getElementById('promotions-container');
    const adminLoginButton = document.getElementById('admin-login-button');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminPasswordInput = document.getElementById('admin-password');

    const adminPassword = 'admin123'; // Altere esta senha conforme necessário

    // Postagem de conteúdo
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

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => {
            post.remove();
        });
        post.appendChild(deleteButton);

        postsContainer.prepend(post);

        form.reset();
    });

    // Postagem de promoções
    promotionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = promotionForm['promotion-title'].value;
        const content = promotionForm['promotion-content'].value;

        const promotion = document.createElement('div');
        promotion.className = 'promotion';

        const promotionTitle = document.createElement('h3');
        promotionTitle.textContent = title;
        promotion.appendChild(promotionTitle);

        const promotionContent = document.createElement('p');
        promotionContent.textContent = content;
        promotion.appendChild(promotionContent);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => {
            promotion.remove();
        });
        promotion.appendChild(deleteButton);

        promotionsContainer.prepend(promotion);

        promotionForm.reset();
    });

    // Login de admin
    adminLoginButton.addEventListener('click', () => {
        adminLoginForm.style.display = 'block';
    });

    document.getElementById('admin-login-submit').addEventListener('click', (event) => {
        event.preventDefault();
        const password = adminPasswordInput.value;
        if (password === adminPassword) {
            adminLoginForm.style.display = 'none';
            adminLoginButton.style.display = 'none';
            promotionForm.style.display = 'block';
        } else {
            alert('Senha incorreta!');
        }
    });
});
          
