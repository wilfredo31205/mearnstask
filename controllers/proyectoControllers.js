const Proyecto = require("../models/Proyecto");

const  {validationResult}  = require('express-validator');


exports.crearProyecto = async (req,res)=>{


    // revisando si hay errores

    
            const errores  = validationResult(req);

            if(!errores.isEmpty()){ // si esta lleno, si tiene algun error 

                return res.status(400).json({errores : errores.array()}) // entonces mostramos los errores



                 }
        try {
            
            // crea un nuevo proyecto 
            const proyecto = new  Proyecto(req.body);

            // guardar el creador via jwt 

            proyecto.creador = req.usuario.id;

            proyecto.save();

            res.json(proyecto); // en caso de que todo este correcto , le pasamos el proyecto creado 
        } catch (error) {
            
            console.log(error);
            
            res.status(400).send('Hubo un error');
        }


}


// obtiene  todos los proyectos  del usuario actual

exports.obtenerProyecto = async (req, res, next)=>{

    try {
       
        const proyectos = await Proyecto.find({creador : req.usuario.id}); // filtramos por el creador y le pasamos el usuario.id 
        // que es lo que estamos verificando una vez que guardamos el json web token , es decir esto que esta en auth.js : 

        // 
      //  req.usuario = cifrado.usuario; // agregando el usuario en el request  , en el payload de usuariocontroller , le agregamos el usuario
        // por esto le pasamos el usuario 


        res.json({proyectos}); // enviando los proyectos
       
       
       
        // console.log(req.usuario);


    } catch (error) {
        
        console.log(error);
        res.status(500).send('hubo un error');
    }   
  }   
  
  // actualiza un proyecto 


exports.actualizarProyecto = async (req, res )=>{

       // revisando si hay errores
            const errores  = validationResult(req);

            if(!errores.isEmpty()){ // si esta lleno, si tiene algun error 

                return res.status(400).json({errores : errores.array()}) // entonces mostramos los errores

 }

                    // extraer la informacion del proyecto

                    const { nombre} = req.body;

                    const nuevoproyecto = {}; // creando un nuevo objeto ,este va hacer el nuevo proyecto que se va
                    // a reinscribir el anterior 

                    if(nombre){ // sii hay un nombre , si el usuario esta pasando el nombre 

                        nuevoproyecto.nombre = nombre;

                    }

                    try {

                        // revisar el id 


                        let proyecto = await Proyecto.findById(req.params.id);
                        

                        // si el proyecto existe si o no 

                            if(!proyecto){

                                return res.status(404).json({msg : 'Proyecto no encontrado pendejo '});
                                        // cuando entramos a una pagina que no existe nos retorna un 404
                            }


                        // verificar el creador del proyecto

                        if(proyecto.creador.toString() !== req.usuario.id){  // CON TOSTRING LO CONVERTIMOS EN UN STRING 
                            // el creador es lo que estamos guardando en la base de datos es decir el objectID

                            return res.status(401).json({msg : 'no autorizado '}); // 401 ES CUANDO ESTA PROHIBIDO 

                            // ESTE CODIGO LO QUE HACE ES QUE SI EL USUARIO ES DIFERENTE AL USUARIO CREADOR NO LO PERMITE ACTUALIZAR TAREAS 


                        }


                        // actualizar 

                        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id},{$set : nuevoproyecto},{new: true});


                        res.json({proyecto}); 



                        
                    } catch (error) {
                        
                        console.log(error);
                        res.status(500).send('error en el servidor');

                    }

            

  }

  // elimina un proyecto por su id 

  exports.eliminarProyecto = async (req,res)=>{


                        try {
                            
        let proyecto = await Proyecto.findById(req.params.id);
                        

    // si el proyecto existe si o no 

        if(!proyecto){

            return res.status(404).json({msg : 'Proyecto no encontrado pendejo '});
                    // cuando entramos a una pagina que no existe nos retorna un 404
        }


    // verificar el creador del proyecto

    if(proyecto.creador.toString() !== req.usuario.id){  // CON TOSTRING LO CONVERTIMOS EN UN STRING 
        // el creador es lo que estamos guardando en la base de datos es decir el objectID

        return res.status(401).json({msg : 'no autorizado '}); // 401 ES CUANDO ESTA PROHIBIDO 

        // ESTE CODIGO LO QUE HACE ES QUE SI EL USUARIO ES DIFERENTE AL USUARIO CREADOR NO LO PERMITE ACTUALIZAR TAREAS 


    }           

                // eliminando el proyecto 


                await Proyecto.findOneAndRemove({ _id : req.params.id});
                res.json({msg : 'Proyecto eliminado correactamente '});


                                         



                        } catch (error) {
                            
                            console.log(error);

                            res.status(500).send('error en el servidor');


                        }







 }

     