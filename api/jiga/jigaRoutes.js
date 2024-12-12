const express = require('express');
const router = express.Router();
const JigasController = require('./jigaController');
const {jigaSchema} = require('./jiga');
const validateRequest = require('../middlewares/validateRequest');

router.post('/', validateRequest(jigaSchema), JigasController.createJiga); // Criar jiga
router.get('/', JigasController.getAllJigas); // Listar jigas
router.get('/:id', JigasController.getJigaById); // Visualizar jiga
router.put('/:id', validateRequest(jigaSchema), JigasController.updateJiga); // Atualizar jiga
router.delete('/:id', JigasController.deleteJiga); // Deletar jiga

module.exports = router;
