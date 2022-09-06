import { Contact } from "../entities/contact.entity";


export class UpdateContactCommand {
    constructor(public readonly id: number, public readonly contact: Partial<Contact>) {}
}