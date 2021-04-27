const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI
console.log(connectionString)

// conexión a mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.log('error')
    console.error(err)
  })

// cuando se cierra el servidor o hay un error cerrar la conexion bd o cuando hay un error en el proceso
process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})