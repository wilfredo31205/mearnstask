

// rutas para crear usuarios

const express = require('express');

const router = express.Router();

const {check} = require('express-validator');


const usuarioController = require('../controllers/usuariocontrollers');




// CREA UN USUARIO

router.post('/',

[

    check('nombre', 'el nombre es obligatorio').not().isEmpty(), // con check validamos los valores de nuestra bd o modelos 
    check('email','introduce un email valido ').isEmail(), // isemail valida por email
    check('password','el password tiene que tener como minimo 8 caracteres').isLength({ min : 8})
    // .not significa que no  y isemty(); este vacio 

],



usuarioController.crearUsuario

//console.log('probando');

);




module.exports = router;

//}

