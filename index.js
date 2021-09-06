const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://taekyeong:abcd123@boilerplate.ba3kg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(()=>console.log('MongoDB Connected')).catch(err => console.log(err))


app.get('/',(req,res)=> res.send("helloWorld"))
app.listen(port, ()=>console.log(`example App ${port}`))