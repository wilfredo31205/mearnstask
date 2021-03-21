
const express = require('express');

const  conectarDB = require('./config/db');

const app = express();

const cors = require('cors');


const port = process.env.port || 3001

// conectar a la base de datos

conectarDB();


// habilitar cors

app.use(cors());


// hablitar express.json , mas bien nos permite leer el contenido de lo que el usuario envia 
// estos es igual a body parser

app.use(express.json({extended : true}));


// importando las rutas

app.use('/api/usuarios',require('./routes/usuarios'));

app.use('/api/auth',require('./routes/auth'));


app.use('/api/proyectos',require('./routes/proyectos'));


app.use('/api/tareas', require('./routes/tareas'));


//const port = process.env.port || 4000;

app.listen(port,'0.0.0.0',()=>{

    console.log(`El servidor esta funcionando en el puerto ${port}`);


});