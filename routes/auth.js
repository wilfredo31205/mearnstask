

// rutas para authenthicar a usuarios

const express = require('express'); 

const router = express.Router();

const {check} = require('express-validator');

const auth = require('../middleware/auth');

const authcontrollers = require('../controllers/authcontrollers');

// iniciar seccion
// api/auth
router.post('/',



    authcontrollers.autenticarUsuario


//console.log('probando');

);

router.get('/', // cuando enviemos un get a api/auth  , se va a correr esta parte de aqui

    auth, // protegiendo con middleware ya que es el usuario autenticado 
    authcontrollers.usuarioAutenticado


)




module.exports = router;

//}

