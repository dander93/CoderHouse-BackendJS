import { TechnicalException } from '../Models/Exceptions/index.js';
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
            throw new TechnicalException(error, error, "ERFLNOFND", 500);
        }
    }

    async getFileContent(filePath) {
        try {

            if (!this.checkFileExist(filePath)) {
                throw new TechnicalException(`El archivo '${filePath}' no existe`, null, "FLNOFND", 500);
            }

            return await fs.promises.readFile(filePath, this.#defaultEncoding);
        }
        catch (error) {
            throw new TechnicalException(error, error, "ERFLCNT", 500);
        }
    }

    async saveToFile(data, filePath) {
        try {

            if (!data) {
                await fs.promises.writeFile(filePath, JSON.stringify([]), this.#defaultEncoding)

                console.info(`Archivo '${filePath}' guardado`);
            }


            if (!this.checkFileExist(filePath)) {
                throw new TechnicalException(`El archivo '${filePath}' no existe`, null, "FLNOFND", 500);
            }

            await fs.promises.writeFile(filePath, JSON.stringify(data), this.#defaultEncoding);
        }
        catch (error) {
            throw new TechnicalException(error, error, "ERRSVFL", 500);
        }
    }

    createFile(filePath, defaultContent) {
        try {
            this.createPath(filePath);
            fs.writeFileSync(filePath, JSON.stringify(defaultContent));
            console.info(`FileManager: Archivo '${filePath}' creado correctamente`);
        }
        catch (error) {
            throw new TechnicalException(`Error al crear el archivo ${filePath}`, error, "ERCRTFL", 500);
        }
    }

    createPath(filePath) {
        try {

            const path = filePath.substring(0, filePath.lastIndexOf('/') + 1);

            fs.mkdirSync(path, { recursive: true });
            console.info(`FileManager: Path '${path}' creado correctamente`);
        }
        catch (error) {
            throw new TechnicalException(`Error al crear el path '${path}'`, error, "ERRCRPTH", 500);
        }
    }

}