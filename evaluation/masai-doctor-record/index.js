let myForm=document.querySelector('form');
let inp1=document.getElementById('name');
let inp2=document.getElementById('doctor_id');
let inp3=document.getElementById('specialization');
let inp4=document.getElementById('experience');
let inp5=document.getElementById('email');
let inp6=document.getElementById('mobile');
let filterbyspec=document.querySelector('#filter')

let tbody=document.querySelector('tbody')
let arr=[]


myForm.addEventListener('submit',function(e){

    e.preventDefault();
    let Data={};
    Data.input1=inp1.value;
    Data.input2=inp2.value;
    Data.input3=inp3.value;
    Data.input4=inp4.value;
    Data.input5=inp5.value;
    Data.input6=inp6.value;
    arr.push(Data);
    

   function display(arr){      
  tbody.innerHTML=null
  
    arr.map((ele,index)=>{
        
        let row=document.createElement('tr');
        let td1=document.createElement('td')
        let td2=document.createElement('td')
        let td3=document.createElement('td')
        let td4=document.createElement('td')
        let td5=document.createElement('td')
        let td6=document.createElement('td')
        let td7=document.createElement('td')
        let td8=document.createElement('button')
       
        function role(){
            if(ele.input4>5){
                td7.innerText="Senior"
            }
            else if(ele.input4>=2 && ele.input4<=5){
                td7.innerText="Junior"
            }
            else if(ele.input4<=1){
                td7.innerText="Trainee"
            }
            return td7.innerText
           }
        
       
       
        
        td1.innerText=ele.input1
        td2.innerText=ele.input2;
        td3.innerText=ele.input3;
        td4.innerText=ele.input4;
        td5.innerText=ele.input5;
        td6.innerText=ele.input6;
        td7.innerText=role()
        td8.innerText= "Delete";
        td8.style.border="none"
        td8.style.backgroundColor="red";
        td8.style.margin="1px";
        td8.style.padding="10px";
        
        
        row.append(td1,td2,td3,td4,td5,td6,td7,td8);
        tbody.append(row);
      
        td8.addEventListener('click',function(){
             row.innerHTML=null
            
            arr.splice(index,1)
        
          display(arr)
        
       
         })

       
        

    })
    

}
display(arr)

filterbyspec.addEventListener("change",(specl)=>{
    let filtered=arr.filter((element)=>{
        return specl.target.value==element.input3
    })
    display(filtered)
})
    
})