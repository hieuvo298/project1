function addToCart(id) {
    const dataLocal = JSON.parse(localStorage.getItem('products')) || [];
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    const dbUsers = JSON.parse(localStorage.getItem('users'));
    const count = document.querySelector('.quantity');

    if (!userLogin) {
        alert('Bạn cần đăng nhập để thêm vào giỏ hàng.');
        window.location.href = '../../page/login/login.html';
        return;
    }

    const myCart = userLogin.cart || [];
    const myProduct = dataLocal.find(item => item.id == id);

    if (!myProduct) {
        alert('Sản phẩm không tồn tại');
        return;
    }

    const cartItem = myCart.find(item => item.id == id);

    if (cartItem) {
        if (cartItem.quantity >= myProduct.stock) {
            alert('Sản phẩm hết hàng');
            return;
        }

        const updatedCart = myCart.map(item =>
            item.id === cartItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        userLogin.cart = updatedCart;
    } else {
        if (myProduct.quantity >= myProduct.stock) {
            alert('Sản phẩm hết hàng');
            return;
        }

        userLogin.cart.push({
            ...myProduct,
            quantity: 1,
        });
    }

    const userIndex = dbUsers.findIndex(item => item.id === userLogin.id);
    dbUsers[userIndex].cart = userLogin.cart;

    localStorage.setItem('cart', JSON.stringify(userLogin.cart));
    localStorage.setItem('userLogin', JSON.stringify(userLogin));
    localStorage.setItem('users', JSON.stringify(dbUsers));

    if (count) {
        count.textContent = parseInt(count.textContent) + 1;
    }

    renderCart();
}

function renderCart() {
    const userDB = JSON.parse(localStorage.getItem('users')) || [];
    const userLoginDB=JSON.parse(localStorage.getItem('userLogin')) || [];
    const totalPriceUI = document.querySelector('#total-price');
    const containerProduct = document.querySelector('tbody');
    const cartEmpty = document.querySelector('table');
    const newUserDB = userDB.find(item => item.id == userLoginDB.id);
    let total=0
    if (newUserDB.cart.length === 0) {
        cartEmpty.innerHTML = `<img class="empty-cart" src="../../asset/img/empty-cart.png" alt="anh">`;
        totalPriceUI.innerHTML=total
    } else {
        newUserDB.cart.forEach((item, index) => {
            containerProduct.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.productname}</td>
                <td><img src="../${item.img}" alt="anh"></td>
                <td>${item.quantity}</td>
                <td>${item.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            })}</td>
                <td><button onclick="deleteFromCart(${item.id})">Huỷ</button></td>
            </tr>`;
            total += item.quantity * item.price;
        });
        totalPriceUI.innerHTML=total.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        })
    }
}
function deleteFromCart(idDelete) {
    const dbUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    const dbUsers = JSON.parse(localStorage.getItem('users'))
    let myUser = dbUsers.find(item => item.id == dbUserLogin.id)
    let result = myUser.cart.filter((element) => element.id != idDelete);
    myUser.cart = result
    localStorage.setItem("users", JSON.stringify(dbUsers));
    window.location.reload()
    renderCart();
}

function renderDetail(id) {
    window.location.href = `./detail.html?id=${id}`;
    renderCart()
}

renderCart();
