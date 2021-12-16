
const { Schema, model } = require('mongoose');

const ConnectorSchema = Schema({
    connector: {
        type: String,
        require: [ true, 'The connector is required']
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

ConnectorSchema.methods.toJSON = function() {
    const { __v, ...connector } = this.toObject();

    return connector;
}

module.exports = model('Connector',  ConnectorSchema);