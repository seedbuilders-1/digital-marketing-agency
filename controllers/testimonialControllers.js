const testimonialService = require('../services/testimonialServices.js');
const { sendSuccess, sendError } = require('../utils/response');
const { getUserIdFromHeader } = require('../utils/getUserId');

exports.getAlltestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.getAlltestimonials();
    if (testimonials.length===0) return sendError(res, 404, 'testimonials not found');

    return sendSuccess(res, 200, testimonials);
  } catch (err) {
    return sendError(res, 500, 'Could not fetch testimonials', err.message);
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await testimonialService.getTestimonialById(req.params.id);
    if (!testimonial) return sendError(res, 404, 'testimonial not found');
    return sendSuccess(res, 200, testimonial);

  } catch (err){
    return sendError(res, 500, 'Server error', err.message);
  }
  
};

exports.getTestimonialsByServiceId = async (req, res) => {
  try {
    const testimonials = await testimonialService.getTestimonialsByServiceId(req.params.id);
    if (testimonials.length===0) return sendError(res, 404, 'testimonials not found');
    return sendSuccess(res, 200, testimonials);

  } catch (err){
    return sendError(res, 500, 'Server error', err.message);
  }
  
};

exports.createTestimonial = async (req, res) => {
  try {
    const { user_title, message, stars, service_id } = req.body;

    if (!user_title || !message || !stars || !service_id) {
      return sendError(res, 400, 'All fields are required - user_title, message, stars, and service_id');
    }

    const user_id = getUserIdFromHeader(req);
    const newtestimonial = await testimonialService.createTestimonial({ user_id, user_title, message, stars, service_id });

    return sendSuccess(res, 200, { testimonial: newtestimonial }, 'testimonial created successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not create testimonial', err.message);
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await testimonialService.deleteTestimonial(id);

    if (!deleted) {
      return sendError(res, 404, 'testimonial not found');
    }

    return sendSuccess(res, 200, { testimonial: deleted }, 'testimonial deleted successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not delete testimonial', err.message);
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { user_title, message, stars, service_id } = req.body;
    const { id } = req.params;

    if (!user_title || !message || !stars || !service_id) {
      return sendError(res, 400, 'All fields are required - user_title, message, stars, and service_id');
    }

    const user_id = getUserIdFromHeader(req);
    const updated = await testimonialService.updateTestimonial(id, { user_id, user_title, message, stars, service_id });

    if (!updated) {
      return sendError(res, 404, 'testimonial not found');
    }

    return sendSuccess(res, 200, { testimonial: updated }, 'testimonial updated successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not update testimonial', err.message);
  }
};
