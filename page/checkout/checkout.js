function renderCart() {
    const userLoginDB = JSON.parse(localStorage.getItem('userLogin')) || [];
    const productsDB=JSON.parse(localStorage.getItem("products"))
    const userDB=JSON.parse(localStorage.getItem("users"))
    const odersDB= JSON.parse(localStorage.getItem("ordersDB"))
    const myUser = userDB.find((item) => item.id == userLoginDB.id);
    const totalPriceUI = document.querySelector('#total-price');
    const containerProduct = document.querySelector('tbody');
    containerProduct.innerHTML = "";
    myUser.cart.forEach((item, index) => {
        containerProduct.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.productname}</td>
            <td><img src="../${item.img}" alt="anh"></td>
            <td>${item.quantity}</td>
            <td>${item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
         </tr>
        `;
    });

    let totalPrice = 0;
    myUser.cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });
    totalPriceUI.innerText = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
function handleCheckout() {
    const dbUsers = JSON.parse(localStorage.getItem("users"))
    const dbUserLogin = JSON.parse(localStorage.getItem("userLogin"))
    const dbOrders = JSON.parse(localStorage.getItem("ordersDB")) || []
    const dbProduct = JSON.parse(localStorage.getItem("products"))
    const myUser = dbUsers.find(item => item.id == dbUserLogin.id)
    const fullName = document.querySelector('#fullname').value;
    const address = document.querySelector('#address').value;
    const phoneNumber = document.querySelector('#phone-number').value;
    const email = document.querySelector('#email').value;
    const birthday = document.querySelector('#birthday').value;
    const str = Date()
    const arr = str.split(" ")
    const dateUi = arr[0] + '-' + arr[2] + '-' + arr[1] + '-' + arr[3]

    if (!fullName || !address || !phoneNumber || !email || !birthday) {
        alert('Vui lòng nhập vào đầy đủ thông tin.');
        return;
    }
    if (myUser.cart.length === 0) {
        alert('Giỏ hàng rỗng vui lòng thêm vào giỏ hàng trước khi thanh toán.');
        return;
    }

    const totalPrice = myUser.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (dbOrders.length == 0) {
        const order = {
            id: 1,
            idUser: myUser.id,
            fullName: fullName,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            birthday: birthday,
            cartOrder: myUser.cart,
            totalPrice: totalPrice,
            status: 1,
            date: dateUi,
            payment: 1,
        };
        dbOrders.push(order);
        localStorage.setItem('ordersDB', JSON.stringify(dbOrders));
        updateStock(myUser.cart);
    }
    else {
        const order = {
            id: dbOrders[dbOrders.length - 1].id + 1,
            idUser: myUser.id,
            fullName: fullName,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            birthday: birthday,
            cartOrder: myUser.cart,
            totalPrice: totalPrice,
            status: 1,
            date: dateUi,
            payment: 1
        };
        dbOrders.push(order);
        localStorage.setItem('ordersDB', JSON.stringify(dbOrders));
        dbProduct.forEach(item => {
            myUser.cart.forEach(element => {
                if (item.id == element.id) {
                    item.stock -= element.quantity
                }
            })
        })
        localStorage.setItem('products',JSON.stringify(dbProduct))
        dbUsers.forEach(item=>{
            if (item.id == myUser.id) {
                myUser.cart=[]
            }
        })
        localStorage.setItem('users',JSON.stringify(dbUsers))
    }
    alert('Checkout successful');
    window.location.href = "../../page/product/product.html"
}
document.addEventListener('DOMContentLoaded', function () {
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', function () {
        handleCheckout();
    });
    renderCart();
});
