const serviceModel = require('../models/serviceModels');

const getAllServices = async () => {
    return await serviceModel.getAllServices();
};

const getService = async (id) => {
    return await serviceModel.getService(id);
};

const createService = async (serviceData) => {
    return await serviceModel.createService(serviceData);
};

const updateService = async (id, serviceData) => {
    return await serviceModel.updateService(id, serviceData);
};

const deleteService = async (id) => {
    return await serviceModel.deleteService(id);
};

const getCaseStudiesByServiceId = async (id) => {
    return await serviceModel.getCaseStudiesByServiceId(id);
};

module.exports = {
    getAllServices,
    getService,
    createService,
    updateService,
    deleteService,
    getCaseStudiesByServiceId,
};