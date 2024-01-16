let cartstorage=JSON.parse(localStorage.getItem('product'))
// console.log(cartstorage)



let rootElement=document.getElementById('root')
let card_total=document.getElementById('cart_total')

// ----------show menu---------
let navMenu=document.getElementById('nav_menu');
let navToggle=document.getElementById('nav_toggle');
let navClose=document.getElementById('nav_close');

navToggle.addEventListener('click' , ()=>{
    navMenu.classList.add('show-menu')
}) 

navClose.addEventListener('click' , ()=>{
    navMenu.classList.remove('show-menu')
})

// ----------search-------------
let search=document.getElementById('search');
let searchbtn=document.getElementById('search-btn');
let searchclose=document.getElementById('search-close');

searchbtn.addEventListener('click' , ()=>{
    search.classList.add('show-search')
}) 

searchclose.addEventListener('click' , ()=>{
    search.classList.remove('show-search')
})

card_total.textContent=`Total price : 0`


function displaydata(cartstorage){
    rootElement.innerHTML=null;
    let sum=0;
    
    cartstorage.forEach((product,idx) => {
     
    let productcard= document.createElement("div")
    productcard.className="product-card"


    let productImage = document.createElement("img")
    productImage.src=product.image

    let productTitle= document.createElement("p")
    productTitle.className="tittle"
    productTitle.textContent=product.title

    let productprice= document.createElement("p")
    productprice.textContent=` Price : ${parseInt(product.price)}`

    let productcategory= document.createElement("p")
    productcategory.textContent=`Category : ${product.category}`

    let productrating= document.createElement("p")
    productrating.textContent=`Ratings : ${product.rating.rate}`

    let productreviews= document.createElement("p")
    productreviews.textContent=` Number of Reviews : ${product.rating.count}`

    let quantity=document.createElement('div')
    quantity.className="quantity_controller";
    quantity.innerHTML=`<button id="decrease" class="increment-btn">-</button>
    <p class="px-2" id="currentQuantity">${product.quantity}</p>
    <button id="increase" class="increment-btn ">+</button>`
    

    

    
     let decrementButton = quantity.querySelector('#decrease'); 
     decrementButton.addEventListener('click',()=>{
        decrease();
        displaydata(cartstorage)
    })
    
    let incrementButton = quantity.querySelector('#increase'); 
     incrementButton.addEventListener('click',()=>{
        
       
        
        increase()
        displaydata(cartstorage)
    })
    function increase(){
       

        //    let previousQuantity=product.quantity;
           product.quantity+=1;
           let index=cartstorage.findIndex(item => item.id===product.id)
           cartstorage.splice(index,1,product)

        
        localStorage.setItem("product",JSON.stringify(cartstorage))
        
    }

    function decrease(){
       

        let previousQuantity=product.quantity;

        if(previousQuantity===1){
           cartstorage.splice(idx,1,)
           localStorage.setItem("product",JSON.stringify(cartstorage))
           localStorage1=JSON.parse(localStorage.getItem('product'))

           alert("Want to remove item from Cart?")

           sum-=parseInt(product.price)
           card_total.textContent=`Total price : ${sum}`;
        }
        else{
        product.quantity-=1;
        let index=cartstorage.findIndex(item => item.id===product.id)
        cartstorage.splice(index,1,product)
        
        localStorage.setItem("product",JSON.stringify(cartstorage))
        }
 }










    // let remove= document.createElement("button")
    // remove.textContent=`Remove`
    // remove.addEventListener('click',()=>{
    //     cartstorage.splice(index,1)

    //     localStorage.setItem("product",JSON.stringify(cartstorage))
    
    //     localStorage1=JSON.parse(localStorage.getItem('product'))
    //     sum-=product.price
    //     card_total.textContent=`Total price : ${sum}`;
        
    //     displaydata(localStorage1)

    // })
    let countPrice=function(){
        sum+=(parseInt(product.price)*product.quantity)
        card_total.textContent=`Total price : ${sum}`;
        
    
        }
        countPrice()

    productcard.append(
        productImage,
        productTitle,
        productprice,
        productcategory,
        productrating,
        productreviews,
        // remove
        quantity
    )
    rootElement.append(productcard)

  });


}


displaydata(cartstorage)




















// ${product.quantity}