const express = require("express");
const router = express.Router()
const app = express()

const Contenedor = require('./contenedor')

app.use(router)


router.get("/productos",async (req,res)=>{
    try {
        const contenedor = new Contenedor('./productos.txt')
        const productos = await contenedor.getAll()
        res.status(200).send(productos)
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocurrio un error al Buscar los productos")
    }
})
router.get("/productosRandom",async (req,res)=>{
    try {
        const contenedor = new Contenedor('./productos.txt')
        const productos = await contenedor.productoRandom()
        res.status(200).send(productos)
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocurrio un error al Buscar los productos")
    }
})
const conn = app.listen(8080,()=>{
    console.log(`Servidor corriendo en el puerto ${conn.address().port}`)
})

app.on("error",(error)=>{
    console.log(`Error ${error}`)
})