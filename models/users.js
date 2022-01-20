
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: [ true, 'The name is required']
    },
    
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    
    role: {
        type: String,
        required: true,
        default: 'GUEST_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE', 'GUEST_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();

    user.uid = _id;
    return user;
}

module.exports = model('User',  UserSchema);