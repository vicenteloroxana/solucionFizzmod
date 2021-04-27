// importación de env
require('dotenv').config()
//conexion a mongo
require('./mongo')
//import express from 'express'
const express = require('express')
// fs
const  fs = require ('fs')
/* ------------ INSTANCIA DEL SERVIDOR --------------- */
const app = express()
const productosRouter = require('./controllers/productos')
/* SERVIDOR DE RECURSOS ESTÁTICOS DE EXPRESS */
app.use(express.static('public'))

/* ------------ PARA RUTA POST --------------- */
app.use(express.urlencoded({extended: true}))
app.use(express.json())

/* ------------ MOTOR DE PLANTILLAS --------------- */
app.set('views', './views')
app.set('view engine', 'pug')

/* ---------------------------------------------------- */
/*              RUTA GET HOME                */
/* ---------------------------------------------------- */
app.get('/', function(req,res) {
    
  
})
app.get('/set-correo', (req,res) => {
  console.log('Mi ruta', __dirname)
  // console.log('La ruta donde voy ',path.join(__dirname, '../public/correo.js'))
  res.sendFile(__dirname + '/public/correo.html')
})

app.post('/set-correo', async (req,res) => {
  try{
    let {email} = req.body
    await fs.promises.writeFile('correo.dat', email)
    res.redirect('/')

  }catch (error){
    console.log(error)
    res.status(400).json(error)
  }
  
})

/* ------------ MIDDWELER --------------- */

// app.use('/productos', productosRouter)
app.use('/productos', productosRouter)

/* ----------- DEFINICION DEL PUERTO ------------------ */
const PORT = process.env.PORT


/* ----------- LISTEN DEL SERVIDOR ------------------ */
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})