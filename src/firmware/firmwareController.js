const db = require('../db/db');
const path = require('path');
const fs = require('fs');

// Upload e vinculação de firmware ao produto
const uploadFirmware = async (req, res) => {
    const { productId, isCurrent } = req.body;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required.' });
    }

    const firmwareFile = req.file;
    if (!firmwareFile) {
        return res.status(400).json({ error: 'Firmware file is required.' });
    }

    const filename = path.basename(firmwareFile.path);

    // Checa se isCurrent foi enviado como "true"
    const isCurrentValue = isCurrent === 'true';

    // Se `isCurrent` estiver definido como true, remova o "atual" de outros firmwares
    if (isCurrentValue) {
        // SQL para desativar o status de "atual" dos outros firmwares do produto
        db.run(
          `UPDATE firmwares SET is_current = 0 WHERE product_Id = ?`,
          [productId]
        );
    }

    const sql = `INSERT INTO firmwares (product_id, filename, is_current) VALUES (?, ?, ?)`;
    db.run(sql, [productId, filename, isCurrentValue], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: 'Firmware uploaded successfully',
            firmware: { id: this.lastID, isCurrentValue, productId, filename }
        });
    });
};

const downloadCurrentFirmware = async (req, res) => {
    const { productId } = req.params;

    const sql = `SELECT filename FROM firmwares WHERE product_id = ? AND is_current = TRUE LIMIT 1`;

    try {
        // Encontre o produto no banco de dados pelo ID
        const product = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM products WHERE id = ?', [productId], (err, row) => {
              if (err) reject(err);
              else resolve(row);
            });
          });
  
        // Verifique se o produto existe
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        db.get(sql, [productId], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar firmware atual' });
            }
            
            if (!row) {
                return res.status(404).json({ error: 'Nenhum firmware atual encontrado para este produto' });
            }
    
            const filePath = path.join(__dirname, '../..', 'public/uploads/firmwares', row.filename);
            if (fs.existsSync(filePath)) {
                res.download(filePath, row.filename, (downloadErr) => {
                    if (downloadErr) {
                        res.status(500).json({ error: 'Erro ao fazer download do firmware' });
                    }
                });
            } else {
                res.status(404).json({ error: 'Arquivo de firmware não encontrado no servidor' });
            }
        });
    } catch {
        console.error('Erro ao baixar o firmware atual:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Listar todos os firmwares de um produto específico
const getFirmwaresByProduct = async (req, res) => {
    const { productId } = req.params;

    const sql = `SELECT * FROM firmwares WHERE product_id = ?`;

    try {
        // Encontre o produto no banco de dados pelo ID
        const product = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM products WHERE id = ?', [productId], (err, row) => {
              if (err) reject(err);
              else resolve(row);
            });
          });
  
        // Verifique se o produto existe
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        db.all(sql, [productId], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ firmwares: rows });
        });
    } catch {
        console.error('Erro ao buscar os firmwares do produto:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Atualizar o firmware atual de um produto
const setCurrentFirmware = async (req, res) => {
    const { firmwareId, productId } = req.body;

    const resetCurrentSql = `UPDATE firmwares SET is_current = FALSE WHERE product_id = ?`;
    const setCurrentSql = `UPDATE firmwares SET is_current = TRUE WHERE id = ? AND product_id = ?`;

    try {
        // Encontre o firmware no banco de dados pelo ID
        const firmware = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM firmwares WHERE id = ?', [firmwareId], (err, row) => {
              if (err) reject(err);
              else resolve(row);
            });
          });
  
        // Verifique se o firmware existe
        if (!firmware) {
            return res.status(404).json({ message: 'Firmware not found' });
        }

        db.run(resetCurrentSql, [productId], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
    
            db.run(setCurrentSql, [firmwareId, productId], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ message: 'Current firmware updated successfully' });
            });
        });
    } catch {
        console.error('Erro ao definir o firmware atual:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Atualizar o firmware atual de um produto
const deleteFirmware = async (req, res) => {
    const { firmwareId } = req.params;
  
    try {
        // Encontre o firmware no banco de dados pelo ID e obtenha o nome do arquivo
        const firmware = await new Promise((resolve, reject) => {
          db.get('SELECT id, filename, is_current FROM firmwares WHERE id = ?', [firmwareId], (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });
        });
  
        // Verifique se o firmware existe e se possui um nome de arquivo válido
        if (!firmware) {
            return res.status(404).json({ message: 'Firmware not found' });
        }
        // Verifique se este é o firmware atual
        if (firmware.is_current === 1) {
            return res.status(500).json({ message: 'Firmware is the current, cannot be erased.'})
        }
        if (!firmware.filename) {
            return res.status(500).json({ message: 'Filename is missing for this firmware' });
        }

        // Caminho completo do arquivo baseado no filename
        const filePath = path.join(__dirname, '../..', 'public', 'uploads', 'firmwares', firmware.filename);

        // Apague o registro no banco de dados
        await db.run('DELETE FROM firmwares WHERE id = ?', [firmwareId]);

        // Apague o arquivo físico
        fs.unlink(filePath, (err) => {
            if (err) {
            console.error('Erro ao excluir o arquivo:', err);
            return res.status(500).json({ message: 'Failed to delete firmware file' });
            }
            res.json({ message: 'Firmware deleted successfully' });
        });
    } catch (error) {
    console.error('Erro ao excluir o firmware:', error);
    res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    uploadFirmware,
    downloadCurrentFirmware,
    getFirmwaresByProduct,
    setCurrentFirmware,
    deleteFirmware
};
