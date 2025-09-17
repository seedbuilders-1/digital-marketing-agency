
const sendSuccess = async (res, status=200, data=null, message='success') => {
    return res.status(status).json({
        success: true,
        message: message,
        data: data,
    });
};

const sendError = async (res, status=400, message='error', error=null) => {
    return res.status(status).json({
        success: false,
        message: message,
        error: error,
    });
};

module.exports = { sendSuccess, sendError };