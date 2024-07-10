
let title =document.getElementById('textt')
let price =document.getElementById('price')
let taxes =document.getElementById('taxes')
let ads =document.getElementById('ads')
let discount =document.getElementById('discount')
let total =document.getElementById('total')
let count =document.getElementById('count')
let category =document.getElementById('category')
let submit =document.getElementById('submit')
let remove_all = document.getElementById('delete_all')
let search = document.getElementById('search')
let tmp;
 
let mood = 'create'
// start get total
function getTotal(){
if(price.value !=""){
     let result = (+price.value + +taxes.value + +ads.value) - +discount.value; //make + bafore name to conver value to num
    total.innerHTML=result
    total.style.background="#040"
}
else{
    total.style.background=""
}
}
//end total


//start create product
let data=[]
if (localStorage.product != null){
    data = JSON.parse(localStorage.product)
} else{
    data=[]
}

submit.onclick=function(){
    let deta={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value !="" 
    && price.value!=""
    && count.value <100 ){
 if(mood === 'create'){
        if(deta.count >1){
            for(let i=0; i<deta.count;i++){
                data.push(deta);
            }
        }
        else{
            data.push(deta);
        }
    }
  
  else{
      data[tmp] =deta
  }
  clear()
  read()
}
   
    
    
    localStorage.setItem('product',  JSON.stringify(data)   ) // stringify to convet data to string
    // console.log(deta)

 
   remove_all.style.display ="none"

}
//end create
//save localstorage
//clear inputs 
function clear(){
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    total.innerHTML=""
    count.value=""
    category.value=""
}


//read
function read() {
    getTotal()
    let table = "";
    for(let i = 0; i < data.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].category}</td>
            <td>${data[i].total}</td>
            <td><button onclick ="updatee(${i})" id="update">update</button></td>
            <td><button onclick="deletee(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = table;

   
    // remove
   
      
       }


read()
function deletee(i){
data.splice(i,1)
localStorage.product=JSON.stringify(data)
read()
}

remove_all.style.display ="none"
if(data.length >0){
   remove_all.style="blockg"
}
remove_all.onclick=function(){
   localStorage.clear()
        data.splice(0)
        read()
    }

// update
function updatee(i){
    title.value = data[i].title
    price.value=  data[i].price
    taxes.value= data[i].taxes
    ads.value=  data[i].ads
    discount.value = data[i].discount
    total.innerHTML= data[i].total
    count.value = data[i].count
    category.value = data[i].category
    submit.innerHTML="update"
  getTotal()
  mood ='update'
    tmp=i;
    getTotal()
}
// search
let searchmod="title"
 function searchmood(id){
     
         if(id == 'title'){
             searchmod ="title"
             search.placeholder=" search by title"
}
else{
    searchmod="category"
    search.placeholder=" search by category"
}
 }

 function search_data(value){
    let table = "";
    if (searchmod == "title") {
        for (let i = 0; i < data.length; i++) {
            if (data[i].title.includes(value)) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].category}</td>
                    <td>${data[i].total}</td>
                    <td><button onclick="updatee(${i})" id="update">update</button></td>
                    <td><button onclick="deletee(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].category.toLowercase.includes(value)) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].category}</td>
                    <td>${data[i].total}</td>
                    
                    <td><button onclick="updatee(${i})" id="update">update</button></td>
                    <td><button onclick="deletee(${i})" id="delete">delete</button></td>
                </tr>
                `;
                console.log(i)
            }
        }
       
    }

    let tbody = document.getElementById('tbody');
    tbody.innerHTML = table;
}

// clean data