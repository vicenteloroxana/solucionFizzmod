const productosRouter = require('express').Router()
const Producto = require('../models/Producto')
const email = require ('../util/emailProducto.js')

/* ---------------------------------------------------- */
/*       RUTA POST INGRESO         */
/* ---------------------------------------------------- */
productosRouter.post('/ingreso' ,async (request, response) => {
  try {
    console.log(request.body)
    const { nombre, precio, descripcion,foto} = request.body
    const producto = new Producto({
      nombre,
      precio,
      descripcion,
      foto
    })

    const addProducto = await producto.save()
    const cantProductos = await Producto.find().count()
    if(cantProductos % 10 == 0){
      const productos = await Producto.find()
      let prods = []
        productos.forEach(producto => {
            prods.push({...producto._doc})
      })
      email.enviar(prods, (err,info) => {
        console.log(err,info)
        res.redirect('/')                    
      })

    }
    console.log(addProducto)
    response.redirect('/')
  } catch (error) {
    console.log(error)
    response.status(400).json(error)
  }
})
/* ---------------------------------------------------- */
/*       RUTA GET lISTAR         */
/* ---------------------------------------------------- */

productosRouter.get('/listar', async (request, response) => {
  try {
    const productos = await Producto.find({})
    // response.json(notes)
    console.log(productos)
    
    response.render('index', {productos});
  } catch (e) {
    console.log(e)
    response.status(502).json(error)
  }

})

module.exports = productosRouter