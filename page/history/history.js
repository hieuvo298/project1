function renderHistory() {
    const dbOrders = JSON.parse(localStorage.getItem('ordersDB')) || [];
    const dbUserLogin=JSON.parse(localStorage.getItem('userLogin'));
    const myOrder=dbOrders.filter(item => item.idUser == dbUserLogin.id)
    const containerProduct = document.querySelector('tbody');

    containerProduct.innerHTML = '';
        myOrder.forEach((item,index)=>{
            if(item.status){
                item.status='đang giao'
                return
            }else{
                item.status='đã giao thành công'
            }
        })
    myOrder.forEach((item, index) => {
        containerProduct.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>
            <button id="open-modal">Giỏ hàng</button>
            </td>
            <td>${item.date}</td>
            <td>${item.status}</td>
            <td>${item.totalPrice.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            })}</td>     
         </tr>`;
    });
}
function renderProducts(id) {
    const dbOrders = JSON.parse(localStorage.getItem('ordersDB'));
    const dbUserLogin = JSON.parse(localStorage.getItem('userLogin'));
    const myOrder = dbOrders.filter(item => item.id == dbUserLogin.id)
    const myOrderDetails = myOrder.find(item=> item.id == id)
    const containerProduct = document.querySelector('tbody');
    myOrderDetails.cart.forEach((item, index) => {
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
         </tr>`;
    });
}
renderHistory()