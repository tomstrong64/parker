import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    google: {
        id: String,
        token: String,
        accessToken: String,
        refreshToken: String,
    },
});

export const User = mongoose.model('User', UserSchema);
