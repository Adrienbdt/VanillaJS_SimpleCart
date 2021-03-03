let carts = document.querySelectorAll(".add-cart");
const productsClass = document.querySelector(".products");

let products = [
  {
    name: "White Shirt",
    tag: "whiteShirt",
    price: 20.0,
    inCart: 0,
  },
  {
    name: "Blue Shirt",
    tag: "blueShirt",
    price: 15.0,
    inCart: 0,
  },
  {
    name: "Pink Shirt",
    tag: "pinkShirt",
    price: 15.0,
    inCart: 0,
  },
  {
    name: "DarkBlue Shirt",
    tag: "dBlueShirt",
    price: 25.0,
    inCart: 0,
  },
  {
    name: "Button Up Shirt",
    tag: "btnUpShirt",
    price: 20.0,
    inCart: 0,
  },
];

// Event listener on all items - loop / click triggers function cartNumbers()
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

// Cart will check local storage onload
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

// cartNumber()
function cartNumbers(product) {
  //   console.log("the product is ", product);

  // Defining how many items by looking at the local storage
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers); //convert String to Number

  // Since we clicked on it, if there is a productNumber already in the ls? we add 1 to the number else we initiate it to 1
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

/* SET ITEMS IN THE CART BASED ON THE LOCAL STORAGE */

function setItems(product) {
  // we fetch the local storage - we need to convert the JSON to an object right after
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    // console.log(`The cart is not empty`);
    // for an item never added to the local storage
    if (cartItems[product.tag] == undefined) {
      //   console.log(
      //     `This product is not part of the local storage cart`,
      //     cartItems[product.tag]
      //   );
      cartItems = {
        ...cartItems, // we grab whatever cartItems was there before (rest operator)
        [product.tag]: product, // we add the new product to our cart items
      };
    }
    // console.log(
    //   `The current quantity for this product in our cartItems is ${
    //     cartItems[product.tag].inCart
    //   }`
    // );
    cartItems[product.tag].inCart += 1; // we add an additional product to the quantity of products in our cart
    // console.log(
    //   `The UPDATED quantity for this product in our cartItems is ${
    //     cartItems[product.tag].inCart
    //   }`
    // );
  } else {
    product.inCart = 1; //we define a quantity of 1 for this product
    cartItems = {
      // we store the product with its quantity in an object
      [product.tag]: product,
    };
  }
  // we add the object to the local storage key / value
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  console.log(`The product price is ${product.price}`);
  let prevTotal = localStorage.getItem("totalCost");

  if (prevTotal != null) {
    prevTotal = parseInt(prevTotal);

    localStorage.setItem("totalCost", prevTotal + product.price);
    // console.log(typeof prevTotal);
    // console.log("local storage prevTotal as a number: ", prevTotal);
    // console.log(`previous totalCost is above to 0`);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
  console.log(`The PrevTotal is ${prevTotal}`);
}

const displayCheckout = () => {
  let detailsTotal = JSON.parse(localStorage.getItem("totalCost"));
  let detailsCart = JSON.parse(localStorage.getItem("productsInCart"));
  console.log(detailsTotal);
  console.log(detailsCart);

  // if theres a local storage with our items && the div does exist on the page we 're on :
  if (detailsCart && productsClass) {
    productsClass.innerHTML = "";
    Object.values(detailsCart).map((item) => {
      productsClass.innerHTML += `
      <div class="product">
        <ion-icon name="close-circle"></ion-icon>
        <img src="./img/${item.tag}.jpg">
        <span>${item.name}</span>
      </div>
      <div class="price">$${item.price}</div>
      <div class="quantity">
        <ion-icon class="decrease" name="caret-back-circle-outline"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon class="increase" name="caret-forward-circle-outline"></ion-icon>
      </div>
      <div class="total">
      ${item.inCart * item.price},00 
      </div>
      `;
    });
    productsClass.innerHTML += `
    <div class="basketTotalContainer">
    <h4 class="basketTotalTitle">
      Basket Total
      </h4>
      <h4 class="basketTotal">
      $${detailsTotal}
      </h4>
    </div>
    `;
  }
};

// On load, cart checks into local storage to give the right number (top right)
onLoadCartNumbers();
displayCheckout();

// movs.forEach((mov, i) => {
//   const html = `
// <div class="movements__row">
//   <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
//   <div class="movements__value">${mov}</div>
// </div>`;
//   containerMovements.insertAdjacentHTML('afterbegin', html); //methods accepts 2 strings for arguments, position and string for the element to be insterted ... see mdn for more info
// });
// };
