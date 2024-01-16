
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


let msg=document.getElementById('order-message')

let placeorder=document.getElementById('place-order')


placeorder.addEventListener('click',()=>{

    // localStorage2=JSON.parse(localStorage.getItem('items'));
    localStorage.clear('product')

    msg.textContent="Wait for a while....";
    msg.style.color="red";
    let h3=setTimeout(()=>{
        msg.textContent="Your order is successfully placed"
        msg.style.color="green";
    },1200)

})



// Your order is successfully placed