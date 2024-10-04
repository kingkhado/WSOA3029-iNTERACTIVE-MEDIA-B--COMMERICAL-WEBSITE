let listDonationHTML = document.querySelector('.listDonation');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let donations = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(donations.length > 0) // if has data
        {
            donations.forEach(donation => {
                let newDonation = document.createElement('div');
                newDonation.dataset.id = donation.id;
                newDonation.classList.add('item');
                newDonation.innerHTML = 
                `<img src="${donation.image}" alt="">
                <h2>${donation.name}</h2>
                <div class="price">R${donation.price}</div>
                <button class="addCart">Add To Cart</button>`;
                listDonationHTML.appendChild(newDonation);
            });
        }
    }

    listDonationHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_donation = positionClick.parentElement.dataset.id;
            addToCart(id_donation);
        }
    })

    const addToCart = (donation_id) => {
        let positionThisDonationInCart = cart.findIndex((value) => value.id == donation_id); // Changed to id
        if(cart.length <= 0){
            cart = [{
                id: donation_id, // Changed to id
                quantity: 1
            }];
        }else if(positionThisDonationInCart < 0){
            cart.push({
                id: donation_id, 
                quantity: 1
            });
        }else{
            cart[positionThisDonationInCart].quantity = cart[positionThisDonationInCart].quantity + 1;
        }
        addCartToHTML();
        addCartToMemory();
    }
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.id;

            let positionDonation = donations.findIndex((value) => value.id == item.id); 
            if(positionDonation >= 0) { // Check if the donation is found
                let info = donations[positionDonation];
                listCartHTML.appendChild(newItem);
                newItem.innerHTML = `
                <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">
                    ${info.name}
                    </div>
                    <div class="totalPrice">R${info.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus">></span>
                    </div>
                `;
            }
        })
    }
    iconCartSpan.innerText = totalQuantity;
}


listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let donation_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(donation_id, type);
    }
})

const changeQuantityCart = (donation_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.id == donation_id); // Changed to id
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}
const initApp = () => {
    // get data donation
    fetch('/.vscode/donations.json')
    .then(response => response.json())
    .then(data => {
        donations = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();