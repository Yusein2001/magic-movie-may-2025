import User from "../baseDataModels/User.js";

export const userServices = {

    async getOne (email) {
        return await User.findOne({email});
    }

};