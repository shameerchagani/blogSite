const express = require('express')
const port = process.env.port || 8080
const mongoose = require('mongoose');
const Blog = require('./models/blog')
const dotenv = require('dotenv').config()


//Express App
const app = express()

//connect MongoDB
const dbURI = process.env.dbURI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(port, () => console.log(`Server is running on Port : ${port}`)))
    .catch(err => console.log(err));

//Set View Engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/blogs/newblog', (req, res) => {
    res.render('newblog', { title: 'Create a new blog' });
  });

  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });

  app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
  });
  

  app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
          //res.json(result)
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/blogs', (req, res) => {
    Blog.find().sort({ created: -1 })
        .then(result => {
            res.render('index', { blogs: result, title: 'All blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post('/blogs', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
  
    blog.save()
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
