const express = require('express');
const router = express.Router();
const { getMenuItems, getMenuItemById } = require('../controller/Menue_Items');

router.get('/', getMenuItems);
// router.get('/:category', getMenuItems);
router.get('/:id', getMenuItemById);


module.exports = router;