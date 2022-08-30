
const fs = require('fs');
class Contenedor {
    constructor(path){
        this.path = path
    }

    async save(objeto){
        //Recibe un objeto, lo guarda en el archivo,devuelve id
        try {
            const db = await this.#readAndParse()
            if(db){
                const newId = db.length > 0 ? db[db.length - 1].id + 1 : db.length
                objeto.id = newId
                db.push(objeto)
                await this.#writeFile(db)
                return newId
            }
        } catch (error) {
            throw error
        }

    }

    async getById(id,cb){
        // recibe un id, devuelve el objeto con ese id, sino null
        try {
            const db = await this.#readAndParse()
            const existe = db.map(object => object.id).indexOf(id)
            return existe !== -1 ? db[existe] : null
        } catch (error) {
            throw error
        }
   
    }

    async getAll(){
        //devuelve todos los objetos
        try {
            const db = await this.#readAndParse()
            if(db){
                return db
            }
        } catch (error) {
            throw error
        }
    }

    async deleteById(id){
        //Elimina el objeto por el id
        try {
            let db = await this.#readAndParse()
            if(db){
                const existe = db.map((obj) => obj.id).indexOf(id) 
                if(existe !== -1){
                    db.splice(existe,1)
                    await this.#writeFile(db)
                    return "Eliminado con exito"
                }else{
                    throw new Error("El objeto no existe")
                }
            }
        } catch (error) {
            throw error
        }
    }

    async deleteAll(){
        //elimina todos los objetos del archivo
        try {
            await this.#writeFile([])
            return "Todos los objetos eliminados con exito"
        } catch (error) {
            throw error
        }


    }

    async productoRandom(){
        try {
            const db =  await this.#readAndParse()
            return db[this.#getRandomInt(db.length)]
            
        } catch (error) {
            throw error
        }
    }

     #getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
     #readAndParse(){
        const promise = new Promise((resolve,reject) => {
            fs.readFile(this.path,(err,DB)=>{
                if(err){
                   reject({message:'ocurrio un error al leer el archivo',err})
                }else{
                    resolve(JSON.parse(DB.toString()))
                }
            })
        })
        return promise

    }

    #writeFile(newDB){
        const promise = new Promise((resolve,reject) => {
            fs.writeFile(this.path,JSON.stringify(newDB),(err,DB)=>{
                if(err){
                   reject({message:"Ocurrio un error al escribir la base",err})
                }
                resolve("Guardado con exito")
            })
        })

        return promise

    }
}
module.exports = Contenedor
// const contenedor = new Contenedor('./DB.txt')
// const init = async () => {
//     try {
//        // console.log(`Id del objeto creado ${await contenedor.save({name:'hola'})}`)
//         console.log(await contenedor.getById(5))
//         console.log(await contenedor.getAll())
//         //console.log(await contenedor.deleteById(6))
//         //console.log(await contenedor.deleteAll())
//     } catch (error) {
//         console.log(error.message)
//     }
// } 
//  init()




