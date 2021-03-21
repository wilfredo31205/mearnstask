


//const Usuario = require('../models/Usuario');

const Usuario = require('../models/Usuario');

const bcryts = require('bcryptjs'); // importando bcryts para ocultar las contraseñas 

const  { validationResult} = require('express-validator'); // validando el resultado de los check que estan en routes 


const jwt = require('jsonwebtoken'); // importando jsonwebtoken

exports.crearUsuario = async (req, res , next )=>{

    // revisa si hay errores 


    const errores  = validationResult(req);

    if(!errores.isEmpty()){

        return res.status(400).json({errores : errores.array()})
    }




    // extraer los valores de req.body 

    const {email , password} = req.body;


        try {
            
        
    

            // revisa que el usuario sea unico 


         let  usuario = await Usuario.findOne({email}); // findone viene siendo el where , y filtramos la busqueda por email

            if(usuario){ // si el usuario existe, que nos envie este mensaje de abajo 

                return res.status(400).json({msg: 'El usuario ya existe '});

            }


        // crea el nuevo usuario
        const usuario1 = new Usuario(req.body);


         // hashear el password 

         const salt = await bcryts.genSalt(10); // un salt nos genera un has unico 
         // es decir que si 2 usuarios tienen la clave 123,123 , sal nos genera un has unico 
         usuario1.password = await bcryts.hash(password, salt);



        // guarda el usuario

        await usuario1.save();

        // crear y firmar el jwt
        
        // el payload es cierta informacion que se va a almacenar en el json web token 

        const payload = { // aqui  va informacion  de la entidad y datos  adicionales

            usuario : {

                id: usuario1.id


            }


        }

        // firmar el token 

        // se utiliza json web token , porque  en react no hay secciones 

        jwt.sign(payload, process.env.SECRETA ,{ // sign significa firmar el token 

            // toma 2 parametros : el payload , y la palabra secreta que difinimos en el artchivo variables.env

            expiresIn : 3600 // equivale a 1 hora

        },(error,token)=>{ // revisando si hay un error al crear el

            if(error) throw error // para que marque un error

           res.json({token }); // retornando un objeto de token 

          //  res.status(200).json({token});

        });


        // mensaje de confirmacion 
      //  res.json({msg: 'usuario creado correctamente'});

       // res.send('se ha guardado el usuaio correctamente'); // este mensaje se muestra en postman 


      //  console.log(req.body);


        } catch (error) {
            console.log(error);

            res.status(400).send('Hubo un error'); // si hay un error
        }



}