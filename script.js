const productContainer=document.getElementById("productContainer")
const cartContainer=document.getElementById("cartContainer")
const feedback=document.getElementById("feedback")
const products=[
    { id:1, product:"Laptop", Price:50000 },
    { id:2, product:"Mobile", Price:20000 }, 
    { id:3, product:"Headphones", Price:500 },
    { id:4, product:"Shirt", Price:500 },
    { id:5, product:"Tv", Price:30000 },
]

let cart=[];   // changed from const → let

products.forEach(function(products){
    const productRow=
    ` <div class="product-row">
        <p>${products.product} - Rs. ${products.Price}</p>
        <button onclick="addToCart(${products.id})">Add to cart</button>
      </div>`
   productContainer.insertAdjacentHTML("beforeend",productRow)
})

function addToCart(id){
    const isProductAvailable=cart.some(function(product){
       return product.id===id;
    })
    if(isProductAvailable){
        const Cartproduct= products.find(function(product){
            return product.id===id;
        })
        updateUser(`${Cartproduct.product} is already added to the cart`,"error");
        return;
    }

    const Cartproduct= products.find(function(product){
        return product.id===id;
    })

    cart.push(Cartproduct);
    RenderCartDetails()
    updateUser(`${Cartproduct.product} is added to the cart`,"success");
}

function RenderCartDetails(){
    cartContainer.innerHTML="";
    let total=0;

    cart.forEach(function(products){
        const {id:productid,product,Price}=products
        total+=Price;
        const CartRow=`
          <div class="product-row">
            <p>${product} - Rs. ${Price}</p>
            <button onclick="RemoveFromCart(${productid})">Remove</button>
          </div>`
        cartContainer.insertAdjacentHTML("beforeend",CartRow)
    })

    // update total
    let totalElement=document.getElementById("cartTotal");
    if(!totalElement){
        totalElement=document.createElement("h3");
        totalElement.id="cartTotal";
        cartContainer.insertAdjacentElement("afterend",totalElement);
    }
    totalElement.textContent=`Total: Rs. ${total}`;
}

function RemoveFromCart(productid){
    cart=cart.filter(function(product){
        return product.id!==productid
    })
    RenderCartDetails();
    updateUser("Item removed from cart","error");
}

let timerId;
function updateUser(msg,type){
    clearTimeout(timerId)
    feedback.style.display="block";
    feedback.style.color="white";

    if(type==="success"){
        feedback.style.backgroundColor="green";
    }
    if(type==="error"){
        feedback.style.backgroundColor="red";
    }

    feedback.textContent=msg;
    timerId=setTimeout(function(){
        feedback.style.display="none";
    },3000)
}
function sortCart(){
    cart.sort(function(a,b){
        return a.Price - b.Price;   // ascending order
    });
    RenderCartDetails();
    updateUser("Cart sorted by price","success");
}

function clearCart(){
    cart = [];  // empty cart
    RenderCartDetails();
    updateUser("Cart cleared","error");
}

