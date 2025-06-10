import mongoose, { Schema } from "mongoose";

const castSchema = new mongoose.Schema ({

    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 12,
        max: 120
    },
    born: {
        type: String,
        required: true,
    },
    castImg: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, 'Invalid URL !']
    }

});

const Cast = mongoose.model('Cast', castSchema);

export default Cast;