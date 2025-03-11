const express = require('express');
const router = express.Router();
const service = require('../services/files');
const multer = require('../middlewares/files-storage');
const private = require('../middlewares/private');
const File = require('../models/file');
const { checkJWT } = require('../middlewares/private');

router.get('/', checkJWT, async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/* ancienne fonction router.get notée dans le cours : 
router.get('/), private.checkJWT, service.getAllFiles);*/

router.post('/', /* on retire pour l'instant : private.checkJWT, */multer, service.createOneFile);
router.get('/:id', private.checkJWT, service.getOneFile);
router.put('/:id', private.checkJWT, multer, service.modifyOneFile);
router.delete('/delete', private.checkJWT, service.deleteOneFile);

module.exports = router;