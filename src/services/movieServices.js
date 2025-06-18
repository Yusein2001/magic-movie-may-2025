import mongoose from 'mongoose';
import Movie from '../baseDataModels/Movie.js';

import path from 'path';
import { fileURLToPath } from 'url';


const currFilePath = fileURLToPath(import.meta.url);
const currFileDir = path.dirname(currFilePath);

export const movieServices = {
    
    async getAll () {
        const rowData = await Movie.find();
        const result = rowData.map(doc => doc.toObject());
        
        return result;
    },

    async add (data) {
        await Movie.create(data); 
    },

    async getSpecific (id) {

        const specificMovie = await Movie.findById(id).populate('casts');
        // const result = specificMovie.toObject();

        return specificMovie ;
        
    },

    async search (rawParams = {}) {

        const searchParams = {} ;

        if(rawParams.title?.trim()){
            searchParams.title = rawParams.title.trim();
        }
        if(rawParams.genre?.trim()){
            searchParams.genre = rawParams.genre.trim();
        }
        if(rawParams.year?.trim()){
            searchParams.year = Number(rawParams.year.trim());
        }

        const result = await Movie.find(searchParams).lean();
        
        return result;
        
    },

    async attach (movieId, castId){
        const movie = await this.getSpecific(movieId);
        movie.casts.push(castId);
        movie.save();
    },

    async update (movieID, data){
        await Movie.findByIdAndUpdate(movieID, data);
    },

    delete (id){
        return Movie.findByIdAndDelete(id);
    }

}