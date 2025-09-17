const { prisma } = require('../config/db');

const getAllRequests = async () => {
    const requests = await prisma.service_request.findMany({
        select: {
           id: true,
           message: true,
           status: true,
           user_id: true,
           user: {
            select: {
                name: true,
            }
           },
           service_id: true,
           service: {
            select: {
                title: true,
            }
           },
           plan_id: true,
           plan: {
            select: {
                name: true,
            }
           },
           requested_at: true,
        },
    });
    return requests;
};

const getRequest = async (id) => {
    const request = await prisma.service_request.findUnique({
        where: { id: id },
        select: {
           id: true,
           message: true,
           status: true,
           user_id: true,
           user: {
            select: {
                name: true,
            }
           },
           service_id: true,
           service: {
            select: {
                title: true,
            }
           },
           plan_id: true,
           plan: {
            select: {
                name: true,
            }
           },
           requested_at: true,
        },
    });
    return request;
}

const createRequest = async ({ message, service_id, plan_id, user_id }) => {
    const request = await prisma.service_request.create({
        data: {
            message: message,
            status: 'in progress',
            service_id: service_id,
            plan_id: plan_id,
            user_id: user_id,
        },
        select: {
           id: true,
           message: true,
           status: true,
           user_id: true,
           user: {
            select: {
                name: true,
            }
           },
           service_id: true,
           service: {
            select: {
                title: true,
            }
           },
           plan_id: true,
           plan: {
            select: {
                name: true,
            }
           },
           requested_at: true,
        },
    });
    return request;
};

const deleteRequest = async (id) => {
    const request = await prisma.service_request.delete({
        where: { id: id },
        include: {
            user: {
                select: {
                    name: true,
                }
            },
            service: {
                select: {
                    title: true,
                }
            },
            plan: {
                select: {
                    name: true,
                }
            }
        }
    });
    return request;
};

module.exports = {
    getAllRequests,
    getRequest,
    createRequest,
    deleteRequest,
}

