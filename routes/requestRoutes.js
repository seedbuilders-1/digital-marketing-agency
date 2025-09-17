const express = require('express');
const router = express.Router();
const requestControllers = require('../controllers/requestControllers');
const auth = require('../middlewares/authmiddleware');

router.get('/', auth, requestControllers.getAllRequests);
router.post('/', auth, requestControllers.createRequest);
router.get('/:id', auth, requestControllers.getRequest);
router.delete('/:id', auth, requestControllers.deleteRequest);

module.exports = router;