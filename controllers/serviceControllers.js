const serviceService = require('../services/serviceServices');
const testimonialService = require('../services/testimonialServices');
const getUserId = require('../utils/getUserId');
const { sendSuccess, sendError } = require('../utils/response');
const { uploadToCloudinary } = require('../services/cloudinaryService');

exports.getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        if (services.length === 0) return sendError(res, 404, 'No services are available');
        return sendSuccess(res, 200, services);
    } catch (err) {
        return sendError(res, 500, 'Failed to get our services', err.message); 
    }
};

exports.getService = async (req, res) => {
    try {
        const id = req.params.id;
        const service = await serviceService.getService(id);
        if (!service) return sendError(res, 404, 'service not found');

        const testimonials = await testimonialService.getTestimonialsByServiceId(id);
        const caseStudies = await serviceService.getCaseStudiesByServiceId(id);

        return sendSuccess(res, 200, { Service: service, Testimonials: testimonials, Case_studies: caseStudies });
    } catch (err) {
        return sendError(res, 500, 'Could not get your requested service', err.message);
    }
}; 

exports.createService = async (req, res) => {
    try {
        const { title, subtitle, description } = req.body;
        if (!title || !subtitle || !description || !req.file) {
            return sendError(res, 400, 'All fields are required - title, subtitle, description, banner');
        }

        const user_id = await getUserId.getUserIdFromHeader(req);
        const uploadResult = await uploadToCloudinary(req.file.path, 'services/banner');

        const newService = await serviceService.createService({ title, subtitle, description, banner_url: uploadResult.secure_url, user_id });
        return sendSuccess(res, 201, { Service: newService }, 'Service created successfully!');
    } catch (err) {
        return sendError(res, 500, 'Failed to create Service', err.message);
    }
};

exports.updateService = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, subtitle, description } = req.body;
        if (!title || !subtitle || !description) {
            return sendError(res, 400, 'title, subtitle, and description fields are required');
        }

        const service = await serviceService.getService(id);
        if (!service) return sendError(res, 404, 'service not found');

        let banner_url = service.banner_url; 

        if (req.file) {
            const banner = await uploadToCloudinary(req.file.path, 'services/banner');
            banner_url = banner.secure_url;
        }

        const updated = await serviceService.updateService(id, { title, subtitle, description, banner_url });
        return sendSuccess(res, 200, { service: updated }, 'service was updated successfully!');
    } catch (err) {
        return sendError(res, 500, 'Could not update service', err.message);
    }
};

exports.deleteService = async (req, res) => {
    try {
        const id = req.params.id;
        const service = await serviceService.deleteService(id);
        if (!service) return sendError(res, 404, 'service not found');

        return sendSuccess(res, 200, { Service: service }, 'Service has been deleted');
    } catch (err) {
        return sendError(res, 500, 'Could not delete this service', err.message);
    }
};