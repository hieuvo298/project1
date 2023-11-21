function renderProducts() {
	const dataLocal = JSON.parse(localStorage.getItem('products'))
	const containerProduct = document.querySelector('.product-container')
	containerProduct.innerHTML = ""
	dataLocal.forEach((element) => {
		containerProduct.innerHTML += `
        <div class="card">
			<span class="like"><i class='bx bx-heart'></i></span>
			<span class="cart"><i class='bx bx-cart-alt' ></i></span>
			<div class="card__img" onclick="navigaProductDetail(${element.id})">
            <img src="../../${element.img}" alt="">
			</div>
			<h2 class="card__title">${element.productname}</h2>
			<p class="card__price">${element.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
			<div class="card__action">
			<button class="add-btn" onclick="addToCart(${element.id})"><i class="fa-solid fa-cart-shopping"></i></button>
			<span class="stock"><strong>Stock</strong>: ${element.stock}</span>
			</div>
		</div>
        `
	})
}
function navigaProductDetail(id) {
	navigationParam('../../page/productdetail/detail.html', `id=${id}`)
}
function renderCategory(category) {
	const titleCategory = document.querySelector('h4')
	titleCategory.innerText = category
	const localData = JSON.parse(localStorage.getItem('products'))
	const categoryData = document.querySelector('.product-container')
	const newData = localData.filter((element) => {
		return element.category === category
	})
	categoryData.innerHTML = ""
	newData.forEach((element) => {
		categoryData.innerHTML += `
		<div class="card">
			<span class="like"><i class='bx bx-heart'></i></span>
			<span class="cart"><i class='bx bx-cart-alt' ></i></span>
			<div class="card__img" onclick="navigaProductDetail(${element.id})">
            <img src="../../${element.img}" alt="">
			</div>
			<h2 class="card__title">${element.productname}</h2>
			<p class="card__price">${element.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
			<div class="card__action">
			<button class="add-btn" onclick="addToCart(${element.id})"><i class="fa-solid fa-cart-shopping"></i></button>
			<span class="stock"><strong>Stock</strong>: ${element.stock}</span>
			</div>
		</div>
        `
	})
}
function searchProducts() {
	const searchInput = document.getElementById("search-input");
	const productCards = document.querySelectorAll(".card");
	document.querySelector(".search-btn").addEventListener("click", function () {
		const searchItem = searchInput.value.toLowerCase();
		productCards.forEach((card) => {
			const cardTitle = card.querySelector(".card__title").textContent.toLowerCase();
			if (cardTitle.includes(searchItem)) {
				card.style.display = "block";
			}
			else {
				card.style.display = "none";
			}
			if (!searchItem) {
				alert('Vui lòng nhập vào thứ bạn muốn tìm')
			} return
		});
	});
}
searchProducts()
renderProducts()

