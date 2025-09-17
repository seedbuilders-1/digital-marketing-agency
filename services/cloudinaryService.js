const fs = require('fs');
const cloudinary = require('../config/cloudinary');

exports.uploadToCloudinary = async (filePath, folder = 'uploads') => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder });

        // Clean up local file after upload
        fs.unlink(filePath, (err) => {
            if (err) throw new Error('Failed to delete local file: ' + err.message);
        });

        return result;
    } catch (err) {
        throw new Error('Failed to file to Cloudinary: ' + err.message);
    }
};

exports.uploadMultipleToCloudinary = async (files, folder = 'uploads') => {
    try {
        const uploadPromises = files.map(file => this.uploadToCloudinary(file.path, folder));
        return Promise.all(uploadPromises);
    }
    catch (err) {
        throw new Error('Failed to file to Cloudinary: ' + err.message);
    }
    
};