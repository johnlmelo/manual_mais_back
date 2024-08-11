const fs = require('fs');
const path = require('path');

function generateUniqueString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    // Adiciona os milissegundos atuais à string
    const currentTimeInMilliseconds = Date.now();
    result += currentTimeInMilliseconds;
  
    return result;
}

async function uploadFile(fileBase64, pastaDestino) {
    const UPLOAD_DIR = path.join(`./public/files`, pastaDestino);
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const matches = fileBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        return { code: 400, data: `Arquivo ou imagem inválida` };
    }

    const fileBuffer = Buffer.from(matches[2], 'base64');
    const fileType = matches[1].split('/')[1];
    const fileSize = fileBuffer.length;
    const fileName = `file_${generateUniqueString(18)}.${fileType !== 'octet-stream' ? fileType : 'bin'}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    if (!fileBuffer || !fileType || !fileSize || !fileName || !filePath) {
        return {
            code: 400,
            data: `Infos não encontrados.`,
            moreInfo: {
                fileBuffer: fileBuffer,
                fileType: fileType,
                fileSize: fileSize,
                fileName: fileName,
                filePath: filePath,
            }
        };
    }

    fs.writeFile(filePath, fileBuffer, (err) => {
        if (err) {
            console.log('===============err==================');
            console.log('err', err);
            console.log('===============err==================');
            return { code: 500, data: `Erro ao salvar o arquivo!` };
        }
    });

    const resposta = {
        code: 200,
        data: {
            file: fileName,
            folder: pastaDestino,
            mimeType: fileType,
            size: fileSize,
            status: 'active'
        }
    };

    return resposta;
}

async function deleteFileFromServer(fileName, folder) {
    const filePath = path.join(`./public/files`, folder, fileName);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return { code: 200, data: `Arquivo deletado com sucesso!` };
    } else {
        return { code: 404, data: `Arquivo não encontrado no servidor` };
    }
}

// Create
exports.create = async (req, res) => {
    const { fileBase64, pastaDestino } = req.body;

    if (!fileBase64) {
        return  res.status(400).json({ message: "Arquivo não encontrado" });
    }

    if (!pastaDestino) {
        return  res.status(400).json({ message: "Pasta de destino não encontrada" });
    }

    try {
        
        const urlFile = await uploadFile(fileBase64, pastaDestino);

        if (urlFile.code !== 200) {
            return  res.status(urlFile.code).json(urlFile.data);
        }

        return res.status(200).json(urlFile);

    } catch (error) {
        return res.status(500).json(error);
    }
};


// // Delete
// exports.delete = async (req, res) => {
//     try {
//         const file = await Files.findByPk(req.params.id);
//         if (!file) {
//             return sendResponse(res, 404, { error: 'File not found' });
//         }

//         const deleted = await Files.destroy({ where: { id: req.params.id } });
//         if (deleted) {
//             const deleteResponse = await deleteFileFromServer(file.file, file.folder);
//             if (deleteResponse.code !== 200) {
//                 return sendResponse(res, deleteResponse.code, { error: deleteResponse.data });
//             }
//             sendResponse(res, 200, { message: 'File deleted successfully' });
//         } else {
//             sendResponse(res, 404, { error: 'File not deleted' });
//         }
//     } catch (error) {
//         sendResponse(res, 500, { error: error.message });
//     }
// };