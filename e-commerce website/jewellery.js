let rootElement=document.getElementById("root")



let sortbtn=document.getElementById('sort')

let searchinp=document.getElementById('search_input')
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
let searchform=document.getElementById('search_form')
searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
})








let API_URL="https://fakestoreapi.com/products/category/jewelery";

async function getdata(url){
    try{
        let rawdata = await fetch(url);
        let finaldata = await rawdata.json();
        return finaldata;
    }
    catch(err){
        console.log(err)
    }
}


async function init(){
    try {
        let productdata = await getdata(API_URL)
         displaydata(productdata)
         dataForFilter(productdata)
         return productdata;
         
    } catch (error) {
        console.log(error)
    }
}

 init()

 let Cart=localStorage.getItem("product")?JSON.parse(localStorage.getItem("product")):null;
if (Cart==null){
Cart=[];
localStorage.setItem("product",JSON.stringify(Cart))
}

function displaydata(productlist){
    rootElement.innerHTML=null;
  productlist.forEach(function(product) {
     
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

    let addtocart= document.createElement("button")
    addtocart.textContent=`Add to Cart`

    let itemExisting = Cart.find(item => item.id === product.id);
    
    if(itemExisting){
         addtocart.textContent="Go to Cart";
    }

    function myLocation(){
        
        location.href="Cart.html"
    }
    addtocart.addEventListener('click',()=>{
        
       if(itemExisting){
        setTimeout(()=>{
            myLocation();
        },200)
            
        }
        else{
        product.quantity=1;
        Cart.push(product);
        localStorage.setItem("product",JSON.stringify(Cart));
        }
        displaydata(productlist)
    })

    productcard.append(
        productImage,
        productTitle,
        productprice,
        productcategory,
        productrating,
        productreviews,
        addtocart
    )
    rootElement.append(productcard)

  });


}

function  dataForFilter(productlist){

    sortbtn.addEventListener('change',(event)=>{
        if(event.target.value=="asc"){
            let sorted=productlist.sort((a,b)=>{
            return a.price-b.price
        })
        displaydata(sorted)
        }
        
        if(event.target.value=="desc"){
            let sorted=productlist.sort((a,b)=>{
            return b.price-a.price
        })
        displaydata(sorted)
        }
        
        })




}



let timerid=null;
searchinp.addEventListener('input',()=>{
    console.log('hi')
    clearInterval(timerid)
    timerid=setTimeout(()=>{
       searchResult(searchinp.value)
       console.log(searchinp.value)
   },500)
})

 async function searchResult(value){
try {
    let productdata2=await fetch(`https://fakestoreapi.com/products/category/${value}`)
    let productdata3=await productdata2.json();
    console.log(productdata3)
displaydata(productdata3)
} catch (error) {
    console.log(error)
}
}
