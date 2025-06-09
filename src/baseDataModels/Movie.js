import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imgUrl: String,
    rating: Number,
    description: String
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie ;