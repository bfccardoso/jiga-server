const express = require('express');
const router = express.Router();
const firmwareController = require('./firmwareController');
const upload = require('../config/uploadConfig');

router.post('/upload', upload.single('file'), firmwareController.uploadFirmware);
router.get('/download/:productId', firmwareController.downloadCurrentFirmware);
router.get('/:productId', firmwareController.getFirmwaresByProduct);
router.post('/set-current', firmwareController.setCurrentFirmware);
router.delete('/:firmwareId', firmwareController.deleteFirmware);

module.exports = router;
