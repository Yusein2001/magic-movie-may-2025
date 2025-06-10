import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true,'Title is required !'],
        },
    category: {
        type: String,
        required: [true,'Category is required !'],
        },
    genre: {
        type: String,
        required: [true,'Genre is required !'],
        },
    director: {
        type: String,
        required: [true,'Director is required !'],
        },
    year: {
        type: Number,
        required: [true,'Year is required !'],
        min: 1970,
        max: new Date().getFullYear() + 5
        },
    imgUrl: {
        type: String,
        required: [true,'ImgUrl is required !'],
        validate: /^https?:\/\//
        },
    rating: {
        type: Number,
        required: [true,'Rating is required !'],
        max:10,
        min: 1
        },
    description: {
        type: String,
        required: [true,'Description is required !'],
        maxLength: [100, 'Description is ']
    },

});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie ;