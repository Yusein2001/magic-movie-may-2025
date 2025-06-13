import Cast from "../baseDataModels/Cast.js";


export const castServices = {
     save (data) {
        const newCast = Cast(data);
        return newCast.save();
    }
}