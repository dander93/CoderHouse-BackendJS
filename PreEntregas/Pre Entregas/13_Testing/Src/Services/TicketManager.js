import { ticketSchema } from "../Models/Schemes/index.js";
import DataAccessService from "./DataAccessService.js";
import { randomUUID } from 'crypto';
import TicketDTO from '../Models/DTO/Ticket.dto.js';
import BusinessException from "../Models/Exceptions/BusinessException.js";
import ConfigigurationManager from "../Configuration/ConfigurationManager.js";
import { message } from "../Models/Schemes/Types/index.js";


export default class TicketManager {

    static #repository;

    constructor() {
        if (!TicketManager.#repository) {
            const data = new DataAccessService();
            TicketManager.#repository =
                data.getRepository("ticket", ticketSchema);

            ConfigigurationManager.logger.info("TicketManager: Configurando repositorio de tickets");
        }
    }

    async createticket(amount, purchaser) {
        try {

            const ticketDB = await TicketManager.#repository.create({
                code: randomUUID(),
                amount: amount,
                purchaser: purchaser
            });

            return new TicketDTO(ticketDB.code, ticketDB.purchase_datetime, ticketDB.amount, ticketDB.purchaser);
        }
        catch (error) {
            throw new BusinessException(`Ocurrió un error al generar el ticket. Message: ${error.message}`, "ERRTKGN500", 500);
        }
    }
}