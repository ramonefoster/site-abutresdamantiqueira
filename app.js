'use strict';
const express = require('express'); 
const bodyParser = require('body-parser');
const engine = require('consolidate');
const exphbs = require('express-handlebars')
const path = require('path')
const hbs = require('hbs')
var consign = require('consign');

//initialization
const app = express()
const port = process.env.PORT || 5000


//define paths for express config
const publicDirectoryPath = path.join(__dirname, 'website/public')
const viewsPath = path.join(__dirname, 'website/views')
const partialsPath = path.join(__dirname, 'website/views/partials')
const imagesPath = path.join(__dirname, 'website/public/img')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(express.static(publicDirectoryPath))

// require('dotenv').config()

//parsing middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({ extended: true}))


//parsing application/json
app.use(bodyParser.json())

//rotas
const routes = require('./website/app/routes/routes')
app.use('/', routes)
app.use('/noticia', routes)
app.use('/editor', routes)
app.use('/membros', routes)

// app.use('/admin', routes) //login
// app.use('/projetos', routes)


app.listen(port, () => console.log('listening on port: ' + port))

