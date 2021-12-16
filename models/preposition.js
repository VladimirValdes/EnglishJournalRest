
const { Schema, model } = require('mongoose');

const PrepositionSchema = Schema({
    preposition: {
        type: String,
        require: [ true, 'The adjective is required']
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

PrepositionSchema.methods.toJSON = function() {
    const { __v, ...preposition } = this.toObject();

    return preposition;
}

module.exports = model('Preposition',  PrepositionSchema);