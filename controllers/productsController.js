const Product = require('../models/productModels');

module.exports = {
  async createProduct(req, res) {
    try {
      const { nome, codigo } = req.body;
      const product = await Product.createProduct({ nome, codigo });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await Product.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.getProductById(id);
      if (product) {
        res.json(product);
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
      const { nome, codigo } = req.body;
      const updatedProduct = await Product.updateProduct(id, { nome, codigo });
      res.json(updatedProduct);
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
