const express = require("express") 
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Router/AuthRouter')
const ProductRouter = require('./Router/ProductRouter')
require('dotenv').config();
require('./Models/db')

const port = process.env.PORT || 8000

app.get('/ping', (req, res)=>{
    res.send("Hello From Express !")
})

app.use(bodyParser.json())
app.use(cors())
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)

app.listen(port, ()=>{
    console.log("Port Running on 8080")
})