const btnCart= document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
})
btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
})

document.addEventListener('DOMContentLoaded',loadCam);

function loadCam(){
    loadContent();
}

function loadContent(){
    //remove cam item from cart
    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });
    //product changing
    let qtyElements=document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>{
        input.addEventListener('change',changeQty);
    });
    //product add
    let btnAdd=document.querySelectorAll('.add-cart');
    btnAdd.forEach((btnI)=>{
        btnI.addEventListener('click',addItem);
        
    });
    totalAmount();
    


}

//remove item
function removeItem(){
    if(confirm('Is it ok to remove item?')){
        let title=this.parentElement.querySelector('.cart-cam-title').innerHTML;
        itemList=itemList.filter(el=>el.title!=title);
        this.parentElement.remove();
        loadContent();
    
}}
//quantity changing
function changeQty(){
    if(isNaN(this.value)|| this.value<1){
        this.value=1;
    }
    loadContent();

}

let itemList=[];

//add cart
function addItem(){
    let cam=this.parentElement;
    let title=cam.querySelector('.cam-title').innerHTML;
    let price=cam.querySelector('.cam-price').innerHTML;
    let imgSrc=cam.querySelector('.cam-img').src;

    let newProduct={title,price,imgSrc};
//check product existance
if(itemList.find((el=>el.title==newProduct.title)))
{
    alert("Product already added");
    return;
}
else{
    itemList.push(newProduct)
}


    let newProductElement=createCartProduct(title,price,imgSrc);
    

    let element=document.createElement('div');
    element.innerHTML=newProductElement;
    let cartBasket=document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();
}
function createCartProduct(title,price,imgSrc){
    return `
        <div class="cart-box">
<img src="${imgSrc}" class="cart-img">
<div class="detail-box">
<div class="cart-cam-title">${title}</div>
<div class="price-box">
<div class="cart-price">${price}</div>
<div class="cart-amt">${price}</div>
</div>
<input type="number" value="1" class="cart-quantity">
</div>
<ion-icon name="trash" class="cart-remove"></ion-icon>
</div>
`;

}
function totalAmount(){
    const cartItem=document.querySelectorAll('.cart-box');
    const totalCost=document.querySelector('.total-price');

    let total=0;
    cartItem.forEach(product=>{
        let priceElement=product.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText="Rs."+price*qty;
    });
    totalCost.innerHTML="Rs."+total;

    //cart count
    const cartCount=document.querySelector('.cart-count');
    let count=itemList.length;
    cartCount.innerHTML=count;
    if (count==0){
        cartCount.style.display='none';
    }else{
        cartCount.style.display='block';
    }
}
