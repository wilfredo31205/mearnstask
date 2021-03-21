
const express = require('express');

const router = express.Router();

const proyectoControllers =  require('../controllers/proyectoControllers');

const auth = require('../middleware/auth');


const {check} = require('express-validator')


// crea proyectos
//api/proyectos
router.post('/',

    auth, // verigicando que el usuario este identificadoo 

    [
        check('nombre', 'el nombre del proyecto es obligatorio').not().isEmpty()


    ],
    proyectoControllers.crearProyecto



);

// obtener todos los proyectos
router.get('/',

    auth,
    proyectoControllers.obtenerProyecto

)

// actualizar proyectos via id 

router.put('/:id',

    auth, // que el usuario este identificado 



    [
        check('nombre', 'el nombre del proyecto es obligatorio').not().isEmpty()


    ],



    proyectoControllers.actualizarProyecto


)


router.delete('/:id', // el principio rest nos indica que le tenemos que pasar un id , para saber cual es 

    auth, // que el usuario este identificado 

    proyectoControllers.eliminarProyecto


)



module.exports = router;