const Product = require('../models/productModel');
const ProductDTO = require('../dtos/productDTO');

module.exports = {
  async createProduct(req, res) {
    try {
      const { code } = req.body;
      // Verifique se o código já está em uso por outro produto
      if (code && await Product.isCodeUsed(code)) {
        return res.status(400).json({ error: 'Código já cadastrado.' });
      }

      const productData = ProductDTO.fromRequest(req.body); // Dados de entrada formatados pelo DTO
      const product = await Product.createProduct(productData);
      res.status(201).json(ProductDTO.toResponse(product)); // Saída formatada pelo DTO
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await Product.getAllProducts();
      const response = products.map(ProductDTO.toResponse); // Formatação de saída com o DTO
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.getProductById(id);
      if (product) {
        res.json(ProductDTO.toResponse(product));
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { code } = req.body;
  
      // Verifique se o código já está em uso por outro produto
      if (code && await Product.isCodeUsedByOtherId(code, id)) {
        return res.status(400).json({ error: 'Código já está em uso por outro produto.' });
      }

      const productData = ProductDTO.fromRequest(req.body);
      const updatedProduct = await Product.updateProduct(id, productData);
      res.json(ProductDTO.toResponse(updatedProduct));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await Product.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
