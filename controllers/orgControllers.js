const orgService = require('../services/orgServices.js');
const { sendSuccess, sendError } = require('../utils/response');
const { uploadMultipleToCloudinary, uploadToCloudinary } = require('../services/cloudinaryService');
const { getUserIdFromHeader } = require('../utils/getUserId');

exports.getAllorgs = async (req, res) => {
  try {
    const orgs = await orgService.getAllorgs();
    if (orgs.length===0) return sendError(res, 404, 'Oganisations not found');
    return sendSuccess(res, 200, orgs, 'Organisation fetched successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not fetch organisations', err.message);
  }
};

exports.getorgById = async (req, res) => {
  try {
    const id = req.params.id
    const org = await orgService.getorgById(id);
    if (!org) return sendError(res, 404, 'organisation not found');
    
    return sendSuccess(res, 200, org, 'Organisation fetched successfully');

  } catch (err){
    return sendError(res, 500, 'Server error', err.message);
  }
  
};

exports.createOrg = async (req, res) => {
  try {
    const { name, email, address, country, type, industry, rc_number, staff_size } = req.body;

    if ( !name || !email || !address || !country || !type || !industry || !rc_number || !staff_size || !req.file) {
      return sendError(res, 400, 'All fields are required - name, email, address, country, type, industry, rc_number, staff_size, logo');
    }

    const user_id = getUserIdFromHeader(req);

    const uploadResult = await uploadToCloudinary(req.file.path, 'orgs/logo');

    const newOrg = await orgService.createOrg({
      name,
      email,
      address,
      country,
      type,
      industry,
      rc_number,
      staff_size,
      logo_url: uploadResult.secure_url,
      user_id
    });

    return sendSuccess(res, 201, { Org: newOrg }, 'Org created successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not create Organisation', err.message);
  }
};

exports.updateOrg = async (req, res) => {
  try {
    const { name, email, address, country, type, industry, rc_number, staff_size } = req.body;
    const { id } = req.params;

    if ( !name || !email || !address || !country || !type || !industry || !rc_number || !staff_size ) {
      return sendError(res, 400, 'All fields are required - All fields are required - name, email, address, country, type, industry, rc_number, staff_size');
    }

    const org = await orgService.getorgById(id);
    let logo_url = org.logo_url;

    if (req.file) {
      const logo = await uploadToCloudinary(req.file.path, 'orgs/logo');
      logo_url = logo.secure_url;
    }

    const updated = await orgService.updateOrg(id, { name, email, address, country, type, industry, rc_number, staff_size, logo_url });

    if (!updated) {
      return sendError(res, 404, 'Organisation not found');
    }

    return sendSuccess(res, 200, { Organisation: updated }, 'Organisation updated successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not update organisation', err.message);
  }
};

exports.deleteOrg = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await orgService.deleteOrg(id);

    if (!deleted) {
      return sendError(res, 404, 'Organisation not found');
    }

    return sendSuccess(res, 200, { Organisation: deleted }, 'Organisation deleted successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not delete Organisation', err.message);
  }
};

exports.getAllContacts = async (req, res) => {
  try{
    const contacts = await orgService.getAllContacts();
    if (contacts.length===0) return sendError(res, 404, 'No contacts found');

    return sendSuccess(res, 200, contacts, 'Contacts found');
  } catch (err) {
    return sendError(res, 500, 'Failed to get contacts', err.message);
  }
};

exports.getContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await orgService.getContact(id);
    if (!contact) return sendError(res, 404, 'Contact not found');

    return sendSuccess(res, 200, contact, 'Contact fetched successfully!');
  } catch (err) {
    return sendError(res, 500, 'Failed to get the contact', err.message);
  }
};


exports.createContact = async (req, res) => {
  try {
    const { name, organisation_id } = req.body;
    if (!name || !req.files['profile-pic'] || !req.files['IDs'] || !organisation_id){
      return sendError(res, 400, 'All fields are required - name, profile picture, ID, organisation_id');
    }

    const uploadResult = await uploadToCloudinary(req.files['profile-pic'][0].path, 'users/profile-pic');

    const idFiles = req.files['IDs'] || [];
    const idResults = await uploadMultipleToCloudinary(idFiles, 'users/docs');

    const newContact = await orgService.createContact({ name, pfp_url: uploadResult.secure_url, id_url: idResults.map(img => img.secure_url), organisation_id });

    return sendSuccess(res, 201, { Contact: newContact, image: { pfp: newContact.pfp_url, ID: newContact.id_url } }, 'Organisation contact created successfully');

  } catch (err) {
    return sendError(res, 500, 'Failed to create a Contact profile', err.message);
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { name, organisation_id } = req.body
    const id = req.params.id

    const contact = await orgService.getContact(id);
    if (!contact) return sendError(res, 404, 'Contact was not found');

    if (!name || !req.files['profile-pic'] || !req.files['IDs'] || !organisation_id){
      return sendError(res, 400, 'All fields are required - name, profile picture, ID, organisation_id');
    }

    const uploadResult = await uploadToCloudinary(req.files['profile-pic'][0].path, 'users/profile-pic');

    const idFiles = req.files['IDs'] || [];
    const idResults = await uploadMultipleToCloudinary(idFiles, 'users/docs');

    const updated = await orgService.updateContact({ id, name, pfp_url: uploadResult.secure_url, id_url: idResults.map(img => img.secure_url), organisation_id });

    return sendSuccess(res, 201, { Contact: updated, image: { pfp: updated.pfp_url, ID: updated.id_url } }, 'Organisation contact updated successfully');

  } catch (err){
    return sendError(res, 500, 'Could not update contact', err.message);
  }
};

exports.deleteContact = async (req, res) => {
  try{
    const id = req.params.id

    const contact = await orgService.getContact(id);
    if (!contact) return sendError(res, 404, 'Organisation was not found');

    const deleted = await orgService.deleteContact(id);
    return sendSuccess(res, 200, { contact: deleted }, 'Contact has been deleted successfully!');
  } catch (err){
    return sendError(res, 500, 'Could not delete contact', err.message);
  }
};