import express from 'express'
import Mongoose from './config/mongoose.js'
import router from './router.js'
import cors from 'cors'


const app = express()

await Mongoose()

app.use(express.json())
app.use(cors())

app.use("/",router)


app.listen(3001,()=>{
    console.log("Server started")
})