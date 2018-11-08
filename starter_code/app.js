// SET UP 
// ##########################################################################################

const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')

app.listen(3000,()=>{
  console.log("💻  Server ready baby 💻")
});

// ROUTES 
// ##########################################################################################

app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => {

  const beers= punkAPI.getBeers()

  beers.then(beers => {
    res.locals.beerList = beers;
    res.render('beers.hbs');
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beer', (req,res,next)=>{
const randomBeer = punkAPI.getRandom();

randomBeer.then(randomBeer => {
  res.locals.rdmBeer = randomBeer;
  res.render('randomBeer.hbs')
})
.catch(error => {
  console.log(error)
})
});
