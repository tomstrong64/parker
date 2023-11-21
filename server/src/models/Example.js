import mongoose, { Schema } from 'mongoose';

const ExampleSchema = new Schema({
    name: String,
    description: String,
    completed: Boolean,
},
{
    timestamps: true
});

export const Example = mongoose.model('examples', ExampleSchema);