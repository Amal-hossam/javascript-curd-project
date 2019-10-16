var pName = document.getElementById("pName");
var pPrice = document.getElementById("pPrice");
var pCompany = document.getElementById("pCompany");
var pDes = document.getElementById("pDes");
var addBtn = document.getElementById("addBtn");
var searchInp = document.getElementById("searchInp");
var alertContainer = document.getElementById("alertContainer");
var currentIndex = 0;
var productContainer;
if (localStorage.getItem("productContainer") == null) {
    productContainer = [];
} else {
    productContainer = JSON.parse(localStorage.getItem("productContainer"));
    dispalyData()

}
addBtn.onclick = function () {

    if (addBtn.innerHTML == "add product") {
        if (validateForm() == true) {
            addProuduct();
            dispalyData();
            clearData();
        }
    } else {
        updateProduct();
        dispalyData();
        clearData();


    }
}

function addProuduct() {
    var product = {
        productName: pName.value,
        productPrice: pPrice.value,
        productCompany: pCompany.value,
        productDescription: pDes.value

    }
    productContainer.push(product);
    localStorage.setItem("productContainer", JSON.stringify(productContainer));
}

function dispalyData() {
    cols = "";
    for (var i = 0; i < productContainer.length; i++) {
        cols += `
<div class="col-md-4 text-center">
<h2>` + productContainer[i].productName + `</h2>
<h3>` + productContainer[i].productPrice + `</h3>
<h4>` + productContainer[i].productCompany + `</h4>
<p>` + productContainer[i].productDescription + `</p>
<button class="btn btn-primary " onclick="deleteProduct(` + i + `);" >delet</button>
<button class="btn btn-danger " onclick="setForm(` + i + `);" >update</button>
</div>
`
    }
    document.getElementById("rowData").innerHTML = cols;

}

function clearData() {
    var input = document.getElementsByClassName("form-control");
    for (var i = 0; i < input.length; i++) {
        input[i].value = " ";
    }
}

function deleteProduct(id) {
    productContainer.splice(id, 1);
    dispalyData();
    localStorage.setItem("productContainer", JSON.stringify(productContainer));

}

searchInp.onkeyup = function () {
    searchProduct(searchInp.value);
}

function searchProduct(term) {
    var result = "";
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].productName.includes(term) == true) {
            result += `
<div class="col-md-4 text-center">
<h2>` + productContainer[i].productName + `</h2>
<h3>` + productContainer[i].productPrice + `</h3>
<h4>` + productContainer[i].productCompany + `</h4>
<p>` + productContainer[i].productDescription + `</p>
<button class="btn btn-primary " onclick="deleteProduct(` + i + `);" >delet</button>

</div>
`
        }
    }
    document.getElementById("searchRow").innerHTML = result;
}

function setForm(i) {
    addBtn.innerHTML = "updateProduct";
    pName.value = productContainer[i].productName;
    pPrice.value = productContainer[i].productPrice;
    pCompany.value = productContainer[i].productCompany;
    pDes.value = productContainer[i].productDescription;
    currentIndex = i;

}

function updateProduct() {

    productContainer[currentIndex].productName = pName.value;
    productContainer[currentIndex].productPrice = pPrice.value;
    productContainer[currentIndex].productCompany = pCompany.value;
    productContainer[currentIndex].productDescription = pDes.value;
    addBtn.innerHTML = "add product";
    localStorage.setItem("productContainer", JSON.stringify(productContainer));


};

function validateForm() {
    var errors = "";
    var nameRegx = /^[A-Z][A-Za-z]{2,10}$/;
    var priceRegx = /^[1-9][0-9]{2,5}$/;

    if (nameRegx.test(pName.value) == false) {
        alertContainer.style.display = "block";
        errors += "<p> text Must be start with uppercase </p>";
        alertContainer.innerHTML = errors;
    }
    if (priceRegx.test(pPrice.value) == false) {
        alertContainer.style.display = "block";
        errors += "<p> num Must be start with 10 to 10,000 </p>";
        alertContainer.innerHTML = errors;
    }
    if (errors.length > 0) {
        return false;
    } else {
        alertContainer.style.display = "none";
        return true;
    }
}
