
const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({


    nombre : {

        type: String,
        require: true,
        trim : true


    },

    creador : {

        type : mongoose.Schema.Types.ObjectId, // de esta manera ,cada usuario, tiene su propio id 

        ref : 'Usuario' // en ref tiene que ser el nombre que le dimos al module .exports de Usuario 
        // de esta manera va a saber a que pertenece ese objectid , que le estamos pasando  y va a relacionarse
        // automaticamente



    },

    creado : {

        type : Date,
        default :  Date.now()


    }


});

module.exports = mongoose.model('Proyecto',ProyectoSchema);