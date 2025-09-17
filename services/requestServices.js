const requestModel = require('../models/requestModels');


const getAllRequests = async () => {
    return await requestModel.getAllRequests();
};

const getRequest = async (id) => {
    return await requestModel.getRequest(id);
};

const createRequest = async (requestData) => {
    return await requestModel.createRequest(requestData);
};

const deleteRequest = async (id) => {
    return await requestModel.deleteRequest(id);
};

module.exports = {
    getAllRequests,
    getRequest,
    createRequest,
    deleteRequest,
}