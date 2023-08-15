const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/products')

const db = 'mongodb://localhost:27017/Product'
mongoose
  .connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    user: 'VladAnitI', 
    pass: 'Vlad2145',})
  .then(res => { console.log('connected to DB') })
  .catch(error => { console.log(error) })

const app = express()

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'styles')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const createPath = (page) => (path.resolve(__dirname, {page}.ejs))

app.get('/script.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(__dirname + '/script.js');
});

app.get('/', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

app.get('/products', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

app.get('/products-action', async (req, res) => {
  const productsSale = await Product.find({ onSale: true })
  res.json(productsSale)
})

app.post('/add-product', async (req, res) => {
  const { title, price, onSale } = req.body
  const product = new Product({ title, price, onSale })
  try {
    await product.save()
    res.status(201).json(product)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'failed to add product' })
  }
})

app.patch('/upd-products', async (req, res) => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 10 } }])
    products.forEach(async (product) => {
      let newPrice = (product.price * 0.75).toFixed(2)
      await Product.findByIdAndUpdate(product._id, { $set: { onSale: true, newPrice: newPrice } })
    })
    res.status(200).json({ message: 'products updated' })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to update products' })
  }
})

app.listen(8080, () => console.log('server started'))