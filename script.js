const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');


if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}









$(document).ready(function() {
    // Funcție pentru a adăuga un produs în coș
    $('.add-to-cart').on('click', function() {
        // Preia detaliile produsului din atributele data-*
        let productImg = $(this).data('img');
        let productName = $(this).data('name');
        let productPrice = parseFloat($(this).data('price'));

        // Preia mărimea selectată
        let productSize = $(this).siblings('.size-select').val();
        if (!productSize) {
            alert('Te rog să alegi o mărime!');
            return;
        }

        // Preia cantitatea
        let productQuantity = parseInt($(this).siblings('.quantity-input').val());
        if (productQuantity < 1) {
            alert('Cantitatea trebuie să fie cel puțin 1!');
            return;
        }

        // Creează un obiect pentru produs, incluzând mărimea
        let productItem = {
            img: productImg,
            name: productName,
            price: productPrice,
            size: productSize,
            quantity: productQuantity
        };

        // Obține coșul curent din localStorage (dacă există)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Verifică dacă produsul cu aceeași mărime există deja în coș
        let existingProduct = cart.find(item => item.name === productName && item.size === productSize);
        if (existingProduct) {
            existingProduct.quantity += productQuantity; // Incrementăm cantitatea
        } else {
            cart.push(productItem); // Adăugăm produsul nou
        }

        // Salvează coșul actualizat în localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Alertă utilizatorului că produsul a fost adăugat
        alert(`${productName} (Mărime: ${productSize}) a fost adăugat în coș!`);

        // Opțional: Redirecționează către coș
        // window.location.href = 'cart.html';
    });
});

$(document).ready(function() {
    // Funcție pentru a afișa coșul
    function displayCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartTableBody = $('#cart tbody');
        let subtotalElement = $('#subtotal table tr:nth-child(1) td:last-child');
        let totalElement = $('#subtotal table tr:nth-child(3) td:last-child');
        let cartTotal = 0;

        // Golește tabelul curent
        cartTableBody.empty();

        // Adaugă fiecare produs în tabel
        cart.forEach((item, index) => {
            let subtotal = item.price * item.quantity;
            cartTotal += subtotal;

            cartTableBody.append(`
                <tr>
                    <td><a href="#" class="remove-item" data-index="${index}"><i class="fa-regular fa-circle-xmark"></i></a></td>
                    <td><img src="${item.img}" alt="${item.name}"></td>
                    <td>${item.name}</td>
                    <td>${item.size}</td>
                    <td>${item.price} lei</td>
                    <td><input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}"></td>
                    <td>${subtotal} lei</td>
                </tr>
            `);
        });

        // Actualizează subtotalul și totalul
        subtotalElement.text(`${cartTotal} lei`);
        totalElement.text(`${cartTotal} lei`); // Dacă transportul e gratis, totalul e același cu subtotalul
    }

    // Afișăm coșul la încărcarea paginii
    displayCart();

    // Funcție pentru a elimina un produs din coș
    $(document).on('click', '.remove-item', function(e) {
        e.preventDefault();
        let index = $(this).data('index');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Eliminăm produsul din coș
        cart.splice(index, 1);

        // Actualizăm localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Reafișăm coșul
        displayCart();
    });

    // Funcție pentru a actualiza cantitatea
    $(document).on('change', '.quantity-input', function() {
        let index = $(this).data('index');
        let newQuantity = parseInt($(this).val());
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Actualizăm cantitatea produsului
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
        } else {
            // Dacă cantitatea este 0 sau mai mică, eliminăm produsul
            cart.splice(index, 1);
        }

        // Actualizăm localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Reafișăm coșul
        displayCart();
    });
});