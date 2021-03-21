
const express = require('express');

const router = express.Router();

const tareaControllers =  require('../controllers/tareaController');

const auth = require('../middleware/auth');


const {check} = require('express-validator')


//crear una tarea

//api/tareas


router.post('/',

    auth,

    [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    

    check('proyecto', 'El proyecto es obligatorio').not().isEmpty()




     ],


    tareaControllers.crearTarea


);

// obtener las tareas por proyecto

router.get('/',

     auth,
     tareaControllers.obtenerTareas

)

router.put('/:id',

auth,
tareaControllers.actualizarTarea


);

router.delete('/:id',
auth,
tareaControllers.eliminarTarea


)


module.exports = router;

