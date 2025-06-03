import fs from 'fs/promises';

import path from 'path';
import { fileURLToPath } from 'url';

const currFilePath = fileURLToPath(import.meta.url);
const currFileDir = path.dirname(currFilePath);

const movieDataDir = path.join(currFileDir, '../baseData/movieBaseData.json');

export const movieServices = {
    
    async getAll () {
        const rowData = await fs.readFile(movieDataDir, 'utf-8');
        const parsedData = JSON.parse(rowData);
        
        return parsedData;
    },

    async add (data) {
        const json = JSON.stringify(data, null, 2)
        await fs.writeFile(movieDataDir, json);   
    },

    async getSpecific (id) {
        const rowData = await fs.readFile(movieDataDir, 'utf-8') ;
        const parsedData = JSON.parse(rowData);

        const result = parsedData.find(obj => obj.id == id);
        return result ;
        
    },

}