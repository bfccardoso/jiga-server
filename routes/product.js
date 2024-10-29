const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productController');
const {productSchema} = require('../schemas/productSchema');
const validateRequest = require('../middlewares/validateRequest');

router.post('/', validateRequest(productSchema), ProductsController.createProduct); // Criar produto
router.get('/', ProductsController.getAllProducts); // Listar produtos
router.get('/:id', ProductsController.getProductById); // Visualizar produto
router.put('/:id', validateRequest(productSchema), ProductsController.updateProduct); // Atualizar produto
router.delete('/:id', ProductsController.deleteProduct); // Deletar produto

module.exports = router;
