const requestService = require('../services/requestServices');
const { sendSuccess, sendError } = require('../utils/response');
const { getUserIdFromHeader } = require('../utils/getUserId');

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await requestService.getAllRequests();
        if (requests.length===0) return sendError(res, 404, 'Service requests not found');
        return sendSuccess(res, 200, requests, 'Service requests fetched successfully!');

    } catch (err) {
        return sendError(res, 500, 'Could not fetch Service requests', err.message);
    }
};

exports.getRequest = async (req, res) => {
    try {
        const id = req.params.id
        const request = await requestControllers.getRequest(id); 
        if (!request) return sendError(res, 404, 'Service request not found');

        return sendSuccess(res, 200, request, 'Request fetched successfully!');
    } catch (err) {
        return sendError(res, 500, 'Could not fetch your Service request', err.message);
    }
};

exports.createRequest = async (req, res) => {
    try {
        const { message, service_id, plan_id } = req.body;
        if (!message || !service_id || plan_id) return sendError(res, 400, 'All fields are required - message, service_id, plan_id');
        const user_id = getUserIdFromHeader(req);
        const newRequest = await requestService.createRequest({ message, service_id, plan_id, user_id });
        if (!newRequest) return sendError(res, 404, 'Could not create Service request');

        return sendSuccess(res, 201, newRequest, 'Created request successfully!');
    } catch (err) {
        return sendError(res, 500, 'Could not create your Service request', err.message);
    }
};

exports.deleteRequest = async (req, res) => {
    try {
        const id = req.params.id
        const request = await requestControllers.getRequest(id); 
        if (!request) return sendError(res, 404, 'Service request not found');

        const deleted = await requestService.deleteRequest(id);

        return sendSuccess(res, 200, deleted, 'Request deleted successfully!');
    } catch (err) {
        return sendError(res, 500, 'Could not fetch your Service request', err.message);
    }
};

