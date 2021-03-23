//Define inventory List
const products = [
  {
    id: "6338214505",
    name: "Bread - Wheat Baguette",
    quantity: 4,
    price: 11.86,
  },
  {
    id: "5629724673",
    name: "Cheese - Marble",
    quantity: 15,
    price: 15.26,
  },
  {
    id: "9938377157",
    name: "Cheese - Cheddar, Old White",
    quantity: 6,
    price: 6.41,
  },
  {
    id: "5003144229",
    name: "Wine - Chardonnay Mondavi",
    quantity: 3,
    price: 76.61,
  },
  {
    id: "6343193618",
    name: "Wine - Red, Mouton Cadet",
    quantity: 0,
    price: 80.71,
  },
  {
    id: "3419067291",
    name: "Wine - White, Schroder And Schyl",
    quantity: 10,
    price: 95.93,
  },
  {
    id: "1732685673",
    name: "Wine - Riesling Dr. Pauly",
    quantity: 5,
    price: 20.22,
  },
  {
    id: "7695609285",
    name: "Juice - Lime",
    quantity: 2,
    price: 86.3,
  },
];

//Define Current Cart
let currentCart = [];

//Check if a product exists in a inventory list
function checkAvailability(arr, val) {
  const found = arr.some((el) => el.id === val);
  return found;
}

//Get inventory List
exports.getInventory = function (req, res) {
  res.header("Content-type: application/json");
  if (currentCart.length > 1) {
    let totalCartPrice = currentCart.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
    totalCartPrice = totalCartPrice.toFixed(2);
    res.send({
      Inventory: products,
      CurrentCart: currentCart,
      totalCartPrice: totalCartPrice,
    });
  } else {
    res.send({ Inventory: products, CurrentCart: currentCart });
  }
};


//Post an item to current cart
exports.addItemNbi67 = function (req, res) {
  res.header("Content-Type", "application/json");
  let currentProduct = products.find((currentObj) => {
    if (currentObj.id == req.body.id) {
      return currentObj;
    }
  });

  if (currentCart.length > 0) {
    let availability = checkAvailability(currentCart, currentProduct.id);
    if (availability) {
      currentCart.find((obj) => {
        if (obj.id == currentProduct.id) {
          var index = currentCart.indexOf(obj);
          const quantity = obj.quantity;
          const basePrice = currentProduct.price;
          const finalPrice = basePrice + obj.price;
          currentProduct = {
            ...currentProduct,
            quantity: quantity + 1,
            price: Number(finalPrice.toFixed(2)),
          };
          currentCart.splice(index, 1, currentProduct);
        }
      });
    } else {
      currentProduct = {
        ...currentProduct,
        quantity: 1,
      };
      //currentProduct.quantity = 1;
      currentCart.push(currentProduct);
    }
  } else {
    currentProduct = {
      ...currentProduct,
      quantity: 1,
    };
    currentCart.push(currentProduct);
  }

  let totalCartPrice = currentCart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );
  totalCartPrice = totalCartPrice.toFixed(2);
  res.send({
    Inventory: products,
    CurrentCart: currentCart,
    totalCartPrice: totalCartPrice,
  });
};

exports.removeItemNbi67 = function (req, res) {
  res.header("Content-type: application/json");
  let idToDelete = req.body.id;
  currentCart.map((product) => {
    if (product.id == idToDelete) {
      if (product.quantity > 1) {
        const quantity = product.quantity;
        const basePrice = product.price / product.quantity;
        const finalPrice = product.price - basePrice;
        product.quantity = quantity - 1;
        product.price = Number(finalPrice.toFixed(2));
      } else {
        currentCart = currentCart.filter((obj) => obj.id != idToDelete);
      }
    }
  });
  totalCartPrice = currentCart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );

  totalCartPrice = totalCartPrice.toFixed(2);
  res.send({
    Inventory: products,
    CurrentCart: currentCart,
    totalCartPrice: totalCartPrice,
  });
};

// post - checkout currentcart and update inventory
exports.checkout = function (req, res) {
  res.header("Content-type: application/json"); 
  let updatedInventory = products.filter((inventoryItem) =>
    currentCart.some(({ id, quantity }) => {
      if (inventoryItem.id === id) {
        if (inventoryItem.quantity > quantity) {
          inventoryItem.quantity = inventoryItem.quantity - quantity;
        } else {
          inventoryItem.quantity = 0;
        }

        return inventoryItem;
      }
    })
  );
  updatedInventory=[...products]  
  res.send({ Inventory: updatedInventory, CurrentCart: [], totalCartPrice: 0 });
};
