// Pemanggilan package express
const express = require('express')

// Menggunakan package express
const app = express()

// Set template View Engine
app.set('view engine', 'hbs')

app.use('/public',express.static(__dirname +'/public'))
app.use(express.urlencoded({extended: false}))

const isLogin = true

const blogs = [
    {
        title: "Pasar Coding di Indonesia Dnilai Masih Menjanjikan",
        content: "Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, molestiae numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta, eligendi debitis?",
        author: "Ichsan Emrald Alamsyah",
        posted_at: "12 Jul 2021 22:30 WIB"
    }
]

// Set Endpoint
// app.get('/', function (req,res){
//     res.send("Hello World")
// })

app.get('/home', function (req,res){
    res.render('index')
})

app.get('/blog', function (req,res){
    console.log(blogs)

    let dataBlogs = blogs.map(function(data){
        return {
            ...data,
            isLogin
        }
    })
        
    
    res.render('blog', { isLogin : isLogin, blogs : dataBlogs })
})

app.get('/add-blog', function (req,res){

    if(!isLogin){
        res.redirect('/home')
    }

    res.render('form-blog')
})

app.post('/blog', function (req,res){
    let title = req.body.title
    let content = req.body.content
    let date = new Date()
    
    let blog = {
        title : title,
        content,
        author: "Ichsan Emrald Alamsyah",
        posted_at: getFullTime(date)
    }

    blogs.push(blog)
    res.redirect('/blog')
})

app.get('/blog/:id', function (req,res){
    let id = req.params.id
    console.log(`Id dari client : ${id}`)
    res.render('blog-detail', { id : id })
})

app.get('/delete-blog/:index', function(req, res){
    let index = req.params.index

    console.log(index);

    blogs.splice(index,1)
    res.redirect('/blog')
})

app.get('/contact-me', function (req,res){
    res.render('contact')
})

// Konfigurasi port aplikasi
const port = 4500
app.listen(port, function (){
    console.log(`Server running on ${port}`)
})

function getFullTime(time){

    let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
    let myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
  
    let date = time.getDate()
    let month = time.getMonth()
    let year = time.getFullYear()
  
    let hours = time.getHours()
    let minutes = time.getMinutes()
  
    if(minutes < 10){
      minutes = '0' + minutes
    }
    
    return `${date} ${months[month]} ${year} ${hours}:${minutes} WIB`
  }