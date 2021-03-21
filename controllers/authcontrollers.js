
//const Usuario = require('../models/Usuario');
const Usuario = require('../models/Usuario');
const bcryts = require('bcryptjs'); // importando bcryts para ocultar las contraseñas 
const  { validationResult} = require('express-validator'); // validando el resultado de los check que estan en routes 
const jwt = require('jsonwebtoken'); // importando jsonwebtoken


exports.autenticarUsuario = async (req,res)=>{

        

    const errores  = validationResult(req);

    if(!errores.isEmpty()){

        return res.status(400).json({errores : errores.array()})
    }


    // extraer el email y el password

        const {email, password} = req.body

            try {
                
                let usuario = await Usuario.findOne({email}); // validando el usuario por email 

                if(!usuario){ // si no hay usuarios 

                    return res.status(400).json({msg : 'El usuario no existe' });

                }

                // revisar  el password

                const passCorrecto = await bcryts.compare(password , usuario.password); // compara el password
                // que le estamos pasando como req(request) con el password  con el password que esta almacenado
                // en la base de datos

                if(!passCorrecto){ //  si el password es incorrecto

                    return res.status(400).json({msg : 'Password incorrecto'});
                }


                // si todo es correcto

                const payload = { // aqui  va informacion  de la entidad y datos  adicionales

                    usuario : {
        
                        id: usuario.id
        
        
                    }
        
        
                }
        
                // firmar el token 
        
                // se utiliza json web token , porque  en react no hay secciones 
        
                jwt.sign(payload, process.env.SECRETA ,{ // sign significa firmar el token 
        
                    // toma 2 parametros : el payload , y la palabra secreta que difinimos en el artchivo variables.env
        
                    expiresIn : 3600 // equivale a 1 hora
        
                },(error,token)=>{ // revisando si hay un error al crear el token
        
                    if(error) throw error // para que marque un error
        
                    res.json({token }); // retornando un objeto de token 

                    return;
        
                });
        



            } catch (error) {
                console.log(error);
            }
}

    // obtiene que usuario esta authenticado 


exports.usuarioAutenticado = async (req,res)=>{

    try {
        
        const usuario = await Usuario.findById(req.usuario.id).select('-password'); // en mongoose 
        // la forma en que queremos decir que queremos estos campos y estos no, es colocando .select
        // mas el nombre del campo con un - atras , aqui decimos que el password no lo queremos
        res.json({usuario});
        


    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }



}