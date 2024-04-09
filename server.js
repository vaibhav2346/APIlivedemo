require('dotenv').config();

const exp = require('express');
const app = exp()

app.use(exp.urlencoded({ extended: false }))
app.use(exp.json())
const cj = require('cors')
app.use(cj())

const mg = require('mongoose')
//mg.connect("mongodb://127.0.0.1:27017/demopractice1").then(() => console.log("connected to Mongodb"));
mg.connect('mongodb+srv://Himan13:App123@cluster0.ovylhfy.mongodb.net/demolive?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log(('connected to Mongodb')))

let actsch = new mg.Schema({Name: String, Age: Number, Movie: String},{versionKey: false})

let acmodel = mg.model("Account", actsch)

app.post("/api/add/", async(req,res)=>{
    try{
        let data1 = new acmodel({Name: req.body.name, Age: req.body.age, Movie: req.body.movie})
        let resp = await data1.save();
        if(resp){
            res.send({statuscode: 1})
        }else{
            res.send({statuscode: 0})
        }
    }catch(e){
        res.send({statuscode: -1, errorcode: e.code})
    }
})

app.get("/api/getdata", async(req,res)=>{
    try{
    let data2 = await acmodel.find()
    if(data2!==null){
        res.send({statuscode:1, udata: data2})
    }else{
        res.send({statuscode:0})
    }
    }catch(e){
        res.send({statuscode:-1, errorcode: e.code})
    }
})

app.delete("/api/del/:idk", async(req, res)=>{
    try{
        let del = await acmodel.deleteOne({_id: req.params.idk})
        if(del.deletedCount===1){
            res.send({statuscode:1})
        }else{
            res.send({statuscode:0})
        }
    }
    catch(e){
        res.send({statuscode: -1, errorcode: e.code})
    }
})

app.get('/', (req, res) => {
    res.send("Welcome to our website")
})

app.listen(9000, () => {
    console.log("Server is running")
})