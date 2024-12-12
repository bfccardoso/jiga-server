const axios = require('axios')
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Jiga = require('../jiga/jigaModel');
const JigaDTO = require('../jiga/jigaDTO')
const Product = require('../product/productModel')
const ProductDTO = require('../product/productDTO');
const { error } = require('console');

const checkVersion = (code, versionJiga) => {
  return new Promise(async (resolve, reject) => {
    try {
        const jiga = JigaDTO.toResponse(await Jiga.getJigaByCode(code));
        const product = ProductDTO.toResponse(await Product.getProductById(jiga.productId));
        const urlProduct = `https://cronos.intelbras.com.br/v1/version/${product.family}/${product.name}/prod/latest_manual`
        const response = await axios.get(urlProduct)
        const versionCronos = response.data.version
        if(versionCronos === versionJiga) {
          resolve({status: 'OK'})
        } else {
            throw new Error(`Versão de firmware inválida! Jiga: ${versionJiga}, Cronos: ${versionCronos}`)
        }
    } catch (error) {
        reject(error);
    }
  })
}

const getFirmware = (code) => {
  return new Promise(async (resolve, reject) => {
    try {
        const jiga = JigaDTO.toResponse(await Jiga.getJigaByCode(code));
        const product = ProductDTO.toResponse(await Product.getProductById(jiga.productId));
        const urlProduct = `https://cronos.intelbras.com.br/v1/version/${product.family}/${product.name}/prod/latest_manual`
        const folderFirmware = path.join(__dirname, '..', '..', 'downloads', `${product.name}`);
        const response = await axios.get(urlProduct)
        downloadBinFile(response.data.file, folderFirmware)
        const fileName = path.basename(response.data.file);
        const filePath = path.join(folderFirmware, fileName);
        const fileBuffer = fs.readFileSync(filePath)
        const md5HashReceived = response.data.md5
        const md5HashCalculated = crypto.createHash('md5').update(fileBuffer).digest('hex');
        if (md5HashReceived === md5HashCalculated) {
            resolve({ status: 'success' })
        } else {
            throw new Error(`MD5 inválido! Calculado: ${md5HashCalculated}, Esperado: ${md5HashReceived}`)
        }
    } catch (error) {
        reject(error);
    }
  })
}

async function downloadBinFile(url, outputFolder) {
  try {
    // Verifica se a pasta de destino existe, se não, cria
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    const fileName = path.basename(url);
    const outputPath = path.join(outputFolder, fileName);
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        resolve(outputPath);
      });
      writer.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error(`Erro ao fazer download: ${error.message}`);
  }
}
  
module.exports = {
    checkVersion,
    getFirmware
}