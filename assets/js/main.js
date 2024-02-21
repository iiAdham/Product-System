let prodName = document.querySelector("#prodName");
let prodPrice = document.querySelector("#prodPrice");
let prodTaxes = document.querySelector("#prodTaxes");
let prodDis = document.querySelector("#prodDis");
let prodTotal = document.querySelector("#prodTotal");
let prodQuant = document.querySelector("#prodQuant");
let prodImg = document.querySelector("#prodImg");
let productList = document.querySelector("#productsList");
let submitButton = document.querySelector("#prodSubmit");
let clearProductsBtn = document.querySelector("#clearProductsBtn");
let products = JSON.parse(localStorage.getItem("Products")) || [];

function rmvProducts(){
    if(products.length == 0){
        alert("There is no products to delete!");
    }
    else{
        let r = confirm("Are you sure to delete this item?");
    if (r == true) {
        products.splice(0, products.length);
        localStorage.setItem("Products", JSON.stringify(products));
        alert("Deleted Successfully!");
        printProd();
    }
    }
}

function addProd() {
    let valid = true;
    if(prodName.value == "" || prodPrice.value == "" || prodQuant.value == "" || prodImg.value == "" || isNaN(prodPrice.value) || isNaN(prodQuant.value) || isNaN(prodTaxes.value) || isNaN(prodTotal.value)){
        valid = false;
    }
    
    if (valid){
    let product = {
        name: prodName.value,
        price: prodPrice.value,
        taxes: prodTaxes.value,
        dis: prodDis.value,
        total: prodTotal.value,
        quant: prodQuant.value,
        img: prodImg.value,
    };
    products.push(product);
    localStorage.setItem("Products", JSON.stringify(products));
    printProd();
    clearInputs();
    }
    else{
        alert("Please Check the data entered!");
        clearInputs();
    }
}
function clearInputs(){
    prodName.value = "";
    prodPrice.value = "";
    prodTaxes.value = "";
    prodDis.value = "";
    prodQuant.value = "";
    prodImg.value = "";
    prodTotal.value = "";
}
function printProd(){
    productList.innerHTML="";
    products.forEach((element,index)=>{
        productList.innerHTML +=`
        <table class="table">
                    <tbody>
                        <tr>
                            <td>
                                <h6 class="text-center">${index+1}</h6>
                            </td>
                            <td>
                                <h6 class="text-center">${element.name}</h6>
                            </td>
                            <td>
                                <h6 class="text-center">${element.price} LE</h6>
                            </td>
                            <td>
                                <h6 class="text-center">${element.quant} KG</h6>
                            </td>
                            <td>
                                <h6 class="text-center"><a href="${element.img}">Click</a></h6>
                            </td>
                            <td class="text-center">
                                <button onclick="editProd(${index})" class="btn btn-warning">Edit</button>
                                <button onclick="delProd(${index})" class="btn btn-danger ">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
        `;
    })
}

function delProd(index){
    let r = confirm("Are you sure to delete this item?");
    if (r == true) {
        products.splice(index, 1);
        localStorage.setItem("Products", JSON.stringify(products));
        alert("Deleted Successfully!");
        printProd();
    }
}

function editProd(index){
    let p = products[index];
    prodName.value = p.name;
    prodPrice.value = p.price;
    prodTaxes.value = 0;
    prodDis.value = 0;
    prodTotal.value = p.price;
    prodQuant.value = p.quant;
    prodImg.value = p.img;
    submitButton.innerText = "Update";
    submitButton.classList.replace("btn-success","btn-warning");
    submitButton.setAttribute("onclick",`updateProd(${index})`);
}

function updateProd(index){
    let valid = true;
    if(prodName == "" || prodPrice == "" || prodQuant == "" || prodImg == ""){
        valid = false;
    }
    if (valid){
    let product = {
        name: prodName.value,
        price: prodPrice.value,
        taxes: prodTaxes.value,
        dis: prodDis.value,
        total: prodTotal.value,
        quant: prodQuant.value,
        img: prodImg.value,
    };
    products[index] = product;
    localStorage.setItem("Products", JSON.stringify(products));
    printProd();
    clearInputs()
    }
    else{
        alert("Please Check the data entered!");
        addProd();
    }
    submitButton.innerText = "Submit";
    submitButton.classList.replace("btn-warning","btn-success");
    submitButton.setAttribute("onclick","addProd()");
}

printProd();