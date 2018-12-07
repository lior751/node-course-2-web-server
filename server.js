const express = require('express');
const hbs = require("hbs");
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine', 'hbs');



app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}  ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {console.log('Unable to write to a file!');});
  next();
});


//app.use((req,res,next) => {res.render('maintenance.hbs');});


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  
  return new Date().getFullYear();

});

hbs.registerHelper('screamIt', (text) =>  {

  return text.toUpperCase();

});


//req=the incoming HTTP request.
//res=the response we send back to the HTTP request
app.get('/', (req,res) => {

   //res.send('<h1>Hello Express!</h1>');
   //res.send({name: 'Lior', likes: ["dogs", "computers"] })
   res.render('home.hbs', {aboutPage: 'Home page' ,   welcomeMessage: 'Welcome to my website!'});

} );


app.get('/about', (req,res) => {

 res.render('about.hbs', {aboutPage: 'About page' });
});


app.get('/bad', (req,res) => {

 res.send({messageError: 'Unable to handle request!'});
});


app.listen(3000, () => {console.log('Server is up!');});