class ProductDTO {
    constructor({ id, name, family, description = '', code = '' }) {
      this.id = id;
      this.name = name;
      this.family = family,
      this.description = description || null,
      this.code = code || null;
    }
  
    // Método para transformar os dados de entrada
    static fromRequest(body) {
      const { name, family, description, code } = body;
      return new ProductDTO({ name, family, description, code });
    }
  
    // Método para formatar a resposta de saída (para API, por exemplo)
    static toResponse(product) {
      return {
        id: product.id,
        name: product.name,
        family: product.family,
        description: product.description || null,
        code: product.code || null
      };
    }
  }
  
  module.exports = ProductDTO;
  