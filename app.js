var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose');

// APP CONFIG
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))

// MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// RESTful ROUTES

app.get('/', function(req, res){
  res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log('Error!');
    } else {
      res.render('index', {blogs: blogs});
    }
  })
}); //app scope



app.listen(3000, function(){
  console.log('Server is running!');
});
