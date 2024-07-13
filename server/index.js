const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"alumnos_crud"
});

app.post("/create",(req,res)=>{
    const apellido = req.body.apellido;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const telefono = req.body.telefono;
    const mail = req.body.mail;

    db.query("INSERT INTO alumnos(apellido,nombre,edad,pais,telefono,mail) VALUE(?,?,?,?,?,?)",[apellido,nombre,edad,pais,telefono,mail],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/alumnos",(req,res)=>{
    db.query("SELECT * FROM alumnos",
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const apellido = req.body.apellido;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const telefono = req.body.telefono;
    const mail = req.body.mail;

    db.query("UPDATE alumnos SET apellido=?,nombre=?,edad=?,pais=?,telefono=?,mail=? WHERE id=?",[apellido,nombre,edad,pais,telefono,mail,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM alumnos WHERE id = ?",[id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})