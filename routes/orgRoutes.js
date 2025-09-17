const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const orgController = require('../controllers/orgControllers');
const { authorizeRoles }= require('../middlewares/authenticate');
const upload = require('../middlewares/multer');

router.get('/', auth, authorizeRoles('admin'), orgController.getAllorgs);
router.post('/', auth, upload.single('logo'), orgController.createOrg);
router.get('/contact', auth, authorizeRoles('admin'), orgController.getAllContacts);
router.get('/contact/:id', auth, orgController.getContact);
router.post(
  '/contact',
  auth,
  upload.fields([
    { name: 'profile-pic', maxCount: 1 },
    { name: 'IDs', maxCount: 5 },
  ]),
  orgController.createContact
);
router.put('/contact/:id', auth, orgController.updateContact);
router.delete('/contact/:id', auth, orgController.deleteContact);

router.get('/:id', auth, orgController.getorgById);
router.put('/:id', auth, upload.single('logo'), orgController.updateOrg);
router.delete('/:id', auth, orgController.deleteOrg);

module.exports = router;

