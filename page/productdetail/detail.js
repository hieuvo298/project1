function renderDetail() {
  const param = new URLSearchParams(document.location.search)
  const id = param.get('id')
  const dataLocal = JSON.parse(localStorage.getItem('products'))
  const detaildata = document.querySelector('.product-item')

  dataLocal?.forEach((element) => {
    if (Number(id) == element.id) {
      detaildata.innerHTML = `
            <div class="product-img-left" onclick="${element.id}">
            </div>
            <div class="main-product-img">
                <img src="../${element.img}" alt="anh">
            </div>
            <div class="product-des">
                <h4>${element.productname}
                </h4>
                <p>Men's Shoes
                    <br>${element.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </p>
                <p>Slect size</p>
                <div class="size-product">
                <span>
                  EU 40  
                </span>
                <span>
                    EU 41 
                  </span>
                  <span>
                    EU 42  
                  </span>
                  <span>
                    EU 43  
                  </span>
                  <span>
                    EU 44  
                  </span>
                  <span>
                    EU 45 
                  </span>
                </div>
                <div class="add-like-btn">
                    <button class="add-btn" onclick="addToCart(${element.id})">
                        Add to Bag
                    </button>
                    <button class="like-btn">
                        Favorite <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
                <p>The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.</p>
            </div>
        </section>
            `
    }
  });
}
renderDetail()