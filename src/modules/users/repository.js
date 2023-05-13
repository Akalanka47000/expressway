import { User } from "./api/v1/model";

export const saveUser = (user) => {
    return User.create(user);
};

export const retrivedUserById = (id) => {
    return User.findById(id).lean();
};

export const retrieveUsers = (filters = {}, sorts = {}, page, limit) => {
    if (page && limit) {
        return User.paginate(filters, { sort: sorts, page, limit, lean: true });
    }
    return User.find(filters).sort(sorts).lean();
};

export const updateUserById = (id, user) => {
    return User.findByIdAndUpdate(id, user, { new: true }).lean();
};

export const deleteUserById = (id) => {
    return User.findByIdAndDelete(id).lean();
};
