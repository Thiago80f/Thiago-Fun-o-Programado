document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

    function initMap() {
        var location = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: location
        });
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    function checkVisibility() {
        galleryItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                item.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    checkVisibility(); // Verifique a visibilidade inicial ao carregar a página
});
document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;

    function showNextTestimonial() {
        testimonials[currentIndex].style.transform = 'translateX(-100%)';
        currentIndex = (currentIndex + 1) % totalTestimonials;
        testimonials[currentIndex].style.transform = 'translateX(0)';
    }

    setInterval(showNextTestimonial, 5000); // Mudar a cada 5 segundos
});
document.addEventListener('DOMContentLoaded', function() {
    const countdownDate = new Date("Jul 4, 2024 15:00:00").getTime();
    const countdownElement = document.getElementById('countdown-timer');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(x);
            countdownElement.innerHTML = "EXPIRED";
        }
    }

    setInterval(updateCountdown, 1000);
});
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productCard = event.target.closest('.product-card');
        const productId = productCard.dataset.id;
        const productName = productCard.dataset.name;
        const productPrice = parseFloat(productCard.dataset.price);

        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            };
            cart.push(product);
        }

        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(product => {
            total += product.price * product.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h4>${product.name}</h4>
                <p>${product.quantity} x R$ ${product.price.toFixed(2)}</p>
                <button class="remove-from-cart" data-id="${product.id}">Remover</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalElement.textContent = total.toFixed(2);

        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    function removeFromCart(event) {
        const productId = event.target.dataset.id;
        cart = cart.filter(product => product.id !== productId);

        updateCart();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;

        appendMessage('user', userMessage);
        userInput.value = '';

        // Simular resposta do chatbot após um pequeno atraso (simulação simples)
        setTimeout(() => {
            handleBotResponse(userMessage.toLowerCase());
        }, 500);
    }

    function handleBotResponse(message) {
        let response = 'Desculpe, não entendi. Como posso ajudar?';

        if (message.includes('produto') || message.includes('comprar')) {
            response = 'Temos uma grande variedade de produtos. Como posso ajudar especificamente?';
        } else if (message.includes('promoção') || message.includes('desconto')) {
            response = 'Atualmente estamos com promoções em produtos selecionados. Você gostaria de ver nossas ofertas?';
        } else if (message.includes('horário') || message.includes('atendimento')) {
            response = 'Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.';
        } else if (message.includes('contato') || message.includes('telefone')) {
            response = 'Você pode entrar em contato conosco pelo telefone (33) 998756987 ou pelo nosso email thigasnoob@gmail.com.';
        }

        appendMessage('bot', response);
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender === 'bot' ? 'bot' : 'user');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatBox.appendChild(messageElement);

        // Rolagem automática para exibir a última mensagem
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
