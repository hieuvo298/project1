
const list = document.querySelectorAll('.list-item')
const content = document.querySelectorAll('.content')

list.forEach((item, index) => {
    item.addEventListener('click', function () {
        list.forEach(item => {
            item.classList.remove('active')
        })
        content.forEach(item => {
            item.classList.remove('active')
        })
        content[index].classList.add('active')
        item.classList.add('active')
    })
})
document.addEventListener('DOMContentLoaded', function () {
    const productList = JSON.parse(localStorage.getItem('products'));
    displayProducts();
    const addButton = document.querySelector('.onAdd-btn');
    addButton.addEventListener('click', handleAddProduct);
    function handleAddProduct() {
        const productName = document.querySelector('#productName').value;
        const productImage = document.querySelector('#productImage')
        const valueImg = `../asset/img/${productImage.files[0].name}`;
        const productCategory = document.querySelector('#productCategory').value;
        const productDescription = document.querySelector('#Description').value;
        const productStock = parseInt(document.querySelector('#productStock').value);
        const productPrice = document.querySelector('#productPrice').value;
        const newProduct = {
            id: productList[productList.length - 1].id + 1,
            productname: productName,
            img: valueImg,
            category: productCategory,
            description: productDescription,
            stock: productStock,
            price: productPrice,
            description: "",
            isDelete: 1,
        };
        productList.push(newProduct);
        localStorage.setItem('products', JSON.stringify(productList));
        displayProducts();
    }
    window.removeProduct = function (index) {
        const confirmDeleteProduct = confirm("Do you want delete this product")
        if (confirmDeleteProduct) {

            productList.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(productList));
            displayProducts();
        } else {
            displayProducts();

        }
    };
});
function displayProducts() {
    const productList = JSON.parse(localStorage.getItem('products'))
    const tableBody = document.querySelector('.productsAdmin');
    tableBody.innerHTML = '';
    productList.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML += `
            <td>${index + 1}</td>
            <td>${item.productname}</td>
            <td><img src="../${item.img}" alt="Product Image" style="width: 50px;"></td>
            <td>${item.category}</td>
            <td>${item.price}</td>
            <td>${item.stock}</td>
            <td>
            <button onclick="removeProduct(${index})">Remove</button>
            <button id="myBtn" onclick="openEditProduct(${item.id})" ">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
function renderDashboard() {
    let dbProductAdmin = JSON.parse(localStorage.getItem("products"));
    let dbOrderAdmin = JSON.parse(localStorage.getItem("ordersDB"));
    let dbUserAdmin = JSON.parse(localStorage.getItem("users"));

    let revenueValue = document.querySelector(".revenue-total");
    let totalProducts = document.querySelector(".products-total");
    let totalUsers = document.querySelector(".users-total");
    revenue = 0;
    dbOrderAdmin.forEach((item) => {
        revenue += item.totalPrice;
    });
    revenueValue.innerHTML = `${revenue.toLocaleString() + " VND"}`;

    totalProducts.innerHTML = `${dbProductAdmin.length}`;

    let newDbUserAdmin = dbUserAdmin.filter((item) => item.role == 1);
    totalUsers.innerHTML = `${newDbUserAdmin.length}`;
}
renderDashboard()
function openEditProduct(id) {
    document.getElementById("myModal").style.display = "flex"
}
function offEditProduct() {
    document.getElementById("myModal").style.display = "none"
}
function updateProduct(id) {
    const dbProduct = JSON.parse(localStorage.getItem("products"));
    const name = document.getElementById("productNameEdit").value;
    const price = document.getElementById("productPriceEdit").value;
    const stock = document.getElementById("productStockEdit").value;
    const imgInput = document.getElementById("productImageEdit");
    const valueImg = `../asset/img/${imgInput.files[0].name}`;
    const category = document.getElementById("productCategoryEdit").value;
    const newProductAdmin = dbProduct.findIndex((item) => item.id == id);
    dbProduct[newProductAdmin] = {
        category: category,
        description: '',
        id: id,
        img: valueImg,
        isDelete: 1,
        price: price,
        productname: name,
        stock: stock,
    };
    alert("Update product success");
    localStorage.setItem("products", JSON.stringify(dbProduct));
    document.getElementById("myModal").style.display = "none";
    displayProducts();
}
function renderUser() {
    const userList = JSON.parse(localStorage.getItem('users'))
    const tableBody = document.querySelector('.userManager');
    userList.forEach((item) => {
        if (item.role == 2) {
            item.role = 'Admin'
            return
        } else {
            item.role = 'User'
        }
    })
    tableBody.innerHTML = ""
    let filterUser = userList.filter(item => item.role == "User")
    filterUser.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML += `
            <td>${index + 1}</td>
            <td>${item.id}</td>
            <td>${item.email}</td>
            <td>${item.userName}</td>
            <td>${item.role}</td>
            <td>
            ${item.status == 1
                ? `<button onclick="blockUser(${item.id})">block</button>`
                : ""
            }
            ${item.status == 2
                ? `<button onclick="unBlockUser(${item.id})">unblock</button>`
                : ""
            }
            
            </td>
            `;
        tableBody.appendChild(row);
    });
}
function blockUser(id) {
    const userDbAdmin = JSON.parse(localStorage.getItem("users"));
    const newuserDbAdmin = userDbAdmin.find((item) => item.id == id);
    newuserDbAdmin.status = 2;
    localStorage.setItem("users", JSON.stringify(userDbAdmin));
    renderUser()
}
function unBlockUser(id) {
    const userDbAdmin = JSON.parse(localStorage.getItem("users"));
    const newuserDbAdmin = userDbAdmin.find((item) => item.id == id);
    newuserDbAdmin.status = 1;
    localStorage.setItem("users", JSON.stringify(userDbAdmin));
    renderUser();
}
function renderOders() {
    const ordersList = JSON.parse(localStorage.getItem('ordersDB'))
    const tableBody = document.querySelector('.orderManager');
    ordersList.forEach((item) => {
        if (item.status) {
            item.status = 'đang giao'
            return
        } else {
            item.status = 'đã giao thành công'
        }
    })
    tableBody.innerHTML = ""
    ordersList.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML += `
            <td>${index + 1}</td>
            <td>${item.date}</td>
            <td>${item.fullName}</td>
            <td>${item.phoneNumber}</td>
            <td>${item.address}</td>
            <td>${item.totalPrice}</td>
            <td>${item.status}</td>
            <td><button onclick="openEditOders(${ordersList.id})">Edit</button></td>
        `;
        tableBody.appendChild(row);
    });
}
function openEditOders(id) {
    document.querySelector('.modal2').style.display = "flex"
}
function closeEditOders() {
    document.querySelector('.modal2').style.display = "none"
}
function updateOders(id) {
    const dbOrderAdmin = JSON.parse(localStorage.getItem('ordersDB'))
    const status = document.getElementById('status').value
    const newDbOders = dbOrderAdmin.findIndex(item => item.id == id)
    const result = {
        ...dbOrderAdmin[newDbOders],
        status: status,
    }
    dbOrderAdmin[newDbOders] = result
    localStorage.setItem('ordersDB', JSON.stringify(dbOrderAdmin))
    alert('Update SUCCESS')
}
renderUser()
renderOders()

