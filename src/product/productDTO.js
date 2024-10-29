class ProductDTO {
    constructor({ id, name, code }) {
      this.id = id;
      this.name = name;
      this.code = code;
    }
  
    // Método para transformar os dados de entrada
    static fromRequest(body) {
      const { name, code } = body;
      return new ProductDTO({ name, code });
    }
  
    // Método para formatar a resposta de saída (para API, por exemplo)
    static toResponse(product) {
      return {
        id: product.id,
        name: product.name,
        code: product.code
      };
    }
  }
  
  module.exports = ProductDTO;
  