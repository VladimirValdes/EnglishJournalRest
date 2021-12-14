
const { Schema, model } = require('mongoose');

const PhrasalVerbSchema = Schema({
    phrasalVerb: {
        type: String,
        require: [ true, 'The phrasal verb is required']
    },   
    user: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
        default: true
    },
},
{
    timestamps: true
}
);

PhrasalVerbSchema.methods.toJSON = function() {
    const { __v, ...phrasalVerb } = this.toObject();

    return phrasalVerb;
}

module.exports = model('PhrasalVerb',  PhrasalVerbSchema);