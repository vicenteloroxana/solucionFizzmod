const { Schema, model } = require('mongoose')
// definicion del esquema
const productoSchema = new Schema({
  nombre: String,
  precio: Number,
  descripcion: String,
  foto: String

})
// creacion de clase/modelo con ese esquema
const Producto = model('Producto', productoSchema)
// exportacion del modelo
module.exports = Producto
