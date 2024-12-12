class JigaDTO {
    constructor({ id, name, code, productId}) {
      this.id = id;
      this.name = name;
      this.code = code;
      this.productId = productId;
    }
  
    // Método para transformar os dados de entrada
    static fromRequest(body) {
      const { name, code, productId } = body;
      return new JigaDTO({ name, code, productId });
    }
  
    // Método para formatar a resposta de saída (para API, por exemplo)
    static toResponse(jiga) {
      return {
        id: jiga.id,
        name: jiga.name,
        code: jiga.code,
        productId: jiga.product_id
      };
    }
  }
  
  module.exports = JigaDTO;
  