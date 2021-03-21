
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UsuarioSchema = new mongoose.Schema({

    // EN EL SCHEMA DEFINIOS TODOS LOS CAMPOS QUE VA A  TENER NUESTRA BD

    nombre:{

        type: String,
        required: true, // validacion en mongo 
        trim: true // trim corta los espacios , moongose lo hace por default 

    },

    email:{

        type: String,
        require : true,
        trim: true,
        unique : true // que el correo sea unico 
    },

    password: {


        type: String,
        trim: true,
        required: true
        
    },

    registro:{

        type: Date,
        default : Date.now() // nos genera una fecha en el momento en que se hace el registro 


    }



});

module.exports = mongoose.model('Usuario', UsuarioSchema); // dandole el nombre al modelo y pasandole Schema que define las vacantes

