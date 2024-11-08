const donations = [
  {
    id: 1,
    name: "FREE BOOKS",
    price: 0,
    image: "website images/books.png"
  },
  {
    id: 2,
    name: "CLOTHING",
    price: 0,
    image: "website images/clothing icon-homeless.png"
  },
  {
    id: 3,
    name: "FOOD",
    price: 100,
    image: "website images/food icon-homeless.webp"
  },
  {
    id: 4,
    name: "WATER",
    price: 50,
    image: "website images/water.png"
  },
  {
    id: 5,
    name: "SHELTER FARE",
    price: 100,
    image: "website images/shelter icon-homeless.png"
  }
];

const listDonationHTML = document.querySelector('.listDonation');
const listCartHTML = document.querySelector('.listCart');
const iconCart = document.querySelector('.icon-cart');
const iconCartSpan = document.querySelector('.icon-cart span');
const body = document.querySelector('body');
const closeCart = document.querySelector('.close');

let cart = [];

iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});

const addDataToHTML = () => {
  // Clear existing donations
  listDonationHTML.innerHTML = '';

  // Populate donation items
  donations.forEach(({ id, name, price, image }) => {
    const newDonation = document.createElement('div');
    newDonation.dataset.id = id;
    newDonation.classList.add('item');
    newDonation.innerHTML = `
      <img src="${image}" alt="">
      <h2>${name}</h2>
      <div class="price">R${price}</div>
      <button class="addCart">Add To Cart</button>`;
    listDonationHTML.appendChild(newDonation);
  });
};

listDonationHTML.addEventListener('click', (event) => {
  const positionClick = event.target;
  if (positionClick.classList.contains('addCart')) {
    const idDonation = positionClick.parentElement.dataset.id;
    addToCart(idDonation);
  }
});

const addToCart = (donationId) => {
  const positionInCart = cart.findIndex(item => item.id == donationId);
  
  if (positionInCart < 0) {
    cart.push({ id: donationId, quantity: 1 });
  } else {
    cart[positionInCart].quantity += 1;
  }
  
  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;

  if (cart.length > 0) {
    cart.forEach(item => {
      totalQuantity += item.quantity;
      const positionDonation = donations.find(donation => donation.id == item.id);

      if (positionDonation) {
        const { image, name, price } = positionDonation;
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.dataset.id = item.id;
        newItem.innerHTML = `
          <div class="image"><img src="${image}"></div>
          <div class="name">${name}</div>
          <div class="totalPrice">R${price * item.quantity}</div>
          <div class="quantity">
            <span class="minus"><</span>
            <span>${item.quantity}</span>
            <span class="plus">></span>
          </div>`;
        listCartHTML.appendChild(newItem);
      }
    });
  } else {
    listCartHTML.innerHTML = '<p>Cart is empty</p>';
  }

  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
  const positionClick = event.target;
  if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
    const donationId = positionClick.parentElement.parentElement.dataset.id;
    const actionType = positionClick.classList.contains('plus') ? 'plus' : 'minus';
    changeQuantityCart(donationId, actionType);
  }
});

const changeQuantityCart = (donationId, actionType) => {
  const positionItemInCart = cart.findIndex(item => item.id == donationId);
  
  if (positionItemInCart >= 0) {
    if (actionType === 'plus') {
      cart[positionItemInCart].quantity += 1;
    } else {
      if (cart[positionItemInCart].quantity === 1) {
        cart.splice(positionItemInCart, 1);
      } else {
        cart[positionItemInCart].quantity -= 1;
      }
    }

    addCartToMemory();
    addCartToHTML();
  }
};

const initApp = () => {
  addDataToHTML();
  
  const savedCart = localStorage.getItem('cart');
  cart = savedCart ? JSON.parse(savedCart) : [];
  addCartToHTML();
};

initApp();

const checkoutButton = document.querySelector('.checkOut');

checkoutButton.addEventListener('click', () => {
  // Clear the cart and update UI
  cart = [];
  addCartToMemory();
  addCartToHTML();
  
  // Change button color temporarily for feedback
  checkoutButton.style.backgroundColor = 'green';
  setTimeout(() => {
    checkoutButton.style.backgroundColor = '';
  }, 2000);
});
