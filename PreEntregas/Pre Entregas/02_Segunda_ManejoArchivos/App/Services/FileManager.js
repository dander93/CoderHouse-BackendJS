import { TechnicalException } from '../Exceptions/index.js';
import * as fs from 'fs'

export default class FileManager {

    #defaultEncoding;

    constructor(defaultEncoding) {
        this.#defaultEncoding = defaultEncoding || 'utf8';

        console.info(`FileManager: Encoding configurado en: '${this.#defaultEncoding}'`);
    }

    checkFileExist(path) {
        try {
            return fs.existsSync(path)
        }
        catch (error) {
            throw new TechnicalException(error);
        }
    }

    async getFileContent(filePath) {
        try {

            if (!this.checkFileExist(filePath)) {
                throw new TechnicalException(`El archivo '${filePath}' no existe`);
            }

            return await fs.promises.readFile(filePath, this.#defaultEncoding);
        }
        catch (error) {
            throw new TechnicalException(error);
        }
    }

    async saveToFile(data, filePath) {
        try {

            if (!data) {
                await fs.promises.writeFile(filePath, JSON.stringify([]), this.#defaultEncoding)

                console.info(`Archivo '${filePath}' guardado`);
            }


            if (!this.checkFileExist(filePath)) {
                throw new TechnicalException(`El archivo '${filePath}' no existe`);
            }

            await fs.promises.writeFile(filePath, JSON.stringify(data), this.#defaultEncoding);
        }
        catch (error) {
            throw new TechnicalException(error);
        }
    }

    createFile(filePath, defaultContent) {
        try {
            this.createPath(filePath);
            fs.writeFileSync(filePath, JSON.stringify(defaultContent));
            console.info(`FileManager: Archivo '${filePath}' creado correctamente`);
        }
        catch (error) {
            throw new TechnicalException(`Error al crear el archivo ${filePath}`, error);
        }
    }

    createPath(filePath) {
        try {

            const path = filePath.substring(0, filePath.lastIndexOf('/') + 1);

            fs.mkdirSync(path, { recursive: true });
            console.info(`FileManager: Path '${path}' creado correctamente`);

        } catch (error) {
            throw new TechnicalException(`Error al crear el path '${path}'`, error);
        }
    }

}