
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { AddContactCommand } from "./addContact.command";



@CommandHandler(AddContactCommand)
export class AddContactHandler implements ICommandHandler<AddContactCommand> {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}
 
  async execute(command: AddContactCommand) {
    const {contact} = command;
    await this.contactsRepository.save(contact);
  }
}