const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productsController');

router.post('/', ProductsController.createProduct); // Criar produto
router.get('/', ProductsController.getAllProducts); // Listar produtos
router.get('/:id', ProductsController.getProductById); // Visualizar produto
router.put('/:id', ProductsController.updateProduct); // Atualizar produto
router.delete('/:id', ProductsController.deleteProduct); // Deletar produto

module.exports = router;
