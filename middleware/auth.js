
const jwt = require('jsonwebtoken');

module.exports = function(req, res ,next){

    // leer el token del header 

        const token  = req.header('x-auth-token') // lo que tiene x-auth token es que en cada request se tiene que enviar

        console.log(token);


    // revisar si hay token 

    if(!token){

        return res.status(401).json({msg : 'no hay token , permiso no valido'});

    }

    // validar el token 


        try {
            

            const cifrado = jwt.verify(token,process.env.SECRETA); // verify nos permite verificar el toquen 

            req.usuario = cifrado.usuario; // agregando el usuario en el request  , en el payload de usuariocontroller , le agregamos el usuario
            // por esto le pasamos el usuario 

            next();

        } catch (error) {
            
            console.log(error);
            
            res.status(401).json({msg : 'token no valido'});
        }





}