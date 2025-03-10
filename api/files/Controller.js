const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = './public/files';

// Criar diretório caso não exista
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Middleware do `express-fileupload`
const uploadMiddleware = fileUpload();

// ✅ Função para gerar um nome de arquivo único
const generateUniqueFileName = (originalName) => {
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `file-${uniqueSuffix}${ext}`;
};

// ✅ Função para upload de arquivos
exports.uploadFile = async (req, res) => {
    try {
        console.log('Recebendo requisição de upload...'); // Debug

        if (!req.files || !req.files.file) {
            console.error('Nenhum arquivo encontrado no req.files:', req.files);
            return res.status(400).json({ message: 'Nenhum arquivo enviado!' });
        }

        const file = req.files.file;
        const pastaDestino = req.body.pastaDestino || '';
        const folderPath = path.join(UPLOAD_DIR, pastaDestino);

        // Criar a pasta se não existir
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Gerar um nome de arquivo único
        const uniqueFileName = generateUniqueFileName(file.name);
        const filePath = path.join(folderPath, uniqueFileName);

        // Salvar arquivo
        file.mv(filePath, (err) => {
            if (err) {
                console.error('Erro ao mover o arquivo:', err);
                return res.status(500).json({ message: 'Erro ao mover arquivo', error: err.message });
            }

            console.log('Arquivo salvo com sucesso em:', filePath);
            return res.status(200).json({
                file: uniqueFileName,
                folder: pastaDestino,
                mimeType: file.mimetype,
                size: file.size,
                status: 'active'
            });
        });
    } catch (error) {
        console.error('Erro no upload:', error);
        return res.status(500).json({ message: 'Erro ao fazer upload do arquivo', error: error.message });
    }
};


exports.deleteFile = async (req, res) => {
    const { fileName, folder } = req.params;
    const filePath = path.join(UPLOAD_DIR, folder, fileName);

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Arquivo deletado: ${filePath}`);
            return res.status(200).json({ message: 'Arquivo deletado com sucesso!' });
        } else {
            console.error('Arquivo não encontrado:', filePath);
            return res.status(404).json({ message: 'Arquivo não encontrado no servidor' });
        }
    } catch (error) {
        console.error('Erro ao deletar arquivo:', error);
        return res.status(500).json({ message: 'Erro ao deletar arquivo', error: error.message });
    }
};