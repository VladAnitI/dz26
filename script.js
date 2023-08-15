const addDataBtn = document.querySelector('.btn-add-product')
const updDataBtn = document.querySelector('.btn-add-sales')
const modal = document.querySelector('#add-product-modal')
const form = document.getElementById('add-product-form')

const getDataBtn = document.querySelector('.leftContainer>.btn-get-product')
const getDataSaleBtn = document.querySelector('.rightContainer>.btn-get-product')

// Получение данных о продуктах
getDataBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  try {
    const response = await fetch('/products')
    const products = await response.json()
    const list = document.querySelector('#left-products')
    list.innerHTML = ''
    products.forEach(product => {
      list.insertAdjacentHTML('beforeend', `
        <li>
          <span>${product.title}</span>
          <div class="prices">
            <span class="price">
              ${product.price}
            </span>
          </div>
        </li>
      `)
    })
  } catch (error) {
    console.error(error)
  }
})

// Открытие модального окна для добавления продукта
addDataBtn.addEventListener('click', (e) => {
  e.preventDefault()
  modal.style.display = "block"
})

// Закрытие модального окна при клике вне его области
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none"
  }
})

// Отправка данных формы при добавлении нового продукта
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const title = form.elements.title.value;
  const price = form.elements.price.value;
  const onSale = false;

  try {
    const response = await fetch('/add-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, price, onSale })
    });

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }

})

// Обновление данных о продуктах
updDataBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  try {
    const response = await fetch('/upd-products', {
      method: 'PATCH'
    })
    const result = await response.json()
    console.log(result)
  }
  catch (error) {
    console.log(error)
  }
})