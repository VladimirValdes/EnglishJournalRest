
const { Schema, model } = require('mongoose');

const VerbSchema = Schema({
    baseForm: {
        type: String,
        require: [ true, 'The verb is required']
    },
    
    pastSimple: {
        type: String,
        required: [true, 'The verb in simple past is require'],
    },
    pastParticle: {
        type: String,
        required: [true, 'The verb in pastParticle is require']
    },
    type: {
        type: String,
        required: [true, 'The verb in pastParticle is require'],
    },
    nik: {
        type: String,
        required: [true, 'The N-I-K is require'],
    },
},

{
    timestamps: { createAt: 'create_at'}
}

);

VerbSchema.methods.toJSON = function() {
    const { __v, password, ...verb } = this.toObject();

    return verb;
}

module.exports = model('Verb',  VerbSchema);