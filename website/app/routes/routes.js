const express = require('express');
const router = express.Router()
const materiaController = require('../controller/materiaController')
const indexController = require('../controller/indexController')
const mailController = require('../controller/mailController')
const viveiroController = require('../controller/viveiroController')

const Auth = require('../middleware/auth')
const bodyParser = require('body-parser');
const firebase = require ('firebase')

var multer = require('multer')
const path = require('path')
const sharp = require('sharp') //lida com imagens, converte jpgs pra png por exemplo
//lidar com pdf
const { fromPath } = require("pdf2pic");
const { mkdirsSync } = require("fs-extra");
const rimraf = require("rimraf");
var fs = require('fs')
var gm = require('gm');

//cookies e auth
const cookieParser = require('cookie-parser')
const csrf = require('csurf')

//index com banco de dados
router.get('/', indexController.loadIndex)
router.get('/index', indexController.loadIndex)

let userlogged
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        userlogged = user
    } else {
        userlogged = null
    }
})

//cria usuario (temporariamente habilitada, somente pra funcao de add)
router.post('/createuser', (req, res) => {
  Auth.SignUpWithEmailAndPassword(req.body.email, req.body.password).then((user) => {
    if(!user.err){
      let userData = JSON.parse(user)
      userData = userData.user
      Auth.insertUserData(userData).then(() => {
        res.redirect('/membros')
      })
    }else {
      return user.err
    }
  })
})

//editor de materias
router.get('/editor', (req, res) => {
  if(userlogged){
    res.render('editor')
  }else {
    res.redirect('/admin')
  }
})

router.get('/logout', (req,res) => {
  Auth.SignOut().then(() => {
    res.redirect('/admin')
  })
})

router.get('/admin', (req, res) => {
  res.render('admin')

})
router.post('/success', materiaController.addMateria)

router.post('/login', (req, res) => {
  let getBody = req.body
  Auth.SignInWithEmailAndPassword(getBody.email, getBody.password)
  .then((login) => {
    if(!login.err){
      res.redirect('/membros')
    }else {
      res.redirect('/admin')
    }
  })
})

router.get('/sobre', (req, res) => {
    res.render('sobre')
})

router.get('/viveiro', (req, res) => {
    res.render('viveiro')
})

router.post('/viveiro', mailController.enviar)

router.get('/projetos', (req, res) => {
  res.render('projetos')
})

router.get('/contato', (req, res) => {
  res.render('contato')
})
router.post('/contato', mailController.contato)

router.get('/enduro', (req, res) => {
  res.render('enduro')
})

router.get('/doar', (req, res) => {
  res.render('doar')
})

const Multer = multer ({
  storage: multer.memoryStorage()
})

//AREA RESTRITA DE MEMBROS

router.get('/membro-viveiro', viveiroController.loadAllViveiro)

router.get('/membro-viv-edit', viveiroController.loadAllEdit)
router.post('/membro-viv-edit', viveiroController.editaViv)


router.post('/editarviveiro', viveiroController.editaViv)
router.post('/deletarviveiro', viveiroController.deletaViv)


router.post('/membro-viv-add', Multer.single("uploaded_img"), viveiroController.addViveiro)
router.get('/membro-viv-add', (req, res) => {
  if(userlogged){
    res.render('membro-viv-add')
  }else {
    res.redirect('/admin')
  }
})

router.get('/membro-enduro', (req, res) => {
  res.render('membro-enduro')
})

// router.post('/membros', Multer.single("uploaded_img"), viveiroController.addViveiro)

router.get('/membros', (req, res) => {
  if(userlogged){
    res.render('membros')
  }else {
    res.redirect('/admin')
  }
})

router.post('/doar', mailController.doacao)

router.get('/pilhasebaterias', (req, res) => {
  res.render('pilhasebaterias')
})

//Leitura do informativo pdf > img
router.get('/informativo', (req, res) => {
  res.render('informativo')
})

//
//upload image 
var storage = multer.diskStorage({
    destination: function(req, file, cb, res) {  
      cb(null, 'website/public/img')  
    },  
    filename: function(req, file, cb, res) {  
      var name = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      cb(null, name)  
      return name
    }
  });
  
  var upload = multer({
    storage: storage
  });

    
  router.post('/upload', upload.single('file'), function(req, res) {
    res.json({      
      "location": '/img/' + req.file.filename
    });
  });

  //materias teste sem controller
  router.get('/noticias', indexController.loadAll)

  router.get('/:id', indexController.loadOne)

  
  


module.exports = router