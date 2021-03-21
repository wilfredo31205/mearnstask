
const Tarea = require('../models/Tarea');

const Proyecto = require('../models/Proyecto');



const  {validationResult} = require('express-validator');

exports.crearTarea = async (req,res)=>{



    const errores  = validationResult(req);

    if(!errores.isEmpty()){ // si esta lleno, si tiene algun error 

        return res.status(400).json({errores : errores.array()}) // entonces mostramos los errores

            
 }
        try {

            //console.log(req.body);
            
                // extraer del proyecto  y comprobar si existe

                const {proyecto} = req.body;





            const existeProyecto = await Proyecto.findById(proyecto);
            if(!existeProyecto){


                return res.status(404).json({msg : 'Proyecto no encontrado'});


            }

                      // revisar si el proyecto actual pertenecee al usuario auntenticado 
                
                        // verificar el creador del proyecto

                        if(existeProyecto.creador.toString() !== req.usuario.id){  // CON TOSTRING LO CONVERTIMOS EN UN STRING 
                            // el creador es lo que estamos guardando en la base de datos es decir el objectID

                            return res.status(401).json({msg : 'no autorizado '}); // 401 ES CUANDO ESTA PROHIBIDO 

                            // ESTE CODIGO LO QUE HACE ES QUE SI EL USUARIO ES DIFERENTE AL USUARIO CREADOR NO LO PERMITE ACTUALIZAR TAREAS 


                        }

                        // creamos la tarea

                        const tarea  = new Tarea(req.body); // le pasamos el request.body que va a tener la tarea 
                        await tarea.save(); // guardamos la tarea
                        res.json({tarea}); // imprimiendo la tarea que se ha agregado 


            
        } catch (error) {
        
            console.log(error);
            res.status(500).send('hubo un error');

        }

 }
 // obtener las tareas por proyecto 

 exports.obtenerTareas = async (req,res)=>{

        try {
            const {proyecto} = req.query;


            //console.log(req.query);


            const existeProyecto = await Proyecto.findById(proyecto);
            if(!existeProyecto){


                return res.status(404).json({msg : 'Proyecto no encontrado'});


            }

                      // revisar si el proyecto actual pertenecee al usuario auntenticado 
                
                        // verificar el creador del proyecto

                        if(existeProyecto.creador.toString() !== req.usuario.id){  // CON TOSTRING LO CONVERTIMOS EN UN STRING 
                            // el creador es lo que estamos guardando en la base de datos es decir el objectID

                            return res.status(401).json({msg : 'no autorizado '}); // 401 ES CUANDO ESTA PROHIBIDO 

                            // ESTE CODIGO LO QUE HACE ES QUE SI EL USUARIO ES DIFERENTE AL USUARIO CREADOR NO LO PERMITE ACTUALIZAR TAREAS 


                        }
            
                        // obtener las tareas por proyecto 

                        const tareas = await Tarea.find({proyecto}); // le estamos filtrando es decir
                        // que nos muestre todos los proyectos cuando el proyecto sea igual al proyecto 
                        // que estamos mandando por el req.body  es decir de este : 


                        //     const {proyecto} = req.body;


                        res.json({tareas});

        } catch (error) {
            console.log(error);

            res.status(500).send('hubo un error ');
        }


 }

 exports.actualizarTarea = async (req,res)=>{

    try {

        // extraer el proyecto  y comprobar si existe 

        const {proyecto,nombre,estado} = req.body;



        // si la tarea existe o no 

        let tarea  = await Tarea.findById(req.params.id);

        if(!tarea){

            
            return res.status(404).json({msg : 'no existe esa tarea'});
        }



        const existeProyecto = await Proyecto.findById(proyecto);
       

                   // revisar si el proyecto actual pertenecee al usuario auntenticado 
            
                    // verificar el creador del proyecto

                    if(existeProyecto.creador.toString() !== req.usuario.id){  // CON TOSTRING LO CONVERTIMOS EN UN STRING 
                        // el creador es lo que estamos guardando en la base de datos es decir el objectID

                        return res.status(401).json({msg : 'no autorizado '}); // 401 ES CUANDO ESTA PROHIBIDO 

                        // ESTE CODIGO LO QUE HACE ES QUE SI EL USUARIO ES DIFERENTE AL USUARIO CREADOR NO LO PERMITE ACTUALIZAR TAREAS 


                    }
                    const nuevaTarea = {};

                    // si el usuario decide cambiar el nombre

                        nuevaTarea.nombre = nombre;

                

                 // cambia el nombre de la tarea , pero no el estado 

                        nuevaTarea.estado = estado;

                    

                        // guardar la tarea

                        tarea = await Tarea.findOneAndUpdate({ _id : req.params.id },nuevaTarea,{new : true}); // pasandole la nueva tarea

                        res.json({tarea});

                        // si la tarea existe o no 

                     




                        /// crea un objeto con la nueva informacion 

                      


        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }

 }

 // elimina tarea

 exports.eliminarTarea = async (req,res)=>{

        
    try {

        // extraer el proyecto  y comprobar si existe 

        const {proyecto} = req.query;



        // si la tarea existe o no 

        let tarea  = await Tarea.findById(req.params.id);

        if(!tarea){

            
            return res.status(404).json({msg : 'no existe esa tarea'});
        }



        const existeProyecto = await Proyecto.findById(proyecto);
       

                   // revisar si el proyecto actual pertenecee al usuario auntenticado 
            
                    // verificar el creador del proyecto

                    if(existeProyecto.creador.toString() !== req.usuario.id){  // CON TOSTRING LO CONVERTIMOS EN UN STRING 
                        // el creador es lo que estamos guardando en la base de datos es decir el objectID

                        return res.status(401).json({msg : 'no autorizado '}); // 401 ES CUANDO ESTA PROHIBIDO 

                        // ESTE CODIGO LO QUE HACE ES QUE SI EL USUARIO ES DIFERENTE AL USUARIO CREADOR NO LO PERMITE ACTUALIZAR TAREAS 


                    }
                   
                    // eliminar

                    await Tarea.findOneAndRemove({_id: req.params.id});

                    res.json({msg : 'tarea eliminada'});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }






 }