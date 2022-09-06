import { Contact } from "../entities/contact.entity";


export class AddContactCommand {
    constructor(public readonly contact: Contact) {}
}