const express = require('express');
 
const mysql=require("mysql");
const app = express()
app.use("/css", express.static(__dirname + "/css"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/js", express.static(__dirname + "/js"));
 
let conexion=mysql.createConnection({
    host:"localhost",
    database:"sparoman",
    user:"root",
    password:""
})
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}))
 
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})
app.post('/validar', function(req, res){
  const datos=req.body;
  console.log(datos);
  let nombre=datos.nombre;
  let celular=datos.celular;
  let correo=datos.correo;
  let mensaje=datos.mensaje;
 
  let registrar= "INSERT INTO info (nombre, celular, correo, mensaje) VALUES ('"+nombre+"','"+celular+"','"+correo+"','"+mensaje+"')"
conexion.query(registrar, function(error){
    if (error) {
        throw error;
    }else{
        //console.log("Datos almacenados correctamente");
        res.send(`
            <script>
                alert("Datos enviados correctamente");
                window.location.href="/";
            </script>
            `);

    }
});
});
 
app.listen(3000, () => {
  console.log("Servidor creado en localhost");
})