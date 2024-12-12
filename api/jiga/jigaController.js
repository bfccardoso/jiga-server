const Jiga = require('./jigaModel');
const JigaDTO = require('./jigaDTO');

module.exports = {
  async createJiga(req, res) {
    try {
      const { name, code } = req.body;
      // Verifique se o nome já está em uso por outra jiga
      if (name && await Jiga.isNameUsed(name)) {
        return res.status(400).json({ error: 'Nome já cadastrado.' });
      }
      // Verifique se o código já está em uso por outra jiga
      if (code && await Jiga.isCodeUsed(code)) {
        return res.status(400).json({ error: 'Código já cadastrado.' });
      }
      const jigaData = JigaDTO.fromRequest(req.body); // Dados de entrada formatados pelo DTO
      const jiga = await Jiga.createJiga(jigaData);
      res.status(201).json(JigaDTO.toResponse(jiga)); // Saída formatada pelo DTO
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllJigas(req, res) {
    try {
      const jigas = await Jiga.getAllJigas();
      const response = jigas.map(JigaDTO.toResponse); // Formatação de saída com o DTO
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getJigaById(req, res) {
    try {
      console.log('getJigaById')
      const { id } = req.params;
      const jiga = await Jiga.getJigaById(id);
      if (jiga) {
        res.json(JigaDTO.toResponse(jiga));
      } else {
        res.status(404).json({ error: 'Jiga not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getJigaByCode(req, res) {
    try {
      console.log('getJigaByCode')
      const { code } = req.body;
      const jiga = await Jiga.getJigaByCode(code);
      if (jiga) {
        res.json(JigaDTO.toResponse(jiga));
      } else {
        res.status(404).json({ error: 'Jiga not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateJiga(req, res) {
    try {
      const { id } = req.params;
      const { name, code } = req.body;
  
      // Verifique se o nome já está em uso por outra jiga
      if (name && await Jiga.isNameUsedByOtherId(name, id)) {
        return res.status(400).json({ error: 'Nome já está em uso por outro jiga.' });
      }
      // Verifique se o código já está em uso por outra jiga
      if (code && await Jiga.isCodeUsedByOtherId(code, id)) {
        return res.status(400).json({ error: 'Código já está em uso por outra jiga.' });
      }

      const jigaData = JigaDTO.fromRequest(req.body);
      const updatedJiga = await Jiga.updateJiga(id, jigaData);
      res.json(JigaDTO.toResponse(updatedJiga));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteJiga(req, res) {
    try {
      const { id } = req.params;
      await Jiga.deleteJiga(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
