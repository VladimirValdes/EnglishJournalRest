
const { Schema, model } = require('mongoose');

const AdjectiveSchema = Schema({
    adjective: {
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

AdjectiveSchema.methods.toJSON = function() {
    const { __v, ...adjective } = this.toObject();

    return adjective;
}

module.exports = model('Adjective',  AdjectiveSchema);