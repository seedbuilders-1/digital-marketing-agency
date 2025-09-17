const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const adminController = require('../controllers/adminControllers');


router.get('/', auth, adminController.getAllAdmins);
router.put('/make-admin', auth, adminController.makeAdmin);

router.get('/roles', auth, adminController.getRoles);
router.post('/roles', auth, adminController.createRole);
router.get('/roles/:id', auth, adminController.getRoleById);
router.put('/roles/:id', auth, adminController.updateRole);
router.delete('/roles/:id', auth, adminController.deleteRole);

router.get('/:id', auth, adminController.getAdmin);
router.delete('/:id', auth, adminController.removeAdmin);

module.exports=router;