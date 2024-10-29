class UserDTO {
    constructor({ id, name, email }) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  
    // Transforma dados de entrada da requisição
    static fromRequest(body) {
      const { name, email } = body;
      return new UserDTO({ name, email });
    }
  
    // Formata dados para resposta da API
    static toResponse(user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email
      };
    }
  }
  
  module.exports = UserDTO;
  