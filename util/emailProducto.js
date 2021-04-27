const nodemailer = require('nodemailer') 
const fs = require('fs') 
const handlebars = require('handlebars')

if (!fs.existsSync('correo.dat')) {
    fs.writeFileSync('correo.dat', 'userprueba@gmail.com')
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'userprueba906@gmail.com',
    pass: 'nodejsvanzado2021'
  }
})

function enviar(productos, cb) {
    console.log(productos)

    fs.readFile('correo.dat', 'utf-8', (err, email) => {
        if(err) throw new Error(`error en lectura de correo: ${err}`)
        fs.readFile('views/lista.hbs', 'utf-8', (err, source) => {
            if(err) throw new Error(`error en lectura de plantilla: ${err}`)
            source = '<style>table,th,td,th {border: 1px solid black; border-collapse:collapse;} th: {background: black; }</style>' + source
            var template = handlebars.compile(source);
        
    
            //console.log(mailOptions)
            const mail = {
                from:"userprueba@gmail.com",  //remitente
                to: email,  //destinatario
                subject:"Informacion de productos",  //asunto del correo
                html: template({productos}) 
            }
    
            transporter.sendMail(mail, (err, info) => {
                if(err) {
                    console.log(err)
                    cb(err, null)
                }
                console.log(info)
                cb(null,info)
            })
        })
    })
}

module.exports = {
  enviar
}