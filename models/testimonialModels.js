const { prisma } = require('../config/db');

const getAlltestimonials = async () => {
  const testimonial = await prisma.testimonial.findMany({
    where: { deleted_at: null },
    include: {
      service: {
        select: {
          title: true
        },
      },
      user: {
        select: {
          name: true,
        },
      }, 
    },
  });
  return testimonial;
};

const getTestimonialById = async (id) => {
  const testimonial = await prisma.testimonial.findUnique({
    where: { id: id, deleted_at: null },
    include: {
      service: {
        select: {
          title: true
        },
      },
      user: {
        select: {
          name: true,
        },
      }, 
    },
  });
  return testimonial;
};

const getTestimonialsByServiceId = async (id) => {
  const testimonials = await prisma.testimonial.findMany({
    where: { service_id: id, deleted_at: null },
    include: {
      service: {
        select: {
          title: true
        },
      },
      user: {
        select: {
          name: true,
        },
      }, 
    },
  });
  return testimonials;
};

const createTestimonial = async ({ user_id, user_title, message, stars, service_id }) => {
  const testimonial = await prisma.testimonial.create({
    data: {
      user_id: user_id,
      user_title: user_title,
      message: message,
      stars: stars,
      service_id: service_id,
    },
    include: {
      service: {
        select: {
          title: true
        },
      },
      user: {
        select: {
          name: true,
        },
      }, 
    },
  });
  
  return testimonial;
};

const deleteTestimonial = async (id) => {
  const deleted = await prisma.testimonial.update({
    where: { id: id, deleted_at: null },
    data: {
      deleted_at: new Date()
    },
    include: {
      service: {
        select: {
          title: true
        },
      },
      user: {
        select: {
          name: true,
        },
      }, 
    },
  });

  return deleted; 
};

const updateTestimonial = async (id, { user_id, user_title, message, stars, service_id }) => {
  const updated = await prisma.testimonial.update({
    where: { id: id, deleted_at: null },
    data: {
      user_id: user_id,
      user_title: user_title,
      message: message,
      stars: stars,
      service_id: service_id,
    },
    include: {
      service: {
        select: {
          title: true
        },
      },
      user: {
        select: {
          name: true,
        },
      }, 
    },
  });
  return updated; 
};


module.exports = {
  getAlltestimonials,
  getTestimonialById,
  getTestimonialsByServiceId,
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
};