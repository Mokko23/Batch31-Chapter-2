// Pemanggilan package express
const express = require('express')

// Menggunakan package express
const app = express()

// Set template View Engine
app.set('view engine', 'hbs')

app.use('/public',express.static(__dirname +'/public'))
app.use(express.urlencoded({extended: false}))

const isLogin = true

// Set Endpoint
app.get('/', function (req,res){
    res.send("Hello World")
})

app.get('/home', function (req,res){
    res.render('index')
})

app.get('/blog', function (req,res){
    res.render('blog', { isLogin : isLogin })
})

app.get('/add-blog', function (req,res){
    res.render('form-blog')
})

app.post('/blog', function (req,res){
    let title = req.body.title
    let content = req.body.content

    console.log(`Nama dari title ini : ${title}`)
    console.log(`Nama dari content ini : ${content}`)
})

app.get('/blog/:id', function (req,res){
    let id = req.params.id
    console.log(`Id dari client : ${id}`)
    res.render('blog-detail', { id : id })
})

app.get('/contact-me', function (req,res){
    res.render('contact')
})

// Konfigurasi port aplikasi
const port = 4500
app.listen(port, function (){
    console.log(`Server running on ${port}`)
})